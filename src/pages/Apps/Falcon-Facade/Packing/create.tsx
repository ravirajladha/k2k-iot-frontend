import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconX from '@/components/Icon/IconX';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
// IconSend
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconFile from '@/components/Icon/IconFile';
import IconChecks from '@/components/Icon/IconChecks';
import { BackgroundImage } from '@mantine/core';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import { addAlert } from "@/store/slices/alertSlice"; // Import Redux action
import { useDispatch } from "react-redux";
import { StringNullableChain } from 'lodash';

{/* <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" /> */ }

interface Client {
    value: string;
    label: string;
    projects: Project[];
}
interface Product {
    value: string;
    label: string;
    uom: string;
    dimensions: string[];
}

interface Project {
    value: string;
    label: string;
}

interface FormData {
    id: number;
    product: Product | null;
    uom: string;
    quantity: number;
    plantCode: string;
    deliveryDate: string;
    dimensionA: string;
    dimensionB: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    productId: string;
    workOrder: string;
    orderQuantity: string;
    productName: string;
    productQuantity: string;
    rejectedQuantity: string;
    qrCodeId: string;
    jobOrderName: string;

    files: any[]; // Added files property (adjust type if needed)
}

const products = [
    { label: "Product1", value: "Product1", uom: "nos", sf: ["SF1", "SF2", "SF3"] },
    { label: "Product2", value: "Product2", uom: "nos", sf: ["SF1", "SF2"] },
    { label: "Product3", value: "Product3", uom: "nos", sf: ["SF3", "SF4"] },
    // Add more products here...
];

const Create = () => {
    const [formData, setFormData] = useState<FormData>({
        id: 0, // Default ID value
        product: null, // Default value for product
        uom: '',
        quantity: 0, // Default numeric value
        plantCode: '',
        deliveryDate: '',
        dimensionA: '',
        dimensionB: '',
        projectName: '',
        workOrderNumber: '',
        workOrderDate: '',
        productId: '',
        orderQuantity: '',
        files: [], // Ensure it's correctly initialized as an array
        workOrder: '',
        productName: '',
        productQuantity: '',
        rejectedQuantity: '',
        jobOrderName: "",
        qrCodeId: '',
    });

    const workOrders = ["Work Order A", "Work Order B", "Work Order C"];
    const jobOrders = ["Job Order A", "Job Order B", "Job Order C"];


    const workOrderOptions = workOrders.map((workOrder) => ({
        value: workOrder,
        label: workOrder,
    }));

    const jobOrderOptions = jobOrders.map((jobOrder) => ({
        value: jobOrder,
        label: jobOrder,
    }));

    // const products = ['Product A', 'Product B', 'Product C'];


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
   

    // Handle product selection
    const [items, setItems] = useState([
        { id: 1, product: null, sf: [] },
    ]);

    // Handle product selection
    const handleProductChange = (selectedOption: any, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, product: selectedOption, sf: [] } // Reset SF when product changes
                    : item
            )
        );
    };

    // Handle adding SF and prevent duplicates
    const handleAddSF = (sf: string, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        sf: item.sf.some((sfItem) => sfItem.name === sf)
                            ? item.sf // Don't add the same SF again
                            : [
                                  ...item.sf,
                                  {
                                      name: sf,
                                      quantity: 0,
                                      qrCodes: [],
                                      selected: true, // Mark this SF as selected
                                  },
                              ],
                    }
                    : item
            )
        );
    };

    // Handle quantity change for each SF
    const handleQuantityChange = (id: number, sf: string, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        sf: item.sf.map((sfItem) =>
                            sfItem.name === sf
                                ? { ...sfItem, quantity, qrCodes: Array(quantity).fill("") }
                                : sfItem
                        ),
                    }
                    : item
            )
        );
    };

    // Handle QR Code change for each SF
    const handleQrCodeChange = (id: number, sf: string, index: number, value: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        sf: item.sf.map((sfItem) =>
                            sfItem.name === sf
                                ? {
                                      ...sfItem,
                                      qrCodes: sfItem.qrCodes.map((code, i) =>
                                          i === index ? value : code
                                      ),
                                  }
                                : sfItem
                        ),
                    }
                    : item
            )
        );
    };

    // Add new row for product
    const addItem = () => {
        const newItemId = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
        setItems([
            ...items,
            { id: newItemId, product: null, sf: [] },
        ]);
    };

    // Add new row for product
 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
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
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/falcon-facade/work-order', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create  Packing</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label htmlFor="workOrder" className="block text-sm font-medium text-gray-700">
                                Work Order
                            </label>
                            <Select
                                id="workOrder"
                                options={workOrderOptions}
                                value={workOrderOptions.find(
                                    (option) => option.value === formData.workOrder
                                )}
                                onChange={handleSelectChange('workOrder')}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>

                        <div>
                            <label htmlFor="jobOrderName" className="block text-sm font-medium text-gray-700">
                                Job Order Name
                            </label>
                            <Select
                                id="jobOrderName"
                                options={jobOrderOptions}
                                value={jobOrderOptions.find(
                                    (option) => option.value === formData.jobOrderName
                                )}
                                onChange={handleSelectChange('jobOrderName')}
                                placeholder="Select Job Order"
                                isSearchable
                            />
                        </div>
                        {/* Project Selection */}

                        {/* <div>
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
                                isDisabled={!selectedClient} // Disable until a client is selected
                            />
                        </div> */}



                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber">Work Order Number</label>
                            <input
                                id="workOrderNumber"
                                name="workOrderNumber"
                                type="text"
                                placeholder="Enter Work Order Number"
                                className="form-input"
                                value={formData.workOrderNumber}
                                onChange={handleInputChange}
                            />
                        </div>


                        {/* Work Order Date */}
                        <div>
                            <label htmlFor="workOrderDate">Work Order Date</label>
                            <input
                                id="workOrderDate"
                                name="workOrderDate"
                                type="date"
                                className="form-input"
                                value={formData.workOrderDate}
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="workOrderDate">Plant Code</label>
                            <input
                                id="workOrderDate"
                                name="workOrderDate"
                                type="text"
                                className="form-input"
                                placeholder="Enter Plant Code"

                                value={formData.workOrderDate}
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mt-8">
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name / Material Code</th>
                            <th>UOM</th>
                            <th>Semi Finished Products (SF)</th>
                            <th>Quantity</th>
                            <th>QR Code Inputs</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                {/* Product Selection */}
                                <td>
                                    <select
                                        value={item.product?.value || ""}
                                        onChange={(e) => handleProductChange(products.find(p => p.value === e.target.value) || null, item.id)}
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((p) => (
                                            <option key={p.value} value={p.value}>
                                                {p.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* UOM */}
                                <td>
                                    <input type="text" value={item.product?.uom || ""} readOnly />
                                </td>

                                {/* Add SF button */}
                                <td>
                                    {item.product && (
                                        <div>
                                            {item.product.sf.map((sf, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAddSF(sf, item.id)}
                                                    className="btn btn-primary m-2"
                                                >
                                                    {sf}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </td>

                                {/* Quantity Input */}
                                <td>
                                    {item.sf.map((sfItem, index) => (
                                        sfItem.selected && (
                                            <div key={index} className="mb-4">
                                                <label>{sfItem.name} - Quantity</label>
                                                <input
                                                    type="number"
                                                    placeholder="Quantity"
                                                    value={sfItem.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(item.id, sfItem.name, parseInt(e.target.value) || 0)
                                                    }
                                                />
                                            </div>
                                        )
                                    ))}
                                </td>

                                {/* QR Code Input Fields */}
                                <td>
                                    {item.sf.map((sfItem, index) => (
                                        sfItem.selected && sfItem.quantity > 0 && (
                                            <div key={index}>
                                                <label>{`QR Codes for ${sfItem.name}`}</label>
                                                {Array(sfItem.quantity || 0).fill("").map((_, qrIndex) => (
                                                    <div key={qrIndex} className="mb-2">
                                                        <input
                                                            type="text"
                                                            placeholder={`QR Code #${qrIndex + 1}`}
                                                            value={sfItem.qrCodes[qrIndex]}
                                                            onChange={(e) =>
                                                                handleQrCodeChange(item.id, sfItem.name, qrIndex, e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    ))}
                                </td>

                                {/* Remove Item */}
                                <td>
                                    <button type="button" onClick={() => setItems(prevItems => prevItems.filter(i => i.id !== item.id))}>
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



                    {/* File Upload */}
                    <div className="mb-6">
                        {/* Label and Tooltip */}
                        <div className="flex items-center space-x-1">
                            <label htmlFor="clientName">
                                Upload Files <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <button
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <IconInfoCircle className="h-5 w-5" />
                                </button>
                                {showTooltip && (
                                    <div className="absolute top-0 left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                        A single pdf is mandatory here, multiple files are also allowed.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <ImageUploading
                            multiple
                            value={formData.files}
                            onChange={handleFileChange}
                            maxNumber={maxNumber}
                        >
                            {({ imageList, onImageUpload, onImageRemove }) => (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mb-2 flex items-center space-x-2"
                                        onClick={onImageUpload}
                                    >
                                        <IconFile className="shrink-0" />
                                        <span>Upload Files</span>
                                    </button>
                                    <div className="grid gap-4 sm:grid-cols-3 grid-cols-1">
                                        {imageList.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image.dataURL}
                                                    alt="uploaded"
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                    onClick={() => onImageRemove(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </div>

                    {/* Submit Button */}
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

