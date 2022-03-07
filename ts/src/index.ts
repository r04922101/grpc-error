import { sayHello } from './grpc';
import { GrpcError } from './grpc-error';
import { BadRequest, ErrorInfo } from './pb/dist/error_details_pb';

async function main() {
  try {
    const resp = await sayHello('give me an error');
    console.log('Got response from server', resp);
  } catch (err) {
    const grpcError = err as GrpcError;
    for (const detail of grpcError.details) {
      if (detail instanceof ErrorInfo) {
        const errorInfo = detail as ErrorInfo;
        console.error('ErrorInfo');
        console.error(`\tReason ${errorInfo.getReason()}`);
      }
      if (detail instanceof BadRequest) {
        const badRequest = detail as BadRequest;
        console.error('BadRequest');
        for (const fieldViolation of badRequest.getFieldViolationsList()) {
          console.error(`\tField:${fieldViolation.getField()}, description: ${fieldViolation.getDescription()}`);
        }
      }
    }
  }
}

main()
  .then(() => {
    console.log('main finished');
  })
  .catch((err) => {
    console.error('main error catched: ', err);
  });
