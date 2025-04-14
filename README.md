# Scalr Backstage Plugin (Frontend & Backend)

This repository provides both the **frontend** and **backend** plugins required to integrate **Scalr** with **Backstage**.

---

## 🔧 Setup

### Backend Plugin

#### Installation

Install the backend plugin from the GitHub release:

```bash
yarn workspace backend add backstage-plugin-scalr-backend@https://github.com/Scalr/scalr-backstage-plugin/releases/download/scalr-backend-v0.1.0/backstage-plugin-scalr-backend-v0.1.0.tgz
```

> ℹ️ You can find all releases here: https://github.com/Scalr/scalr-backstage-plugin/releases

#### Integration

Add the plugin to your Backstage backend:

```diff
// packages/backend/src/index.ts

import { createBackend } from '@backstage/backend-defaults';
const backend = createBackend();
...
+ backend.add(import('backstage-plugin-scalr-backend'));

backend.start();
```

---

### Frontend Plugin

#### Installation

Install the frontend plugin from the GitHub release:

```bash
yarn workspace app add backstage-plugin-scalr@https://github.com/Scalr/scalr-backstage-plugin/releases/download/scalr-v0.1.0/backstage-plugin-scalr-v0.1.0.tgz
```

> ℹ️ You can find all releases here: https://github.com/Scalr/scalr-backstage-plugin/releases

#### Integration

Add the plugin route to your entity page:

```diff
// packages/app/src/components/catalog/EntityPage.ts

+ import { EntityScalrEnvironmentContent } from 'backstage-plugin-scalr';

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
```

- **API Token:** Obtain it via the Scalr UI under your user profile → _Personal Access Tokens_.
- **Base URL:** This is the hostname of your Scalr instance (e.g. `organization.scalr.io`), which you’ll see in your browser's address bar when logged in.

---

## 🚀 Usage

To enable the plugin on a specific entity, add the following annotation to its metadata:

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
