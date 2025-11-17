# 📱 To-Do App (Ionic + Angular + Firebase Remote Config)

Desarrollo Mobile - Aplicación Ionic

Aplicación híbrida desarrollada con **Ionic + Angular (standalone)**, siguiendo **Clean Architecture** y **Atomic Design**, que implementa:

- Lista de tareas (To-Do List)
- Categorización de tareas (CRUD completo)
- Almacenamiento local
- Feature flag con **Firebase Remote Config**
- Soporte para compilación en **Android** e **iOS** usando Capacitor

---

## 📌 Objetivo de la Prueba

Demostrar habilidades en:

- Desarrollo con **Ionic + Angular**
- Diseño de arquitectura limpia y mantenible
- Mejora de experiencia de usuario (UI/UX)
- Optimización de rendimiento
- Uso de herramientas de versionamiento (**Git**) y servicios en la nube (**Firebase**)
- Configuración de aplicación híbrida para Android e iOS

---

## ✅ Funcionalidades Implementadas

### 📝 To-Do List

La aplicación base permite:

- ➕ **Agregar** nuevas tareas
- ✅ **Marcar** tareas como completadas
- 🗑 **Eliminar** tareas
- 💾 Guardar el estado de las tareas en **almacenamiento local**

### 🏷 Gestión de Categorías

Cada tarea puede asociarse a una categoría. La app permite:

- ➕ **Crear** categorías
- ✏ **Editar** el nombre de una categoría
- 🗑 **Eliminar** categorías
- 🧷 **Asignar** una categoría a cada tarea
- 🔍 **Filtrar** las tareas por categoría desde la pantalla de tareas

### 🚩 Feature Flag con Firebase Remote Config

Se implementó un **feature flag** mediante Firebase Remote Config:

- Flag: `show_categories_feature`
- Si está en `true`: la funcionalidad de categorías (página de categorías, selector de categorías y filtro) se muestra.
- Si está en `false`: la funcionalidad de categorías se oculta dinámicamente, sin necesidad de actualizar la app desde la tienda.

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue una aproximación de **Clean Architecture**, separando claramente:

- **Domain**: reglas de negocio puras
- **Data**: acceso a datos (LocalStorage, repositorios)
- **Presentation**: componentes, páginas y UI

Estructura principal:

```bash
src/
├── core/
│   ├── remote-config.service.ts      # Wrapper de Firebase Remote Config
│   └── constants/                    # (opcional) constantes globales
│
├── domain/
│   ├── entities/
│   │   ├── task.entity.ts            # Entidad de Task
│   │   └── category.entity.ts        # Entidad de Category
│   ├── repositories/
│   │   ├── task.repository.ts        # Abstracción de repositorio de tareas
│   │   └── category.repository.ts    # Abstracción de repositorio de categorías
│   └── usecases/
│       ├── task.usecases.ts          # Casos de uso de tareas
│       └── category.usecases.ts      # Casos de uso de categorías
│
├── data/
│   ├── datasources/
│   │   ├── task-local.datasource.ts      # DataSource local de tareas
│   │   └── category-local.datasource.ts  # DataSource local de categorías
│   └── repositories/
│       ├── task.repository.impl.ts       # Implementación concreta para tareas
│       └── category.repository.impl.ts   # Implementación concreta para categorías
│
└── presentation/
    ├── pages/
    │   ├── home/
    │   │   ├── home.page.ts
    │   │   ├── home.page.html
    │   │   └── home.page.scss
    │   ├── tasks/
    │   │   ├── tasks.page.ts
    │   │   ├── tasks.page.html
    │   │   └── tasks.page.scss
    │   └── categories/
    │       ├── categories.page.ts
    │       ├── categories.page.html
    │       └── categories.page.scss
    │
    ├── components/
    │   ├── atoms/                     # Elementos básicos de UI
    │   ├── molecules/                 # Componentes reutilizables pequeños
    │   │   └── task-item/
    │   │       ├── task-item.component.ts
    │   │       ├── task-item.component.html
    │       └── task-item.component.scss
    │   └── organisms/                 # Listas / combinaciones de molecules
    │       ├── task-list/
    │       │   ├── task-list.component.ts
    │       │   ├── task-list.component.html
    │       │   └── task-list.component.scss
    │       ├── category-list/
    │       │   ├── category-list.component.ts
    │       │   ├── category-list.component.html
    │       │   └── category-list.component.scss
    │       └── category-create-form/
    │           ├── category-create-form.component.ts
    │           ├── category-create-form.component.html
    │           └── category-create-form.component.scss
    │
    └── styles/
        └── global.scss                # Estilos globales de Ionic/tema
```

---

# ⚙️ Instalación y Configuración

## 🔧 Requisitos Previos

- Node.js >= 18
- Ionic CLI (`npm install -g @ionic/cli`)
- Capacitor (`npm install @capacitor/core`)
- Android Studio (para compilar en Android)
- Xcode (para compilar en iOS)
- Firebase project configurado

---

## 📦 Instalación

```bash
git https://github.com/eliandv1911/todo-ionic-app.git
cd todoApp
npm install
ionic build
```
nota: en **src/environments/environment.ts** y **environment.prod.ts** se debe utilizar en environment.sample.ts remplazando por la información dada por el proyecto de firebase remote config propio. (No se sube la información ya que son datos sensibles)
```bash
export const environment = {
  production: false,
  firebase: {
    apiKey: 'REPLACE_ME',
    authDomain: 'REPLACE_ME',
    projectId: 'REPLACE_ME',
    appId: 'REPLACE_ME',
  },
  remoteConfig: {
    minimumFetchIntervalMillis: 60000,
    fetchTimeoutMillis: 10_000,
    flags: {
      showCategoriesFeature: 'show_categories_feature',
    },
  },
};

};
```
## 🤖 Compilación Android (APK)

Para compilar la aplicación para Android usando Capacitor, sigue estos pasos:

### 1. Generar la carpeta de la plataforma Android
```bash
npx cap add android
```
### 2. Sincronizar el código web con el proyecto Android nativo
```Bash
npx cap sync android
```
### 3. Abrir el proyecto en Android Studio
```Bash
npx cap open android
```
### 4. Generar el archivo APK
Una vez dentro de Android Studio:

Navega a Build en la barra de menú superior.

Selecciona Generate App Bundles or APK... (selecciona Generate APK).

El archivo de salida (debug) se encontrará típicamente en la siguiente ruta dentro de la carpeta de tu proyecto:
```Bash
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🍏 Compilación iOS (IPA)

Esta compilación requiere una máquina **macOS** con **Xcode** instalado y una cuenta de desarrollador de Apple para el proceso de firma de código.

### 1. Agregar la plataforma iOS a Capacitor
```bash
npx cap add ios
```
### 2. Sincronizar el código web
Se copian los archivos web compilados (www o dist) al proyecto Xcode.

```Bash
npx cap sync ios
```
### 3. Abrir el proyecto en Xcode
Esto abre el entorno de desarrollo nativo de Apple.

```Bash
npx cap open ios
```
### 4. Exportar el archivo IPA
Una vez en Xcode:

Asegúrate de que la configuración de la firma de código (Signing) sea correcta.

Navega a Product en la barra de menú superior.

Selecciona Archive.

Una vez finalizado el archivado, se abrirá la ventana del Organizer. Selecciona Distribute App y luego elige el método de distribución deseado (p. ej., Ad Hoc / Development / App Store Connect).

---
## ⚙️ Optimizaciones de Rendimiento

Se aplicaron varias técnicas para asegurar un rendimiento óptimo:

* **Angular Signals:**
    * Tareas y categorías se mantienen en `signal<TaskEntity[]>` y `signal<CategoryEntity[]>`.
    * Los filtros (`filteredTasks`) son **computed**, evitando cálculos innecesarios y re-ejecuciones costosas.

* **Filtros Eficientes:**
    * El filtrado por categoría se realiza sobre la lista en memoria (gestionada por Signals), **evitando accesos redundantes a storage** durante la interacción del usuario.

* **LocalStorage Data Source:**
    * El acceso al almacenamiento local está **encapsulado** en `TaskLocalDataSource` y `CategoryLocalDataSource`.
    * Se carga solo cuando la aplicación lo necesita (al inicio o al actualizar datos), no en cada consulta de la vista.

* **Componentización (Atomic Design):**
    * Separando la interfaz en componentes pequeños (`TaskItem`, `TaskList`, etc.), se **reduce la lógica en cada template**.
    * Esto mejora la legibilidad, la reutilización y el rendimiento del renderizado de la interfaz.

* **Uso moderado de lógica en template:**
    * Se evita poner **lógica compleja** directamente en el HTML.
    * Se apoya en métodos y **signals** para que el template sea lo más declarativo posible.
---

## ❓ Preguntas Respondidas

### 1. ¿Cuáles fueron los principales desafíos?

* Implementar **Clean Architecture** en Ionic manteniendo la app modular.
* Integrar **Remote Config** de manera reactiva con Signals.
* Garantizar compatibilidad **Android/iOS**.
* Asegurar rendimiento con listas dinámicas.

### 2. ¿Qué técnicas de optimización aplicaste?

* **Angular Signals** para evitar renders innecesarios.
* Almacenamiento local estructurado en capa Data.
* **TrackBy** para mejorar rendimiento de listados grandes.
* Split en **componentes Atómicos** reutilizables.
* **Lazy loading** de páginas.

### 3. ¿Cómo aseguraste la calidad del código?

* **Arquitectura limpia**
* Componentes desacoplados
* **ESLint + Prettier**
* Convenciones de Angular
* **Atomic Design** en interfaz
* Separación de responsabilidades por capas

---
## 📸 Capturas y Demostraciones
https://github.com/eliandv1911/todo-ionic-app/blob/main/docs/todoApp_demo.mp4

---
## 💾 Descarga de aplicaicon android y ios

- Android:
 https://github.com/eliandv1911/todo-ionic-app/blob/main/docs/app-debug.apk
- ios: debido a que no cuento con un dispositivo mac, no puedo generar el ipa, pero dejo en el presente readme como realizarlo.