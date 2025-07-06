import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag } from '../types/tag';

export function useTag(tagName: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/tag/${tagName}`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setTag(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch tag'));
      } finally {
        setLoading(false);
      }
    };

    fetchTag();
  }, [tagName, configApi, identityApi]);

  return { tag, loading, error };
}
