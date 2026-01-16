import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntSerializeInterceptor } from './common/interceptors/bigint-serialize.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Next.js default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global interceptor to serialize BigInt values to strings
  app.useGlobalInterceptors(new BigIntSerializeInterceptor());

  // Serve static files from public/uploads
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/',
  });

  // Set global prefix
  //app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3002);
  console.log(`Backend running on port ${process.env.PORT ?? 3002}`);
  console.log(`Serving static files from: ${join(process.cwd(), 'public')}`);
}
bootstrap();
