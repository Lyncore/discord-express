import {BadRequest} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class InvalidParamsError extends BadRequest implements ResponseErrorObject {
    constructor(param: string) {
        super('One of the parameters specified was missed or invalid.');

        this.body = {
            code: 11,
            message: `One of the parameters specified was missed or invalid: ${param}`,
            description: 'Check specified params.',
        };
    }
}
