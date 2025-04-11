import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconX from '@/components/Icon/IconX';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconFile from '@/components/Icon/IconFile';
import IconChecks from '@/components/Icon/IconChecks';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import { addAlert } from '@/store/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface Client {
    value: string;
    label: string;
    projects: Project[];
}

interface Product {
    value: string;
    label: string;
    uom: string;
    code: string;
    colorCode: string;
    height: string;
    width: string;
    sf: string[];
}

interface Project {
    value: string;
    label: string;
}

interface FormData {
    id: number;
    plantCode: string;
    deliveryDate: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    workOrderId: string;
    productName: string;
    productQuantity: string;
    prodReqDate: string;
    prodReqrDate: string;
    rejectedQuantity: string;
    qrCodeId: string;
    jobOrder: string;
    files: any[];
    items: Array<{
        id: number;
        product: Product | null;
        sf: Array<{
            name: string;
            quantity: number;
            qrCodes: string[];
            selected: boolean;
        }>;
    }>;
}

const products = [
    { label: 'Inward Window', value: 'Inward Window', uom: 'Nos', code: 'TYPE-P5(T)', colorCode: 'RAL 9092', height: '1047', width: '1025', sf: ['SF1', 'SF2', 'SF3'] },
    { label: 'Outward Window', value: 'Outward Window', uom: 'Nos', code: 'TYPE-P6(T)', colorCode: 'RAL 9092', height: '1047', width: '1025', sf: ['SF1', 'SF2'] },
    { label: 'Facade', value: 'Facade', uom: 'Nos', code: 'TYPE-P7(T)', colorCode: 'RAL 9092', height: '1047', width: '1025', sf: ['SF3', 'SF4'] },
];

const Create = () => {
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        plantCode: '',
        deliveryDate: '',
        projectName: '',
        workOrderNumber: '',
        workOrderDate: '',
        workOrderId: '',
        productName: '',
        productQuantity: '',
        prodReqDate: '2025-04-01',
        prodReqrDate: '2025-04-05',
        rejectedQuantity: '',
        qrCodeId: '',
        jobOrder: '',
        files: [],
        items: [{ id: 1, product: null, sf: [] }],
    });
    console.log('formData', formData);

    const workOrders = ['Work Order A', 'Work Order B', 'Work Order C'];
    const jobOrders = ['Job Order A', 'Job Order B', 'Job Order C'];

    const workOrderOptions = workOrders.map((workOrder) => ({
        value: workOrder,
        label: workOrder,
    }));

    const jobOrderOptions = jobOrders.map((jobOrder) => ({
        value: jobOrder,
        label: jobOrder,
    }));

    const maxNumber = 5;

    const handleSelectChange = (field: string) => (selectedOption: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const dispatch = useDispatch();

    const handleProductChange = (selectedOption: any, id: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item) => (item.id === id ? { ...item, product: selectedOption, sf: [] } : item)),
        }));
    };

    const handleAddSF = (sf: string, id: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          sf: item.sf.some((sfItem) => sfItem.name === sf) ? item.sf : [...item.sf, { name: sf, quantity: 0, qrCodes: [], selected: true }],
                      }
                    : item
            ),
        }));
    };

    const handleQuantityChange = (id: number, sf: string, quantity: number) => {
        const safeQuantity = Math.max(0, quantity);
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          sf: item.sf.map((sfItem) => (sfItem.name === sf ? { ...sfItem, quantity: safeQuantity, qrCodes: Array(safeQuantity).fill('') } : sfItem)),
                      }
                    : item
            ),
        }));
    };

    const handleQrCodeChange = (id: number, sf: string, index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          sf: item.sf.map((sfItem) => (sfItem.name === sf ? { ...sfItem, qrCodes: sfItem.qrCodes.map((code, i) => (i === index ? value : code)) } : sfItem)),
                      }
                    : item
            ),
        }));
    };

    const addItem = () => {
        const newItemId = formData.items.length ? Math.max(...formData.items.map((item) => item.id)) + 1 : 1;
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { id: newItemId, product: null, sf: [] }],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const [showTooltip, setShowTooltip] = useState(false);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Packing', link: '/falcon-facade/packing', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/packing', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Packing</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="workOrderId" className="block text-sm font-medium text-gray-700">
                                Work Order
                            </label>
                            <Select
                                id="workOrderId"
                                options={workOrderOptions}
                                value={workOrderOptions.find((option) => option.value === formData.workOrderId)}
                                onChange={handleSelectChange('workOrderId')}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>

                        <div>
                            <label htmlFor="jobOrder" className="block text-sm font-medium text-gray-700">
                                Job Order
                            </label>
                            <Select
                                id="jobOrder"
                                options={jobOrderOptions}
                                value={jobOrderOptions.find((option) => option.value === formData.jobOrder)}
                                onChange={handleSelectChange('jobOrder')}
                                placeholder="Select Job Order"
                                isSearchable
                            />
                        </div>

                        <div>
                            <label htmlFor="workOrderDate">Work Order Date</label>
                            <input id="workOrderDate" name="workOrderDate" type="date" className="form-input" value={formData.workOrderDate} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="plantCode">Plant Code</label>
                            <input id="plantCode" name="plantCode" type="text" className="form-input" placeholder="Enter Plant Code" value={formData.plantCode} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="prodReqDate">Production Request Date</label>
                            <input id="prodReqDate" name="prodReqDate" type="date" className="form-input" value={formData.prodReqDate} onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="prodReqrDate">Production Requirement Date</label>
                            <input id="prodReqrDate" name="prodReqrDate" type="date" className="form-input" value={formData.prodReqrDate} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name / Material Code</th>
                                        <th>UOM</th>
                                        <th>Code</th>
                                        <th>Color Code</th>
                                        <th>Height</th>
                                        <th>Width</th>
                                        <th>Semi Finished Products (SF)</th>
                                        <th>Quantity</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="p-3">
                                                <Select
                                                    id={`product-${item.id}`}
                                                    value={item.product || null}
                                                    onChange={(selectedOption) => handleProductChange(selectedOption, item.id)}
                                                    options={products}
                                                    className="custom-select flex-1 w-48"
                                                    classNamePrefix="custom-select"
                                                    placeholder="Select Product"
                                                    isClearable
                                                    menuPortalTarget={document.body}
                                                    required
                                                />
                                            </td>

                                            <td>
                                                <input type="text" value={item.product?.uom || ''} readOnly className="form-input border-none focus:outline-none focus:ring-0 w-32" />
                                            </td>
                                            <td>
                                                <input type="text" value={item.product?.code || ''} readOnly className="form-input border-none focus:outline-none focus:ring-0 w-32" />
                                            </td>
                                            <td>
                                                <input type="text" value={item.product?.colorCode || ''} readOnly className="form-input border-none focus:outline-none focus:ring-0 w-32" />
                                            </td>
                                            <td>
                                                <input type="text" value={item.product?.height || ''} readOnly className="form-input border-none focus:outline-none focus:ring-0 w-32" />
                                            </td>
                                            <td>
                                                <input type="text" value={item.product?.width || ''} readOnly className="form-input border-none focus:outline-none focus:ring-0 w-32" />
                                            </td>

                                            <td>
                                                {item.product && (
                                                    <div>
                                                        {item.product.sf.map((sf, index) => (
                                                            <button key={index} onClick={() => handleAddSF(sf, item.id)} className="btn btn-primary m-2">
                                                                {sf}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>

                                            <td>
                                                {item.sf.map(
                                                    (sfItem, index) =>
                                                        sfItem.selected && (
                                                            <div key={index} className="mb-4">
                                                                <label>{sfItem.name} - Quantity</label>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Quantity"
                                                                    value={sfItem.quantity}
                                                                    onChange={(e) => handleQuantityChange(item.id, sfItem.name, parseInt(e.target.value) || 0)}
                                                                    className="form-input px-4 py-2 w-24"
                                                                />
                                                            </div>
                                                        )
                                                )}
                                            </td>

                                            <td>
                                                <button type="button" onClick={() => setFormData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== item.id) }))}>
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between sm:flex-row flex-col mt-6">
                            <div>
                                <button type="button" onClick={addItem}>
                                    ➕ Add Product
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center space-x-1">
                            <label htmlFor="clientName">
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

                        <ImageUploading multiple value={formData.files} onChange={handleFileChange} maxNumber={maxNumber}>
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
                        <NavLink to="/falcon-facade/packing/detail" state={{ rowData: formData, mode: 'create' }} className="btn btn-success w-1/2 flex items-center justify-center">
                            Create
                        </NavLink>
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
