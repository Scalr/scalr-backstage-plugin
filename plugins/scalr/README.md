# Scalr Backstage Plugin (Frontend & Backend)

This repository provides both the **frontend** and **backend** plugins required to integrate **Scalr** with **Backstage**.

---

## 🔧 Setup

### Backend Plugin

#### Installation

Install the backend plugin from the GitHub release:

```bash
yarn workspace backend add @scalr-io/backstage-plugin-scalr-backend
```

#### Integration

Add the plugin to your Backstage backend:

```diff
// packages/backend/src/index.ts

import { createBackend } from '@backstage/backend-defaults';
const backend = createBackend();
...
+ backend.add(import('@scalr-io/backstage-plugin-scalr-backend'));

backend.start();
```

---

### Frontend Plugin

#### Installation

Install the frontend plugin from the GitHub release:

```bash
yarn workspace app add @scalr-io/backstage-plugin-scalr
```

#### Integration

Add the plugin route to your entity page:

```diff
// packages/app/src/components/catalog/EntityPage.ts

+ import { EntityScalrEnvironmentContent } from '@scalr-io/backstage-plugin-scalr';

const domainPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={6}>
          <EntityHasSystemsCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>

+   <EntityLayout.Route path="/scalr" title="Scalr">
+     <EntityScalrEnvironmentContent />
+   </EntityLayout.Route>
  </EntityLayout>
);
```

> ℹ️ You can integrate the plugin into any entity page based on your organizational structure. You can also extend the catalog with custom entity kinds and attach the plugin accordingly.

---

### Configuration

The backend requires authentication credentials to access the Scalr API. Add the following to your `app-config.local.yaml` (or equivalent):

```yaml
# app-config.local.yaml

integrations:
  scalr:
    api-token: <YOUR_API_TOKEN>
    base-url: <YOUR_BASE_URL>
    # Optional
    allow-trigger-run: true
```

- **API Token:** Obtain it via the Scalr UI under your user profile → _Personal Access Tokens_.
- **Base URL:** This is the hostname of your Scalr instance (e.g. `organization.scalr.io`), which you’ll see in your browser's address bar when logged in.
- **(Optional) Allow Triggering Runs:** Setting this to `true` will allow Backstage users to trigger new runs directly from the Scalr plugin UI. (Default: `false`)

---

## 🚀 Usage

You can filter displayed Workspaces by Environment or Tag using the appropriate annotations:

### 🔧 Filter by Environment

```yaml
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: example
  annotations:
    scalr.com/environment: <ENVIRONMENT_ID>
spec:
  owner: guests
```

> 🔖 Replace `<ENVIRONMENT_ID>` with the ID of the Scalr environment you want to associate.

### 🏷️ Filter by Tag

```yaml
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: example
  annotations:
    scalr.com/tag: <TAG_NAME>
spec:
  owner: guests
```

> 🔖 Replace `<TAG_NAME>` with the Name of the Scalr tag you want to associate.

> ℹ️ If both annotations are defined on a single entity, Tag will take precedence over Environment.
