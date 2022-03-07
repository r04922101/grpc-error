import { sayHello } from './grpc';
import { GrpcError } from './grpc-error';
import { BadRequest, ErrorInfo } from './pb/dist/error_details_pb';

async function main() {
  try {
    const resp = await sayHello('give me an error');
    console.log('Got response from server', resp);
  } catch (err) {
    const grpcError = err as GrpcError;
    console.error(`An error occured with code ${grpcError.code}, message: ${grpcError.message}`);
    const details = grpcError.details;
    if (!details) {
      return;
    }
    for (const detail of details) {
      if (detail instanceof ErrorInfo) {
        const errorInfo = detail as ErrorInfo;
        console.error('ErrorInfo');
        console.error(`\tReason ${errorInfo.getReason()}`);
      }
      if (detail instanceof BadRequest) {
        const badRequest = detail as BadRequest;
        console.error('BadRequest');
        for (const fieldViolation of badRequest.getFieldViolationsList()) {
          console.error(`\tField: ${fieldViolation.getField()}, description: ${fieldViolation.getDescription()}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error('main error catched: ', err);
});
