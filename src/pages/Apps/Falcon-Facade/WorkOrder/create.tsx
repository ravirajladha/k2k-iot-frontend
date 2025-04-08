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
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import { addAlert } from '@/store/slices/alertSlice'; // Import Redux action
import { useDispatch } from 'react-redux';
import { StringNullableChain } from 'lodash';

{
    /* <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" /> */
}

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
    code: string;
    uom: string;
    quantity: number;
    plantCode: string;
    remarks: string;
    deliveryDate: string;
    dimensionA: string;
    dimensionB: string;
    projectName: string;
    workOrderNumber: string;
    workOrderDate: string;
    prodReqDate: string;
    prodReqrDate: string;
    productId: string;
    orderQuantity: string;
    files: any[]; // Added files property (adjust type if needed)
}

const products: Product[] = [
    { label: 'Inward Door', value: 'Inward Door', uom: 'nos', dimensions: ['A', 'B', 'C', 'D'] },
    { label: 'Fixed Door', value: 'Fixed Door', uom: 'nos', dimensions: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { label: 'Fixed Window', value: 'Fixed Window', uom: 'nos', dimensions: ['A', 'B', 'C'] },
    { label: 'Facade', value: 'Facade', uom: 'nos', dimensions: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
    // { label: 'Product5', value: 'Product5', uom: 'nos', dimensions: ['A', 'B'] },
    // { label: 'Product6', value: 'Product6', uom: 'nos', dimensions: ['A', 'B', 'C', 'D', 'E'] },
    // { label: 'Product7', value: 'Product7', uom: 'nos', dimensions: ['A', 'B', 'C', 'D'] },
];



const Create = () => {

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

    const [formData, setFormData] = useState<FormData>({
        id: 0, // Default ID value
        product: null, // Default value for product
        code:'',
        uom: '',
        quantity: 0, // Default numeric value
        plantCode: '',
        remarks: '',
        deliveryDate: '',
        dimensionA: '',
        dimensionB: '',
        projectName: '',
        workOrderNumber: '',
        workOrderDate: '',
        prodReqDate: '',
        prodReqrDate: '',
        productId: '',
        orderQuantity: '',
        files: [], // Ensure it's correctly initialized as an array
    });

    const maxNumber = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                code:'',
                uom: '',
                quantity: 0,
                plantCode: '',
                deliveryDate: '',
                colorCode: '', // Initialize Bar Mark
                width: '', // Initialize Member Details
                height: '', // Initialize Member Details
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
                          uom: selectedOption ? selectedOption.uom : '',
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

    const handleClientChange = (selectedOption: Client | null) => {
        setSelectedClient(selectedOption);
        setSelectedProject(null); // Reset project selection
    };

    const handleChange = (id: number, field: string, value: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? field.startsWith('dimension-')
                        ? {
                              ...item,
                              dimensions: item.dimensions.map((dim, index) => (`dimension-${index}` === field ? { ...dim, value } : dim)),
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
        { label: 'Job Order', link: '/falcon-facade/work-order', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

    const toggleShapeSection = (productId: number) => {
        setExpandedProductId(expandedProductId === productId ? null : productId);
    };

    const addShape = (productId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === productId ? { ...item, shapes: [...item.shapes, { name: `Shape ${String.fromCharCode(65 + item.shapes.length)}`, dimension: '' }] } : item))
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
        setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, shapes: item.shapes.filter((_, index) => index !== shapeIndex) } : item)));
    };

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/work-order', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Create Job Order</h5>
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
                            {/* <input
                                id="workOrderNumber"
                                name="workOrderNumber"
                                type="text"
                                placeholder="Enter Work Order Number"
                                className="form-input"
                                value={formData.workOrderNumber}
                                onChange={handleInputChange}
                            /> */}
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

                        <div>
                            <label htmlFor="plantCode">Plant Code</label>
                            <input
                                id="plantCode"
                                name="plantCode"
                                type="text"
                                className="form-input"
                                placeholder="Enter Plant Code"
                                value={formData.plantCode}
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="plantCode">Production Issued and Approved By</label>
                            <input
                                id="plantCode"
                                name="plantCode"
                                type="text"
                                className="form-input"
                                placeholder="V Gouda"
                                value={formData.plantCode}
                                disabled
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="plantCode">Production Request Recieved By</label>
                            <input
                                id="plantCode"
                                name="plantCode"
                                type="text"
                                className="form-input"
                                placeholder="M R Bhaske"
                                value={formData.plantCode}
                                disabled
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
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
                            <label htmlFor="prodReqDate">Production Request Date</label>
                            <input
                                id="prodReqDate"
                                name="prodReqDate"
                                type="date"
                                className="form-input"
                                value={formData.prodReqDate}
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="prodReqrDate">Production Requirement Date</label>
                            <input
                                id="prodReqrDate"
                                name="prodReqrDate"
                                type="date"
                                className="form-input"
                                value={formData.prodReqrDate}
                                // min={new Date().toISOString().split("T")[0]} // Today's date
                                // max={new Date(new Date().setDate(new Date().getDate() + 15))
                                //     .toISOString()
                                //     .split("T")[0]} // 7 days from today
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="plantCode">Remarks</label>
                            <textarea id="remarks" name="remarks" placeholder="Enter Remarks" className="form-input" value={formData.remarks} onChange={handleInputChange}></textarea>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Code</th>
                                        <th>UOM</th>
                                        <th>PO Quantity</th>
                                        {/* <th>Delivery Date (optional)</th> */}
                                        <th>Color Code</th> {/* New Bar Mark column */}
                                        <th>Width</th>
                                        <th>Height</th>
                                        {/* New Member Details column */}
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
                                                            control: (base) => ({
                                                                ...base,
                                                                width: '400px', // Set the desired width here
                                                            }),
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensures dropdown stays on top
                                                            menu: (base) => ({ ...base, zIndex: 9999 }), // Keeps dropdown above other elements
                                                        }}
                                                    />
                                                </td>
                                                
                                                <td>
                                                    <input type="text" className="form-input w-28" placeholder="Code" value={item.code} onChange={(e) => handleChange(item.id, 'code', e.target.value)} />
                                                </td>
                                                {/* UOM */}
                                                <td>
                                                    <input type="text" className="form-input w-24" placeholder="UOM" value={item.uom} readOnly />
                                                </td>

                                                {/* PO Quantity */}
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-input w-24"
                                                        placeholder="Quantity"
                                                        min={0}
                                                        value={item.quantity}
                                                        onChange={(e) => handleChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                    />
                                                </td>

                                                {/* Delivery Date */}
                                                {/* <td>
                                <input
                                    type="date"
                                    className="form-input w-40"
                                    value={item.deliveryDate}
                                    onChange={(e) => handleChange(item.id, "deliveryDate", e.target.value)}
                                />
                            </td> */}

                                                {/* Bar Mark (New Field) */}
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-24"
                                                        placeholder="Color Code"
                                                        value={item.colorCode}
                                                        onChange={(e) => handleChange(item.id, 'colorCode', e.target.value)}
                                                    />
                                                </td>

                                                {/* Member Details (New Field) */}
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-24"
                                                        placeholder="Width"
                                                        value={item.width}
                                                        onChange={(e) => handleChange(item.id, 'width', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-24"
                                                        placeholder="Height"
                                                        value={item.height}
                                                        onChange={(e) => handleChange(item.id, 'height', e.target.value)}
                                                    />
                                                </td>

                                                <td>
                                                    <button type="button" onClick={() => removeItem(item.id)}>
                                                        ❌
                                                    </button>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Add Product Button */}
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

                        {/* File Upload Section */}
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
