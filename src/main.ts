import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({
      // driver: 'in-memory',
      driver: 'orm',
    }),
  );
  await app.listen(3000);
}
bootstrap();
