
provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "The AWS region to deploy resources in."
  type        = string
}

variable "project_name" {
  description = "A unique name for your project, used in resource naming."
  type        = string
}

variable "domain_name" {
  description = "The domain name for your CloudFront distribution (e.g., example.com)."
  type        = string
  default     = "nexusthreads.co" # Replace with your actual domain name
}

locals {
  s3_bucket_name = "${var.project_name}-co"
}


# s3 bucket for static site
resource "aws_s3_bucket" "static_site_bucket" {
  bucket = local.s3_bucket_name

  tags = {
    Project = var.project_name
  }
}

resource "aws_s3_bucket_policy" "static_site_bucket_policy" {
  bucket = aws_s3_bucket.static_site_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowCloudFrontOAC",
        Effect    = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action = "s3:GetObject",
        Resource = [
          "${aws_s3_bucket.static_site_bucket.arn}/*",
        ],
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.static_site_distribution.arn
          }
        }
      },
    ],
  })
}

resource "aws_s3_bucket_website_configuration" "static_site_website" {
  bucket = aws_s3_bucket.static_site_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}