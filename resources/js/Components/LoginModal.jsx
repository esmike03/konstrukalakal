import { useModal } from '@/context/ModalContext';
import { router, Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function LoginModal() {
    const { isLoginModalOpen, closeLoginModal, openRegisterModal } = useModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    if (!isLoginModalOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        router.post('/login', { email, password }, {
            onSuccess: () => {
                closeLoginModal(); // Close modal on success
            },
            onError: (errorResponse) => {
                setErrors(errorResponse);
                setLoading(false);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-800/60 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/4 max-w-md relative">
                {/* Close Button */}
                <button onClick={closeLoginModal} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-900">Welcome Back</h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-sm w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                        <label className="flex items-center text-xs">
                            <input type="checkbox" className="mr-2 text-xs" /> Remember me
                        </label>
                        <a href="#" className="text-green-600 hover:underline text-xs">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white text-sm py-2 rounded-full mt-4 hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-xs text-gray-600 mt-4">Don’t have an account? <Link  onClick={(e) => {
                    e.preventDefault();
                    closeLoginModal(); // Close Register modal
                    openRegisterModal(); // Open Login modal
                }}  className="text-green-600 hover:underline">Sign Up</Link></p>

            </div>
        </div>
    );
}
