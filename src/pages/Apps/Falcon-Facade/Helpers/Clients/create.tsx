import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const ClientCreation = () => {
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
            newErrors.name = 'Client Name is required';
            isValid = false;
        }

        if (!formData.address) {
            newErrors.address = 'Client Address is required';
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
            const response = await fetch(`${baseURL}/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create client');
            }
            console.log('Client created successfully');
            navigate('/clients');
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Clients', link: '/clients', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/clients', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Client Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Client Name */}
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-1/4 pr-4">
                            Client Name
                        </label>
                        <input id="name" name="name" type="text" placeholder="Enter Client Name" className="form-input flex-1" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    {/* Client Address */}
                    {/* Client Address */}
                    <div className="flex items-center">
                        <label htmlFor="clientAddress" className="w-1/4 pr-4">
                            Client Address
                        </label>
                        <textarea
                            id="clientAddress"
                            name="clientAddress"
                            placeholder="Enter Client Address"
                            className="form-input flex-1"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/clients')}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientCreation;
