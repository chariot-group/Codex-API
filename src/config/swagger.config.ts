import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Codex API")
  .setDescription("Codex API Documentation")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

export function setupSwagger(app: INestApplication) {
  return SwaggerModule.createDocument(app, swaggerConfig);
}
