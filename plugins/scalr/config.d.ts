export interface Config {
  integrations: {
    scalr: {
      /**
       * API token for Scalr
       * @visibility secret
       */
      'api-token': string;
      /**
       * Scalr base URL
       * @visibility backend
       */
      'base-url': string;
      /**
       * Allow triggering runs from UI
       * @visibility frontend
       */
      'allow-trigger-run'?: boolean;
    };
  };
}
