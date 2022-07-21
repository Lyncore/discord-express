import {$log, Configuration, Inject, PlatformApplication} from '@tsed/common';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';

import '@tsed/ajv';

// import {AccountController,  AuthenticationController,  LocationController, TestController} from '@/controllers';
import {ErrorHandlerMiddleWare, NotFoundMiddleware} from '@/middlewares';

import '@/providers';
//import chalk from 'chalk';
import { BotService} from './services';

const environment: string = (process.env.ENV || 'production').toString().toUpperCase();

@Configuration({
    mount: {
        '/': [
           /* AccountController,
            AuthenticationController,
            TestController,
            LocationController */
        ],
    },
    acceptMimes: ['application/json'],
    logger: {
        disableRoutesSummary: true,
//        format: `${chalk.gray('[')}${chalk.yellow('%p%]')}${chalk.gray(']')} ${chalk.gray('%d{hh:mm:ss} | %m')}`,
        level: 'info',
        logRequest: false,
        logStart: false,
        logEnd: false,
        jsonIndentation: 0,
    },
    httpsPort: false,
    port: 6001,

    validationModelStrict: false,
    ajv: {
        errorFormat: (): string => `AJV_VALIDATION_ERROR`,
        options: {
            verbose: false,
        },
    },
    converter: {
        additionalProperties: 'ignore',
    },
    routers: {
        mergeParams: true,
    },
    sequelize: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        database: process.env.MYSQL_DATABASE,
        dialect: environment === 'TEST' ? 'sqlite' : 'mysql',
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        logging: msg => $log.debug(msg),
    }, 

    bot: {
        px: '/',
        token: process.env.BOT_TOKEN,
        playing: 'help me i am bot'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
})
export class ExpressServer {
    @Inject()
    app: PlatformApplication;

    @Inject()
    musicService: BotService;


    public async $beforeRoutesInit(): Promise<void> {
        this.app
            .use(cors())
            .use(compression())
            .use(bodyParser.json())
            .use(
                bodyParser.urlencoded({
                    extended: true,
                }),
            );

        this.app.raw.set('json replacer', (key, value) => (value === null ? undefined : value));
    }

    public $afterRoutesInit(): void {
        this.app.use(NotFoundMiddleware).use(ErrorHandlerMiddleWare);
    }
}
