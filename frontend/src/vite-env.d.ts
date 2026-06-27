/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;

  export default component;
}

declare global {
  interface GoogleAccountsId {
    initialize(options: {
      client_id: string;
      callback: (response: any) => void;
      auto_select?: boolean;
      login_uri?: string;
      cancel_on_tap_outside?: boolean;
    }): void;
    renderButton(
      element: HTMLElement,
      options: {
        theme?: "outline" | "filled_blue" | "filled_black";
        size?: "large" | "medium" | "small";
        width?: number;
        type?: "standard" | "icon" | "icon_only";
        text?: "signin_with" | "signup_with" | "continue_with";
        shape?: "rectangular" | "pill" | "circle";
      },
    ): void;
    prompt(): void;
  }

  interface GoogleAccounts {
    id: GoogleAccountsId;
  }

  interface Window {
    google?: {
      accounts?: GoogleAccounts;
    };
  }
}

export {};
