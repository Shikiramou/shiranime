import Link from "next/link"

const NavBar = () => {
    return (
        <nav className="relative z-50 md:px-8 xl:px-0 backdrop-blur-sm px-5 left-0 right-0 bg-blue-500">
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block cursor-pointer w-7 h-7 md:h-8 md:w-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"></path></svg>
                </div>
            </div>
        </nav>
    )
}

export default NavBar