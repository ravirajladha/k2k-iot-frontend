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
    orderQuantity: string;
    files: any[]; // Added files property (adjust type if needed)
}


const products: Product[] = [
    { label: "Product1", value: "Product1", uom: "nos", dimensions: ["A", "B", "C", "D"] },
    { label: "Product2", value: "Product2", uom: "nos", dimensions: ["A", "B", "C", "D", "E", "F"] },
    { label: "Product3", value: "Product3", uom: "nos", dimensions: ["A", "B", "C"] },
    { label: "Product4", value: "Product4", uom: "nos", dimensions: ["A", "B", "C", "D", "E", "F", "G"] },
    { label: "Product5", value: "Product5", uom: "nos", dimensions: ["A", "B"] },
    { label: "Product6", value: "Product6", uom: "nos", dimensions: ["A", "B", "C", "D", "E"] },
    { label: "Product7", value: "Product7", uom: "nos", dimensions: ["A", "B", "C", "D"] },
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
    });


    const maxNumber = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (imageList: ImageListType) => {
        setFormData((prev) => ({ ...prev, files: imageList }));
    };

    const plantCodes = ['Plant 101', 'Plant 102', 'Plant 103'];

    const [items, setItems] = useState<any[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const dispatch = useDispatch();



    //add a new item row
    const addItem = () => {
        let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
        setItems([
            ...items,
            {
                id: maxId + 1,
                product: null,
                uom: "",
                quantity: 0,
                plantCode: "",
                deliveryDate: "",
                shapes: [], // Ensure shapes is always an array
            },
        ]);
    };


    // Handle product selection
    const handleProductChange = (selectedOption: Product | null, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        product: selectedOption,
                        uom: selectedOption ? selectedOption.uom : "",
                        // dimensions: selectedOption?.dimensions
                        //     ? selectedOption.dimensions.map((dim) => ({ name: `Dimension ${dim}`, value: "" }))
                        //     : [],
                    }
                    : item
            )
        );
    };


    const handleProjectChange = (selectedOption: Project | null) => {
        setSelectedProject(selectedOption);
    };

    // Handle input field changes
    // const handleChange = (id: number, field: string, value: any) => {
    //     setItems((prevItems) =>
    //         prevItems.map((item) =>
    //             item.id === id ? { ...item, [field]: value } : item
    //         )
    //     );
    // };

    const handleChange = (id: number, field: string, value: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? field.startsWith("dimension-")
                        ? {
                            ...item,
                            dimensions: item.dimensions.map((dim, index) =>
                                `dimension-${index}` === field ? { ...dim, value } : dim
                            ),
                        }
                        : { ...item, [field]: value }
                    : item
            )
        );
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
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
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Work Order', link: '/falcon-facade/work-order', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

    const toggleShapeSection = (productId: number) => {
        setExpandedProductId(expandedProductId === productId ? null : productId);
    };

    const addShape = (productId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, shapes: [...item.shapes, { name: `Shape ${String.fromCharCode(65 + item.shapes.length)}`, dimension: "" }] }
                    : item
            )
        );
    };

    const updateShape = (productId: number, shapeIndex: number, dimension: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        shapes: item.shapes.map((shape, index) => (index === shapeIndex ? { ...shape, dimension } : shape)),
                    }
                    : item
            )
        );
    };

    const removeShape = (productId: number, shapeIndex: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, shapes: item.shapes.filter((_, index) => index !== shapeIndex) }
                    : item
            )
        );
    };



    return (

        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/falcon-facade/work-order', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Work Order</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label htmlFor="clientName">Client Name</label>
                            {/* <Select
                                id="clientName"
                                name="clientName"
                                options={clients}
                                onChange={handleClientChange}
                                value={selectedClient}
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.value}
                                placeholder="Select Client"
                                isClearable
                            /> */}
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

                        {/* Project Selection */}

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
                                isDisabled={!selectedClient} // Disable until a client is selected
                            />
                        </div>



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
                                        <th>PO Quantity</th>
                                        {/* <th>Diameter</th> */}
                                        <th>Delivery Date (optional)</th>

                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {items.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                {/* Product Selection */}
                                                <td>
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
                                                        menuPortalTarget={document.body} // Ensures dropdown renders outside the table
                                                        menuPosition="absolute" // Prevents dropdown clipping inside the table
                                                        menuPlacement="auto" // Adjusts position dynamically
                                                        styles={{
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensures dropdown stays on top
                                                            menu: (base) => ({ ...base, zIndex: 9999 }), // Keeps dropdown above other elements
                                                        }}
                                                    />

                                                </td>

                                                {/* UOM */}
                                                <td>
                                                    <input type="text" className="form-input w-32" placeholder="UOM" value={item.uom} readOnly />
                                                </td>

                                                {/* PO Quantity */}
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-input w-32"
                                                        placeholder="Quantity"
                                                        min={0}
                                                        value={item.quantity}
                                                        onChange={(e) => handleChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                                                    />
                                                </td>

                                                {/* <td>
                                                    <input type="text" className="form-input w-32" placeholder="(in cm)" value={item.diameter} readOnly />

                                                </td> */}

                                                {/* Delivery Date */}
                                                <td>
                                                    <input
                                                        type="date"
                                                        className="form-input w-40"
                                                        value={item.deliveryDate}
                                                        onChange={(e) => handleChange(item.id, "deliveryDate", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => removeItem(item.id)}>
                                                        ❌
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Auto-Populated Dimensions */}
                                            {item.dimensions && item.dimensions.length > 0 && (
                                                <tr>
                                                    <td colSpan={5}>
                                                        <table className="w-full text-xs">
                                                            <thead>
                                                                <tr>
                                                                    <th>Dimension Name</th>
                                                                    <th>Dimension Value</th>
                                                                    <th>Dimension Name</th>
                                                                    <th>Dimension Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {item.dimensions.map((dim, index) =>
                                                                    index % 2 === 0 ? ( // Grouping two dimensions per row
                                                                        <tr key={index}>
                                                                            <td>{dim.name}</td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-input w-64"
                                                                                    placeholder={`Enter ${dim.name}`}
                                                                                    value={dim.value}
                                                                                    onChange={(e) => handleChange(item.id, `dimension-${index}`, e.target.value)}
                                                                                />
                                                                            </td>
                                                                            {item.dimensions[index + 1] ? ( // Add next dimension if available
                                                                                <>
                                                                                    <td>{item.dimensions[index + 1].name}</td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-input w-64"
                                                                                            placeholder={`Enter ${item.dimensions[index + 1].name}`}
                                                                                            value={item.dimensions[index + 1].value}
                                                                                            onChange={(e) => handleChange(item.id, `dimension-${index + 1}`, e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </>
                                                                            )}
                                                                        </tr>
                                                                    ) : null
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}

                                        </React.Fragment>
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

