// src/main.tsx
import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { getEnv } from './config/env'

async function bootstrap() {
  const env = getEnv()

  // Start Mock Service Worker when enabled
  if (env.useMSW) {
    // If you ran: npx msw init public --save
    // the worker file will be served from /mockServiceWorker.js automatically.
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

bootstrap()
