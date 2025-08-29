import React from 'react';
import {
  Progress,
  ResponseErrorPanel,
  Select,
  SelectItem,
  Table,
  TableColumn,
} from '@backstage/core-components';
import { ModuleNamespace } from '../../types';
import { useModules } from '../../hooks';
import { ModuleActions } from './ModuleActions';
import { VersionChipComponent } from '../VersionChipComponent';

type ModulesTableProps = {
  namespaces: ModuleNamespace[];
};

export const ModulesTableComponent: React.FC<ModulesTableProps> = ({
  namespaces,
}) => {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  const { modules, loading, error } = useModules(selected);

  if (loading) return <Progress />;
  if (error) return <ResponseErrorPanel error={error} />;

  const items: SelectItem[] = namespaces.map(namespace => ({
    label: namespace.name,
    value: namespace.id,
  }));

  const columns: TableColumn[] = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Provider', field: 'provider' },
    { title: 'Version', field: 'version' },
    { title: 'Actions', field: 'actions' },
  ];

  const data = (modules ?? []).map(module => ({
    id: <p>{module.id}</p>,
    name: <p>{module.name}</p>,
    description: <p>{module.description}</p>,
    provider: <p>{module.provider}</p>,
    version: <VersionChipComponent version={module.version} />,
    actions: <ModuleActions url={module.url} />,
  }));

  return (
    <Table
      title="Modules"
      options={{ paging: false }}
      columns={columns}
      data={data}
      isLoading={loading}
      components={{
        Toolbar: props => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 16px',
            }}
          >
            <h3 style={{ margin: 0 }}>{props.title}</h3>

            <div style={{ minWidth: 250 }}>
              <Select
                label="Filter by Namespace"
                selected={selected}
                onChange={(nextSelected: any) => {
                  setSelected(nextSelected);
                }}
                items={items}
              />
            </div>
          </div>
        ),
      }}
    />
  );
};
