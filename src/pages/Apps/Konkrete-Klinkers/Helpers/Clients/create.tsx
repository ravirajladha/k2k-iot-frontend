import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import { storeClientData } from '@/api/konkreteKlinkers/client';

const ClientCreation = () => {
    const userDetail = useSelector((state: IRootState) => state.auth.user);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { name: '', address: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Client Name is required';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Client Address is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await storeClientData({
                name: formData.name,
                address: formData.address
                // created_by will be added automatically by your backend middleware
            });

            console.log('Client created successfully:', response);
            navigate('/konkrete-klinkers/clients');
        } catch (error: any) {
            console.error('Error creating client:', error);
            setApiError(error.response?.data?.message || 'Failed to create client. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Clients', link: '/konkrete-klinkers/clients', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs 
                items={breadcrumbItems} 
                addButton={{ 
                    label: 'Back', 
                    link: '/konkrete-klinkers/clients', 
                    icon: <IconArrowBackward className="text-4xl" /> 
                }} 
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Client Creation</h5>
                </div>
                {apiError && (
                    <div className="alert alert-danger mb-5">
                        {apiError}
                    </div>
                )}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Client Name */}
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-1/4 pr-4">
                            Client Name
                        </label>
                        <input 
                            id="name" 
                            name="name" 
                            type="text" 
                            placeholder="Enter Client Name" 
                            className={`form-input flex-1 ${errors.name ? 'border-red-500' : ''}`} 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            disabled={isSubmitting}
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    {/* Client Address */}
                    <div className="flex items-center">
                        <label htmlFor="address" className="w-1/4 pr-4">
                            Client Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter Client Address"
                            className={`form-input flex-1 ${errors.address ? 'border-red-500' : ''}`}
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            rows={3}
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button 
                            type="submit" 
                            className="btn btn-success flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle"></span>
                            ) : (
                                <>
                                    <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Submit
                                </>
                            )}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger flex-1" 
                            onClick={() => navigate('/konkrete-klinkers/clients')}
                            disabled={isSubmitting}
                        >
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