# Geo Info Service

Este proyecto es un servicio de información geográfica (Geo Info Service) diseñado para exponer una API REST que proporciona datos sobre ubicaciones geográficas, como ciudades.

## Descripción del Proyecto

El servicio está construido con Node.js y utiliza Express.js como framework web. La información geográfica se almacena y se consulta desde una base de datos de Supabase. El proyecto sigue una arquitectura limpia, separando las preocupaciones en las siguientes capas:

- **Presentation**: Contiene los controladores y las rutas de Express, responsables de manejar las solicitudes HTTP.
- **Application**: Orquesta los casos de uso de la aplicación, actuando como un puente entre la capa de presentación y la de dominio.
- **Domain**: Define las entidades y las interfaces de los repositorios, representando el núcleo del negocio.
- **Infrastructure**: Implementa los repositorios y los servicios externos, como la conexión a la base de datos de Supabase.

## Tecnologías

- **Node.js**: Entorno de ejecución de JavaScript.
- **Bun**: Toolkit de JavaScript todo en uno, utilizado para ejecutar el proyecto.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Express.js**: Framework web para construir la API REST.
- **Supabase**: Plataforma de base de datos utilizada como backend.
- **Dotenv**: Para la gestión de variables de entorno.

## Cómo Empezar

### Prerrequisitos

Asegúrate de tener [Bun](https://bun.sh/) instalado en tu máquina.

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/xJesusx0/geo-info-service.git
    ```
2.  Instala las dependencias:
    ```bash
    bun install
    ```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno necesarias para la conexión con Supabase:

```
SUPABASE_URL=URL_DE_TU_PROYECTO_SUPABASE
SUPABASE_KEY=TU_API_KEY_DE_SUPABASE
PORT=3000
```

### Ejecución

Para iniciar el servidor en modo de desarrollo con recarga en caliente, ejecuta:

```bash
bun run dev
```

El servidor se iniciará en el puerto especificado en tu archivo `.env` (por defecto, el puerto 3000).
