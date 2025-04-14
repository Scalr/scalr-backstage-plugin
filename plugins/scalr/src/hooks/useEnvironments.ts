import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useEnvironments() {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [environments, setEnvironments] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/environments`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setEnvironments(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch environments'));
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
  }, [configApi, identityApi]);

  return { environments, loading, error };
}
