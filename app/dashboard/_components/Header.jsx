"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Questions", href: "/dashboard/questions" },
  { label: "Upgrade", href: "/dashboard/upgrade" },
  { label: "How it Works?", href: "/dashboard/howitworks" },
];

const Header = () => {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/60 bg-neutral-950/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.svg"
              width={22}
              height={22}
              alt="AI Interview Mocker"
              className="brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              AI Interview Mocker
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300">
              PRO
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                path === item.href
                  ? "bg-neutral-800/80 text-white border border-neutral-700/60 shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-indigo-300 transition-colors"
          >
            <Sparkles className="size-3 text-indigo-400" />
            <span>Home</span>
          </Link>
          <div className="p-0.5 rounded-full bg-neutral-900 border border-neutral-800">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
