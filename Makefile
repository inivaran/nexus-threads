.PHONY: stack destroy-stack deploy

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

deploy:
	tofu -chdir=$(TOFU_DIR) output
	# Sync the output directory to S3
	aws s3 sync out/ s3://nexus-threads-uk/ --delete
	