"use client"

import * as React from "react"
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Logo from '../../logo/logo2.svg'





// Navigation items with TypeScript interfaces
interface SubNavItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  submenu?: boolean;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services", submenu: true, 
    subItems: [
      { name: "Interior Remodeling", path: "/services/interior-remodeling" },
      { name: "Painting", path: "/services/painting" },
      { name: "Electrical", path: "/services/electrical" },
      { name: "Wallpaper", path: "/services/wallpaper" },
      { name: "Cleaning", path: "/services/cleaning" },
      { name: "Plumbing", path: "/services/plumbing" },
      { name: "Repairs", path: "/services/repairs" },
    ]
  },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 w-full flex justify-center z-50 p-4">
      <nav className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow-lg backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        {/* Desktop Menu */}
        <div className="flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold">
            <Image  src={Logo} 
            alt="Logo" 
            width={50} 
            height={50} 
            className="object-cover h-10"
            />
            {/* <h2 className="font-geist font-medium">WESTSIDE RENOVATION INC</h2> */}
          </Link>
          
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Regular nav items */}
            {navItems.filter(item => !item.submenu).map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Services with NavigationMenu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {navItems.filter(item => item.submenu).map((item) => (
                    <React.Fragment key={item.path}>
                      <NavigationMenuTrigger 
                        className={cn(
                          "rounded-md text-sm",
                          isActive(item.path) 
                            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" 
                            : "text-gray-600 dark:text-gray-300"
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.subItems?.map((subItem) => (
                            <li key={subItem.path}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.path}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    pathname === subItem.path
                                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </React.Fragment>
                  ))}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-3 space-y-1.5">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg ${
                          isActive(item.path)
                            ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {servicesOpen && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className={`block px-4 py-2 text-xs rounded-lg ${
                                pathname === subItem.path
                                  ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block px-4 py-2 text-sm rounded-lg ${
                        isActive(item.path)
                          ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;