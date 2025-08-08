import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import {routeTree} from "./routeTree.gen"
import { FirebaseService } from './services/FirebaseService'
import { Provider } from 'react-redux'
import config from "../config/firebase-config.json"
import {SnackbarProvider} from "notistack"
import {store} from "./store"

const router = createRouter({routeTree})
FirebaseService.init(config)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SnackbarProvider>
  </StrictMode>,
)
