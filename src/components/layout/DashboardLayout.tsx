import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";
import { HomeIcon } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import ScrollToTopButton from "./ScrollToTopButton";

export default function DashboardLayout() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data as { name?: string; email?: string; role?: TRole };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Link to="/">
              <Button variant="outline" size="sm">
                <HomeIcon className="mr-1 h-4 w-4" /> Home
              </Button>
            </Link>
          </div>

          {user?.email && (
            <div className="flex items-center gap-3 text-sm">
              {user.role && (
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                  {user.role}
                </span>
              )}
              <div className="text-right">
                {user.name && (
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                    {user.name}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 sm:text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Main dashboard content */}
        <main className="flex flex-1 flex-col px-4 py-6">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6">
            <Outlet />
          </div>
        </main>

        <ScrollToTopButton />
      </SidebarInset>
    </SidebarProvider>
  );
}
