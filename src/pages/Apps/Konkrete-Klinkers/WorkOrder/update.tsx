import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
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
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProjectsByClientId, fetchWorkOrderById, updateWorkOrderData } from '@/api/konkreteKlinkers/workOrder';
import { fetchProductData } from '@/api/konkreteKlinkers/product';
import { uniqueId } from 'lodash';
import CustomLoader from '@/components/Loader';

interface ProductOption {
    label: string;
    value: string;
    plant: { plant_code: string; plant_name: string };
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

interface FormData {
    client: string;
    project: string;
    workOrderNumber: string;
    workOrderDate: string;
    files: ImageListType;
    bufferStock: boolean;
    items: Item[];
}

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [clientOptions, setClientOptions] = useState<{ value: string; label: string }[]>([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [products, setProducts] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const maxFileCount = 5;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        getValues,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            bufferStock: false,
            items: [],
        },
    });

    const selectedClientId = watch('client');
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
        }));
        setProducts(productData);
    };

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

    useEffect(() => {
        const init = async () => {
            try {
                fetchClients();
                await fetchProducts();

                if (id) {
                    const data = await fetchWorkOrderById(id);

                    // Format products
                    const items = (data.products || []).map((item: any) => ({
                        product: {
                            value: item.product._id,
                            label: item.product.material_code,
                            plant: {
                                plant_name: '', // You can fill this if you have the plant info
                                plant_code: item.product.plant.plant_code || '', // You may need to store this explicitly in DB if missing
                            },
                        },
                        uom: item.uom,
                        originalQuantity: item.po_quantity || '', // Assuming originalQuantity = original_sqmt
                        convertedQuantity: item.qty_in_nos || '',
                        plantCode: item.product.plant.plant_code || '',
                        deliveryDate: item.delivery_date?.slice(0, 10) || '', // Format to yyyy-mm-dd for input[type=date]
                    }));

                    // Prepopulate form
                    reset({
                        client: data.client._id || '',
                        project: data.project?._id || '',
                        workOrderNumber: data.work_order_number || '',
                        workOrderDate: data.date?.slice(0, 10) || '',
                        bufferStock: data.buffer_stock || false,
                        items: items,
                    });

                    // Prepopulate uploaded files
                    const preloadedImages = (data.files || []).map((file: any) => ({
                        dataURL: file.file_url,
                        file: null, // Not available unless re-uploaded
                        uploaded: true,
                        existing: true,
                        file_name: file.file_name,
                    }));
                    setUploadedImages(preloadedImages); // Assuming you have a state called `uploadedImages`
                }
            } catch (error: any) {
                setApiError(error.response?.data?.message || 'Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [id, reset]);

    const onSubmit = async (formValues: FormData) => {
        setApiError('');
        try {
            const formData = new FormData();

            // Basic fields
            formData.append('client_id', formValues.client);
            formData.append('project_id', formValues.project);
            formData.append('work_order_number', formValues.workOrderNumber);
            formData.append('date', formValues.workOrderDate);

            // Prepare product items
            formValues.items.forEach((item: any, index: number) => {
                formData.append(`products[${index}][product_id]`, item.product.value);
                formData.append(`products[${index}][uom]`, item.uom);
                formData.append(`products[${index}][po_quantity]`, item.originalQuantity);
                formData.append(`products[${index}][qty_in_nos]`, item.convertedQuantity);
                formData.append(`products[${index}][plant_code]`, item.plantCode);
                formData.append(`products[${index}][delivery_date]`, item.deliveryDate);
            });

            // Add uploaded images
            uploadedImages.forEach((img: any) => {
                if (img.existing) {
                    formData.append('existingFiles[]', img.file_name); // Or img._id if backend expects ID
                } else if (img.file) {
                    formData.append('files', img.file);
                }
            });

            await updateWorkOrderData(id, formData);
            navigate('/konkrete-klinkers/work-order');
        } catch (error: any) {
            console.error('Error creating project:', error);
            setApiError(error.response?.data?.message || 'Failed to create project. Please try again.');
        }
    };

    const dispatch = useDispatch();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(
                addAlert({
                    type: 'warning',
                    message: 'Do consider: The work order creates buffer stock, so all the products listed here will go for buffer stock.',
                    autoClose: 5000,
                })
            );
        }
    };
    const handleFileChange = (imageList) => {
        setUploadedImages(imageList); // stores image objects with file & dataURL
    };

    const handleQuantityChange = (value, index) => {
        const quantity = parseFloat(value);
        const currentUom = getValues(`items.${index}.uom`);
        const convertedQuantity = currentUom === 'sqmt' && !isNaN(quantity) ? Math.floor(quantity / 1.5) : '';

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
        { label: 'Update', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/work-order', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Update Work Order</h5>
                </div>
                {loading ? (
                    <CustomLoader />
                ) : (
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <label htmlFor="workOrderNumber">Work Order Number</label>
                            <input
                                id="workOrderNumber"
                                type="text"
                                placeholder="Enter Work Order Number"
                                className={`form-input flex-1 ${errors.workOrderNumber ? 'border-red-500' : ''}`}
                                {...register('workOrderNumber', { required: 'Work Order Number is required' })}
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

                        <div>
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

                        <div className="flex justify-between sm:flex-row flex-col mt-6 px-4 float-right">
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
                        <ImageUploading multiple value={uploadedImages} onChange={handleFileChange} maxNumber={maxFileCount}>
                            {({ imageList, onImageUpload, onImageRemove }) => (
                                <div>
                                    <button type="button" className="btn btn-primary mb-2 flex items-center space-x-2" onClick={onImageUpload}>
                                        <IconFile className="shrink-0" />
                                        <span>Upload Files</span>
                                    </button>
                                    <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                        {imageList.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img src={image.dataURL} alt="uploaded" className="w-full h-32 object-cover rounded" />
                                                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => onImageRemove(index)}>
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
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
                )}
            </div>
        </div>
    );
};

export default Update;
