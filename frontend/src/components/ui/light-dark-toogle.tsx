"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

function LightDarkToogle() {
    const [theme, setTheme] = useState<string>(() => {
        return typeof window !== "undefined" && localStorage.getItem("theme") === "dark" ? "dark" : "light";
    });

    // Apply theme change
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div>
            <Toggle
                variant="outline"
                className="group cursor-pointer size-8 md:size-11 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
                pressed={theme === "dark"}
                onPressedChange={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
                <Moon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
                    aria-hidden="true"
                />
                <Sun
                    size={16}
                    strokeWidth={2}
                    className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
                    aria-hidden="true"
                />
            </Toggle>
        </div>
    );
}

export { LightDarkToogle };
