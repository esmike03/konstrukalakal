import { useState } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { useModal } from "@/context/ModalContext";
import { ShoppingCart, LogOut, User, Menu, X, Bell, MessageCircle, Upload } from "lucide-react";

export default function Layout({ children }) {
  const { openLoginModal, openRegisterModal } = useModal();
  const { auth } = usePage().props;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const { cartItemCount } = usePage().props;
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
          <div className="flex justify-between items-center">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8" />
              <Link href="/" className="text-green-700 font-bold text-lg">
                Konstrukalakal
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-700">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden ml-72 md:flex items-center justify-between w-full">
              <div className="flex space-x-6 text-black text-sm">
                <Link href="/" className="hover:text-green-600">
                  Home
                </Link>
                <div className="relative group">
                    <Link href="/materials" className=" hover:text-green-600">
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
                  <Link href="/about" className="hover:text-green-600">
                    About
                  </Link>
                {auth.user && (
                    <Link href={`/cart`}>
                        <button className="relative">
                        <ShoppingCart
                        className="text-gray-700 hover:text-green-600 cursor-pointer"
                        size={18}
                        />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        {cartItemCount}
                        </span>
                    </button>

                    </Link>

                )}
              </div>

              {/* Desktop: Profile & Auth Buttons */}
              <div className="flex items-center gap-3">
              {auth.user && (
                <div className="flex">
                    <MessageCircle size={20} className="mr-2 text-gray-700 cursor-pointer hover:text-green-600"/>

                    <div className="relative group">
                    <Bell size={20} className="mr-2 text-gray-700 cursor-pointer hover:text-green-600"/>
                    <div className="absolute z-50   w-40 bg-white border rounded-md shadow-lg hidden group-hover:block">
                        <p className="text-xs px-3 p-1 text-center">No New Notifications</p>
                    </div>
                  </div>
                </div>
              )}


                {auth.user ? (
                  <div className="relative group">
                  <div className="flex bg-green-600 p-1 rounded-full">
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
                        Hi, {auth.user.name.split(" ")[0]}
                        </button>
                  </div>

                    <div className="absolute right-0 mt-0.5 w-40 bg-white border rounded-md shadow-lg hidden group-hover:block">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      >
                        <User size={18} /> Profile
                      </Link>
                      <Link
                        href="/uploaded"

                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                      >
                        <Upload size={18} /> My Uploads
                      </Link>
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
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 border-t pt-2">
              <div className="flex flex-col space-y-2 text-black text-sm">
                <Link href="/" onClick={closeMobileMenu} className="hover:text-green-600">
                  Home
                </Link>
                <Link href="/materials" onClick={closeMobileMenu} className="hover:text-green-600">
                  Materials
                </Link>
                    <div className="ml-3 ">
                        <Link href="/trade-materials" onClick={closeMobileMenu} className=" hover:text-green-600 text-gray-700">
                            Trade Materials
                        </Link><br></br>
                        <Link href="/buy-materials" onClick={closeMobileMenu} className="hover:text-green-600 text-gray-700">
                            Buy Materials
                        </Link><br></br>
                        <Link href="/donate-materials" onClick={closeMobileMenu} className="hover:text-green-600 text-gray-700">
                            Donate Materials
                        </Link><br></br>
                    </div>
                <Link href="/about" onClick={closeMobileMenu} className="hover:text-green-600">
                  About
                </Link>
                {auth.user && (
                  <button onClick={closeMobileMenu} className="relative flex items-center">
                    <ShoppingCart className="text-gray-700 hover:text-green-600" size={18} />
                    <span className="ml-2 text-gray-700">Cart (0)</span>
                  </button>
                )}
              </div>
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
                      method="post"
                      as="button"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 text-gray-800 text-sm hover:text-green-600"
                    >
                      <Upload size={18} /> My Uploads
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
