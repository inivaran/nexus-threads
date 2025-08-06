locals {
    allowed_origin = "https://${aws_cloudfront_distribution.static_site_distribution.domain_name}"
}

resource "aws_apigatewayv2_api" "contact_api" {
  name          = "contact-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [local.allowed_origin]
    allow_methods = ["POST", "GET", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age = 300
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.contact_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.contact_us.invoke_arn
  integration_method = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "$default"
  auto_deploy = true
  
  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 10
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn
    format          = "$context.requestId"
  }
  tags = {
    Project = var.project_name
  }
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name              = "/aws/apigateway/contact-api-access"
  retention_in_days = 14
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_us.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*"
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.contact_api.api_endpoint
}