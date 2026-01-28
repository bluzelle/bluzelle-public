#!/usr/bin/make -f

BRANCH_OR_TAG := $(shell git symbolic-ref --quiet --short HEAD || git describe --tags --exact-matchv)
COMMIT := $(shell git log -1 --format='%H')

# don't override user values
ifeq (,$(VERSION))
  # VERSION := $(shell git describe --tags)
  # if VERSION is empty, then populate it with BRANCH_OR_TAG's name and raw commit hash
  # ifeq (,$(VERSION))
    VERSION := $(BRANCH_OR_TAG)-$(COMMIT)
  # endif
endif

PACKAGES_SIMTEST=$(shell go list ./... | grep '/simulation')
LEDGER_ENABLED ?= true
SDK_PACK := $(shell go list -m github.com/cosmos/cosmos-sdk | sed  's/ /\@/g')
TM_VERSION := $(shell go list -m github.com/cometbft/cometbft | sed 's:.* ::') # grab everything after the space in "github.com/cometbft/cometbft v0.34.7"
DOCKER := $(shell which docker)
BUILDDIR ?= $(CURDIR)/build

export GO111MODULE = on

# process build tags

build_tags = netgo
ifeq ($(LEDGER_ENABLED),true)
  ifeq ($(OS),Windows_NT)
    GCCEXE = $(shell where gcc.exe 2> NUL)1
    ifeq ($(GCCEXE),)
      $(error gcc.exe not installed for ledger support, please install or set LEDGER_ENABLED=false)
    else
      build_tags += ledger
    endif
  else
    UNAME_S = $(shell uname -s)
    ifeq ($(UNAME_S),OpenBSD)
      $(warning OpenBSD detected, disabling ledger support (https://github.com/cosmos/cosmos-sdk/issues/1988))
    else
      GCC = $(shell command -v gcc 2> /dev/null)
      ifeq ($(GCC),)
        $(error gcc not installed for ledger support, please install or set LEDGER_ENABLED=false)
      else
        build_tags += ledger
      endif
    endif
  endif
endif

ifeq (cleveldb,$(findstring cleveldb,$(CURIUM_BUILD_OPTIONS)))
  build_tags += gcc cleveldb
endif
build_tags += $(BUILD_TAGS)
build_tags := $(strip $(build_tags))

whitespace :=
whitespace += $(whitespace)
comma := ,
build_tags_comma_sep := $(subst $(whitespace),$(comma),$(build_tags))

# process linker flags

ldflags = -X github.com/cosmos/cosmos-sdk/version.Name=curium \
		  -X github.com/cosmos/cosmos-sdk/version.AppName=curiumd \
		  -X github.com/cosmos/cosmos-sdk/version.Version=$(VERSION) \
		  -X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) \
		  -X "github.com/cosmos/cosmos-sdk/version.BuildTags=$(build_tags_comma_sep)" \
			-X github.com/cometbft/cometbft/version.TMCoreSemVer=$(TM_VERSION)

ifeq (cleveldb,$(findstring cleveldb,$(CURIUM_BUILD_OPTIONS)))
  ldflags += -X github.com/cosmos/cosmos-sdk/types.DBBackend=cleveldb
endif
ifeq ($(LINK_STATICALLY),true)
  ldflags += -linkmode=external -extldflags "-Wl,-z,muldefs -static"
endif
ifeq (,$(findstring nostrip,$(CURIUM_BUILD_OPTIONS)))
  ldflags += -w -s
endif
ldflags += $(LDFLAGS)
ldflags := $(strip $(ldflags))

BUILD_FLAGS := -tags "$(build_tags)" -ldflags '$(ldflags)'
# check for nostrip option
ifeq (,$(findstring nostrip,$(CURIUM_BUILD_OPTIONS)))
  BUILD_FLAGS += -trimpath
endif

#$(info $$branch_FLAGS is [$(BUILD_FLAGS)])


all: install

install: go.sum
	go install -mod=readonly $(BUILD_FLAGS) ./cmd/curiumd

build:
	GOOS=linux GOARCH=amd64 go build $(BUILD_FLAGS) -o bin/curiumd ./cmd/curiumd

debug-build:
	@echo "Building debug version with debug symbols..."
	GOOS=linux GOARCH=amd64 go build -gcflags "all=-N -l" -tags "$(build_tags)" -ldflags '$(subst -w -s,,$(ldflags))' -o bin/curiumd ./cmd/curiumd

###############################################################################
###                                  Proto                                  ###
###############################################################################

protoVer=v0.7
protoImageName=tendermintdev/sdk-proto-gen:$(protoVer)
containerProtoGen=curium-proto-gen-$(protoVer)

# Proto include paths
COSMOS_SDK_DIR := $(shell go list -m -f '{{.Dir}}' github.com/cosmos/cosmos-sdk)
GOGOPROTO_DIR := $(shell go list -m -f '{{.Dir}}' github.com/cosmos/gogoproto)
COSMOS_API_DIR := $(shell go list -m -f '{{.Dir}}' cosmossdk.io/api)
COSMOS_PROTO_DIR := $(shell go list -m -f '{{.Dir}}' github.com/cosmos/cosmos-proto 2>/dev/null || echo "")
GRPC_GATEWAY_DIR := $(shell go list -m -f '{{.Dir}}' github.com/grpc-ecosystem/grpc-gateway 2>/dev/null || echo "")

# Get all module names from proto directory
PROTO_MODULES := $(shell find proto -mindepth 1 -maxdepth 1 -type d -not -name '.*' -exec basename {} \;)

proto-gen:
	@echo "Generating Protobuf files"
	@if docker ps -a --format '{{.Names}}' | grep -Eq "^${containerProtoGen}$$"; then docker start -a $(containerProtoGen); else docker run --name $(containerProtoGen) -v $(CURDIR):/workspace --workdir /workspace $(protoImageName) \
		sh ./scripts/protocgen.sh; fi

proto-gen-protoc:
	@echo "Generating Protobuf files using protoc"
	@if [ -z "$(COSMOS_SDK_DIR)" ]; then \
		echo "Error: cosmos-sdk not found. Run 'go mod download' first."; \
		exit 1; \
	fi
	@echo "Ensuring protoc plugins are available..."
	@mkdir -p $(CURDIR)/bin
	@if [ ! -f "$(CURDIR)/bin/protoc-gen-gocosmos" ]; then \
		if [ -f "$(shell go env GOPATH)/bin/protoc-gen-gocosmos" ]; then \
			echo "Linking protoc-gen-gocosmos from GOPATH..."; \
			ln -sf "$(shell go env GOPATH)/bin/protoc-gen-gocosmos" $(CURDIR)/bin/protoc-gen-gocosmos; \
		else \
			echo "Building protoc-gen-gocosmos..."; \
			go build -o $(CURDIR)/bin/protoc-gen-gocosmos github.com/cosmos/gogoproto/protoc-gen-gocosmos || \
			(echo "Error: Failed to build protoc-gen-gocosmos. Please install it manually:"; \
			 echo "  go install github.com/cosmos/gogoproto/protoc-gen-gocosmos@latest"; \
			 exit 1); \
		fi; \
	fi
	@if [ ! -f "$(CURDIR)/bin/protoc-gen-grpc-gateway" ]; then \
		if [ -f "$(shell go env GOPATH)/bin/protoc-gen-grpc-gateway" ]; then \
			echo "Linking protoc-gen-grpc-gateway from GOPATH..."; \
			ln -sf "$(shell go env GOPATH)/bin/protoc-gen-grpc-gateway" $(CURDIR)/bin/protoc-gen-grpc-gateway; \
		else \
			echo "Building protoc-gen-grpc-gateway..."; \
			TMP_CACHE=$$(mktemp -d); \
			GOMODCACHE=$$TMP_CACHE GOTMPDIR=/tmp go build -o $(CURDIR)/bin/protoc-gen-grpc-gateway github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway 2>/dev/null; \
			BUILD_EXIT=$$?; \
			rm -rf $$TMP_CACHE; \
			if [ $$BUILD_EXIT -ne 0 ]; then \
				echo "Error: Failed to build protoc-gen-grpc-gateway."; \
				echo "Please install it manually:"; \
				echo "  go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@v1.16.0"; \
				echo "Or fix Go module cache permissions (currently owned by root)."; \
				exit 1; \
			fi; \
		fi; \
	fi
	@export PATH="$(CURDIR)/bin:$$PATH:$(shell go env GOPATH)/bin"; \
	for module in $(PROTO_MODULES); do \
		echo "Generating proto files for module: $$module"; \
		MODULE_DIR="proto/$$module"; \
		OUTPUT_DIR="x/$$module/types"; \
		if [ ! -d "$$MODULE_DIR" ]; then \
			echo "Warning: Directory $$MODULE_DIR does not exist, skipping..."; \
			continue; \
		fi; \
		mkdir -p $$OUTPUT_DIR; \
		PROTO_FILES=$$(find $$MODULE_DIR -name "*.proto" -type f); \
		if [ -z "$$PROTO_FILES" ]; then \
			echo "Warning: No proto files found in $$MODULE_DIR, skipping..."; \
			continue; \
		fi; \
		INCLUDE_PATHS="-Iproto -I$(COSMOS_SDK_DIR)/proto"; \
		if [ -n "$(GOGOPROTO_DIR)" ]; then \
			INCLUDE_PATHS="$$INCLUDE_PATHS -I$(GOGOPROTO_DIR)"; \
		fi; \
		if [ -n "$(COSMOS_API_DIR)" ]; then \
			INCLUDE_PATHS="$$INCLUDE_PATHS -I$(COSMOS_API_DIR)"; \
		fi; \
		if [ -n "$(COSMOS_PROTO_DIR)" ]; then \
			INCLUDE_PATHS="$$INCLUDE_PATHS -I$(COSMOS_PROTO_DIR)/proto"; \
		fi; \
		if [ -n "$(GRPC_GATEWAY_DIR)" ]; then \
			INCLUDE_PATHS="$$INCLUDE_PATHS -I$(GRPC_GATEWAY_DIR)/third_party/googleapis"; \
		fi; \
		TEMP_OUTPUT=".proto-temp-$$module"; \
		mkdir -p $$TEMP_OUTPUT; \
		PATH="$(CURDIR)/bin:$$PATH:$(shell go env GOPATH)/bin" protoc $$INCLUDE_PATHS \
			--gocosmos_out=plugins=grpc,Mgoogle/protobuf/any.proto=github.com/cosmos/cosmos-sdk/codec/types:$$TEMP_OUTPUT \
			--grpc-gateway_out=logtostderr=true,allow_colon_final_segments=true:$$TEMP_OUTPUT \
			$$PROTO_FILES; \
		PROTOC_EXIT=$$?; \
		if [ $$PROTOC_EXIT -eq 0 ]; then \
			echo "Moving generated files to $$OUTPUT_DIR"; \
			if [ -d "$$TEMP_OUTPUT" ]; then \
				find $$TEMP_OUTPUT -name "*.pb.go" -type f -exec mv {} $$OUTPUT_DIR/ \; 2>/dev/null || true; \
				find $$TEMP_OUTPUT -name "*.pb.gw.go" -type f -exec mv {} $$OUTPUT_DIR/ \; 2>/dev/null || true; \
			fi; \
			rm -rf $$TEMP_OUTPUT; \
			echo "Successfully generated proto files for $$module"; \
		else \
			rm -rf $$TEMP_OUTPUT; \
			echo "Error generating proto files for $$module"; \
			exit 1; \
		fi; \
	done
	@echo "Proto generation complete!"
