import 'reflect-metadata';
import express from 'express';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import swaggerUi from 'swagger-ui-express';
import { initializeDatabase } from './config/database';
import { CourseController } from './presentation/controllers/CourseController';
import { setupDependencyInjection } from './config/dependencyInjection';
import { generateSwaggerSpec } from './config/swagger';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = express();
  app.use(express.json());

  await initializeDatabase();

  // Set up dependency injection
  useContainer(Container);
  setupDependencyInjection();

  // Set up routing-controllers
  useExpressServer(app, {
    controllers: [CourseController],
    validation: true,
  });

  // Generate OpenAPI spec
  const spec = generateSwaggerSpec();

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
}

bootstrap().catch(console.error);