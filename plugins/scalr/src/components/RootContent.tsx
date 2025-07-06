import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EntityScalrContent } from './EntityScalrContent';
import { WorkspaceDetailsFetchComponet } from './WorkspaceDetailsFetchComponet';

export const RootContent = () => (
  <Routes>
    <Route path="/" element={<EntityScalrContent />} />
    <Route path="/:id" element={<WorkspaceDetailsFetchComponet />} />
  </Routes>
);
