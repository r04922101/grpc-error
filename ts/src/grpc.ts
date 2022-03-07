import * as grpc from '@grpc/grpc-js';

import { GrpcError } from './grpc-error';
import { HelloWorldClient } from './pb/dist/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from './pb/dist/helloworld_pb';

export const getHelloWorldClient = (address: string) =>
  new HelloWorldClient(address, grpc.credentials.createInsecure());

export async function sayHello(message: string) {
  const serverAddress = 'localhost:3000';
  const client = getHelloWorldClient(serverAddress);
  const helloReq = new HelloRequest();
  helloReq.setMessage(message);
  return new Promise((resolve, reject) => {
    client.sayHello(helloReq, (err: grpc.ServiceError | null, resp: HelloResponse) => {
      if (err) {
        return reject(new GrpcError(err));
      }
      return resolve(resp.toObject());
    });
  });
}
