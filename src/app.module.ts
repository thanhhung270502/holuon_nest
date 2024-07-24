import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local', '.env.development', '.env'],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_LOCAL_HOST,
            port: +process.env.POSTGRES_LOCAL_PORT,
            username: process.env.POSTGRES_LOCAL_USER,
            password: process.env.POSTGRES_LOCAL_PASSWORD,
            database: process.env.POSTGRES_LOCAL_DB,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
