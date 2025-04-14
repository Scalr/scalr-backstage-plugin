import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useState } from 'react';
import axios from 'axios';

export function useWorkspace(id: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerRun = async () => {
    setLoading(true);
    setError(null);

    try {
      const backendBaseUrl: string = configApi.getString('backend.baseUrl');
      const credentials = await identityApi.getCredentials();
      const url: string = `${backendBaseUrl}/api/scalr/workspace/runs/${id}`;

      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        },
      );

      setResponse(res.data);
    } catch (err) {
      setError(new Error('Failed to trigger run'));
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, triggerRun };
}
