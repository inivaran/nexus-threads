# outputs.tf

output "s3_bucket_name" {
  description = "The name of the S3 bucket."
  value       = aws_s3_bucket.static_site_bucket.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.static_site_distribution.domain_name
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.static_site_distribution.id
}

output "cloudfront_function_arn" {
  description = "The ARN of the CloudFront Function."
  value       = aws_cloudfront_function.nextjs_static_rewrite.arn
}

output "site_url" {
  description = "The URL of your deployed static site."
  value       = "https://${var.domain_name}"
}