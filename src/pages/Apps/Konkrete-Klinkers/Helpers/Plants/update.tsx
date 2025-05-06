import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconSave from '@/components/Icon/IconSave';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import { useForm } from 'react-hook-form';
import { fetchPlantById, updatePlantData } from '@/api/konkreteKlinkers/plant';
import CustomLoader from '@/components/Loader';

type FormValues = {
    plant_name: string;
    plant_code: string;
};

const PlantEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const plant = await fetchPlantById(id);
                reset({
                    plant_name: plant.plant_name,
                    plant_code: plant.plant_code,
                });
            } catch (error: any) {
                console.error('Error fetching plant:', error);
                setApiError(error.response?.data?.message || 'Failed to load plant data.');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPlant();
    }, [id, reset]);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await updatePlantData(id!, data);
            navigate('/konkrete-klinkers/plants');
        } catch (error: any) {
            console.error('Error updating plant:', error);
            setApiError(error.response?.data?.message || 'Failed to update plant. Please try again.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Plants', link: '/konkrete-klinkers/helpers/plants', isActive: false },
        { label: 'Edit', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/plants',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="panel mb-10">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Edit Plant</h5>
                </div>
                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}
                {loading ? (
                    <CustomLoader />
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="flex items-center">
                                <label htmlFor="plant_name" className="w-1/4 pr-4">
                                    Plant Name
                                </label>
                                <input
                                    id="plant_name"
                                    type="text"
                                    placeholder="Enter Plant Name"
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
                                    placeholder="Enter Plant Code"
                                    className={`form-input flex-1 ${errors.plant_code ? 'border-red-500' : ''}`}
                                    {...register('plant_code', { required: 'Plant Code is required' })}
                                />
                            </div>
                            {errors.plant_code && <p className="text-red-500 text-sm mt-0">{errors.plant_code.message}</p>}
                        </div>

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
                            <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/plants')} disabled={isSubmitting}>
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

export default PlantEdit;
