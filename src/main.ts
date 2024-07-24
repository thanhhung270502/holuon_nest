import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    process.env.TZ = 'ETC/Universal';
    app.enableCors();
    //const swaggerSpecJson = JSON.parse(fs.readFileSync('../swagger-spec.json', 'utf-8'));
    const options = new DocumentBuilder().setTitle('Title').setDescription('description').setVersion('1.0').build();
    //const document = SwaggerModule.createDocument(app, options, {
    //    include: swaggerSpecJson,
    //});
    const document = SwaggerModule.createDocument(app, options);

    fs.writeFileSync('/tmp/swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
