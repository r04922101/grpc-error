// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var helloworld_pb = require('./helloworld_pb.js');

function serialize_pb_HelloRequest(arg) {
  if (!(arg instanceof helloworld_pb.HelloRequest)) {
    throw new Error('Expected argument of type pb.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_HelloRequest(buffer_arg) {
  return helloworld_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pb_HelloResponse(arg) {
  if (!(arg instanceof helloworld_pb.HelloResponse)) {
    throw new Error('Expected argument of type pb.HelloResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pb_HelloResponse(buffer_arg) {
  return helloworld_pb.HelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloWorldService = exports.HelloWorldService = {
  sayHello: {
    path: '/pb.HelloWorld/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: helloworld_pb.HelloRequest,
    responseType: helloworld_pb.HelloResponse,
    requestSerialize: serialize_pb_HelloRequest,
    requestDeserialize: deserialize_pb_HelloRequest,
    responseSerialize: serialize_pb_HelloResponse,
    responseDeserialize: deserialize_pb_HelloResponse,
  },
};

exports.HelloWorldClient = grpc.makeGenericClientConstructor(HelloWorldService);
