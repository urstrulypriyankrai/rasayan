"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavBarLinks = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const path = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Setting",
      active: path === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav
      {...props}
      className={cn(
        "flex items-center justify-center space-x-4 lg:space-x-6 ",
        className
      )}
    >
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route?.label}
          </Link>
        );
      })}
    </nav>
  );
};
export default NavBarLinks;
