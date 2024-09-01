import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js"
import { RecoilRoot } from "recoil";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10bHV1eHV1ZnludGJhcG50dnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NTIzNDIsImV4cCI6MjAwMjMyODM0Mn0.2UkKK-L9Mx-Lq0_wtTJnGClu6bdgKaDnW7dcMTMNJLU");
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={client} >
        <RecoilRoot>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionContextProvider>
  </React.StrictMode>,
)
