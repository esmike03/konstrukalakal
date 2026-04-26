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
    ChevronDown,
} from "lucide-react";

export default function Layout({ children }) {
    const { url } = usePage();
    const { openLoginModal, openRegisterModal } = useModal();
    const { auth, total, totaling, notifcount, item } = usePage().props;
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showMaterials, setShowMaterials] = useState(false);

    const hideText = url === "/uploaded";

    const MATERIALS_LINKS = [
        { href: "/materials", label: "All Materials" },
        { href: "/trade-materials", label: "Trade Materials" },
        { href: "/buy-materials", label: "Buy Materials" },
        { href: "/donate-materials", label: "Donate Materials" },
    ];

    const ADMIN_LINKS = [
        {
            href: "/admin/users",
            label: "User List",
            icon: Users,
            badge: totaling,
        },
        { href: "/admin/reported", label: "Reported Users", icon: Users },
        {
            href: "/admin/reported-item",
            label: "Reported Items",
            icon: ShoppingCart,
        },
        { href: "/admin/statistics", label: "Statistics", icon: BarChart },
    ];

    const USER_LINKS = [
        {
            href: "/uploaded",
            label: "My Uploads",
            icon: Upload,
            badge: totaling,
        },
        { href: "/history", label: "History", icon: Clock },
    ];

    return (
        <>
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="KonstruKalakal - Sustainable construction material exchange"
                />
            </Head>

            <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
                <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="h-7"
                        />
                        <span className="text-green-600 font-extrabold text-base tracking-tight">
                            KonstruKalakal
                        </span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    {!hideText && (
                        <div className="hidden md:flex items-center gap-6 text-sm">
                            <Link
                                href="/"
                                className={`transition-colors duration-200 ${url === "/" ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}`}
                            >
                                Home
                            </Link>

                            {/* Materials dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors duration-200">
                                    Materials <ChevronDown size={14} />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {MATERIALS_LINKS.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`block px-4 py-2.5 text-xs transition-colors duration-150 ${url === href ? "bg-green-50 text-green-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-green-600"}`}
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/about"
                                className={`transition-colors duration-200 ${url === "/about" ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}`}
                            >
                                About
                            </Link>

                            {/* Cart */}
                            {auth.user && auth.user.name !== "Admin" && (
                                <Link
                                    href="/cart"
                                    className="relative text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    <ShoppingCart size={18} />
                                    {total > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {total}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>
                    )}

                    {/* ── Desktop right actions ── */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth.user && (
                            <>
                                {/* Messages */}
                                <Link
                                    href="/messages"
                                    className="text-gray-500 hover:text-green-600 transition-colors"
                                >
                                    <MessageCircle size={18} />
                                </Link>

                                {/* Notifications */}
                                {auth.user.name !== "Admin" && (
                                    <div className="relative group">
                                        <button className="relative text-gray-500 hover:text-green-600 transition-colors">
                                            <Bell size={18} />
                                            {notifcount > 0 && (
                                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            )}
                                        </button>
                                        {/* Notif dropdown */}
                                        <div className="absolute right-0 top-full mt-2 w-72 max-h-72 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 pt-3 pb-2">
                                                Notifications
                                            </p>
                                            {item && item.length > 0 ? (
                                                item
                                                    .slice(0, 5)
                                                    .map((notif, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-3 px-4 py-3 border-t border-gray-50 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <img
                                                                src={
                                                                    notif.image
                                                                        ? `/storage/${notif.image}`
                                                                        : "/images/user.png"
                                                                }
                                                                alt=""
                                                                className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100"
                                                            />
                                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                                {notif.message}
                                                            </p>
                                                        </div>
                                                    ))
                                            ) : (
                                                <p className="text-xs text-center text-gray-400 py-6">
                                                    No notifications yet
                                                </p>
                                            )}
                                            <Link
                                                href="/notifications"
                                                className="block text-center text-xs text-green-600 font-semibold py-2.5 border-t border-gray-100 hover:bg-green-50 transition-colors"
                                            >
                                                View all →
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Profile dropdown / Auth buttons */}
                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200">
                                    <img
                                        src={
                                            auth.user.profile_image
                                                ? `/storage/${auth.user.profile_image}`
                                                : "/images/user.png"
                                        }
                                        alt="Profile"
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-white text-xs font-semibold">
                                        Hi, {auth.user.name.split(" ")[0]}
                                    </span>
                                    {totaling > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {totaling}
                                        </span>
                                    )}
                                </button>

                                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    >
                                        <User size={14} /> Profile
                                    </Link>

                                    {auth.user.name === "Admin"
                                        ? ADMIN_LINKS.map(
                                              ({
                                                  href,
                                                  label,
                                                  icon: Icon,
                                                  badge,
                                              }) => (
                                                  <Link
                                                      key={href}
                                                      href={href}
                                                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors relative"
                                                  >
                                                      <Icon size={14} /> {label}
                                                      {badge > 0 && (
                                                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                              {badge}
                                                          </span>
                                                      )}
                                                  </Link>
                                              ),
                                          )
                                        : USER_LINKS.map(
                                              ({
                                                  href,
                                                  label,
                                                  icon: Icon,
                                                  badge,
                                              }) => (
                                                  <Link
                                                      key={href}
                                                      href={href}
                                                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors relative"
                                                  >
                                                      <Icon size={14} /> {label}
                                                      {badge > 0 && (
                                                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                              {badge}
                                                          </span>
                                                      )}
                                                  </Link>
                                              ),
                                          )}

                                    <div className="border-t border-gray-100">
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 w-full transition-colors"
                                        >
                                            <LogOut size={14} /> Logout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openLoginModal}
                                    className="text-xs font-semibold text-green-600 border border-green-200 px-4 py-1.5 rounded-full hover:bg-green-50 transition-all duration-200"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={openRegisterModal}
                                    className="text-xs font-semibold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-full transition-all duration-200"
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── Mobile hamburger ── */}
                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </nav>

                {/* ── Mobile menu ── */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-1">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/about", label: "About" },
                        ].map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Materials accordion */}
                        <button
                            onClick={() => setShowMaterials(!showMaterials)}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
                        >
                            <span>Materials</span>
                            <ChevronDown
                                size={14}
                                className={`transition-transform ${showMaterials ? "rotate-180" : ""}`}
                            />
                        </button>
                        {showMaterials && (
                            <div className="ml-4 flex flex-col gap-0.5">
                                {MATERIALS_LINKS.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {auth.user && (
                            <>
                                <Link
                                    href="/cart"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <ShoppingCart size={15} /> Cart
                                    {total > 0 && (
                                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5">
                                            {total}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/messages"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <MessageCircle size={15} /> Messages
                                </Link>
                                <Link
                                    href="/notifications"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Bell size={15} /> Notifications
                                    {notifcount > 0 && (
                                        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                </Link>
                            </>
                        )}

                        <div className="border-t border-gray-100 mt-2 pt-2">
                            {auth.user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <User size={15} /> Profile
                                    </Link>
                                    {auth.user.name !== "Admin" && (
                                        <Link
                                            href="/uploaded"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <Upload size={15} /> My Uploads
                                        </Link>
                                    )}
                                    <Link
                                        href="/history"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Clock size={15} /> History
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
                                    >
                                        <LogOut size={15} /> Logout
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            openLoginModal();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full py-2 rounded-full border border-green-200 text-green-600 text-sm font-semibold hover:bg-green-50 transition-all"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => {
                                            openRegisterModal();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full py-2 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main>{children}</main>
        </>
    );
}
