import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: setUpGlobalMiddleware
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());

  // TODO: setUpBasicAuth

  // TODO: setUpOpenAPIMiddleware
  const config = new DocumentBuilder()
    .setTitle('for-druid-server')
    .setDescription('드루이드 다이어리 API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // TODO: run server
  const port = process.env.PORT;

  await app
    .listen(port)
    .then(() => {
      console.log(
        `✅ Server on http://localhost:${port}\nstartDate: ${new Date().toISOString()}`,
      );
    })
    .catch((error) => {
      console.error(`🆘 Server error ${error}`);
    });
}
bootstrap();
