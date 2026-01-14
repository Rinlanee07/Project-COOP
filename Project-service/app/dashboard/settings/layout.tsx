"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Building, Settings as SettingsIcon } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "General", href: "/dashboard/settings", icon: SettingsIcon },
        { name: "Company Info", href: "/dashboard/settings/company", icon: Building },
        { name: "User Management", href: "/dashboard/settings/users", icon: User },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 min-h-[calc(100vh-100px)]">
            {/* Nested Sidebar */}
            <aside className="w-full md:w-64 bg-white rounded-lg border p-4 h-fit">
                <h2 className="font-semibold text-lg mb-4 px-2">Settings</h2>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                pathname === item.href
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Content Area */}
            <div className="flex-1 bg-white rounded-lg border p-6">
                {children}
            </div>
        </div>
    );
}
