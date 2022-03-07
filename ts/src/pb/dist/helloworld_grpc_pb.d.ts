// package: pb
// file: helloworld.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as helloworld_pb from "./helloworld_pb";

interface IHelloWorldService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IHelloWorldService_ISayHello;
}

interface IHelloWorldService_ISayHello extends grpc.MethodDefinition<helloworld_pb.HelloRequest, helloworld_pb.HelloResponse> {
    path: "/pb.HelloWorld/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<helloworld_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<helloworld_pb.HelloRequest>;
    responseSerialize: grpc.serialize<helloworld_pb.HelloResponse>;
    responseDeserialize: grpc.deserialize<helloworld_pb.HelloResponse>;
}

export const HelloWorldService: IHelloWorldService;

export interface IHelloWorldServer extends grpc.UntypedServiceImplementation {
    sayHello: grpc.handleUnaryCall<helloworld_pb.HelloRequest, helloworld_pb.HelloResponse>;
}

export interface IHelloWorldClient {
    sayHello(request: helloworld_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHello(request: helloworld_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    sayHello(request: helloworld_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}

export class HelloWorldClient extends grpc.Client implements IHelloWorldClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sayHello(request: helloworld_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHello(request: helloworld_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
    public sayHello(request: helloworld_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: helloworld_pb.HelloResponse) => void): grpc.ClientUnaryCall;
}
