import * as grpc from '@grpc/grpc-js';
import { get, isEmpty } from 'lodash';

import * as errorDetails from './pb/dist/error_details_pb';
import { Status } from './pb/dist/status_pb';

type ErrorDetail = errorDetails.BadRequest &
  errorDetails.DebugInfo &
  errorDetails.ErrorInfo &
  errorDetails.PreconditionFailure &
  errorDetails.QuotaFailure &
  errorDetails.RequestInfo &
  errorDetails.ResourceInfo &
  errorDetails.RetryInfo;

export class GrpcError extends Error {
  details?: ErrorDetail[];
  code: number;

  constructor(err: grpc.ServiceError) {
    super();
    this.message = err.details;
    this.code = err.code;

    const details = err.metadata.get('grpc-status-details-bin');
    if (!isEmpty(details)) {
      const status = Status.deserializeBinary(err.metadata.get('grpc-status-details-bin')[0] as Buffer);

      const detailsList = status.getDetailsList();
      if (detailsList.length > 0) {
        this.details = [];
      }
      for (const detail of detailsList) {
        const detailType = detail.getTypeName().split('.').slice(-1)[0];
        if (!isEmpty(detailsList)) {
          const detailClass = require('./pb/dist/error_details_pb')[detailType];
          const deserializeBinaryFunc = get(detailClass, 'deserializeBinary');
          this.details.push(deserializeBinaryFunc(detail.getValue_asU8()));
        }
      }
    }
  }
}
