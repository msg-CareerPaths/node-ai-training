import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseEntities } from './entities/database-entities';
import {
    DevelopmentMigrations,
    ProductionMigrations
} from './migrations/migrations';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const isProd = process.env.NODE_ENV === 'production';

                Logger.log(
                    `Running migrations for ${isProd ? 'prod' : 'dev'} env`,
                    'DataSourceFactory'
                );

                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [...DatabaseEntities],
                    migrations: isProd
                        ? ProductionMigrations
                        : DevelopmentMigrations,
                    migrationsRun: true,
                    synchronize: false
                };
            },
            inject: [ConfigService]
        })
    ]
})
export class CoreModule {}
