import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./components/layout/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-slate-600">
              Loading application...
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
      <Toaster richColors position="top-center" />
    </ReduxProvider>
  </StrictMode>,
);
