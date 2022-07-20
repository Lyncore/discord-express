import {Forbidden} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class InstitutionFailedError extends Forbidden implements ResponseErrorObject {
    constructor() {
        super('Institution not selected.');

        this.body = {
            code: 12,
            message: 'Institution not selected.',
            description: 'That method requires institution to be selected.',
        };
    }
}
