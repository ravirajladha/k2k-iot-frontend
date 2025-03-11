import React, { useState } from 'react';
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

interface Client {
    value: string;
    label: string;
    projects: Project[];
}

interface Product {
    value: string;
    label: string;
    uom: string;
}

interface Project {
    value: string;
    label: string;
}

interface FormData {
    clientName: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    productId: string;
    uom: string;
    orderQuantity: string;
    plantCode: string;
    files: ImageListType;
}

const Create = () => {
    const [formData, setFormData] = useState<FormData>({
        clientName: '',
        projectName: '',
        workOrderNumber: '',
        workOrderDate: '',
        productId: '',
        uom: '',
        orderQuantity: '',
        plantCode: '',
        files: [],
    });

    const maxNumber = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
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

    const [items, setItems] = useState<any[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const clients: Client[] = [
        {
            value: 'client1',
            label: 'Client 1',
            projects: [
                { value: 'project1', label: 'Project 1' },
                { value: 'project2', label: 'Project 2' },
            ],
        },
        {
            value: 'client2',
            label: 'Client 2',
            projects: [
                { value: 'project3', label: 'Project 3' },
                { value: 'project4', label: 'Project 4' },
            ],
        },
    ];

    const products: Product[] = [
        { label: '1000010188/Paver Black 200*200*60', value: 'Paver_Black_200_200_60', uom: 'sqmt' },
        { label: '1000010184/Paver Grey 200*200*60', value: 'Paver_Grey_200_200_60', uom: 'sqmt' },
        { label: '1000010185/Paver Dark Grey 200*200*60', value: 'Paver_Dark_Grey_200_200_60', uom: 'sqmt' },
        { label: '1000010186/Paver Red 200*200*60', value: 'Paver_Red_200_200_60', uom: 'sqmt' },
        { label: '1000010464/Paver Yellow 200*200*60', value: 'Paver_Yellow_200_200_60', uom: 'sqmt' },
        { label: '1000010180/Paver Black 200*100*60', value: 'Paver_Black_200_100_60', uom: 'nos' },
        { label: '1000010189/Pavers Dark Grey 200*100*60', value: 'Pavers_Dark_Grey_200_100_60', uom: 'nos' },
    ];

    const plantCodes = ['Plant 101', 'Plant 102', 'Plant 103'];

    const addItem = () => {
        let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
        setItems([
            ...items,
            {
                id: maxId + 1,
                product: null,
                uom: '',
                quantity: 0,
                plantCode: '',
                deliveryDate: '',
            },
        ]);
    };

    const handleClientChange = (selectedOption: Client | null) => {
        setSelectedClient(selectedOption);
        setSelectedProject(null); // Reset project selection
    };

    const handleProductChange = (selectedOption: Product | null, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          product: selectedOption,
                      }
                    : item
            )
        );
    };

    const uomOptions = [
        { value: 'sqmt', label: 'sqmt' },
        { value: 'nos', label: 'nos' },
    ];

    const handleUOMChange = (selectedOption: any, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          uom: selectedOption ? selectedOption.value : '',
                          quantity: selectedOption ? (selectedOption.value === 'sqmt' ? 0.0 : 0) : 0,
                      }
                    : item
            )
        );
    };
    

    const handleProjectChange = (selectedOption: Project | null) => {
        setSelectedProject(selectedOption);
    };

    const handleChange = (id: number, field: string, value: any) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    if (field === 'quantity') {
                        const uom = item.uom;
                        const parsedValue = uom === 'sqmt' ? parseFloat(value) : parseInt(value, 10);
                        return { ...item, [field]: parsedValue < 0 ? 0 : parsedValue };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const removeItem = (id: number) => {
        
        setItems(items.filter((item) => item.id !== id));
        console.log("id",id);
    };

    const [showTooltip, setShowTooltip] = useState(false);

    const customStyles = {
        control: (base: any) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                border: 'none',
            },
            '&:focus': {
                border: 'none',
                boxShadow: 'none',
            },
        }),
        input: (base: any) => ({
            ...base,
            outline: 'none',
        }),
    };

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
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="clientName">Client Name</label>
                    <Select
                        id="clientName"
                        name="clientName"
                        options={clients}
                        onChange={handleClientChange}
                        value={selectedClient}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        placeholder="Select Client"
                        isClearable
                    />
                </div>

                <div>
                    <label htmlFor="projectName">Project Name</label>
                    <Select
                        id="projectName"
                        name="projectName"
                        options={selectedClient ? selectedClient.projects : []}
                        onChange={handleProjectChange}
                        value={selectedProject}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        placeholder="Select Project"
                        styles={customStyles}
                        isClearable
                        isDisabled={!selectedClient}
                    />
                </div>

                <div>
                    <label htmlFor="workOrderNumber">Work Order Number</label>
                    <input
                        id="workOrderNumber"
                        name="workOrderNumber"
                        type="text"
                        placeholder="Enter Work Order Number"
                        className="form-input w-full sm:w-3/4"
                        value={formData.workOrderNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="workOrderDate">Work Order Date</label>
                    <input
                        id="workOrderDate"
                        name="workOrderDate"
                        type="date"
                        className="form-input w-full sm:w-2/4"
                        value={formData.workOrderDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox outline-success rounded-full mr-2"
                            style={{ transform: 'scale(1.5)' }}
                            onChange={handleCheckboxChange}
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
                                <th>PO Quantity</th>
                                <th>Plant Code</th>
                                <th>Delivery Date (optional)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="!text-center font-semibold">
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
                                            placeholder="Select UOM"
                                            isClearable
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                menu: (base) => ({ ...base, zIndex: 9999 }),
                                            }}
                                            className="w-full sm:w-34" 
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-input w-24"
                                            placeholder="Quantity"
                                            value={item.quantity}
                                            onChange={(e) => handleChange(item.id, 'quantity', e.target.value)}
                                            step={item.uom === 'sqmt' ? '0.01' : '1'}
                                            min={0}
                                        />
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
