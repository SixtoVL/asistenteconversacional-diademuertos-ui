# SPEC — Estándar Frontend: React + TypeScript + CSS Modules

**Versión:** 1.1  
**Estado:** Especificación técnica general  
**Ecosistema:** React + TypeScript + CSS Modules + Vite  

---

## 1. Descripción General

Definir los estándares de arquitectura, organización de archivos, gestión de estado y buenas prácticas de desarrollo para aplicaciones web construidas con React, TypeScript y CSS Modules.

Esta especificación es agnóstica al dominio de negocio y está diseñada para garantizar mantenibilidad, escalabilidad, consistencia de estilos y seguridad de tipos en proyectos de mediano a largo plazo, priorizando un flujo de trabajo ágil y pragmático sin sobrecarga de testing automatizado.

---

## 2. Principios de Diseño

1. **Modelado por Funcionalidades (Feature-First):** Agrupar componentes y lógica según el dominio funcional en módulos independientes.
2. **Componentes Puros e Idiomáticos:** Separar la presentación de la lógica de negocio mediante Custom Hooks.
3. **Tipado Estricto (Type Safety):** Aprovechar el compilador de TypeScript sin recurrir a evasiones (`any`).
4. **Encapsulamiento de Estilos:** Evitar la contaminación global de estilos mediante el uso estricto de CSS Modules.
5. **Composición sobre Herencia:** Promover el uso de `children` y patrones de composición para componentes reutilizables.

---

## 3. Estructura del Proyecto

```plaintext
src/
├── assets/             # Recursos estáticos (imágenes, fuentes, vectores globales)
├── components/         # Componentes UI globales/reutilizables (Design System básico)
│   └── ui/
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.module.css
│       │   └── index.ts
│       └── Modal/
├── config/             # Variables de entorno y constantes de configuración global
├── context/            # Contextos globales de React (ej. Tema, Sesión)
├── hooks/              # Custom Hooks genéricos de utilidad (ej. useDebounce, useOnClickOutside)
├── layouts/            # Plantillas de estructura de página (ej. MainLayout, AuthLayout)
├── modules/            # Módulos de dominio/funcionales (Feature-First)
│   └── [feature-name]/
│       ├── components/ # Componentes exclusivos de esta feature
│       ├── hooks/      # Hooks con lógica de negocio exclusiva
│       ├── services/   # Llamadas a API relativas a la feature
│       ├── types/      # Interfaces e tipos exclusivos
│       └── views/      # Páginas/vistas del módulo
├── routes/             # Configuración de rutas de la aplicación
├── services/           # Cliente HTTP global (Fetch / Axios instance) e integraciones
├── styles/             # Configuración CSS global (variables, reset, tipografía)
│   ├── _variables.css
│   ├── reset.css
│   └── main.css
├── types/              # Tipos TypeScript compartidos globalmente
└── utils/              # Funciones puras auxiliares y formateadores
```

---

## 4. Guía de Estilos de Código y Componentes

### 4.1. Estructura de un Componente

Cada componente debe encapsularse en su propio directorio dentro de `components/ui/` o `modules/[feature]/components/`.

```typescript
// src/components/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const combinedClassName = [
    styles.button,
    styles[variant],
    isLoading ? styles.loading : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={combinedClassName} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
```

### 4.2. Exportaciones

Utilizar Named Exports para todos los componentes e interfaces.

```typescript
// src/components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

## 5. Estrategia de CSS Modules y Estilos

### 5.1. Variables CSS Globales

Los valores compartidos (colores, espaciados, tipografías, sombras) se definen como variables CSS en `styles/_variables.css`.

```css
/* src/styles/_variables.css */
:root {
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-danger: #ef4444;
  --color-surface: #ffffff;
  --color-text: #1f2937;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;

  /* Borders & Shadows */
  --radius-md: 0.375rem;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
```

### 5.2. Reglas para CSS Modules

1. **Nombres de Clases:** Usar sintaxis `camelCase` para facilitar la importación en JS/TS (`styles.buttonContainer`).
2. **Sin Selectores de Etiqueta Directos:** Evitar estilizar `div`, `button` o `h1` directamente dentro de un módulo CSS; asociar siempre una clase.
3. **Inmutabilidad:** Las clases importadas no deben reescribir propiedades de otros componentes salvo mediante props explícitas (`className`).

```css
/* src/components/ui/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.primary {
  background-color: var(--color-primary);
  color: var(--color-surface);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.loading {
  opacity: 0.7;
  cursor: wait;
}
```

### 5.3. Declaración de Tipos para CSS Modules

Incluir la definición global de módulos CSS en `src/types/css-modules.d.ts` para evitar advertencias de TypeScript al importar archivos `.module.css`:

```typescript
// src/types/css-modules.d.ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

---

## 6. Manejo de TypeScript

### 6.1. Configuración Estricta (`tsconfig.json`)

Garantizar la detección temprana de errores mediante comprobaciones estrictas:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "jsx": "react-jsx"
  }
}
```

### 6.2. Reglas de Tipado

- **Prohibido `any`:** Si el tipo es desconocido, utilizar `unknown` y realizar validaciones/estrechamiento de tipos.
- **`interface` vs `type`:**
  - Usar `interface` para definir las props de componentes y estructuras de objetos extensoras.
  - Usar `type` para uniones, intersecciones, primitivos o alias de funciones.
- **Tipado de Eventos:** Especificar explícitamente los tipos de eventos (`React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`).

---

## 7. Manejo de Estado

| Tipo de Estado | Herramienta Recomendada | Caso de Uso |
| :--- | :--- | :--- |
| **Local de Componente** | `useState`, `useReducer` | Banderas UI, entradas de formulario, toggles. |
| **Compartido / Módulo** | Custom Hooks + Context API | Estado de una feature específica compartido entre componentes del módulo. |
| **Global de Aplicación** | Context API o Zustand | Sesión de usuario, tema visual, configuración de la app. |
| **Asíncrono / Servidor** | Custom Hooks con `fetch` o TanStack Query | Peticiones API, estados de carga (`isLoading`) y errores (`error`). |

---

## 8. Gestión de Peticiones API

1. **Cliente Base:** Encapsular `fetch` en un único servicio base para inyectar cabeceras, URL base y manejo de errores.
2. **Aislamiento por Módulo:** Las llamadas API deben residir dentro del directorio `services/` del módulo correspondiente.
3. **Validación en Runtime:** Validar toda respuesta con un esquema de `zod` antes de devolverla. Los tipos de TypeScript no existen en tiempo de ejecución, por lo que un cast ciego (`response.json() as Promise<T>`) puede ocultar formatos inesperados del backend y provocar errores en runtime. `zod` deberá agregarse como dependencia del proyecto.

```typescript
// src/services/apiClient.ts
import { z } from 'zod';

export const apiClient = async <T>(
  endpoint: string,
  schema: z.ZodType<T>,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  return schema.parse(data);
};
```

---

## 9. Calidad y Rendimiento Pragmático

1. **Linter por Defecto (ESLint):** Utilizar la configuración predeterminada de Vite/ESLint para prevenir errores comunes de sintaxis y Hooks.
2. **Tests Mínimos (Vitest):** El proyecto admitirá tests mínimos con Vitest, sin sobrecarga de testing automatizado. Se priorizarán los flujos críticos: toggle de LLM, envío de mensajes, renderizado de preguntas guiadas, manejo de errores y validación de respuestas de la API.
3. **Optimización Natural:** Cargar imágenes en formatos livianos (`.svg`, `.webp`) y evitar optimizaciones prematuras (`useMemo`/`useCallback`) salvo que se detecte lentitud real en la interfaz.