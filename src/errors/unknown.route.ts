import {BadRequest} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class UnknownRoutePassedError extends BadRequest implements ResponseErrorObject {
    constructor() {
        super('Unknown’s route passed.');

        this.body = {
            code: 3,
            message: 'Unknown’s route passed.',
            description: 'Check route list.',
        };
    }
}
