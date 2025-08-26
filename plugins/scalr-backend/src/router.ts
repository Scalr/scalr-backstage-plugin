import { HttpAuthService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { EnvironmentService } from './services/EnvironmentService/types';
import { WorkspaceService } from './services/WorkspaceService/types';
import { TagService } from './services/TagService/types';
import { ModuleService } from './services/ModuleService/types';

export async function createRouter({
  httpAuth,
  environmentService,
  workspaceService,
  tagService,
  moduleService,
}: {
  httpAuth: HttpAuthService;
  environmentService: EnvironmentService;
  workspaceService: WorkspaceService;
  tagService: TagService;
  moduleService: ModuleService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/environments', async (req, res) => {
    res.json(
      await environmentService.getEnvironments(
        {},
        { credentials: await httpAuth.credentials(req, { allow: ['user'] }) },
      ),
    );
  });

  router.get('/environments/:id', async (req, res) => {
    res.json(
      await environmentService.getEnvironment(
        { id: req.params.id },
        { credentials: await httpAuth.credentials(req, { allow: ['user'] }) },
      ),
    );
  });

  router.get('/tag/:name', async (req, res) => {
    res.json(
      await tagService.getTag(
        { name: req.params.name },
        { credentials: await httpAuth.credentials(req, { allow: ['user'] }) },
      ),
    );
  });

  router.get('/workspace/:id/runs', async (req, res) => {
    res.json(
      await workspaceService.listRuns(
        { workspace: req.params.id },
        { credentials: await httpAuth.credentials(req, { allow: ['user'] }) },
      ),
    );
  });

  router.post('/workspace/runs/:id', async (req, res) => {
    res.json(
      await workspaceService.createRun(
        { id: req.params.id },
        { credentials: await httpAuth.credentials(req, { allow: ['user'] }) },
      ),
    );
  });

  router.get('/module/namespaces', async (req, res) => {
    res.json(
      await moduleService.getModuleNamespaces(
        {},
        {
          credentials: await httpAuth.credentials(req, { allow: ['user'] }),
        },
      ),
    );
  });

  router.get('/module/:id', async (req, res) => {
    res.json(
      await moduleService.getModules(
        { namespaceId: req.params.id },
        {
          credentials: await httpAuth.credentials(req, { allow: ['user'] }),
        },
      ),
    );
  });

  return router;
}
