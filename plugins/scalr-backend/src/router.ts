import { HttpAuthService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { EnvironmentService } from './services/EnvironmentService/types';
import { WorkspaceService } from './services/WorkspaceService/types';

export async function createRouter({
  httpAuth,
  environmentService,
  workspaceService,
}: {
  httpAuth: HttpAuthService;
  environmentService: EnvironmentService;
  workspaceService: WorkspaceService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/environments/:id', async (req, res) => {
    res.json(
      await environmentService.getEnvironment(
        { id: req.params.id },
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

  return router;
}
