"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiPhone } from "react-icons/fi";
import MobileMenu from "./mobileMenu";
import { practiceInfo } from "../app/utils/config";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex gap-3 items-center min-w-0 flex-1 mr-2">
          <Image src="/images/Logo.jpeg" alt={`${practiceInfo.name} logo`} width={48} height={48} className="w-12 h-12 object-contain flex-shrink-0" />
          <span className="text-xl font-bold text-primary truncate">{practiceInfo.name}</span>
        </Link>

        <nav className="space-x-6 hidden md:flex items-center flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition font-medium ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition font-medium"
          >
            Book Appointment
          </Link>
        </nav>

        {/* Mobile: phone icon shortcut + hamburger */}
        <div className="flex items-center gap-1 md:hidden flex-shrink-0">
          <a
            href={`tel:${practiceInfo.phone.replace(/\s/g, "")}`}
            className="p-2 rounded-md text-primary"
            aria-label={`Call ${practiceInfo.name}`}
          >
            <FiPhone className="w-5 h-5" />
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
