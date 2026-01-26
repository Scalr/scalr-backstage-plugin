import axios from 'axios';
import { useEffect, useState } from 'react';

import {
    ConfigApi, configApiRef, IdentityApi, identityApiRef, useApi
} from '@backstage/core-plugin-api';

import { Workspace } from '../types';

export function useRegex(regex: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [workspaces, setWorkspaces] = useState<Workspace[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRegex = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const encodedRegex = encodeURIComponent(regex);
        const url: string = `${backendBaseUrl}/api/scalr/regex/${encodedRegex}`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setWorkspaces(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch regex'));
      } finally {
        setLoading(false);
      }
    };

    fetchRegex();
  }, [regex, configApi, identityApi]);

  return { workspaces, loading, error };
}
