
variable "notification_emails" {
description = "List of email addresses to receive contact form submissions"
  type = list(string)
  default = ["hemantksingh.hk@gmail.com", "ektapawar05@gmail.com"]
}

locals {
  contactus_package = "${path.module}/../backend/contactus.zip"
  contactus_sns_topic = "${var.project_name}-contactus"
  contactus_function_name = "${var.project_name}-contactus"
}

resource "aws_lambda_function" "contact_us" {
  filename         = local.contactus_package
  function_name    = local.contactus_function_name
  handler          = "contactus.handler"
  runtime          = "nodejs22.x"
  source_code_hash = filebase64sha256("${local.contactus_package}")
  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.contact.arn
      SITE_ORIGIN   = "https://${aws_cloudfront_distribution.static_site_distribution.domain_name}"
    }
  }
  role = aws_iam_role.lambda_exec.arn
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_exec.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Action = "sns:Publish"
        Effect = "Allow"
        Resource = aws_sns_topic.contact.arn
      }
    ]
  })
}

resource "aws_sns_topic" "contact" {
  name = local.contactus_sns_topic
}

resource "aws_sns_topic_subscription" "contact_email" {
  for_each  = toset(var.notification_emails)
  topic_arn = aws_sns_topic.contact.arn
  protocol  = "email"
  endpoint  = each.value
}