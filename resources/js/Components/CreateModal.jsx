import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { X, User, Mail, MapPin, Phone, Lock, Loader2 } from "lucide-react";
import { router } from "@inertiajs/react";

export default function RegisterModal() {
    const {
        isRegisterModalOpen,
        closeRegisterModal,
        openLoginModal,
        openTermnServicesModal,
    } = useModal();
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    if (!isRegisterModalOpen) return null;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        router.post("/register", form, {
            onSuccess: () => closeRegisterModal(),
            onError: (err) => {
                setErrors(err);
                setLoading(false);
            },
        });
    };

    const fields = [
        { name: "name", type: "text", placeholder: "Full name", icon: User },
        {
            name: "email",
            type: "email",
            placeholder: "Email address",
            icon: Mail,
        },
        { name: "address", type: "text", placeholder: "Address", icon: MapPin },
        {
            name: "phone",
            type: "text",
            placeholder: "Contact number",
            icon: Phone,
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
            }}
            onClick={closeRegisterModal}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Green accent bar */}
                <div className="h-1 w-full bg-green-500" />

                <div className="p-6 max-h-[90vh] overflow-y-auto">
                    {/* Close */}
                    <button
                        onClick={closeRegisterModal}
                        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all duration-200"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="mb-5">
                        <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                            <span className="text-lg">🏗️</span>
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900">
                            Create an account
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Join the KonstruKalakal community
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        {/* Single fields */}
                        {fields.map(
                            ({ name, type, placeholder, icon: Icon }) => (
                                <div key={name}>
                                    <div
                                        className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors duration-200 ${
                                            errors[name]
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-200 focus-within:border-green-400"
                                        }`}
                                    >
                                        <Icon
                                            size={14}
                                            className="text-gray-400 shrink-0"
                                        />
                                        <input
                                            name={name}
                                            type={type}
                                            placeholder={placeholder}
                                            onChange={handleChange}
                                            required
                                            className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                    {errors[name] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[name]}
                                        </p>
                                    )}
                                </div>
                            ),
                        )}

                        {/* Password row */}
                        <div className="grid grid-cols-2 gap-2">
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
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                        className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400 min-w-0"
                                    />
                                </div>
                            </div>
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
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="Confirm"
                                        onChange={handleChange}
                                        required
                                        className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400 min-w-0"
                                    />
                                </div>
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs -mt-1">
                                {errors.password}
                            </p>
                        )}

                        {/* Terms */}
                        <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer mt-1">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                onClick={openTermnServicesModal}
                                className="mt-0.5 rounded border-gray-300 text-green-500 focus:ring-green-400"
                            />
                            <span>
                                I agree to the{" "}
                                <span className="text-green-600 font-semibold">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-green-600 font-semibold">
                                    Privacy Policy
                                </span>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!agreed || loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-200 mt-1 active:scale-95
                disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                enabled:bg-green-500 enabled:hover:bg-green-600 enabled:text-white enabled:cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />{" "}
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Login link */}
                    <p className="text-center text-xs text-gray-500">
                        Already have an account?{" "}
                        <button
                            onClick={() => {
                                closeRegisterModal();
                                openLoginModal();
                            }}
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
