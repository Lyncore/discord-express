import {Err, GlobalErrorHandlerMiddleware, IMiddleware, OverrideProvider, Res} from '@tsed/common';

import {InvalidParamsError, InvalidRequestError, UnknownOccurredError} from '@/errors';

/**
 * Intermediate handler that format the error output.
 */
@OverrideProvider(GlobalErrorHandlerMiddleware)
export class ErrorHandlerMiddleWare implements IMiddleware {
    async use(@Err() error: any, @Res() response: Res): Promise<any> {
        console.log(error);

        if (response.headersSent) {
            return {};
        }

        const errorObject = error.origin || error;

        // AJV Parser error
        if (errorObject.errors && errorObject.errors.length > 0 && errorObject.errors[0].params) {
            const property = errorObject.errors[0].params.missingProperty || '';
            const newError = new InvalidParamsError(property);

            return response.status(newError.status).json({
                status: false,
                error: newError.body,
            });
        }

        if (error.body) {
            // JSON parse failed
            if (error.body.type === 'entity.parse.failed') {
                return response.status(error.status).json({
                    status: false,
                    error: new InvalidRequestError().body,
                });
            }

            return response.status(error.status).json({
                status: false,
                error: error.body,
            });
        }

        return response.status(500).json({
            status: false,
            error: new UnknownOccurredError().body,
        });
    }
}
