import {InternalServerError} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class UnknownOccurredError extends InternalServerError implements ResponseErrorObject {
    constructor() {
        super('Unknown error occurred.');

        this.body = {
            code: 1,
            message: 'Unknown error occurred.',
            description: 'Try again later.',
        };
    }
}
