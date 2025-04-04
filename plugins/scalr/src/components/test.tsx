import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EntityScalrEnvironmentContent } from './EntityScalrEnvironmentContent';
import { WorkspaceDetailsFetchComponet } from './WorkspaceDetailsFetchComponet';

export const MyPage = () => (
  <Routes>
    {/* myPlugin.routes.root will take the user to this page */}
    <Route path="/" element={<EntityScalrEnvironmentContent />} />

    {/* myPlugin.routes.details will take the user to this page */}
    <Route path="/:id" element={<WorkspaceDetailsFetchComponet />} />
  </Routes>
);
