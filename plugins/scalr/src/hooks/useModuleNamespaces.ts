import {
  ConfigApi,
  configApiRef,
  IdentityApi,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import { ModuleNamespace } from '../types';
import axios from 'axios';

export function useModuleNamespaces() {
  const configApi: ConfigApi = useApi(configApiRef);
  const identityApi: IdentityApi = useApi(identityApiRef);

  const [moduleNamespaces, setModuleNamespaces] = useState<
    ModuleNamespace[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchModuleNamespaces = async () => {
      try {
        const backendBaseUrl: string = configApi.getString('backend.baseUrl');
        const credentials = await identityApi.getCredentials();
        const url: string = `${backendBaseUrl}/api/scalr/module/namespaces`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${credentials.token}`,
          },
        });

        setModuleNamespaces(res.data);
      } catch (err) {
        setError(new Error('Failed to fetch module namespaces'));
      } finally {
        setLoading(false);
      }
    };

    fetchModuleNamespaces();
  }, [configApi, identityApi]);

  return { moduleNamespaces, loading, error };
}
