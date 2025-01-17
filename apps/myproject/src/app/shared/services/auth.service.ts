import { Injectable, effect, inject, signal } from '@angular/core';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(Keycloak);
  private isAuthenticatedSignal = signal(false);
  private usernameSignal = signal<string | null>(null);

  public readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  public readonly username = this.usernameSignal.asReadonly();

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      switch (keycloakEvent.type) {
        case KeycloakEventType.Ready: {
          const isAuthenticated = typeEventArgs<boolean>(keycloakEvent.args);
          this.isAuthenticatedSignal.set(isAuthenticated);

          if (isAuthenticated) {
            this.loadUserProfile();
          } else {
            this.usernameSignal.set(null);
          }
          break;
        }

        case KeycloakEventType.AuthLogout:
          this.isAuthenticatedSignal.set(false);
          this.usernameSignal.set(null);
          break;
      }
    });
  }

  async login(): Promise<void> {
    try {
      await this.keycloak.login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloak.logout();
      this.isAuthenticatedSignal.set(false);
      this.usernameSignal.set(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  private async loadUserProfile(): Promise<void> {
    try {
      const profile = await this.keycloak.loadUserProfile();
      this.usernameSignal.set(profile.username || null);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      this.usernameSignal.set(null);
    }
  }
}
