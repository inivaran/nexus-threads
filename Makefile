.PHONY: stack destroy-stack deploy-site test package

TOFU_DIR=infra
PROJECT_NAME=nexus-threads
REGION?=eu-west-2
APPLY?=false
TOFU_PLAN=$(PROJECT_NAME).$@.tfplan

define tfinit
	tofu -chdir=$(TOFU_DIR) init
endef

stack:
	$(call tfinit,$@) && \
	tofu -chdir=$(TOFU_DIR) plan \
		-var project_name=$(PROJECT_NAME) \
		-var aws_region=$(REGION) \
		-out $(TOFU_PLAN)
ifeq ($(APPLY), true)
	tofu -chdir=$(TOFU_DIR) apply $(TOFU_PLAN)
else
	@echo Skipping apply ...
endif

destroy-stack:
	tofu -chdir=$(TOFU_DIR) destroy \
		-var project_name=$(PROJECT_NAME) \
		-var aws_region=$(REGION)

deploy-site:
	# Ensure you have built the app before running this, using `npm run build`
	# Sync the output directory to S3
	aws s3 sync out/ s3://$(shell tofu -chdir=infra output -raw s3_bucket_name)/ --delete
	# Invalidate CloudFront cache
	aws cloudfront create-invalidation \
  		--distribution-id $(shell tofu -chdir=infra output -raw cloudfront_distribution_id) \
  		--paths "/*"

package:
	cd backend && \
	rm contactus.zip && \
	zip contactus.zip contactus.mjs

test:
	curl --header "Content-Type: application/json" \
  		--request POST \
  		--data '{"name":"Foo Bar","email":"foo@bar.com","message":"Hello"}' \
  		$(shell tofu -chdir=infra output -raw api_endpoint)/contact