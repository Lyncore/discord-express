import {NotFound} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class BadUserError extends NotFound implements ResponseErrorObject {
    constructor() {
        super('User was deleted, banned, deactivated or not activated.');

        this.body = {
            code: 8,
            message: 'User was deleted, banned, deactivated or not activated.',
            description: 'Try appeal at support.',
        };
    }
}
