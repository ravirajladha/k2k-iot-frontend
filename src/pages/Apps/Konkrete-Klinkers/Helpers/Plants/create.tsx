import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store/store"
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const ClientCreation = () => {
    const baseURL = import.meta.env.VITE_APP_SERVER_URL;
    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

    console.log("userdetaila", baseURL)
    const [formData, setFormData] = useState({
        name: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Example API call to create a client
            const userId = userDetail._id;
            const response = await fetch(`${baseURL}/konkreteKlinkers/helpers/plants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Pass the token here
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create plant');
            }
            console.log('Client created successfully');
            navigate('/clients');
        } catch (error) {
            console.error('Error creating plant:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Plants', link: '/konkrete-klinkers/helpers/plants', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/konkrete-klinkers/plants' , icon: <IconArrowBackward className="text-4xl" /> }}
                />
            <div className="panel mb-10">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Plant Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <label htmlFor="name" className="w-1/4 pr-4">Plant Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Plant Name"
                                className="form-input flex-1"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="name" className="w-1/4 pr-4">Plant Code</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Plant Code"
                                className="form-input flex-1"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4 mt-6">
                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success flex-1">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>

                        {/* Cancel Button */}
                        <Link to="/clients" className="flex-1">
                            <button type="button" className="btn btn-danger w-full">
                                <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Cancel
                            </button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default ClientCreation;
