import { useModal } from "@/context/ModalContext";
import { X, FileText, Shield, CreditCard } from "lucide-react";

export default function TermnServicesModal() {
    const { isTermnServicesModalOpen, closeTermnServicesModal } = useModal();

    if (!isTermnServicesModalOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
            }}
            onClick={closeTermnServicesModal}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Green accent bar */}
                <div className="h-1 w-full bg-green-500" />

                <div className="p-6 max-h-[85vh] flex flex-col">
                    {/* Close */}
                    <button
                        onClick={closeTermnServicesModal}
                        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all duration-200"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-3">
                            <FileText size={18} className="text-green-600" />
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900">
                            Terms & Privacy Policy
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Please read before creating your account
                        </p>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
                        {/* Terms of Service */}
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText
                                    size={14}
                                    className="text-green-600"
                                />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                    Terms of Service
                                </h3>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                By using our platform, you agree to abide by the
                                following terms. You are responsible for
                                maintaining the confidentiality of your account
                                and password. You agree not to misuse the
                                service, and you acknowledge that we reserve the
                                right to suspend or terminate your access if any
                                abuse is detected. We may update these terms
                                occasionally, and continued use of the platform
                                implies acceptance of the changes.
                            </p>
                        </div>

                        {/* Mode of Payment */}
                        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                                <CreditCard
                                    size={14}
                                    className="text-green-600"
                                />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                    Mode of Payment
                                </h3>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Our platform currently supports{" "}
                                <span className="font-bold text-green-700">
                                    Cash on Delivery (COD)
                                </span>{" "}
                                as the primary payment method. This means you
                                can pay for your order directly to the delivery
                                personnel upon receiving your item. Please
                                ensure that the exact payment amount is prepared
                                at the time of delivery.
                            </p>
                        </div>

                        {/* Privacy Policy */}
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield size={14} className="text-green-600" />
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                                    Privacy Policy
                                </h3>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                We collect your personal data solely for
                                providing and improving our services. This
                                includes your name, email, address, and other
                                required information. We will not sell, rent, or
                                share your information with third parties
                                without your consent, except where required by
                                law. You have the right to access, modify, or
                                delete your data at any time.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-4" />

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={closeTermnServicesModal}
                            className="flex-1 py-2.5 rounded-full text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={closeTermnServicesModal}
                            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200"
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
