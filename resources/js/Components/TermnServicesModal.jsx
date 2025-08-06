import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { X } from 'lucide-react';
import { router, Link } from '@inertiajs/react';

export default function TermnServicesModal() {
    const { isTermnServicesModalOpen, closeTermnServicesModal } = useModal();

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        router.post('/register', form, {
            onSuccess: () => closeTermnServicesModal(),
            onError: (errorResponse) => {
                setErrors(errorResponse);
                setLoading(true);
            }
        });
    };

    if (!isTermnServicesModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800/60 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 max-w-md relative">
                {/* Close Button */}


                {/* Title */}
                <h2 className="text-xl font-bold text-center text-gray-900">Term of Services and Privacy Policy</h2>
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 text-sm mb-2 mt-5">Terms of Service</h3>
                    <p className="text-xs text-gray-700">
                        By using our platform, you agree to abide by the following terms. You are responsible for maintaining the confidentiality of your account and password. You agree not to misuse the service, and you acknowledge that we reserve the right to suspend or terminate your access if any abuse is detected. We may update these terms occasionally, and continued use of the platform implies acceptance of the changes.
                    </p>
                </div>

                {/* Privacy Policy */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 text-sm  mb-2">Privacy Policy</h3>
                    <p className="text-xs text-gray-700">
                        We collect your personal data solely for providing and improving our services. This includes your name, email, address, and other required information. We will not sell, rent, or share your information with third parties without your consent, except where required by law. You have the right to access, modify, or delete your data at any time.
                    </p>
                </div>

                <p className="text-center text-xs text-gray-600 mt-4">
                    <Link  onClick={(e) => {
                        e.preventDefault();
                        closeTermnServicesModal(); // Close Register modal
                        openLoginModal(); // Open Login modal
                    }}  className="text-green-600 text-xl hover:underline"> I Understand</Link>
                </p>
            </div>
        </div>
    );
}
