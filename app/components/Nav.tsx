'use client';

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "HOME", shortcut: "H" },
  { href: "/works", label: "WORKS", shortcut: "W" },
  { href: "/about", label: "ABOUT", shortcut: "A" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const item = navItems.find((n) => n.shortcut.toLowerCase() === e.key.toLowerCase());
      if (item) router.push(item.href);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-black">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 items-center justify-center gap-3 px-4 py-3 font-mono text-sm border-r border-[#2a2a2a] hover:bg-[#111111] transition-colors ${
                isActive ? "text-white bg-white/10" : "text-[#7a7a7a] "
              }`}
            >
              {item.label}
              <div className="hidden md:flex border border-[#2a2a2a] px-2 py-1 text-[11px] text-[#7a7a7a]">
                {item.shortcut}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
