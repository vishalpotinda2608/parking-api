import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroservice, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

async function bootstrap() {
  // AppModule to Microservice port conncetion
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    Option: {
      // port from microservice
      port: 3010,
    },
  });

  // port for post-office from api
  await app.listen(3000);
}
bootstrap();
