import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

console.log(process.env.POSTGRES_HOST);

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local', '.env.development', '.env'],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class AppModule {}
