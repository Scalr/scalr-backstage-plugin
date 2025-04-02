import { HttpAuthService } from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { EnvironmentService } from './services/EnvironmentService/types';

export async function createRouter({
  httpAuth,
  environmentService,
}: {
  httpAuth: HttpAuthService;
  environmentService: EnvironmentService;
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

  return router;
}
