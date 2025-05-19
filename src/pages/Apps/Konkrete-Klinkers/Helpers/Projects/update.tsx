import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { fetchClientData } from '@/api/konkreteKlinkers/client';
import { fetchProjectById, updateProjectData } from '@/api/konkreteKlinkers/project';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import CustomLoader from '@/components/Loader';

type FormValues = {
    client: string;
    name: string;
    address: string;
};

const ProjectUpdate = () => {
    const { id } = useParams(); // Get project ID from URL
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [clientOptions, setClientOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    useEffect(() => {
        const init = async () => {
            try {
                // Load clients
                const clients = await fetchClientData();
                const clientMapped = clients.map((client: any) => ({
                    value: client._id,
                    label: client.name,
                }));
                setClientOptions(clientMapped);

                // Load project
                if (id) {
                    const data = await fetchProjectById(id);
                    reset({
                        client: data.client?._id || '',
                        name: data.name || '',
                        address: data.address || '',
                    });
                }
            } catch (error: any) {
                setApiError(error.response?.data?.message || 'Failed to load data.');
            }finally {
                setLoading(false);
            }
        };

        init();
    }, [id, reset]);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await updateProjectData(id as string, {
                name: data.name,
                client: data.client,
                address: data.address,
            });
            navigate('/konkrete-klinkers/projects');
        } catch (error: any) {
            console.error('Update failed:', error);
            setApiError(error.response?.data?.message || 'Failed to update project.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Projects', link: '/konkrete-klinkers/projects', isActive: false },
        { label: 'Edit', link: '#', isActive: true },
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
                    <h5 className="font-semibold text-lg">Update Project</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}
                {loading ? (
                    <CustomLoader />
                ) : (

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Client Dropdown */}
                    <div className="flex items-center">
                        <label htmlFor="client" className="w-1/4 pr-4">
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
                                    value={clientOptions.find(opt => opt.value === field.value)}
                                    onChange={(option) => field.onChange(option?.value)}
                                />
                            )}
                        />
                    </div>
                    {errors.client && <p className="text-red-500 text-sm">{errors.client.message}</p>}

                    {/* Project Name */}
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-1/4 pr-4">Project Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Project Name"
                            className={`form-input flex-1 ${errors.name ? 'border-red-500' : ''}`}
                            {...register('name', { required: 'Project Name is required' })}
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    {/* Project Address */}
                    <div className="flex items-center">
                        <label htmlFor="address" className="w-1/4 pr-4">Project Address</label>
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
                                    Update
                                </>
                            )}
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/projects')} disabled={isSubmitting}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
};

export default ProjectUpdate;
