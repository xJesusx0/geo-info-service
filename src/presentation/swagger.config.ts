import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../core/env';
import { url } from 'inspector';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Geo Info Service API',
      version: '1.0.0',
      description:
        'API REST para consultar información geográfica sobre ciudades, barrios, países y departamentos',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://geo-info-service.vercel.app',
        description: 'Servidor de producción',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Endpoints de salud del servicio',
      },
      {
        name: 'Cities',
        description: 'Endpoints relacionados con ciudades',
      },
      {
        name: 'Neighborhoods',
        description: 'Endpoints relacionados con barrios',
      },
      {
        name: 'Countries',
        description: 'Endpoints relacionados con países',
      },
      {
        name: 'Departments',
        description: 'Endpoints relacionados con departamentos',
      },
    ],
    components: {
      schemas: {
        City: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único de la ciudad',
              example: 898,
            },
            name: {
              type: 'string',
              description: 'Nombre de la ciudad',
              example: 'SANTO TOMAS',
            },
            dane_code: {
              type: 'string',
              nullable: true,
              description: 'Código DANE de la ciudad',
              example: '685',
            },
            department_id: {
              type: 'integer',
              description: 'ID del departamento al que pertenece',
              example: 5,
            },
            country_id: {
              type: 'integer',
              description: 'ID del país al que pertenece',
              example: 48,
            },
            active: {
              type: 'boolean',
              description: 'Indica si la ciudad está activa',
              example: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        CityWithRelations: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 898,
            },
            name: {
              type: 'string',
              example: 'SANTO TOMAS',
            },
            dane_code: {
              type: 'string',
              nullable: true,
              example: '685',
            },
            department_id: {
              type: 'integer',
              example: 5,
            },
            country_id: {
              type: 'integer',
              example: 48,
            },
            active: {
              type: 'boolean',
              example: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
            country_name_es: {
              type: 'string',
              description: 'Nombre del país en español',
              example: 'Colombia',
            },
            department_name: {
              type: 'string',
              description: 'Nombre del departamento',
              example: 'Atlántico',
            },
          },
        },
        Country: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del país',
              example: 48,
            },
            name_es: {
              type: 'string',
              description: 'Nombre del país en español',
              example: 'Colombia',
            },
            name_en: {
              type: 'string',
              nullable: true,
              description: 'Nombre del país en inglés',
              example: 'Colombia',
            },
            iso_alpha2_code: {
              type: 'string',
              nullable: true,
              description: 'Código ISO Alpha-2',
              example: 'CO',
            },
            iso_alpha3_code: {
              type: 'string',
              nullable: true,
              description: 'Código ISO Alpha-3',
              example: 'COL',
            },
            iso_numeric_code: {
              type: 'string',
              nullable: true,
              description: 'Código ISO numérico',
              example: '170',
            },
            active: {
              type: 'boolean',
              description: 'Indica si el país está activo',
              example: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Department: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del departamento',
              example: 5,
            },
            name: {
              type: 'string',
              description: 'Nombre del departamento',
              example: 'Atlántico',
            },
            dane_code: {
              type: 'string',
              nullable: true,
              description: 'Código DANE del departamento',
              example: '08',
            },
            country_id: {
              type: 'integer',
              description: 'ID del país al que pertenece',
              example: 48,
            },
            active: {
              type: 'boolean',
              description: 'Indica si el departamento está activo',
              example: true,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        NeighborhoodByPoint: {
          type: 'object',
          properties: {
            neighborhood_id: {
              type: 'integer',
              description: 'ID del barrio',
            },
            neighborhood_name: {
              type: 'string',
              description: 'Nombre del barrio',
            },
            city_id: {
              type: 'integer',
              description: 'ID de la ciudad',
            },
            city_name: {
              type: 'string',
              description: 'Nombre de la ciudad',
            },
            department_id: {
              type: 'integer',
              description: 'ID del departamento',
            },
            department_name: {
              type: 'string',
              description: 'Nombre del departamento',
            },
            country_id: {
              type: 'integer',
              description: 'ID del país',
            },
            country_name: {
              type: 'string',
              description: 'Nombre del país',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'City not found',
            },
          },
        },
      },
    },
  },
  apis: [
    './src/presentation/routes/*.ts', // Rutas de la API
    './src/index.ts', // Endpoint raíz
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
