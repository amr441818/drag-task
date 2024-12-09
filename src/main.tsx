import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './store/index.tsx'
import routes from './routes/router.tsx'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter(routes)
import { RouterProvider } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}> <RouterProvider router={router}/></Provider>
  </StrictMode>,
)