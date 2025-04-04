import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useRuns(id: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [workspace, setWorkspace] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/workspace/${id}/runs`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setWorkspace(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch environments'));
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, [configApi, id, identityApi]);

  return { workspace, loading, error };
}
