export interface ModalOptions {
  title: string;
  buttons: ModalButton[];
  [key: string]: any;
}

export interface ModalEvent {
  type: 'save' | 'cancel' | 'ok';
  data?: any;
}

export interface ModalButton {
  type: 'save' | 'ok' | 'cancel';
  label?: string;
}
