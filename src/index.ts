import {PlatformExpress} from '@tsed/platform-express';
import {ExpressServer} from '@/server';

(async (): Promise<void> => {
    PlatformExpress.bootstrap(ExpressServer).then(server => server.listen());
})();
