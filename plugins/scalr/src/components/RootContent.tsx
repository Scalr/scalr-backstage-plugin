import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EntityScalrEnvironmentContent } from './EntityScalrEnvironmentContent';
import { WorkspaceDetailsFetchComponet } from './WorkspaceDetailsFetchComponet';

export const RootContent = () => (
  <Routes>
    <Route path="/" element={<EntityScalrEnvironmentContent />} />
    <Route path="/:id" element={<WorkspaceDetailsFetchComponet />} />
  </Routes>
);
