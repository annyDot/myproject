import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ButtonComponent } from '@component-library/components';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly keycloak = inject(Keycloak);
  public isAuthenticated = false;
  public username: string | null = null;

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.isAuthenticated = typeEventArgs<boolean>(keycloakEvent.args);

        if (this.isAuthenticated) {
          this.loadUsername();
        } else {
          this.username = null;
        }
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.isAuthenticated = false;
        this.username = null;
      }
    });
  }

  async login(): Promise<void> {
    await this.keycloak.login();
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }

  private async loadUsername(): Promise<void> {
    try {
      const profile = await this.keycloak.loadUserProfile();
      this.username = profile.username || null;
    } catch (error) {
      console.error('Failed to load user profile:', error);
      this.username = null;
    }
  }
}
