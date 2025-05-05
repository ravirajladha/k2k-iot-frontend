import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getClientById, updateClientData } from '@/api/konkreteKlinkers/client';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import CustomLoader from '@/components/Loader';

type FormValues = {
    name: string;
    address: string;
};

const ClientUpdate = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await getClientById(id);
                setValue('name', data.name);
                setValue('address', data.address);
            } catch (error: any) {
                setApiError('Failed to fetch client details.');
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id, setValue]);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await updateClientData(id, data);
            navigate('/konkrete-klinkers/clients');
        } catch (error: any) {
            console.error('Error updating client:', error);
            setApiError(error.response?.data?.message || 'Failed to update client. Please try again.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Clients', link: '/konkrete-klinkers/clients', isActive: false },
        { label: 'Edit', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/clients',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Edit Client</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}
                {loading ? (
                    <CustomLoader />
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Client Name */}
                        <div className="flex items-center">
                            <label htmlFor="name" className="w-1/4 pr-4">
                                Client Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Client Name"
                                className={`form-input flex-1 ${errors.name ? 'border-red-500' : ''}`}
                                {...register('name', { required: 'Client Name is required' })}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                        {/* Client Address */}
                        <div className="flex items-center">
                            <label htmlFor="address" className="w-1/4 pr-4">
                                Client Address
                            </label>
                            <textarea
                                id="address"
                                placeholder="Enter Client Address"
                                className={`form-input flex-1 ${errors.address ? 'border-red-500' : ''}`}
                                {...register('address', { required: 'Client Address is required' })}
                                rows={3}
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
                            <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/clients')} disabled={isSubmitting}>
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

export default ClientUpdate;
