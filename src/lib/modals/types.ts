import type { Component } from "svelte";
import type { ModalProps } from "./Modal.svelte";

export type ModalComponent<
  Props extends ModalProps<any> = ModalProps<any>,
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | "" = string,
> = Component<Props, Exports, Bindings>;
