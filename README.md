# grpc-error

## Error Model

As stated in [Google Error Model](https://cloud.google.com/apis/design/errors#error_model), we use a [status](./ts/src/pb/status.proto) data structure to define an error model. \
There are several kind of error codes predefined by Google here: [error codes](https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto). \
We should avoid defining additional error codes, because the more error codes defined, the more logic the developers might need to handle, which would not be a good practice. \
Besides error code, we can also error message to help users understand the error more.
On top of error code and error message, Google also define a set of standard error payloads here: [error details](https://github.com/googleapis/googleapis/blob/master/google/rpc/error_details.proto). \
Error details cover the most common needs for API errors. \
Providing more error details sometimes can help developeres handle the error. \
For example, a `BadRequest` error detail describes that which fields violate the server's request rule.

## [Error Description](https://cloud.google.com/apis/design/errors#handling_errors)

## Problems

1. `@grpc/grpc-js` package type `ServiceError` does NOT really get the error details as defined above.

```javascript
export declare type ServiceError = StatusObject & Error;

export interface StatusObject {
    code: Status;
    details: string;
    metadata: Metadata;
}
```

The `ServiceError.code` is the gRPC error code as we discussed above: `13` \
However, `ServiceError.details` here is just a string, and its value would equals to the error message sent from server: `error message for client` \
While `ServiceError.message` would combine the error code and the error message: `13 INTERNAL: error message for client`

## Solution

The error details information hides in `ServiceError.metadata`. We need to extract the `status error` from metadata,  deserialize, and get details. \
Check [grpc-error.ts](./ts/src/grpc-error.ts).

## Installation

- [Protocol Buffer](https://grpc.io/docs/protoc-installation/)
  - Version: 3.15.8

- Golang
  - Version: 1.17

```sh
cd ./go
# download the modules
go mod download
# compile proto files, and generate go files
./build_proto.sh
```

- Typescript
  - Node version: v14.16.1

```sh
cd ./ts
yarn
# compile proto files, and generate JS/TS files
./build-proto.sh
```

## How to Run

- Start up the Golang gRPC server

```sh
cd ./go/server
go run ./main.go
```

The server is listening on port `3000` by default, and serves as a gRPC server as defined in [helloworld.proto](./go/pb/helloworld.proto). \
When the request message is `"give me an error"`, the server will respond an error with code `13`, which is `Internal error`, message `"error message for client"`, and error details. \
Otherwise, the server will respond a message `"Hello, World"` to client.

- Run gRPC Typescript client

```sh
cd ./ts
yarn dev
```

The client sends a request with message `"give me an error"` to the gRPC server as an example to show how we deal with gRPC status detailed error. \
We can see the output logs from client program as below:

```sh
grpc package ServiceError code: "13", details: "error message for client", message: "13 INTERNAL: error message for client"
An error occured with code 13, message: error message for client
ErrorInfo
        Reason: error detail error info: error occurs as client requested
BadRequest
        Field: error detail bad request: bad request field, description: error detail bad request: bad request field description
```

## References

1. [Errors | Cloud APIs | Google Cloud](https://cloud.google.com/apis/design/errors)
