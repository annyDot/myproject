import {
  AutoRefreshTokenService,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken,
} from 'keycloak-angular';

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'http://localhost:8080',
      realm: 'myproject',
      clientId: 'angular-client',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000,
      }),
    ],
    providers: [AutoRefreshTokenService, UserActivityService],
  });
