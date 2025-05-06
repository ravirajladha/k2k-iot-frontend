import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import { useForm } from 'react-hook-form';
import { storePlantData } from '@/api/konkreteKlinkers/plant';

type FormValues = {
    plant_name: string;
    plant_code: string;
};

const PlantCreation = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = React.useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            const response = await storePlantData(data);
            navigate('/konkrete-klinkers/plants');
        } catch (error: any) {
            console.error('Error creating plant:', error);
            setApiError(error.response?.data?.message || 'Failed to create plant. Please try again.');
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
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/plants', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel mb-10">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Plant Creation</h5>
                </div>
                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="flex items-center">
                            <label htmlFor="plant_name" className="w-1/4 pr-4">
                                Plant Name
                            </label>
                            <input
                                id="plant_name"
                                type="text"
                                placeholder="Enter plant Name"
                                className={`form-input flex-1 ${errors.plant_name ? 'border-red-500' : ''}`}
                                {...register('plant_name', { required: 'Plant Name is required' })}
                            />
                        </div>
                    {errors.plant_name && <p className="text-red-500 text-sm mt-0">{errors.plant_name.message}</p>}
                        <div className="flex items-center">
                            <label htmlFor="plant_code" className="w-1/4 pr-4">
                                Plant Code
                            </label>
                            <input
                                id="plant_code"
                                type="text"
                                placeholder="Enter plant Name"
                                className={`form-input flex-1 ${errors.plant_code ? 'border-red-500' : ''}`}
                                {...register('plant_code', { required: 'Plant Name is required' })}
                            />
                        </div>
                    {errors.plant_code && <p className="text-red-500 text-sm mt-0">{errors.plant_code.message}</p>}

                    </div>

                    {/* Submit and Cancel Buttons */}
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
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/clients')} disabled={isSubmitting}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlantCreation;
