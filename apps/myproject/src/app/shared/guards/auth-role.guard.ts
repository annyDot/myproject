import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import Swal from 'sweetalert2';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRole = route.data['role'];
  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) =>
      roles.includes(role)
    );

  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  await Swal.fire({
    title: 'Access Denied',
    text: 'Missing required role to access this page.',
    icon: 'error',
    confirmButtonText: 'OK',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn primary',
    },
  });

  return false;
};

export const canActivateAuthRole =
  createAuthGuard<CanActivateFn>(isAccessAllowed);
