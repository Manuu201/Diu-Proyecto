


import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/layout';
import { PostulationProvider } from './components/postulationSystem';
import reportWebVitals from './reportWebVitals';

document.body.innerHTML = '<div id="root"></div>';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostulationProvider>
    <Layout />
  </PostulationProvider>
);

reportWebVitals();
