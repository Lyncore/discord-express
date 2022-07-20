import {NotFound} from 'ts-httpexceptions';
import {ResponseErrorObject} from '@tsed/common';

export class SpecifiedEntityNotFoundError extends NotFound implements ResponseErrorObject {
    constructor(entity: string) {
        super(`${entity} not found.`);

        this.body = {
            code: 9,
            message: `${entity} not found.`,
            description: 'Check requested params.',
        };
    }
}
