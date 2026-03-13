import { useModal } from "@/context/ModalContext";
import { router, Link } from "@inertiajs/react";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginModal() {
    const { isLoginModalOpen, closeLoginModal, openRegisterModal } = useModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    if (!isLoginModalOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        router.post(
            "/login",
            { email, password },
            {
                onSuccess: () => closeLoginModal(),
                onError: (err) => {
                    setErrors(err);
                    setLoading(false);
                },
            },
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
            }}
            onClick={closeLoginModal}
        >
            <div
                className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Green accent top bar */}
                <div className="h-1 w-full bg-green-500" />

                <div className="p-6">
                    {/* Close */}
                    <button
                        onClick={closeLoginModal}
                        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all duration-200"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                            <span className="text-lg">🏗️</span>
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900">
                            Welcome back
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Sign in to your KonstruKalakal account
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        {/* Email */}
                        <div>
                            <div
                                className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors duration-200 ${
                                    errors.email
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 focus-within:border-green-400"
                                }`}
                            >
                                <Mail
                                    size={14}
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div
                                className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors duration-200 ${
                                    errors.password
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-200 focus-within:border-green-400"
                                }`}
                            >
                                <Lock
                                    size={14}
                                    className="text-gray-400 shrink-0"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-green-500 focus:ring-green-400"
                                />
                                Remember me
                            </label>
                            <a
                                href="#"
                                className="text-xs text-green-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-bold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />{" "}
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Sign up */}
                    <p className="text-center text-xs text-gray-500">
                        Don't have an account?{" "}
                        <button
                            onClick={() => {
                                closeLoginModal();
                                openRegisterModal();
                            }}
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Sign up free
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
