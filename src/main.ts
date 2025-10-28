import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { instance } from "@/logger/winston.logger";
import { WinstonModule } from "nest-winston";
import { setupSwagger } from "@/config/swagger.config";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const document = setupSwagger(app);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(process.env.API_PORT!);
}
bootstrap();
