"use client";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container flex items-center justify-end px-8 py-4">
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
