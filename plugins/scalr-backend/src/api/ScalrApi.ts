import { Config } from '@backstage/config';
import axios from 'axios';
import { LoggerService } from '@backstage/backend-plugin-api/*';

export class ScalrApi {
  private readonly token: string;
  private readonly baseUrl: string;
  private readonly logger: LoggerService;

  constructor(config: Config, logger: LoggerService) {
    this.token = config.getString('integrations.scalr.api-token');
    this.baseUrl = config.getString('integrations.scalr.base-url');
    this.logger = logger;
  }

  getEnvironments(): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://${this.baseUrl}/api/iacp/v3/environments`,
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching environments:', err);
        throw err;
      });
  }

  getEnvironment(id: string): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://${this.baseUrl}/api/iacp/v3/environments/${id}`,
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching environment:', err);
        throw err;
      });
  }

  getWorkspaces(environment: string): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://${this.baseUrl}/api/iacp/v3/workspaces?filter[environment]=${environment}`,
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching workspaces:', err);
        throw err;
      });
  }

  getWorkspace(id: string): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://${this.baseUrl}/api/iacp/v3/workspaces/${id}`,
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching workspaces:', err);
        throw err;
      });
  }

  getRun(run: string): Promise<any> {
    const options = {
      method: 'GET',
      url: `https://${this.baseUrl}/api/iacp/v3/runs/${run}`,
      headers: {
        accept: 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching runs:', err);
        throw err;
      });
  }

  createRun(
    workspace: string,
    configVersion: string,
    createdByRun: string,
    isDryRun: boolean = false,
    autoApply?: boolean,
  ): Promise<any> {
    const options = {
      method: 'POST',
      url: `https://${this.baseUrl}/api/iacp/v3/runs?vcs-user-id=0`,
      headers: {
        accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        authorization: `Bearer ${this.token}`,
      },
      data: {
        data: {
          attributes: {
            'auto-apply': autoApply,
            'is-dry': isDryRun,
            message: 'triggered via Backstsage',
            source: 'api',
          },
          relationships: {
            'configuration-version': {
              data: {
                type: 'configuration-versions',
                id: configVersion,
              },
            },
            'created-by-run': {
              data: { type: 'runs', id: createdByRun },
            },
            workspace: {
              data: { type: 'workspaces', id: workspace },
            },
          },
          type: 'runs',
        },
      },
    };

    return axios
      .request(options)
      .then(res => res.data)
      .catch(err => {
        this.logger.error('Error fetching runs:', err);
        throw err;
      });
  }
}
