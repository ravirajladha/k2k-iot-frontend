import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import { fetchPlantData } from '@/api/konkreteKlinkers/plant';
import { fetchMachineById, storeMachineData, updateMachineData } from '@/api/konkreteKlinkers/machine';
import CustomLoader from '@/components/Loader';

type FormValues = {
    plant_id: string;
    name: string;
};

const MachineUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [plantOptions, setPlantOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlants = async () => {
            const options = await fetchPlantData();
            const plantData = options.map((plant: any) => ({
                value: plant._id,
                label: `${plant.plant_name} - ${plant.plant_code}`,
            }));
            setPlantOptions(plantData);
        };
        fetchPlants();
    }, []);

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
                const options = await fetchPlantData();
                const plantData = options.map((plant: any) => ({
                    value: plant._id,
                    label: `${plant.plant_name} - ${plant.plant_code}`,
                }));
                setPlantOptions(plantData);

                if (id) {
                    const data = await fetchMachineById(id);
                    reset({
                        plant_id: data.plant_id._id || '',
                        name: data.name || '',
                    });
                }
            } catch (error: any) {
                setApiError(error.response?.data?.message || 'Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [id, reset]);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await updateMachineData(id, {
                name: data.name,
                plant_id: data.plant_id,
            });
            navigate('/konkrete-klinkers/machines');
        } catch (error: any) {
            console.error('Error creating machine:', error);
            setApiError(error.response?.data?.message || 'Failed to create machine. Please try again.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Machines', link: '/konkrete-klinkers/machines', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/machines',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Machine Update</h5>
                </div>

                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}
                {loading ? (
                    <CustomLoader />
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Plant Dropdown */}
                        <div className="flex items-center">
                            <label htmlFor="plant_id" className="w-1/4 pr-4">
                                Plant Name
                            </label>
                            <Controller
                                control={control}
                                name="plant_id"
                                rules={{ required: 'Plant is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={plantOptions}
                                        placeholder="Select Plant"
                                        className="flex-1"
                                        value={plantOptions.find((option) => option.value === field.value)}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                    />
                                )}
                            />
                        </div>
                        {errors.plant_id && <p className="text-red-500 text-sm">{errors.plant_id.message}</p>}

                        {/* Machine Name */}
                        <div className="flex items-center">
                            <label htmlFor="machineName" className="w-1/4 pr-4">
                                Machine Name
                            </label>
                            <input
                                id="machineName"
                                type="text"
                                placeholder="Enter Machine Name"
                                className={`form-input flex-1 ${errors.name ? 'border-red-500' : ''}`}
                                {...register('name', { required: 'Machine Name is required' })}
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
                            <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/machines')} disabled={isSubmitting}>
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

export default MachineUpdate;
