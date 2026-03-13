import { useState } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { useModal } from "@/context/ModalContext";
import {
    ShoppingCart,
    Clock,
    LogOut,
    User,
    Menu,
    X,
    Bell,
    MessageCircle,
    Upload,
    Users,
    BarChart,
} from "lucide-react";

export default function Layout({ children }) {
    const { url } = usePage();
    const hideText = url === "/uploaded";
    const { openLoginModal, openRegisterModal } = useModal();
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showNotif, setShowNotif] = useState(true);
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);
    const { total } = usePage().props;
    const { totaling } = usePage().props;
    const { notifcount } = usePage().props;
    const { item } = usePage().props;

    return (
        <>
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="This is a description of the page"
                />
            </Head>
            <header>
                <nav className="w-full bg-white p-3  shadow-md px-4 md:px-10">
                    <div className="flex justify-between w-full  items-center">
                        {/* Left: Logo */}
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-8"
                            />
                            <Link
                                href="/"
                                className="text-green-700 font-bold text-lg"
                            >
                                Konstrukalakal
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-gray-700"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden ml-72 md:flex items-center justify-between w-full">
                            {!hideText ? (
                                <div className="flex space-x-6 text-black text-sm">
                                    <Link
                                        href="/"
                                        className="hover:text-green-600"
                                    >
                                        Home
                                    </Link>
                                    <div className="relative group">
                                        <Link
                                            href="/materials"
                                            className=" hover:text-green-600"
                                        >
                                            Materials
                                        </Link>
                                        <div className="absolute z-50   w-40 bg-white border rounded-md shadow-lg hidden group-hover:block">
                                            <Link
                                                href="/materials"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                            >
                                                All Materials
                                            </Link>
                                            <Link
                                                href="/trade-materials"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                            >
                                                Trade Materials
                                            </Link>
                                            <Link
                                                href="/buy-materials"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Buy Materials
                                            </Link>
                                            <Link
                                                href="/donate-materials"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Donate Materials
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        href="/about"
                                        className="hover:text-green-600"
                                    >
                                        About
                                    </Link>

                                    {auth.user &&
                                        auth.user.name !== "Admin" && (
                                            <Link href={`/cart`}>
                                                <button className="relative">
                                                    <ShoppingCart
                                                        className="text-gray-700 hover:text-green-600 cursor-pointer"
                                                        size={18}
                                                    />
                                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                                                        {total}
                                                    </span>
                                                </button>
                                            </Link>
                                        )}
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm"></p>
                            )}
                            {/* Desktop: Profile & Auth Buttons */}
                            <div className="flex items-center gap-3">
                                {auth.user && (
                                    <div className="flex">
                                        <Link href="/messages">
                                            <MessageCircle
                                                size={20}
                                                className="mr-2 text-blue-700 cursor-pointer hover:text-green-600"
                                            />
                                        </Link>

                                        <Link
                                            href="/notifications"
                                            className="relative group flex items-center"
                                            onMouseEnter={() =>
                                                setShowNotif(false)
                                            }
                                        >
                                            {/* Bell Icon */}
                                            {auth.user.name !== "Admin" && (
                                                <div className="relative">
                                                    <Bell
                                                        size={22}
                                                        className="text-yellow-400  transition-all duration-200 hover:text-green-600 hover:scale-110"
                                                    />
                                                    {notifcount > 0 && (
                                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                                                    )}
                                                </div>
                                            )}
                                            {/* Dropdown */}
                                            <div
                                                className="absolute right-0 top-full mt-2 z-50 w-80
             max-h-80 overflow-y-auto
             backdrop-blur-lg bg-white/90 border border-gray-200/60
             rounded-2xl shadow-xl hidden group-hover:block
             transition-all duration-200"
                                            >
                                                {item && item.length > 0 ? (
                                                    item
                                                        .slice(0, 5)
                                                        .map((notif, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-none hover:bg-white/60 transition-colors duration-150"
                                                            >
                                                                <img
                                                                    src={
                                                                        notif.image
                                                                            ? `/storage/${notif.image}`
                                                                            : "data:image/png;base64,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"
                                                                    }
                                                                    alt="Notification"
                                                                    className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200"
                                                                />
                                                                <p className="text-sm text-gray-700 leading-tight">
                                                                    {
                                                                        notif.message
                                                                    }
                                                                </p>
                                                            </div>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 text-center py-4">
                                                        No notifications yet
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                )}

                                {auth.user ? (
                                    <div className="relative group">
                                        <div className="flex   bg-green-600 p-1 rounded-full">
                                            <img
                                                src={
                                                    auth.user.profile_image
                                                        ? `/storage/${auth.user.profile_image}`
                                                        : "/images/user.png"
                                                }
                                                alt="Profile"
                                                className="w-6 h-6 mt-0.5 items-center rounded-full object-cover shadow-md"
                                            />

                                            <button className="bg-green-600 text-white text-sm px-2 py-1 rounded-full hover:bg-green-700">
                                                Hi,{" "}
                                                {auth.user.name.split(" ")[0]}
                                                {totaling > 0 && (
                                                    <span className="hover:hidden absolute -top-2 -right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                        {totaling}
                                                    </span>
                                                )}
                                            </button>
                                        </div>

                                        <div className="absolute right-0 mt-0.5 w-40 z-50 bg-white border rounded-md shadow-lg hidden group-hover:block">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                            >
                                                <User size={18} /> Profile
                                            </Link>
                                            {auth.user.name === "Admin" && (
                                                <Link
                                                    href="/admin/users"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left relative"
                                                >
                                                    <Users size={18} />
                                                    <div className="relative">
                                                        <span>User List</span>
                                                        {totaling > 0 && (
                                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                                {totaling}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            )}
                                            {auth.user.name === "Admin" && (
                                                <Link
                                                    href="/admin/reported"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left relative"
                                                >
                                                    <Users size={18} />
                                                    <div className="relative">
                                                        <span>Reported</span>
                                                    </div>
                                                </Link>
                                            )}

                                            {auth.user.name === "Admin" && (
                                                <Link
                                                    href="/admin/reported-item"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left relative"
                                                >
                                                    <ShoppingCart size={18} />
                                                    <div className="relative">
                                                        <span>
                                                            Reported Item
                                                        </span>
                                                    </div>
                                                </Link>
                                            )}

                                            {auth.user.name === "Admin" && (
                                                <Link
                                                    href="/admin/statistics"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left relative"
                                                >
                                                    <BarChart size={18} />
                                                    <div className="relative">
                                                        <span>Statistics</span>
                                                    </div>
                                                </Link>
                                            )}
                                            {auth.user.name !== "Admin" && (
                                                <Link
                                                    href="/uploaded"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left relative"
                                                >
                                                    <Upload size={18} />
                                                    <div className="relative">
                                                        <span>My Uploads</span>
                                                        {totaling > 0 && (
                                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                                {totaling}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>
                                            )}

                                            {auth.user.name !== "Admin" && (
                                                <Link
                                                    href="/history"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <Clock size={18} /> History
                                                </Link>
                                            )}
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                <LogOut size={18} /> Logout
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={openLoginModal}
                                            className="bg-green-600 cursor-pointer text-white text-sm px-4 py-1 rounded-full hover:bg-green-700"
                                        >
                                            Log In
                                        </button>
                                        <button
                                            onClick={openRegisterModal}
                                            className="bg-green-600 cursor-pointer text-white text-sm px-4 py-1 rounded-full hover:bg-green-700"
                                        >
                                            Register
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-2 border-t pt-2">
                            <div className="flex flex-col space-y-2 text-black text-sm">
                                <Link
                                    href="/"
                                    onClick={closeMobileMenu}
                                    className="hover:text-green-600"
                                >
                                    Home
                                </Link>

                                {/* Materials with sub-options */}
                                <Link
                                    href="/materials"
                                    onClick={closeMobileMenu}
                                    className="hover:text-green-600"
                                >
                                    Materials
                                </Link>
                                <div className="ml-3">
                                    <Link
                                        href="/trade-materials"
                                        onClick={closeMobileMenu}
                                        className="hover:text-green-600 text-gray-700"
                                    >
                                        Trade Materials
                                    </Link>
                                    <br />
                                    <Link
                                        href="/buy-materials"
                                        onClick={closeMobileMenu}
                                        className="hover:text-green-600 text-gray-700"
                                    >
                                        Buy Materials
                                    </Link>
                                    <br />
                                    <Link
                                        href="/donate-materials"
                                        onClick={closeMobileMenu}
                                        className="hover:text-green-600 text-gray-700"
                                    >
                                        Donate Materials
                                    </Link>
                                    <br />
                                </div>

                                <Link
                                    href="/about"
                                    onClick={closeMobileMenu}
                                    className="hover:text-green-600"
                                >
                                    About
                                </Link>

                                {auth.user && (
                                    <>
                                        {/* Cart */}
                                        <Link
                                            href="/cart"
                                            onClick={closeMobileMenu}
                                            className="relative flex items-center"
                                        >
                                            <ShoppingCart
                                                className="text-gray-700 hover:text-green-600"
                                                size={18}
                                            />
                                            <span className="ml-2 text-gray-700">
                                                Cart ({total})
                                            </span>
                                        </Link>

                                        {/* Messages */}
                                        <Link
                                            href="/messages"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                                        >
                                            <MessageCircle size={18} /> Messages
                                        </Link>

                                        {/* Notifications */}
                                        <Link
                                            href="/notifications"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600 relative"
                                        >
                                            <Bell size={18} /> Notifications
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile: Profile & Auth */}
                            <div className="mt-4 border-t pt-2">
                                {auth.user ? (
                                    <div className="flex flex-col space-y-2">
                                        <Link
                                            href="/profile"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                                        >
                                            <User size={18} /> Profile
                                        </Link>
                                        <Link
                                            href="/uploaded"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                                        >
                                            <Upload size={18} /> My Uploads
                                        </Link>
                                        <Link
                                            href="/history"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                                        >
                                            <Clock size={18} /> History
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                                        >
                                            <LogOut size={18} /> Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => {
                                                openLoginModal();
                                                closeMobileMenu();
                                            }}
                                            className="w-full bg-green-600 text-white text-sm py-2 rounded-full hover:bg-green-700"
                                        >
                                            Log In
                                        </button>
                                        <button
                                            onClick={() => {
                                                openRegisterModal();
                                                closeMobileMenu();
                                            }}
                                            className="w-full bg-green-600 text-white text-sm py-2 rounded-full hover:bg-green-700"
                                        >
                                            Register
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
