import {IMiddleware, Middleware, Res} from '@tsed/common';
import {Response} from 'express';

import {UnknownRoutePassedError} from '@/errors';

/**
 * Intermediate handler that catch unknown requests and output an error.
 */
@Middleware()
export class NotFoundMiddleware implements IMiddleware {
    use(
        @Res()
        response: Response,
    ): void {
        response.status(404).json({
            status: false,
            error: new UnknownRoutePassedError().body,
        });
    }
}
