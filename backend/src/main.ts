import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.setGlobalPrefix('api');
    
    const configService = app.get(ConfigService);
    
    app.enableCors({
        origin: configService.getOrThrow<string>('FRONTEND_URL'),
        methods: ['GET'],
        credentials: true,
    })
    
    await app.listen(configService.getOrThrow<number>('PORT') ?? 3000);
}
bootstrap();
