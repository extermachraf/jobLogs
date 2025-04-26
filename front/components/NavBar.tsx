"use client";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IoStatsChart } from "react-icons/io5";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/templates", label: "Templates" },
  ];

  if (!mounted) {
    return (
      <div className="container flex items-center justify-between px-8 py-4 shadow-md">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="h-6 w-16 bg-muted/20 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="w-8 h-[1.15rem]" /> {/* Placeholder for Switch */}
        <div className="h-6 w-16 bg-muted/20 rounded animate-pulse" />{" "}
        {/* Placeholder for Logo */}
      </div>
    );
  }

  return (
    <div className="fixed container z-50 bg-background flex items-center justify-between px-8 py-4 shadow-md dark:shadow-white/10">
      <Link href="/" className="flex items-center space-x-2">
        <IoStatsChart className="text-2xl text-primary" />
        <span className="text-lg font-bold text-primary">JobLogs</span>
      </Link>
      <nav className="flex items-center justify-center space-x-6">
        <div className="flex items-center justify-between gap-28">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex items-center space-x-4">
        <Switch
          id="theme-toggle"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    </div>
  );
};

export default NavBar;
