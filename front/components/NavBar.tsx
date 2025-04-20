"use client";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container flex items-center justify-end px-8 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-[1.15rem]" /> {/* Placeholder for Switch */}
        </div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-end px-8 py-4 fixed z-40 ">
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
