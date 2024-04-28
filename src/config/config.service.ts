import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  CONFIG_PROPERTY_NAME,
  MIGRATIONS_PATH,
  MIGRATIONS_TABLE_NAME,
  RETRY_ATTEMPTS,
  RETRY_DELAY,
} from './config.constants';
import { UserEntity } from 'src/model/user.entity';
import { TaskEntity } from 'src/model/task.entity';
import { NoteModule } from 'src/controllers/note/note.module';
import { SpaceEntity } from 'src/model/space.entity';
import { TaskReccuranceEntity } from 'src/model/task-reccurance.entity';
import { IncomeEntity } from 'src/model/income/income.entity';
import { IncomeTypeEntity } from 'src/model/income/income-type.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue(CONFIG_PROPERTY_NAME.postgresHost),
      port: parseInt(this.getValue(CONFIG_PROPERTY_NAME.postgresPort)),
      username: this.getValue(CONFIG_PROPERTY_NAME.postgresUser),
      password: this.getValue(CONFIG_PROPERTY_NAME.postgresPassword),
      database: this.getValue(CONFIG_PROPERTY_NAME.postgresDatabase),
      entities: [
        UserEntity,
        TaskEntity,
        TaskReccuranceEntity,
        NoteModule,
        SpaceEntity,
        IncomeEntity,
        IncomeTypeEntity,
      ], //`${ENTITY_PATH}/**/*.entity{.ts,.js}` //join(__dirname + '**' + '*.entity{.ts, .js}')
      migrationsTableName: MIGRATIONS_TABLE_NAME,
      migrations: [`${MIGRATIONS_PATH}/*.ts`],
      ssl: this.isProduction(),
      retryAttempts: RETRY_ATTEMPTS,
      retryDelay: RETRY_DELAY,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  CONFIG_PROPERTY_NAME.postgresHost,
  CONFIG_PROPERTY_NAME.postgresPort,
  CONFIG_PROPERTY_NAME.postgresUser,
  CONFIG_PROPERTY_NAME.postgresPassword,
  CONFIG_PROPERTY_NAME.postgresDatabase,
]);

export { configService };
