import {Forbidden} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class ApplicationDisabledError extends Forbidden implements ResponseErrorObject {
    constructor() {
        super('Application is disabled.');

        this.body = {
            code: 2,
            message: 'Application is disabled.',
            description: 'Contact support.',
        };
    }
}
