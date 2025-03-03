import type { ModalManager } from "./ModalManager.svelte";
import { ModalComponent } from "./types";

export interface ModalProps<ReturnValue = any> extends Record<string, any> {
  // id: string;
  // index: number;
  close: CloseFn<ReturnValue>;
  isOpen: boolean;
}

type CloseFn<R> = (...args: R extends void ? [] : [result: R]) => boolean;

export class Modal {
  // property for Modal's original properties
  private _props: Record<string, any>;

  modals: ModalManager;
  component: ModalComponent;

  constructor(
    modals: ModalManager,
    component: ModalComponent<any, any, any>,
    props?: Record<string, any>,
  ) {
    this.component = component;
    this.modals = modals;
    this._props = props || {};
  }

  isOpen = $derived.by(() => {
    if (this.modals.stack.length === 0) return false;

    const topModal = this.modals.stack[this.modals.stack.length - 1];
    return topModal === this;
  });

  close = () => {
    if (this.modals.stack.indexOf(this) > -1) {
      this.modals.stack.splice(this.modals.stack.indexOf(this), 1);
    }
    return true;
  };

  get props(): ModalProps {
    return {
      ...this._props,
      isOpen: this.isOpen,
      close: this.close,
    };
  }
}
