import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";

export default function Navbar() {
    return (
        <div className="w-full flex items-center justify-between border-b border-gray-200 pb-4 py-2">
            {/* LEFT */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="w-6 h-6 md:w-9 md:h-9"
                />
                <p className="hidden md:block text-md font-medium tracking-wider">Shopify</p>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/">
                    <Home className="w-6 h-6 text-gray-600" />
                </Link>
                <Bell className="w-6 h-6 text-gray-600" />
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <Link href="/login">Sign in</Link>
            </div>
        </div>
    );
}
