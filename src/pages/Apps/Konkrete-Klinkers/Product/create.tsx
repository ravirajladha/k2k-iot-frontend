import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { Controller, useForm } from 'react-hook-form';
import { storeProductData } from '@/api/konkreteKlinkers/product';
import { useNavigate } from 'react-router-dom';
import { fetchPlantData } from '@/api/konkreteKlinkers/plant';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
interface FormValues {
    plant: string;
    materialCode: string;
    description: string;
    piecesPerPunch: string;
    uom: string;
    qtyInBundle: string;
    area: string;
}

const ProductCreationForm = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [plantOptions, setPlantOptions] = useState<{ value: string; label: string }[]>([]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            uom: 'Square Metre/No',
        },
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Product'));
    });
    const [showTooltip, setShowTooltip] = useState(false);

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

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await storeProductData({
                plant: data.plant,
                material_code: data.materialCode,
                description: data.description,
                uom: data.uom,
                area: data.area,
                no_of_pieces_per_punch: data.piecesPerPunch,
                qty_in_bundle: data.qtyInBundle,
            });
            navigate('/konkrete-klinkers/products');
        } catch (error: any) {
            console.error('Error creating product:', error);
            setApiError(error.response?.data?.message || 'Failed to create product. Please try again.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: ' Products', link: '/konkrete-klinkers/products', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/products', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="font-semibold text-lg dark:text-white-light">Product Creation Form</h5>
                    <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 relative"
                    >
                        <span className="flex items-center">
                            <IconInfoCircle className="me-2" />
                        </span>
                        {showTooltip && (
                            <div className="absolute top-0 right-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg">
                                <ul>
                                    <li>The product UOM have serious dependency on the calculation of the product master data.</li>
                                    <li>...</li>
                                    <li>...</li>
                                </ul>
                            </div>
                        )}
                    </button>
                </div>
                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="client">Plant</label>
                            <Controller
                                control={control}
                                name="plant"
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
                            {errors.plant && <p className="text-red-500 text-sm">{errors.plant.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="materialCode">Material Code</label>
                            <input
                                id="materialCode"
                                type="text"
                                placeholder="Enter Material Code"
                                className={`form-input flex-1 ${errors.materialCode ? 'border-red-500' : ''}`}
                                {...register('materialCode', { required: 'Machine Name is required' })}
                            />
                            {errors.materialCode && <p className="text-red-500 text-sm">{errors.materialCode.message}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter Description"
                                className={`form-input flex-1 ${errors.description ? 'border-red-500' : ''}`}
                                rows={4}
                                {...register('description', { required: 'Description is required' })}
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        {/* No. of Pieces Per Punch */}
                        <div>
                            <label htmlFor="piecesPerPunch">No. of Pieces Per Punch</label>
                            <input
                                id="piecesPerPunch"
                                type="number"
                                placeholder="Enter No. of Pieces Per Punch"
                                className={`form-input flex-1 ${errors.piecesPerPunch ? 'border-red-500' : ''}`}
                                {...register('piecesPerPunch', { required: 'No. of Pieces Per Punch is required' })}
                            />
                            {errors.piecesPerPunch && <p className="text-red-500 text-sm">{errors.piecesPerPunch.message}</p>}
                        </div>

                        {/* UOM */}
                        <div>
                            <label htmlFor="uom">UOM</label>
                            <input id="uom" type="text" className={`form-input flex-1 ${errors.uom ? 'border-red-500' : ''}`} {...register('uom', { required: 'UOM is required' })} readOnly />
                            {errors.uom && <p className="text-red-500 text-sm">{errors.uom.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="area">Area per Unit (Sqmt)</label>
                            <input
                                id="area"
                                type="number"
                                step="0.01"
                                placeholder="Enter Area"
                                className={`form-input flex-1 ${errors.area ? 'border-red-500' : ''}`}
                                {...register('area', { required: 'Area is required' })}
                            />
                            {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="qtyInBundle">Qty in Bundle</label>
                            <input
                                id="qtyInBundle"
                                type="number"
                                placeholder="Enter Qty in Bundle"
                                className={`form-input flex-1 ${errors.qtyInBundle ? 'border-red-500' : ''}`}
                                {...register('qtyInBundle', { required: 'Qty In Bundle is required' })}
                            />
                            {errors.qtyInBundle && <p className="text-red-500 text-sm">{errors.qtyInBundle.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
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
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/products')} disabled={isSubmitting}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreationForm;
