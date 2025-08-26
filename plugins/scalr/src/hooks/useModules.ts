import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import { Module } from '../types';
import axios from 'axios';

export function useModules(namespaceId?: string) {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [modules, setModules] = useState<Module[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/module/${namespaceId}`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setModules(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch module s'));
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [configApi, identityApi, namespaceId]);

  return { modules, loading, error };
}
