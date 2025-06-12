"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md py-2 shadow-xl"
            : "bg-gray-900/80 backdrop-blur-sm py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                Shiranime
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/" icon="🏠">
                Home
              </NavLink>
              <NavLink href="/series" icon="📺">
                Series
              </NavLink>
              <NavLink href="/movie" icon="🎬">
                Movies
              </NavLink>
              <NavLink href="/popular" icon="🔥">
                Popular
              </NavLink>
              <NavLink href="/bookmark" icon="🔖">
                Bookmarks
              </NavLink>
              <SearchButton />
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center space-x-4">
              <SearchButton />
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-3">
            <MobileNavLink href="/" icon="🏠" onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/series" icon="📺" onClick={toggleMenu}>
              Series
            </MobileNavLink>
            <MobileNavLink href="/movie" icon="🎬" onClick={toggleMenu}>
              Movies
            </MobileNavLink>
            <MobileNavLink href="/popular" icon="🔥" onClick={toggleMenu}>
              Popular
            </MobileNavLink>
            <MobileNavLink href="/bookmark" icon="🔖" onClick={toggleMenu}>
              Bookmarks
            </MobileNavLink>
          </div>
        </div>
      </nav>

      {/* Padding untuk konten agar tidak tertutup navbar */}
      <div className="pt-16 md:pt-20"></div>
    </>
  );
};

// Komponen dengan TypeScript
// Komponen dengan TypeScript - Versi Diperbarui
const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center group font-medium text-gray-300 hover:text-cyan-400 transition-colors"
  >
    <span className="mr-2 text-lg">{icon}</span>
    {children}
  </Link>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  icon,
  children,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
  >
    <span className="mr-3 text-xl">{icon}</span>
    <span className="font-medium">{children}</span>
  </Link>
);

const SearchButton: React.FC = () => (
  <Link
    href="/search"
    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    aria-label="Search"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </Link>
);

export default NavBar;