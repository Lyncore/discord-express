import {BadRequest} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class InvalidRequestError extends BadRequest implements ResponseErrorObject {
    constructor() {
        super('Invalid request.');

        this.body = {
            code: 6,
            message: 'Invalid request.',
            description: 'Check the request syntax.',
        };
    }
}
