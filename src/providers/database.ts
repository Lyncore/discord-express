// import { Application, AuthModel, Session, Token } from '@/models';
import { $log } from '@tsed/common';
import {Configuration, registerProvider} from '@tsed/di';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
// import {$log} from '@tsed/common';
// import {getPermissionSectionTypeObject, PermissionSectionType} from '@/enums';

export const DATABASE_CONNECTION = Symbol.for('DATABASE_CONNECTION');

registerProvider({
    provide: DATABASE_CONNECTION,
    deps: [Configuration],
    useAsyncFactory: async (configuration: Configuration): Promise<Sequelize> => {
        const client = new Sequelize(configuration.get<SequelizeOptions>('sequelize'));
        
        // models
       /* client.addModels([
         Application,
         AuthModel,
         Session,
         Token
       ]); */

       await client.sync();
        /*
    const baseRole = await Role.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        id: 1,
        name: 'Разработчик',
        priority: 99,
      },
    }).then(async ([role, created]) => {
      if (created) {
        await Promise.all(
          [].concat(
            Object.keys(PermissionSectionType).map(sectionKey => {
              const section = getPermissionSectionTypeObject(PermissionSectionType[sectionKey]);

              return section.types.map(async typeKey => {
                Permission.create({
                  roleId: role.id,
                  permission: `${sectionKey}-${typeKey.type.toString()}`,
                });
              });
            }),
          ),
        );
      }

      return role;
    });

    const baseAccount = await AuthModel.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        id: 1,
        name: 'ADMIN',
      },
    }).then(async ([account, created]) => {
      if (created) {
        
      }
      return account;
    });$log.info(`[Base account] Token: "${baseAccount.name}"`);
*/
   /* const [baseApplication] = await Application.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        id: 1,
        name: 'GENERAL',
        creatorId: 1,// baseAccount.id,
        active: true,
      },
    }); */

   // $log.info(`[Base application] Token: "${baseApplication.token}" | Secret: "${baseApplication.secret}"`);
    // $log.info(`[Base account] Token: "${baseAccount.token}"`);


        return client;
    },
});
