data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

# CloudFront Origin Access Control (OAC) to securely connect CloudFront to S3
resource "aws_cloudfront_origin_access_control" "static_site_oac" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name} S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "static_site_distribution" {
  origin {
    domain_name              = aws_s3_bucket.static_site_bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.static_site_bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.static_site_oac.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for ${var.project_name} static site"
  default_root_object = "index.html"

  # Default cache behavior
  default_cache_behavior {
    target_origin_id       = "S3-${aws_s3_bucket.static_site_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    compress               = true

    # Cache policy for optimal performance
    cache_policy_id = data.aws_cloudfront_cache_policy.caching_optimized.id

    # Associate the CloudFront Function for URL rewriting
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.nextjs_static_rewrite.arn
    }
  }

  # Viewer Certificate for HTTPS
  viewer_certificate {
    cloudfront_default_certificate = true # Use CloudFront's default certificate for simplicity
    # For custom domains, you'd use:
    # acm_certificate_arn = aws_acm_certificate.your_cert.arn
    # ssl_support_method  = "sni-only"
  }

  # Price Class (adjust based on your needs)
  price_class = "PriceClass_100" # All Edge Locations (best performance), or PriceClass_50, PriceClass_200

  # Aliases (your domain names)
  # aliases = [var.domain_name]

  restrictions {
    geo_restriction {
      restriction_type = "none" # Allow access from all locations
    }
  }

  tags = {
    Project = var.project_name
  }
}

# invalidation
resource "null_resource" "cloudfront_invalidation" {
  # This resource doesn't create any AWS resources directly.
  # It's used as a trigger for the CloudFront invalidation.
  # To force an invalidation, run 'tofu taint null_resource.cloudfront_invalidation'
  # before 'tofu apply'.

  triggers = {
    # You can add a timestamp here if you want to trigger invalidation on every apply.
    # However, for static sites, it's often better to trigger manually or via CI/CD.
    # force_invalidation = timestamp()
  }

  provisioner "local-exec" {
    # This command will run after the null_resource is created/updated.
    # It creates a CloudFront invalidation for all paths.
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.static_site_distribution.id} --paths '/*'"
    interpreter = ["bash", "-c"]
  }
}

# cloudfront_function
locals {
  # The JavaScript code for the CloudFront function
  cloudfront_function_code = <<EOF
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    // If the URI ends with a slash (e.g., /about/), append index.html
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    // If no dot is found (e.g., /about), append .html
    else if (!uri.includes('.')) {
        request.uri += '.html';
    }

    return request;
}
EOF
}

# CloudFront Function Resource
resource "aws_cloudfront_function" "nextjs_static_rewrite" {
  name    = "${var.project_name}-rewrite"
  runtime = "cloudfront-js-1.0"
  comment = "Rewrites Next.js static URLs for S3/CloudFront (e.g., /about to /about.html)"
  publish = true # Automatically publishes the function to the LIVE stage
  code    = local.cloudfront_function_code
}