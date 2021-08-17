declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    VUE_APP_SSL: string;
    VUE_APP_SERVER_HOST: string;
    VUE_APP_SERVER_PORT: string;
  }
}
