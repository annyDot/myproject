import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  private fireSwal(
    options: SweetAlertOptions
  ): Observable<SweetAlertResult<unknown>> {
    return from(Swal.fire(options));
  }

  /**
   * Non-cancellable confirmation dialog (user cannot click outside or close with ESC)
   */
  mustConfirm(
    options: SweetAlertOptions
  ): Observable<SweetAlertResult<unknown>> {
    return this.fireSwal({
      ...options,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
    });
  }

  /**
   * Cancellable confirmation dialog (user can click outside or close with ESC)
   */
  confirmOrCancel(
    options: SweetAlertOptions
  ): Observable<SweetAlertResult<unknown>> {
    return this.fireSwal({
      ...options,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCancelButton: true,
    });
  }

  /**
   * Success alert that automatically closes after a timeout
   */
  success(options: SweetAlertOptions, timeout = 2000): Observable<undefined> {
    return this.fireSwal({
      ...options,
      icon: 'success',
      timer: timeout,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).pipe(map(() => undefined));
  }
}
