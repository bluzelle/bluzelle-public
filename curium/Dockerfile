FROM golang:1.22 AS build-env
MAINTAINER support@bluzelle.com

ARG target
ARG branch

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux

# Set working directory for the build
WORKDIR /go/src/github.com


# Build
RUN apt-get update -y
RUN apt-get install -y git bash gcc curl

# RUN git clone https://github.com/bluzelle/bluzelle-public.git bluzelle
COPY ./ /go/src/github.com/bluzelle/curium

WORKDIR /go/src/github.com/bluzelle/curium

# RUN git checkout $build

# Temporarily changed to install a specific earlier version of ignite, until curium is upgraded to use the latest version
#RUN curl https://get.ignite.com/cli! | bash
#RUN ignite doctor
RUN curl https://get.ignite.com/cli@v0.27.2! | bash
RUN ignite chain build

#RUN go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
RUN go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@v1.4.0

RUN make install
RUN make build
RUN curiumd version

# Final image
FROM ubuntu

WORKDIR /root

ENV DAEMON_NAME=curiumd
ENV DAEMON_HOME=/root/.curium
ENV DAEMON_ALLOW_DOWNLOAD_BINARIES=false

RUN apt-get update -y
RUN apt-get install -y git curl vim jq nano net-tools htop

# Copy over binaries from the build-env
COPY --from=build-env /go/bin/curiumd /usr/local/bin
COPY --from=build-env /go/bin/cosmovisor /usr/local/bin

RUN mkdir -p /root/.curium/cosmovisor/genesis/bin
RUN mkdir -p /root/.curium/cosmovisor/upgrades
COPY --from=build-env /go/bin/curiumd .curium/cosmovisor/genesis/bin

RUN cosmovisor init /usr/local/bin/curiumd

ENV PATH="/root/.curium/cosmovisor/current/bin:$PATH"

COPY start.sh .

RUN chmod +x ./start.sh

ENTRYPOINT ./start.sh
