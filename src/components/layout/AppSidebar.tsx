import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

import { Link } from "react-router";
import { getSidebarItems } from "@/ults/getSidebarItems";
import { useAppDispatch } from "@/redux/hook";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  // console.log(userInfo);

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
  };

  return (
    <Sidebar {...props} className="border-r border-slate-200">
      <SidebarHeader className="p-4 pt-6">
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-700 tracking-tighter"
        >
          TrustTrack
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-2 px-2">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup className="p-0">
              <SidebarGroupLabel
                asChild
                className="group/label text-slate-500 hover:text-blue-600 text-[11px] font-bold uppercase tracking-widest px-4 py-3"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="h-10 text-[15px] font-medium transition-all hover:bg-blue-50 hover:text-blue-700 px-4 active:scale-[0.98]"
                        >
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-100 p-4">
        <Button
          type="button"
          variant="ghost"
          size="default"
          className="w-full justify-start text-[15px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
