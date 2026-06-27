import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { API_PREFIX, APP_DESCRIPTION, APP_NAME } from "@saligan/shared";

import { AppModule } from "./app.module.js";

function parseCorsOrigins(value: string | undefined) {
  return (value ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export async function createApplication(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.setGlobalPrefix(API_PREFIX.replace(/^\//, ""));
  app.enableCors({
    credentials: true,
    origin: parseCorsOrigins(process.env.CORS_ORIGINS),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${APP_NAME} API`)
    .setDescription(APP_DESCRIPTION)
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  return app;
}
