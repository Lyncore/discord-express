import {Conflict} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class SpecifiedEntityExistsError extends Conflict implements ResponseErrorObject {
    constructor(entity: string) {
        super(`${entity} already exists.`);

        this.body = {
            code: 10,
            message: `${entity} already exists.`,
            description: 'Check requested params.',
        };
    }
}
