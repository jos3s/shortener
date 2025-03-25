import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { otelSDK } from './infrastructure/telemetry/tracing';

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Shortener example')
    .setDescription(
      'Com o Shortener você vai poder criar versões encurtadas de qualquer link sem precisar de contas, mas se decidir criar poderá visualizar, editar e remover os seus links encurtados.',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
