import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { role } from "@/constant/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { motion } from "framer-motion";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/track-parcel", label: "Track Parcel", role: "PUBLIC" },
];

export default function Navbar() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
  };

  const dashboardPath =
    userRole === role.admin
      ? "/admin"
      : userRole === role.sender
      ? "/sender"
      : userRole === role.receiver
      ? "/receiver"
      : null;

  const visibleLinks = navigationLinks;

  return (
    <motion.header
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Link
            to="/"
            className="text-3xl font-bold text-primary tracking-tight"
          >
            Trust<span className="text-blue-600">Track</span>
          </Link>
        </motion.div>

        {/* Links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {visibleLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.href}
                    className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="text-gray-500">Loading...</span>
          ) : data?.data?.email ? (
            <div className="flex items-center gap-3">
              {dashboardPath && (
                <Link
                  to={dashboardPath}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
              )}
              <Button
                variant="destructive"
                size="sm"
                className="shadow hover:opacity-90 transition"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow">
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
