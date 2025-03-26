import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('port') || 3000;
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(express.json());

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
