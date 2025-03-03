import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Select from 'react-select';

// interface FormData {
//     member: string;
//     files: ImageListType;
//     bar_mark: string;
//     shape_code: string;
// }

interface FormData {
    member: string;
    shape_code: string;
    clientName: string;
    dimension: string;
    files: ImageListType;
}

const alphabetOptions = Array.from({ length: 26 }, (_, i) => ({
    value: String.fromCharCode(65 + i), // A-Z
    label: String.fromCharCode(65 + i), // A-Z
}));

const ProductCreationForm: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Product'));
    }, [dispatch]);
    const [showTooltip, setShowTooltip] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        member: "",
        shape_code: "",
        clientName: "",
        dimension: "",
        files: [],
    });


    const alphabetOptions = Array.from({ length: 26 }, (_, i) => ({
        value: String.fromCharCode(65 + i), // A-Z
        label: `Upto ${String.fromCharCode(65 + i)}`, // A-Z with "Upto" prefix
    }));


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };




    const handleSelectChange = (selectedOption: any, field: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Products', link: '/iron-smith/product', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];
    const maxNumber = 5;

    return (

        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/iron-smith/products', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <div className="panel relative">
                {/* Header Section */}
                <div className="mb-5 flex justify-between items-center">
                    <h5 className="font-semibold text-lg">Create Product</h5>

                    {/* Tooltip Button (Aligned to Right) */}
                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 flex items-center"
                        >
                            <IconInfoCircle className="me-2" />
                        </button>

                        {/* Tooltip (Right Aligned) */}
                        {showTooltip && (
                            <div className="absolute top-1/2 left-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg transform -translate-y-1/2">
                                <ul>
                                    <li>Lorem, ipsum.</li>
                                    <li>...</li>
                                    <li>...</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                        <div>
                        <label htmlFor="member">Select Dimension</label>

                            <Select
                                id="dimension"
                                value={
                                    formData.dimension
                                        ? { value: formData.dimension, label: formData.dimension }
                                        : null
                                }
                                onChange={(selectedOption) => handleSelectChange(selectedOption, "dimension")}
                                options={alphabetOptions}
                                className="custom-select"
                                classNamePrefix="custom-select"
                                placeholder="Select Dimension (A-Z)"
                                isClearable
                                required
                            />
                        </div>
                        {/* Member */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="member">Description</label>
                            <input
                                id="member"
                                name="member"
                                type="text"
                                placeholder="Enter Description"
                                className="form-input"
                                value={formData.member}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Bar Mark */}
                        {/* <div>
                            <label htmlFor="bar_mark">Shape Code</label>
                            <input
                                id="bar_mark"
                                name="bar_mark"
                                type="text"
                                placeholder="Enter Bar Mark"
                                className="form-input"
                                value={formData.bar_mark}
                                onChange={handleInputChange}
                            />
                        </div> */}

                        {/* Shape Code */}
                        <div>
                            <label htmlFor="shape_code">Shape Code</label>
                            <input
                                id="shape_code"
                                name="shape_code"
                                type="text"
                                placeholder="Enter Shape Code"
                                className="form-input"
                                value={formData.shape_code}
                                onChange={handleInputChange}
                            />
                        </div>



                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            {/* Image */}
                            <div>
                            <label htmlFor="shape_code">Uplaod Shape Image</label>

                                {/* File Upload Section */}
                                <ImageUploading
                                    multiple
                                    value={formData.files}
                                    onChange={handleFileChange}
                                    maxNumber={maxNumber}
                                >
                                    {({ imageList, onImageUpload, onImageRemove }) => (
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-primary mb-2 flex items-center space-x-2"
                                                onClick={onImageUpload}
                                            >
                                                <IconFile className="shrink-0" />
                                                <span>Upload</span>
                                            </button>
                                            <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={image.dataURL}
                                                            alt="uploaded"
                                                            className="w-full h-32 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    </div>

                    {/* Qty in Nos Per Bundle */}

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-success w-1/2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="submit" className="btn btn-danger w-1/2">
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreationForm;
