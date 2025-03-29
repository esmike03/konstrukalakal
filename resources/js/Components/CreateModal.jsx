import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { X } from 'lucide-react';
import { router, Link } from '@inertiajs/react';

export default function RegisterModal() {
    const { isRegisterModalOpen, closeRegisterModal, openLoginModal } = useModal();
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        contact: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/register', form, {
            onSuccess: () => closeRegisterModal(),
        });
    };

    if (!isRegisterModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800/60 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 max-w-md relative">
                {/* Close Button */}
                <button onClick={closeRegisterModal} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-900">Create an Account</h2>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required
                        className="text-sm w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />
                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required
                        className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />
                    <input name="address" type="text" placeholder="Address" onChange={handleChange} required
                        className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />
                    <input name="contact" type="text" placeholder="Contact No." onChange={handleChange} required
                        className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                    />

                    <div className="flex gap-3">
                        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
                            className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                        />
                        <input name="password_confirmation" type="password" placeholder="Confirm Password" onChange={handleChange} required
                            className="text-sm w-full mt-3 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>


                    <button type="submit" className="w-full bg-green-600 text-white text-sm py-2 rounded-full mt-4 hover:bg-green-700">
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-xs text-gray-600 mt-4">
                    Already have an account? <Link  onClick={(e) => {
                        e.preventDefault();
                        closeRegisterModal(); // Close Register modal
                        openLoginModal(); // Open Login modal
                    }}  className="text-green-600 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}
