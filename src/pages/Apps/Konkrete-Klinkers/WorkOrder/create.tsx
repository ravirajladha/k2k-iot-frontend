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
import { useNavigate } from 'react-router-dom';
import { fetchProjectsByClientId } from '@/api/konkreteKlinkers/workOrder';
import { fetchProductData } from '@/api/konkreteKlinkers/product';
import { uniqueId } from 'lodash';

// interface Product {
//     value: string;
//     label: string;
//     uom: string;
// }

// interface Project {
//     value: string;
//     label: string;
// }
interface ProductOption {
    label: string;
    value: string;
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
    productId: string;
    uom: string;
    orderQuantity: string;
    plantCode: string;
    files: ImageListType;
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
    } = useForm<FormData>({
        defaultValues: {
            bufferStock: false,
            items: [],
        },
    });

    const selectedClientId = watch('client');
    const { fields: items, append, remove, update } = useFieldArray({
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
        }));
        setClientOptions(productData);
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

    const onSubmit = async (data: FormData) => {
        setApiError('');
        try {
            // await storeProjectData({
            //     name: data.name,
            //     client: data.client,
            // });
            navigate('/konkrete-klinkers/projects');
        } catch (error: any) {
            console.error('Error creating project:', error);
            setApiError(error.response?.data?.message || 'Failed to create project. Please try again.');
        }
    };

    // const [formData, setFormData] = useState<FormData>({
    //     client: '',
    //     project: '',
    //     workOrderNumber: '',
    //     workOrderDate: '',
    //     productId: '',
    //     uom: '',
    //     orderQuantity: '',
    //     plantCode: '',
    //     files: [],
    //     bufferStock: false,
    //     items: []
    // });

    const maxNumber = 5;


    // const handleFileChange = (imageList: ImageListType) => {
    //     setFormData((prev) => ({ ...prev, files: imageList }));
    // };

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

    // const [items, setItems] = useState<any[]>([]);
    // console.log('items', items);

    // const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const plantCodes = ['Plant 101', 'Plant 102', 'Plant 103'];

    // const addItem = () => {
    //     let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
    //     setItems([
    //         ...items,
    //         {
    //             id: maxId + 1,
    //             product: null,
    //             uom: '',
    //             quantity: 0,
    //             originalQuantity: '',
    //             convertedQuantity: '',
    //             plantCode: '',
    //             deliveryDate: '',
    //         },
    //     ]);
    // };

    // const handleProductChange = (selectedOption: Product | null, id: number) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) =>
    //             item.id === id
    //                 ? {
    //                       ...item,
    //                       product: selectedOption,
    //                   }
    //                 : item
    //         )
    //     );
    // };

    const uomOptions = [
        { value: 'sqmt', label: 'sqmt' },
        { value: 'nos', label: 'nos' },
    ];

    // const handleUOMChange = (selectedOption: any, id: number) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) =>
    //             item.id === id
    //                 ? {
    //                       ...item,
    //                       uom: selectedOption ? selectedOption.value : '',
    //                       quantity: selectedOption ? (selectedOption.value === 'sqmt' ? 0.0 : 0) : 0,
    //                       originalQuantity: '',
    //                   }
    //                 : item
    //         )
    //     );
    // };

    // const handleChange = (id: number, field: string, value: any) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) => {
    //             if (item.id === id) {
    //                 if (field === 'quantity') {
    //                     const uom = item.uom;
    //                     const parsedValue = uom === 'sqmt' ? parseFloat(value) : parseInt(value, 10);

    //                     // Calculate the converted quantity if UOM is 'sqmt' and value is valid
    //                     const convertedQuantity = uom === 'sqmt' && !isNaN(parsedValue) ? Math.floor(parsedValue / 1.5) : '';

    //                     return {
    //                         ...item,
    //                         quantity: parsedValue < 0 ? 0 : parsedValue,
    //                         originalQuantity: value,
    //                         convertedQuantity: convertedQuantity, // Update converted quantity
    //                     };
    //                 }
    //                 return { ...item, [field]: value };
    //             }
    //             return item;
    //         })
    //     );
    // };

    // const handleQuantityBlur = (id: number) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) => {
    //             if (item.id === id && item.uom === 'sqmt') {
    //                 const areaPerPiece = 1.5; // Define the area per piece
    //                 const convertedQuantity = Math.floor(item.quantity / areaPerPiece);
    //                 return { ...item, quantity: convertedQuantity < 0 ? 0 : convertedQuantity };
    //             }
    //             return item;
    //         })
    //     );
    // };

    // const handleProjectChange = (selectedOption: Project | null) => {
    //     setSelectedProject(selectedOption);
    // };

    // const removeItem = (id: number) => {
    //     setItems(items.filter((item) => item.id !== id));
    //     console.log('id', id);
    // };

    const [showTooltip, setShowTooltip] = useState(false);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/work-order/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/work-order/view', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Work Order</h5>
                </div>
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
                                {/* <tbody>
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="!text-center font-semibold">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((item) => (
                                        <tr className="align-top" key={item.id}>
                                            <td>
                                                <div className="relative z-99">
                                                    <Select
                                                        id={`productDropdown-${item.id}`}
                                                        name={`productDropdown-${item.id}`}
                                                        options={products.map((p) => ({
                                                            ...p,
                                                            isDisabled: items.some((itm) => itm.product?.value === p.value),
                                                        }))}
                                                        onChange={(selectedOption) => handleProductChange(selectedOption, item.id)}
                                                        value={item.product}
                                                        getOptionLabel={(e: Product) => e.label}
                                                        getOptionValue={(e: Product) => e.value}
                                                        placeholder="Select Product"
                                                        isClearable
                                                        menuPortalTarget={document.body}
                                                        styles={{
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                            menu: (base) => ({ ...base, zIndex: 9999 }),
                                                        }}
                                                        className="w-full sm:w-96"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <Select
                                                    id={`uomDropdown-${item.id}`}
                                                    name={`uomDropdown-${item.id}`}
                                                    options={uomOptions}
                                                    onChange={(selectedOption) => handleUOMChange(selectedOption, item.id)}
                                                    value={uomOptions.find((option) => option.value === item.uom)}
                                                    getOptionLabel={(e) => e.label}
                                                    getOptionValue={(e) => e.value}
                                                    placeholder="UOM"
                                                    isClearable
                                                    menuPortalTarget={document.body}
                                                    styles={{
                                                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                        menu: (base) => ({ ...base, zIndex: 9999 }),
                                                    }}
                                                    className="w-32" // Set the width to match PO Quantity
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Quantity"
                                                    value={item.originalQuantity}
                                                    onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                                                    onBlur={() => handleQuantityBlur(item.id)}
                                                    step={item.uom === 'sqmt' ? '0.01' : '1'}
                                                    min={0}
                                                />
                                            </td>
                                            <td>
                                                {item.uom === 'sqmt' ? (
                                                    <input type="text" className="form-input w-32" value={item.convertedQuantity ? `${item.convertedQuantity}` : ''} readOnly />
                                                ) : (
                                                    ''
                                                )}
                                            </td>
                                            <td>
                                                <select className="form-select w-40" value={item.plantCode} onChange={(e) => handleChange(item.id, 'plantCode', e.target.value)}>
                                                    <option value="">Select Plant Code</option>
                                                    {plantCodes.map((code) => (
                                                        <option key={code} value={code}>
                                                            {code}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <input type="date" className="form-input w-34" value={item.deliveryDate} onChange={(e) => handleChange(item.id, 'deliveryDate', e.target.value)} />
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => removeItem(item.id)}>
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody>
    {items.length === 0 && (
        <tr>
            <td colSpan={7} className="!text-center font-semibold">No Item Available</td>
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
                            onChange={(selected) => field.onChange(selected)}
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
                            onChange={(selected) => field.onChange(selected?.value)}
                            value={uomOptions.find((opt) => opt.value === field.value)}
                            placeholder="UOM"
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
                    {...register(`items.${index}.originalQuantity`)}
                    step={item.uom === 'sqmt' ? '0.01' : '1'}
                    min={0}
                />
            </td>
            <td>
                {item.uom === 'sqmt' ? (
                    <input type="text" className="form-input w-32" value={item.convertedQuantity || ''} readOnly />
                ) : ''}
            </td>
            <td>
                <select
                    className="form-select w-40"
                    {...register(`items.${index}.plantCode`)}
                >
                    <option value="">Select Plant Code</option>
                    {plantCodes.map((code) => (
                        <option key={code} value={code}>{code}</option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="date"
                    className="form-input w-34"
                    {...register(`items.${index}.deliveryDate`)}
                />
            </td>
            <td>
                <button type="button" onClick={() => remove(index)}>❌</button>
            </td>
        </tr>
    ))}
</tbody>

                            </table>
                        </div>

                        <div className="flex justify-between sm:flex-row flex-col mt-6 px-4 float-right">
                            <div className="sm:mb-0 mb-6">
                                {/* <button type="button" className="btn btn-primary" onClick={addItem}>
                                    ➕ Add Product
                                </button> */}
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

                        {/* <ImageUploading multiple value={formData.files} onChange={handleFileChange} maxNumber={maxNumber}>
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
                        </ImageUploading> */}
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
