# EduSmart - Aplicación Next.js

Este es un proyecto Next.js iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Empezando

Primero, ejecute el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abra [http://localhost:9002](http://localhost:9002) con su navegador para ver el resultado.

Puedes empezar a editar la página modificando `src/app/page.tsx`. La página se actualiza automáticamente a medida que editas el archivo.

## Más información

Para obtener más información sobre Next.js, consulte los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - obtenga información sobre las características y la API de Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes consultar [el repositorio de GitHub de Next.js](https://github.com/vercel/next.js/) - ¡tus comentarios y contribuciones son bienvenidos!

## Implementación en páginas de GitHub

Este proyecto está configurado para exportación estática, lo que lo hace apto para su implementación en páginas de GitHub. Siga estos pasos cuidadosamente:

**1. Construya el sitio estático:**

Ejecute el siguiente comando en el directorio raíz de su proyecto:
```bash
npm run build:static
```
Este comando primero crea la aplicación Next.js (`npm run build`) y luego la exporta a archivos HTML/CSS/JS estáticos (`npm run export`). Los archivos estáticos se generarán en el directorio `out`.

**2. Sube los archivos estáticos a GitHub:**

Debes enviar el contenido del directorio `out` (no todo el código fuente del proyecto) a una rama específica que GitHub Pages servirá. El método recomendado es usar la rama `gh-pages`:

*   **Método: Usar rama `gh-pages` (Recomendado)**
    *   Asegúrese de que los cambios en el código del proyecto principal se confirmen primero en su rama `main` (o `master`).
    *   Instale el paquete auxiliar `gh-pages` si aún no lo ha hecho:
        ```bash
        npm install gh-pages --save-dev
        ```
    *   Ejecute el siguiente comando **desde el directorio raíz de su proyecto** (el que contiene `package.json`):
        ```bash
        npx gh-pages -d out -t true
        ```
        *   `-d out`: Especifica que el directorio `out` contiene los archivos a implementar.
        *   `-t true`: Agrega un archivo `.nojekyll` automáticamente a la rama de implementación, lo cual es importante para que GitHub Pages sirva al sitio correctamente sin la interferencia de Jekyll.

**3. Configurar los ajustes de las páginas de GitHub:**

**¡Este es un paso crucial!** Si ves tu archivo README o un error 404 en lugar de tu sitio web, probablemente se deba a que GitHub Pages no está configurado correctamente.

*   Vaya a su repositorio en GitHub.
*   Haga clic en la pestaña **"Settings"** (Configuración).
*   En la barra lateral izquierda, navegue hasta **"Pages"** (Páginas).
*   En **"Build and deployment"** (Construcción e implementación):
    *   Establezca **Source** (Fuente) en **"Deploy from a branch"** (Implementar desde una rama).
    *   En **Branch** (Rama), seleccione la rama **`gh-pages`** (o `main`/`master` si utilizó otro método, aunque `gh-pages` es el preferido para los sitios de proyectos).
    *   **Asegúrese de que la carpeta esté configurada en `/ (root)`**.
    *   Haga clic en **"Save"** (Guardar).

**4. Configurar `basePath` (Si se implementa en un repositorio de proyecto):**

*   GitHub Pages implementa los sitios del proyecto en un subdirectorio (p. ej., `https://your-username.github.io/your-repo-name/`). Los sitios de usuario/organización se implementan en la raíz (`https://your-username.github.io/`).
*   **Si la URL de su sitio incluye el nombre de su repositorio (un sitio de proyecto)**, **DEBE** configurar `basePath` en su configuración de Next.js para que coincida con el nombre del repositorio. **Omitir este paso para sitios de proyecto es la causa más común de errores 404 o de que se muestre el README en lugar del sitio web.**
    *   Abra `next.config.ts`.
    *   **Asegúrese de descomentar la línea `basePath`** y reemplace `'your-repo-name'` con el nombre *exacto* de su repositorio en GitHub:
        ```ts
        import type {NextConfig} from 'next';

        const nextConfig: NextConfig = {
          output: 'export', // Mantener esto para exportación estática
          // *** ¡IMPORTANTE! Reemplace 'your-repo-name' con el nombre de su repositorio ***
          basePath: '/your-repo-name', // <--- DESCOMENTE Y EDITE ESTA LÍNEA
          images: {
             unoptimized: true, // Requerido para exportación estática con next/image
             remotePatterns: [
                 // ... sus patrones remotos existentes ...
             ],
          },
          // ... otras configuraciones ...
          typescript: {
            ignoreBuildErrors: true,
          },
          eslint: {
            ignoreDuringBuilds: true,
          },
        };

        export default nextConfig;
        ```
    *   Ejemplo: Si su repositorio se llama `EduSmart-App`, la línea debería ser `basePath: '/EduSmart-App',`.
    *   **Importante:** Después de modificar `next.config.ts`, **debes reconstruir** el sitio estático (`npm run build:static`) y **volver a enviarlo** a la rama `gh-pages` (`npx gh-pages -d out -t true`) antes de que los cambios surtan efecto en GitHub Pages.

**5. Acceda a su sitio:**

*   Espere unos minutos para que GitHub Pages cree e implemente su sitio después de configurar los ajustes y enviar la última compilación.
*   La URL se mostrará en la sección de configuración de páginas de GitHub.
    *   Sitio del usuario/organización: `https://your-username.github.io/`
    *   Sitio del proyecto: `https://your-username.github.io/your-repo-name/`

**Solución de problemas de errores 404 o visualización del README:**

Si sigues viendo un error 404 o el contenido del README:
*   **Verificar `basePath`:** ¿Descomentaste y configuraste **correctamente** la `basePath` en `next.config.ts` si se trata de un repositorio de proyecto? ¿Reconstruiste (`npm run build:static`) y reimplementaste (`npx gh-pages -d out -t true`) **después** de cambiarlo? Este es el error más común.
*   **Revisa la configuración de páginas de GitHub:** Regresa a Configuración > Páginas de tu repositorio. ¿Está la fuente configurada como "Deploy from a branch", la rama `gh-pages` está seleccionada y la carpeta está activada `/ (root)`?
*   **Revisar archivos implementados:** Dirígete a la rama `gh-pages` en tu repositorio de GitHub. ¿Contiene el contenido de tu carpeta `out` local, incluyendo `index.html` en la raíz de la rama?
*   **Verificar `.nojekyll`:** ¿Existe el archivo `.nojekyll` en la raíz de la rama `gh-pages`? El comando `gh-pages -t true` debería agregarlo.
*   **Esperar:** A veces las actualizaciones de las páginas de GitHub tardan algunos minutos en propagarse. Refresca la página después de unos minutos.
*   **Sensibilidad a mayúsculas y minúsculas:** Asegúrate de que los nombres de archivos en tus enlaces coincidan con las mayúsculas y minúsculas de los archivos reales en las páginas de GitHub (aunque esto es menos común con las compilaciones de Next.js).
