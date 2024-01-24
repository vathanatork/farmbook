import React from 'react'
import ReactDOM from 'react-dom/client'
import "./i18n/i18n.js";
import { AuthProvider } from './auth/auth';
import { RouterProvider,} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import router from './router';

import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="loading...">
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
        </AuthProvider>
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>,
)
