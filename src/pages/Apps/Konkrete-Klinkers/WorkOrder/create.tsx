import React, { useEffect, useState } from 'react';
import IconX from '@/components/Icon/IconX';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconFile from '@/components/Icon/IconFile';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import { addAlert } from '@/store/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { fetchClientData } from '@/api/konkreteKlinkers/client';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchPlantsByProduct, fetchProjectsByClientId, storeWorkOrderData } from '@/api/konkreteKlinkers/workOrder';
import { fetchProductData } from '@/api/konkreteKlinkers/product';
import { uniqueId } from 'lodash';
import FileUploader from '@/components/FileUploader';

interface ProductOption {
    label: string;
    value: string;
    plant: { plant_code: string; plant_name: string };
    area: number;
}

interface UOMOption {
    label: string;
    value: string;
}

interface Item {
    id: string; // or number depending on your key logic
    product: ProductOption | null;
    uom: string;
    originalQuantity: number | string;
    convertedQuantity?: number | string;
    plantCode: string;
    deliveryDate?: string;
}
interface UploadedFile {
    file?: File;
    preview: string;
    id?: string;
}

interface FormValues {
    client: string;
    project: string;
    workOrderNumber: string;
    workOrderDate: string;
    uploads: UploadedFile[];
    bufferStock: boolean;
    items: Item[];
}

const Create = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [clientOptions, setClientOptions] = useState<{ value: string; label: string }[]>([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        getValues,
    } = useForm<FormValues>({
        defaultValues: {
            bufferStock: false,
            items: [],
        },
    });

    const selectedClientId = watch('client');
    const [bufferStock, setBufferStock] = useState(false);
    const {
        fields: items,
        append,
        remove,
        update,
    } = useFieldArray({
        control,
        name: 'items',
    });

    const addItem = () => {
        append({
            id: uniqueId(),
            product: null,
            uom: '',
            originalQuantity: '',
            convertedQuantity: '',
            plantCode: '',
            deliveryDate: '',
        });
    };

    const handleProductChange = async (selected, index) => {
        setValue(`items.${index}.product`, selected);
        setValue(`items.${index}.plantCode`, selected.plant.plant_code); // reset plant code
    };

    const fetchClients = async () => {
        const options = await fetchClientData();
        const clientData = options.map((client: any) => ({
            value: client._id,
            label: client.name,
        }));
        setClientOptions(clientData);
    };
    const fetchProducts = async () => {
        const options = await fetchProductData();
        const productData = options.map((product: any) => ({
            value: product._id,
            label: product.material_code,
            plant: { plant_name: product.plant?.plant_name, plant_code: product.plant?.plant_code },
            area: Number(product.area),
        }));
        setProducts(productData);
    };
    useEffect(() => {
        fetchClients();
        fetchProducts();
    }, []);

    // Fetch projects when client changes
    useEffect(() => {
        if (selectedClientId) {
            const fetchProjects = async () => {
                const res = await fetchProjectsByClientId(selectedClientId);
                const formatted = res.map((project: any) => ({
                    value: project._id,
                    label: project.name,
                }));
                setProjectOptions(formatted);
                // reset project field on client change
                setValue('project', '');
            };
            fetchProjects();
        } else {
            setProjectOptions([]);
        }
    }, [selectedClientId, setValue]);

    const onSubmit = async (formValues: FormValues) => {
        console.log('Form Values:', formValues);

        setApiError('');
        try {
            const formData = new FormData();

            // Basic fields
            if (!bufferStock) {
                formData.append('client_id', formValues.client);
                formData.append('project_id', formValues.project);
                formData.append('date', formValues.workOrderDate);
            }
            formData.append('work_order_number', formValues.workOrderNumber);
            formData.append('buffer_stock', formValues.bufferStock ? 'true' : 'false');

            // Prepare product items
            formValues.items.forEach((item: any, index: number) => {
                formData.append(`products[${index}][product_id]`, item.product.value);
                formData.append(`products[${index}][uom]`, item.uom);
                formData.append(`products[${index}][po_quantity]`, item.originalQuantity);
                formData.append(`products[${index}][plant_code]`, item.plantCode);
                formData.append(`products[${index}][delivery_date]`, item.deliveryDate);
            });

            formValues.uploads.forEach((fileObj: any) => {
                if (fileObj.file) {
                    formData.append('files', fileObj.file);
                }
            });
            await storeWorkOrderData(formData);
            navigate('/konkrete-klinkers/work-order');
        } catch (error: any) {
            console.error('Error creating project:', error);
            setApiError(error.response?.data?.message || 'Failed to create project. Please try again.');
        }
    };

    const dispatch = useDispatch();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setBufferStock(true);
            dispatch(
                addAlert({
                    type: 'warning',
                    message: 'Do consider: The work order creates buffer stock, so all the products listed here will go for buffer stock.',
                    autoClose: 5000,
                })
            );
        } else {
            setBufferStock(false);
        }
    };

    const handleQuantityChange = (value, index) => {
        const quantity = parseFloat(value);
        const currentUom = getValues(`items.${index}.uom`);
        const currentProduct = getValues(`items.${index}.product`);
        const convertedQuantity = currentUom === 'sqmt' && !isNaN(quantity) ? Math.floor(quantity / currentProduct.area) : '';

        setValue(`items.${index}.convertedQuantity`, convertedQuantity);
    };

    const uomOptions = [
        { value: 'sqmt', label: 'sqmt' },
        { value: 'nos', label: 'nos' },
    ];

    const [showTooltip, setShowTooltip] = useState(false);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/work-order', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/work-order', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Work Order</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="workOrderNumber">Work Order Number</label>
                            <input
                                id="workOrderNumber"
                                type="text"
                                placeholder="Enter Work Order Number"
                                className={`form-input flex-1 ${errors.workOrderNumber ? 'border-red-500' : ''}`}
                                {...register('workOrderNumber', { required: 'Work Order Number is required' })}
                            />
                        </div>

                        <div className="inline-flex items-center justify-center">
                            <label className="inline-flex items-center">
                                <input
                                    id="bufferStock"
                                    type="checkbox"
                                    placeholder="Enter Work Order Date"
                                    className={`form-checkbox outline-success rounded-full mr-2`}
                                    style={{ transform: 'scale(1.5)' }}
                                    {...register('bufferStock')}
                                    onChange={(e) => {
                                        handleCheckboxChange(e); // alert logic
                                    }}
                                />
                                <span> &ensp;Buffer Stock</span>
                            </label>
                        </div>
                        {!bufferStock && (
                            <>
                                <div>
                                    <label htmlFor="client">Client Name</label>
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
                                                isClearable
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="project">Project Name</label>
                                    <Controller
                                        control={control}
                                        name="project"
                                        rules={{ required: 'Project is required' }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={projectOptions}
                                                placeholder="Select Project"
                                                value={projectOptions.find((option) => option.value === field.value)}
                                                onChange={(selected) => field.onChange(selected?.value)}
                                                isDisabled={!selectedClientId}
                                                isClearable
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="workOrderDate">Work Order Date</label>
                                    <input
                                        id="workOrderDate"
                                        type="date"
                                        placeholder="Enter Work Order Date"
                                        className={`form-input flex-1 ${errors.workOrderDate ? 'border-red-500' : ''}`}
                                        {...register('workOrderDate', { required: 'Work Order Date is required' })}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name / Material Code</th>
                                        <th>UOM</th>
                                        <th>{items.some((item) => item.uom === 'sqmt') ? 'PO Quantity (sqmt)' : 'PO Quantity'}</th>
                                        <th>Quantity in Nos</th>
                                        <th>Plant Code</th>
                                        <th>Delivery Date (optional)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="!text-center font-semibold">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((item, index) => (
                                        <tr className="align-top" key={item.id}>
                                            <td>
                                                <Controller
                                                    control={control}
                                                    name={`items.${index}.product`}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={products.map((p) => ({
                                                                ...p,
                                                                isDisabled: items.some((itm, idx) => idx !== index && itm.product?.value === p.value),
                                                            }))}
                                                            // onChange={(selected) => field.onChange(selected)}
                                                            onChange={(e) => handleProductChange(e, index)}
                                                            value={field.value}
                                                            placeholder="Select Product"
                                                            menuPortalTarget={document.body}
                                                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                            className="w-full sm:w-96"
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td>
                                                <Controller
                                                    control={control}
                                                    name={`items.${index}.uom`}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={uomOptions}
                                                            onChange={(selected) => {
                                                                field.onChange(selected?.value); // update RHF
                                                                // Reset quantity + converted quantity
                                                                setValue(`items.${index}.originalQuantity`, '');
                                                                setValue(`items.${index}.convertedQuantity`, '');
                                                            }}
                                                            value={uomOptions.find((opt) => opt.value === field.value)}
                                                            placeholder="UOM"
                                                            menuPortalTarget={document.body}
                                                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                            className="w-32"
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Quantity"
                                                    step={item.uom === 'sqmt' ? '0.01' : '1'}
                                                    min={0}
                                                    defaultValue={item.originalQuantity}
                                                    {...register(`items.${index}.originalQuantity`, {
                                                        onChange: (e) => handleQuantityChange(e.target.value, index),
                                                    })}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className="form-input w-32" placeholder="Quantity" {...register(`items.${index}.convertedQuantity`)} />
                                            </td>
                                            <td>
                                                <input type="text" className="form-input w-32" placeholder="Plant" {...register(`items.${index}.plantCode`)} readOnly />
                                            </td>
                                            <td>
                                                <input type="date" className="form-input w-34" {...register(`items.${index}.deliveryDate`)} />
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => remove(index)}>
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end sm:flex-row flex-col mt-6">
                            <div className="sm:mb-0 mb-6">
                                <button type="button" className="btn btn-primary" onClick={addItem}>
                                    ➕ Add Product
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12 gap-72">
                        <div className="flex items-center space-x-1">
                            <label htmlFor="client">
                                Upload Files <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-gray-500 hover:text-gray-700">
                                    <IconInfoCircle className="h-5 w-5" />
                                </button>
                                {showTooltip && (
                                    <div className="absolute top-0 left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                        A single pdf is mandatory here, multiple files are also allowed.
                                    </div>
                                )}
                            </div>
                        </div>
                        <Controller
                            control={control}
                            name="uploads"
                            rules={{ required: 'Please upload at least one file' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <FileUploader
                                        value={field.value}
                                        onChange={field.onChange}
                                        accept={{
                                            'image/*': [],
                                            'application/pdf': ['.pdf'],
                                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                                            'text/csv': ['.csv'],
                                        }}
                                        maxFiles={5}
                                    />
                                    {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
                                </>
                            )}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-success w-1/2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="submit" className="btn btn-danger w-1/2">
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
