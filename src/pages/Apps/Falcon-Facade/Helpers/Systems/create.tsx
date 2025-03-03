import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store/store";
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const ProductSystemCreation = () => {
    const baseURL = import.meta.env.VITE_APP_SERVER_URL;
    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = { name: '', address: '' };
        let isValid = true;

        if (!formData.name) {
            newErrors.name = 'Product System Name is required';
            isValid = false;
        }

        if (!formData.address) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userId = userDetail._id;
            const response = await fetch(`${baseURL}/product-systems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create product system');
            }
            console.log('Product system created successfully');
            navigate('/falcon-facade/product-systems');
        } catch (error) {
            console.error('Error creating product system:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Product Systems', link: '/falcon-facade/product-systems', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/falcon-facade/product-systems', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg"> System Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Product System Name */}
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-1/4 pr-4"> System Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter Name"
                            className="form-input flex-1"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                   

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/falcon-facade/product-systems')}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductSystemCreation;
