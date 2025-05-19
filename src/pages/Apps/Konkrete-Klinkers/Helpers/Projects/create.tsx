import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import { storeProjectData } from '@/api/konkreteKlinkers/project';
import { fetchClientData } from '@/api/konkreteKlinkers/client';

type FormValues = {
    client: string;
    name: string;
    address: string;
};

const ProjectCreation = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [clientOptions, setClientOptions] = useState<{ value: string; label: string }[]>([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    useEffect(() => {
        const fetchClients = async () => {
            const options = await fetchClientData();
            const clientData = options.map((client: any) => ({
                value: client._id,
                label: client.name,
            }));
            setClientOptions(clientData);
        };
        fetchClients();
    }, []);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await storeProjectData({
                name: data.name,
                client: data.client,
                address: data.address,
            });
            navigate('/konkrete-klinkers/projects');
        } catch (error: any) {
            console.error('Error creating project:', error);
            setApiError(error.response?.data?.message || 'Failed to create project. Please try again.');
        }
    };

        const breadcrumbItems = [
            { label: 'Home', link: '/', isActive: false },
            { label: 'Projects', link: '/konkrete-klinkers/projects', isActive: false },
            { label: 'Create', link: '#', isActive: true },
        ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/projects',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Project Creation</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Client Dropdown */}
                    <div className="flex items-center">
                        <label htmlFor="clientId" className="w-1/4 pr-4">
                            Client Name
                        </label>
                        <Controller
                            control={control}
                            name="client"
                            rules={{ required: 'Client is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={clientOptions}
                                    placeholder="Select Client"
                                    className="flex-1"
                                    value={clientOptions.find((option) => option.value === field.value)}
                                    onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                />
                            )}
                        />
                    </div>
                    {errors.client && <p className="text-red-500 text-sm">{errors.client.message}</p>}

                    {/* Project Name */}
                    <div className="flex items-center">
                        <label htmlFor="projectName" className="w-1/4 pr-4">
                            Project Name
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            placeholder="Enter Project Name"
                            className={`form-input flex-1 ${errors.name ? 'border-red-500' : ''}`}
                            {...register('name', { required: 'Project Name is required' })}
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    {/* Project Address */}
                    <div className="flex items-center">
                        <label htmlFor="address" className="w-1/4 pr-4">
                            Project Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Enter Project Address"
                            className={`form-input flex-1 ${errors.address ? 'border-red-500' : ''}`}
                            {...register('address', { required: 'Project Address is required' })}
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                    {/* Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle"></span>
                            ) : (
                                <>
                                    <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Submit
                                </>
                            )}
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/projects')} disabled={isSubmitting}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreation;
