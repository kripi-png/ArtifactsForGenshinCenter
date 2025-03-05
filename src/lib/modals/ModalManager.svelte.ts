import { Modal, type ModalProps } from "./Modal.svelte";
import type { ModalComponent } from "./types";

/*
this modal system has taken heavy inspiration and influence
from @mattjennings' excellent `svelte-modals` package
see: https://github.com/mattjennings/svelte-modals

the reason for writing this system instead of using the svelte-modal package
is that as of svelte-modals@2.0.0, the package uses custom events for closing the modals.
Unfortunately, and party for unknown reasons, these events do not trigger at all
in Firefox when using extension Manifest V2.
It is unconfirmed but highly probable that it is related to this issue:
https://stackoverflow.com/questions/78761215/eventtarget-doesnt-work-in-firefox-content-script-does-work-in-chrome

I find creating a fix (that I am not sure even exists) and creating a pull request
to be tedious and even unnecessary, as this is such a niche edge-case so it is unlikely to be accepted.
Creating a proper fork of the project is also more work than it's worth.

If the a solution is found or the extension is updated to Firefox Manifest V3, svelte-modals may be reconsidered.
*/

export class ModalManager {
  stack = $state<Modal[]>([]);

  open = async <
    Props extends ModalProps = ModalProps,
    Exports extends Record<string, any> = {},
    Bindings extends keyof ModalProps | "" = string,
    Result = Props extends ModalProps<infer R> ? R : unknown,
  >(
    component: ModalComponent<Props, Exports, Bindings>,
    props?: Omit<Props, "isOpen">,
  ) => {
    const modal = new Modal(this, component, props);
    this.stack.push(modal);
  };

  // close topmost modal
  close = () => {
    this.stack.splice(this.stack.length - 1, 1);
  };
}
