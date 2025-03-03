import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store/store";
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';

const ProductCreationPage = () => {
    const baseURL = import.meta.env.VITE_APP_SERVER_URL;
    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';
    const navigate = useNavigate();

    // Fake data for systems and product systems
    const fakeSystems = [
        { value: 'system1', label: 'System 1' },
        { value: 'system2', label: 'System 2' },
        { value: 'system3', label: 'System 3' },
        { value: 'system4', label: 'System 4' },
    ];

    const fakeProductSystems = {
        system1: [
            { value: 'productSystem1', label: 'Product System 1' },
            { value: 'productSystem2', label: 'Product System 2' },
        ],
        system2: [
            { value: 'productSystem3', label: 'Product System 3' },
            { value: 'productSystem4', label: 'Product System 4' },
        ],
        system3: [
            { value: 'productSystem5', label: 'Product System 5' },
            { value: 'productSystem6', label: 'Product System 6' },
        ],
        system4: [
            { value: 'productSystem7', label: 'Product System 7' },
            { value: 'productSystem8', label: 'Product System 8' },
        ],
    };

    const [formData, setFormData] = useState({
        system: '',
        productSystem: '',
        productName: '',
    });

    const [errors, setErrors] = useState({
        system: '',
        productSystem: '',
        productName: '',
    });

    const [availableProductSystems, setAvailableProductSystems] = useState<any[]>([]);

    // Handle changes in the system selection
    const handleSystemChange = (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, system: selectedOption.value, productSystem: '' }));
        setAvailableProductSystems(fakeProductSystems[selectedOption.value] || []);
    };

    // Handle changes in the product system selection
    const handleProductSystemChange = (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, productSystem: selectedOption.value }));
    };

    // Handle changes in product name input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate the form before submission
    const validateForm = () => {
        const newErrors = { system: '', productSystem: '', productName: '' };
        let isValid = true;

        if (!formData.system) {
            newErrors.system = 'System is required';
            isValid = false;
        }

        if (!formData.productSystem) {
            newErrors.productSystem = 'Product System is required';
            isValid = false;
        }

        if (!formData.productName) {
            newErrors.productName = 'Product Name is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userId = userDetail._id;
            const response = await fetch(`${baseURL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            console.log('Product created successfully');
            navigate('/falcon-facade/products');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Products', link: '/falcon-facade/products', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/falcon-facade/products',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Product</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Select System */}
                    <div className="flex items-center">
                        <label htmlFor="system" className="w-1/4 pr-4">Select System</label>
                        <Select
                            id="system"
                            value={formData.system ? { value: formData.system, label: formData.system } : null}
                            onChange={handleSystemChange}
                            options={fakeSystems}
                            className="custom-select flex-1"
                            classNamePrefix="custom-select"
                            placeholder="Select a System"
                            isClearable
                            required
                        />
                    </div>
                    {errors.system && <p className="text-red-500 text-sm">{errors.system}</p>}

                    {/* Select Product System */}
                    <div className="flex items-center">
                        <label htmlFor="productSystem" className="w-1/4 pr-4">Select Product System</label>
                        <Select
                            id="productSystem"
                            value={formData.productSystem ? { value: formData.productSystem, label: formData.productSystem } : null}
                            onChange={handleProductSystemChange}
                            options={availableProductSystems}
                            className="custom-select flex-1"
                            classNamePrefix="custom-select"
                            placeholder="Select a Product System"
                            isClearable
                            required
                        />
                    </div>
                    {errors.productSystem && <p className="text-red-500 text-sm">{errors.productSystem}</p>}

                    {/* Product Name */}
                    <div className="flex items-center">
                        <label htmlFor="productName" className="w-1/4 pr-4">Product Name</label>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            placeholder="Enter Product Name"
                            className="form-input flex-1"
                            value={formData.productName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/falcon-facade/products')}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreationPage;
