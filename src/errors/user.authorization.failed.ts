import {Unauthorized} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class UserAuthorizationFailedError extends Unauthorized implements ResponseErrorObject {
    constructor() {
        super('User authorization failed.');

        this.body = {
            code: 4,
            message: 'User authorization failed.',
            description: 'Bad credentials.',
        };
    }
}
