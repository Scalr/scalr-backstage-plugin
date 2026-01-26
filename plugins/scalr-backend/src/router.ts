import express from 'express';
import Router from 'express-promise-router';

import { HttpAuthService } from '@backstage/backend-plugin-api';

import { EnvironmentService } from './services/EnvironmentService/types';
import { ModuleService } from './services/ModuleService/types';
import { RegexService } from './services/RegexService/types';
import { TagService } from './services/TagService/types';
import { WorkspaceService } from './services/WorkspaceService/types';

export async function createRouter({
  httpAuth,
  environmentService,
  workspaceService,
  regexService,
  tagService,
  moduleService,
}: {
  httpAuth: HttpAuthService;
  environmentService: EnvironmentService;
  workspaceService: WorkspaceService;
  regexService: RegexService;
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

  router.get('/regex/:regex', async (req, res) => {
    res.json(
      await regexService.getRegex(
        { regex: req.params.regex },
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

  router.get('/module', async (req, res) => {
    res.json(
      await moduleService.getModules(
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
