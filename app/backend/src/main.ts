import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT ?? 3000;
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors({ origin: '*' });

    const config = new DocumentBuilder()
        .setTitle('LLM Shop API')
        .setDescription('Backend API for the LLM training shop example')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(globalPrefix, app, document);

    await app.listen(port);
    Logger.log(
        `Application is running at: \n REST: http://localhost:${port}/${globalPrefix} \n WSS: ws://localhost:${port}/ws`
    );
}
bootstrap()
    .then(() => console.info(`Server is running`))
    .catch(console.error);
