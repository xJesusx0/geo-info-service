# Documentación de la API - Rutas de Ciudades

Este documento detalla los endpoints de la API relacionados con las ciudades.

## Endpoints

### Obtener Todas las Ciudades

Recupera una lista de todas las ciudades disponibles en la base de datos.

- **URL**: `/api/v1/cities`
- **Método**: `GET`
- **Parámetros de URL**: Ninguno
- **Parámetros de Query**: Ninguno
- **Cuerpo de la Solicitud**: Ninguno

#### Respuesta Exitosa (Código 200)

Retorna un array de objetos de ciudad.

**Ejemplo de Respuesta:**

```json
[
  {
    "id": 898,
    "name": "SANTO TOMAS",
    "dane_code": "685",
    "department_id": 5,
    "country_id": 48,
    "active": true,
    "created_at": "2025-10-24T13:50:50.892312+00:00",
    "updated_at": "2025-10-24T13:50:50.892312+00:00"
  },
  {
    "id": 930,
    "name": "SOLEDAD",
    "dane_code": "758",
    "department_id": 5,
    "country_id": 48,
    "active": true,
    "created_at": "2025-10-24T13:50:50.892312+00:00",
    "updated_at": "2025-10-24T13:50:50.892312+00:00"
  }
]
```

#### Respuesta de Error

En caso de un error en el servidor, se retornará un código de estado 500 con un mensaje de error.
