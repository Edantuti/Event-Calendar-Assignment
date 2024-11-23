import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "./pages/login-page.tsx";
import { RegisterPage } from "./pages/register-page.tsx";
import { DashboardPage } from "./pages/dashboard-page.tsx";
import { TestPage } from "./pages/test-page.tsx";
import UserProvider from "./contexts/user-context.tsx";
import CalendarProvider from "./contexts/calendar-context.tsx";
import EventsProvider from "./contexts/events-context.tsx";
import { HomePage } from "./pages/home-page.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/dash" element={<DashboardPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventsProvider>
      <CalendarProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </CalendarProvider>
    </EventsProvider>
  </StrictMode>,
);
