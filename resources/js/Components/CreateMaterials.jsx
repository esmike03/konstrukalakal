import { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { X, UploadCloud } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function CreateMaterials() {
    const { isMaterialOpen, closeMaterialModal } = useModal();
    const [agreed, setAgreed] = useState(false);

    const handleCheckboxChange = () => {
        setAgreed(!agreed);
    };
    const [form, setForm] = useState({
        materialName: "",
        location: "",
        category: "",
        condition: "",
        availability: "",
        price: "",
        quantity: "",
        description: "",
        forbdt: "",
        image: null, // Store selected file
    });
    const isPriceDisabled = form.forbdt === "Trade" || form.forbdt === "Donation";
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle text input changes
    const handleChange = (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            if (file) {
                setForm({ ...form, image: file });
                setImagePreview(URL.createObjectURL(file)); // Preview selected image
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        router.post('/materials/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setLoading(false);
                closeMaterialModal();
            },
            onError: (errorResponse) => {
                setErrors(errorResponse);
                setLoading(false);
            },
        });
    };

    if (!isMaterialOpen) return null;

    return (
        <div className="fixed inset-0 text-sm flex items-center justify-center bg-gray-700/70 backdrop-blur-xs">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">


                {/* Form */}
                <form onSubmit={handleSubmit} className="">
                                {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div className='flex gap-3'>
                                    <h2 className="text-lg font-bold text-gray-600">Upload Material</h2>
                                    <div>
                                        <select name="forbdt" onChange={handleChange} className="w-fit p-1 px-2 border text-gray-500 text-xs border-gray-400 rounded-lg">
                                            <option value="">Choose</option>
                                            <option value="Sale">Sale</option>
                                            <option value="Trade">Trade</option>
                                            <option value="Donation">Donation</option>
                                        </select>
                                        {errors.forbdt && <p className="text-red-500 text-xs mt-1">{errors.forbdt}</p>}
                                    </div>

                                </div>

                                <button onClick={closeMaterialModal} className="text-gray-600 hover:text-gray-900">
                                    <X size={20} />
                                </button>
                            </div>
                    <div className="grid grid-cols-2 gap-x-2">
                        <div>
                            <input name="materialName" type="text" placeholder="Material Name" onChange={handleChange} className="w-full p-2 border text-xs border-gray-400 rounded-lg mb-3" />
                            {errors.materialName && <p className="text-red-500 text-xs mt-1">{errors.materialName}</p>}
                        </div>

                        <div>
                            <input name="location" type="text" placeholder="Location" onChange={handleChange} className="w-full text-xs p-2 border border-gray-400 rounded-lg mb-3" />
                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </div>

                        <div>
                            <div>
                                <select name="category" onChange={handleChange} className="w-full p-2 border text-gray-500 text-xs border-gray-400 rounded-lg mb-3">
                                    <option value="">Category</option>
                                    <option value="Wood">Wood</option>
                                    <option value="Metal">Metal</option>
                                    <option value="Roofing">Roofing</option>
                                    <option value="Structural Materials">Structural Materials</option>
                                    <option value="Concrete & Cement">Concrete & Cement</option>
                                    <option value="Insulation">Insulation</option>
                                    <option value="Doors & Windows">Doors & Windows</option>

                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <select name="condition" onChange={handleChange} className="w-full p-2 border text-gray-500 text-xs border-gray-400 rounded-lg mb-3">
                                    <option value="">Condition</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Like New">Like New</option>
                                    <option value="New">New</option>
                                    <option value="Salvageable">Salvageable</option>
                                </select>
                                {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
                            </div>

                        </div>
                        <div>
                            <textarea name="description" placeholder="Description" onChange={handleChange} className="text-xs w-full p-2 border border-gray-400 rounded-lg mb-3"></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>


                        <div>
                                <div>
                                    <select name="availability" onChange={handleChange} className="w-full p-2 border text-gray-500 text-xs border-gray-400 rounded-lg mb-3">
                                        <option value="">Availability</option>
                                        <option value="Few">Few</option>
                                        <option value="More">More</option>
                                    </select>
                                    {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                                </div>

                                <div>
                                    <input name="price" type="text" placeholder="Price" onChange={handleChange} disabled={isPriceDisabled} className={`w-full text-xs p-2 border border-gray-400 rounded-lg mb-3
        ${isPriceDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`} />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>

                            <div>
                                <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} className="w-full text-xs p-2 border border-gray-400 rounded-lg mb-3" />
                                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                            </div>


                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="border-dashed border-2 border-gray-300 p-3 flex flex-col items-center justify-center text-gray-600 rounded-lg cursor-pointer">
                                <UploadCloud size={22} />
                                <p className="mt-2 text-xs text-center">Click to upload an image</p>
                                <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
                            </label>

                            <div>
                                {imagePreview && (
                                    <div className="mt-2 w-full justify-center flex">
                                        <img src={imagePreview} alt="Preview" className="w-16 mt-2 rounded-lg" />
                                    </div>
                                )}
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            </div>
                            {/* Preview Image */}

                        </div>

                    </div>

                    {/* Confirmation */}
                    <div className="flex items-center mt-1">
                        <input checked={agreed}
                            onChange={handleCheckboxChange} type="checkbox" name="confirmation" className="mr-2" required />
                        <p className="text-xs text-gray-500">I confirm that this material information is accurate and I have the right to list it.</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end mt-4 gap-2">
                        <button type="button" onClick={closeMaterialModal} className="text-gray-500 px-4 py-2 rounded-full hover:bg-gray-300">
                            {loading ? 'Cancel' : 'Cancel'}
                        </button>
                        <button type="submit" disabled={!agreed}
                            className={`w-full text-sm py-2 rounded-full mt-1 transition-colors duration-200
                            ${agreed ? 'bg-green-600 hover:bg-green-700 cursor-pointer text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                            {loading ? 'Uploading...' : 'Upload Material'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
