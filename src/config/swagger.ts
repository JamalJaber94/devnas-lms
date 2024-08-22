import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

const { defaultMetadataStorage } = require('class-transformer/cjs/storage')

export function generateSwaggerSpec() {
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  })

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, {} as any, {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    info: {
      title: 'DevNas LMS API',
      version: '1.0.0',
      description: 'API documentation for DevNas Learning Management System',
    },
  } as any); // Use 'as any' to bypass type checking

  return spec;
}