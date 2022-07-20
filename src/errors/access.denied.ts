import {Unauthorized} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class AccessDeniedError extends Unauthorized implements ResponseErrorObject {
    constructor() {
        super('Access denied.');

        this.body = {
            code: 5,
            message: 'Access denied.',
            description: 'Make sure that you have access to request resources.',
        };
    }
}
