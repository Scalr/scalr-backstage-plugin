import React from 'react';
import {
  Link,
  Progress,
  ResponseErrorPanel,
  Select,
  SelectItem,
  Table,
  TableColumn,
} from '@backstage/core-components';
import { ModuleNamespace } from '../../types';
import { useModules } from '../../hooks';

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
    { title: 'Name', field: 'name' },
    { title: 'ID', field: 'id' },
  ];

  const data = (modules ?? []).map(module => ({
    name: <p>{module.name}</p>,
    id: <p>{module.id}</p>,
  }));

  return (
    <Table
      title="Modules"
      options={{ paging: false }}
      columns={columns}
      data={data}
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
                onChange={(bla: any) => {
                  setSelected(bla);
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
