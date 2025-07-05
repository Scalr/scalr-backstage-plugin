import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Environment } from '../types';

export function useEnvironment(id: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/environments/${id}`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setEnvironment(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch environment'));
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironment();
  }, [id, configApi, identityApi]);

  return { environment, loading, error };
}
