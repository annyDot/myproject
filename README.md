# MyProject

## Project Structure

The Nx workspace is organized into the following main folders:

- `apps/` - Contains all applications
- `libs/` - Contains reusable libraries

### Styles and Assets

- Shared styles are imported from `libs/component-library/styles/styles.scss`.
- Public assets are served from the `public/` folder.

## Development Server

To start the development server for `myproject`, run:

```bash
npx nx serve myproject
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building the Application

To build `myproject` for production, use the following command:

```bash
npx nx build myproject --configuration=production
```

The build artifacts will be stored in the `dist/myproject` directory. You can also build in development mode by specifying `--configuration=development`.

## Running Unit Tests

To execute unit tests for `myproject` using [Jest](https://jestjs.io), run:

```bash
npx nx test myproject
```

## Linting

- Run linting for `myproject`:

  ```bash
  npx nx lint myproject
  ```

## Deploy

- Run deploy for `myproject`:

  ```bash
  npx nx run myproject:deploy --base-href=/myproject/
  ```

## Learn More

For more details about Nx, visit the [Nx documentation](https://nx.dev/). For Angular-specific tools and information, check the [Angular documentation](https://angular.dev).
