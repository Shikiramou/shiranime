"use client"
import Link from "next/link"
import { useState } from "react"

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <nav className="relative z-50 md:px-8 xl:px-0 backdrop-blur-sm px-5 left-0 right-0 bg-[#0F1117]">
                <div className="flex items-center justify-between mx-auto xl:w-5/6">
                    {/* Search icon moved to left for mobile */}
                    <Link href="/Search" className="md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:h-8 md:w-8"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
                    </Link>
                    
                    {/* Centered title for mobile, left-aligned for desktop */}
                    <Link href="/" className="text-cyan-300 font-bold text-xl py-4 md:mr-auto md:ml-0 mx-auto xl:px-4">Shiranime</Link>
                    
                    <div className="flex items-center gap-x-5">
                        {/* Search icon for desktop */}
                        <Link href="/Search" className="hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:h-8 md:w-8"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
                        </Link>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1.5" 
                            stroke="currentColor" 
                            className="inline-block cursor-pointer w-7 h-7 md:h-8 md:w-8"
                            onClick={toggleMenu}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"></path>
                        </svg>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute z-40 w-full bg-[rgba(15,15,15,.9)] text-neutral-200 backdrop-blur-sm top-0 pt-[3.75rem] transition opacity-100 translate-y-0">
                    <div className="py-3 mx-auto xl:w-4/5">
                        <Link href="/" className="flex items-center gap-1 group block px-6 py-3 font-semibold capitalize w-full hover:bg-[#ece48b] hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex items-center w-4 h-4 text-base transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                            </svg>
                            <span className="flex items-center w-4 h-4 text-base transition-colors">home</span>
                        </Link>
                        
                        <Link href="/series" className="flex items-center gap-1 group block px-6 py-3 font-semibold capitalize w-full hover:bg-[#ece48b] hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex items-center w-4 h-4 text-base transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"></path>
                            </svg>
                            <span className="flex items-center w-4 h-4 text-base transition-colors">series</span>
                        </Link>
                        
                        <Link href="/movie" className="flex items-center gap-1 group block px-6 py-3 font-semibold capitalize w-full hover:bg-[#ece48b] hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex items-center w-4 h-4 text-base transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"></path>
                            </svg>
                            <span className="flex items-center w-4 h-4 text-base transition-colors">movie</span>
                        </Link>
                        
                        <Link href="/popular" className="flex items-center gap-1 group block px-6 py-3 font-semibold capitalize w-full hover:bg-[#ece48b] hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex items-center w-4 h-4 text-base transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                            </svg>
                            <span className="flex items-center w-4 h-4 text-base transition-colors">popular</span>
                        </Link>
                        
                        <Link href="/bookmark" className="flex items-center gap-1 group block px-6 py-3 font-semibold capitalize w-full hover:bg-[#ece48b] hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex items-center w-4 h-4 text-base transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"></path>
                            </svg>
                            <span className="flex items-center w-4 h-4 text-base transition-colors">bookmark</span>
                        </Link>
                        
                        <div className="pt-3 text-xs text-center text-neutral-400">
                            <p>©2024 - 2025 Norime | Powered by Jikan API</p>
                            <p>Develeoped by <a className="text-[#ece48b] font-semibold" href="https://github.com/ArtaHendraa">ArtaHendraa</a></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar