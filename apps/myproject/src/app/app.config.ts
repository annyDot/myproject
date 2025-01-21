import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from './environments/environment';
import { provideKeycloakAngular } from './shared/auth/keycloak.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideKeycloakAngular(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
};
