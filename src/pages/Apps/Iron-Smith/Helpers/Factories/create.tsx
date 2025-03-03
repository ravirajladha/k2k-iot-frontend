import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from "@/store/store"
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import Select from 'react-select';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';

const ProjectCreation = () => {
    const baseURL = import.meta.env.VITE_APP_SERVER_URL;
    const userDetail = useSelector((state: IRootState) => state.auth.user) || 'Guest User';

    console.log("userdetaila", baseURL)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });

    const clientOptions = [
        { value: 'client1', label: 'Plant 1' },
        { value: 'client2', label: 'Plant 2' },
        { value: 'client3', label: 'Plant 3' },
        // Add more clients as needed
    ];

    const [selectedClient, setSelectedClient] = useState<{ value: string; label: string } | null>(null);

    const handleClientChange = (selectedOption: { value: string; label: string } | null) => {
        setSelectedClient(selectedOption);
    };

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Example API call to create a project
            const userId = userDetail._id;
            const response = await fetch(`${baseURL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Pass the token here
                },
                body: JSON.stringify({ ...formData, created_by: userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }
            console.log('Project created successfully');
            navigate('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Helpers', link: '/', isActive: false },
        { label: 'Factories', link: '/factories', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    const customStyles = {
        control: (base: any) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                border: 'none',
            },
            '&:focus': {
                border: 'none',
                boxShadow: 'none',
            },
        }),
        input: (base: any) => ({
            ...base,
            outline: 'none',
        }),
    };


    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/factories' , icon: <IconArrowBackward className="text-4xl" /> }}
                />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Factory Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                        <div className="flex items-center">
                            <label htmlFor="clientName" className="w-1/4 pr-4">Plant Name</label>
                            <Select
                                id="clientName"
                                name="clientName"
                                options={clientOptions}
                                onChange={handleClientChange}
                                className="form-input flex-1"
                                placeholder="Select Plant"
                                isClearable
                                styles={customStyles}

                            />
                        </div>


                        <div className="flex items-center">
                            <label htmlFor="name" className="w-1/4 pr-4">Factory Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Factory Name"
                                className="form-input flex-1"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="address" className="w-1/4 pr-4">Factory Address</label>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="Enter Factory Address"
                                className="form-input flex-1"
                                value={formData.address}
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
                        <Link to="/projects" className="flex-1">
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

export default ProjectCreation;
