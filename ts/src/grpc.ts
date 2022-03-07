import * as grpc from '@grpc/grpc-js';

import { HelloWorldClient } from './pb/dist/helloworld_grpc_pb';
import { HelloRequest, HelloResponse } from './pb/dist/helloworld_pb';

export const getHelloWorldClient = (address: string) =>
  new HelloWorldClient(address, grpc.credentials.createInsecure());

export async function sayHello() {
  const serverAddress = 'localhost:3000';
  const client = getHelloWorldClient(serverAddress);
  const helloReq = new HelloRequest();
  helloReq.setMessage('Hello from Typescript');
  return new Promise((resolve, reject) => {
    client.sayHello(helloReq, (err: grpc.ServiceError | null, resp: HelloResponse) => {
      if (err) {
        return reject(err);
      }
      return resolve(resp.toObject());
    });
  });
}
