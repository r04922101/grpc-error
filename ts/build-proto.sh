#!/bin/bash

base_dir=$(dirname "$0")
proto_out=./src/pb/dist
rm -rf ${proto_out}
mkdir -p ${proto_out}

# JavaScript code generation
yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${proto_out} \
    --js_out=import_style=commonjs,binary:${proto_out} \
    --grpc_out=grpc_js:${proto_out} \
    -I ./src/pb \
    ./src/pb/*.proto
