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
    diameter: string;
    weight: string;
    plantCode: string;
    deliveryDate: string;
    dimensionA: string;
    dimensionB: string;
    projectName: string;
    clientName: string;
    workOrderNumber: string;
    workOrderDate: string;
    productId: string;
    orderQuantity: string;
    files: any[];
}

const products: Product[] = [
    { label: 'Steel Rod', value: 'Product1', uom: 'nos', dimensions: ['A', 'B', 'C', 'D'] },
    { label: 'Iron Rod', value: 'Product2', uom: 'nos', dimensions: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { label: 'Cast Iron Rod', value: 'Product3', uom: 'nos', dimensions: ['A', 'B', 'C'] },
];

// Sample clients data with projects
const clients: Client[] = [
    {
        value: 'Client1',
        label: 'Client A',
        projects: [
            { value: 'Project1', label: 'Project Alpha' },
            { value: 'Project2', label: 'Project Beta' },
        ],
    },
    {
        value: 'Client2',
        label: 'Client B',
        projects: [
            { value: 'Project3', label: 'Project Gamma' },
            { value: 'Project4', label: 'Project Delta' },
        ],
    },
    {
        value: 'Client3',
        label: 'Client C',
        projects: [{ value: 'Project5', label: 'Project Epsilon' }],
    },
];

const Create = () => {
    const [formData, setFormData] = useState<FormData>({
        id: 0,
        product: null,
        uom: '',
        quantity: 0,
        diameter: '',
        weight: '',
        plantCode: '',
        deliveryDate: '',
        dimensionA: '',
        dimensionB: '',
        projectName: '',
        clientName: '',
        workOrderNumber: '',
        workOrderDate: '',
        productId: '',
        orderQuantity: '',
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

    const plantCodes = ['Plant 101', 'Plant 102', 'Plant 103'];

    const [items, setItems] = useState<any[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const dispatch = useDispatch();

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
                barMark: '',
                memberDetails: '',
                shapes: [],
            },
        ]);
    };

    const handleClientChange = (selectedOption: Client | null) => {
        setSelectedClient(selectedOption);
        setSelectedProject(null); // Reset project selection when client changes
        setFormData((prev) => ({
            ...prev,
            clientName: selectedOption ? selectedOption.label : '',
        }));
    };

    const handleProductChange = (selectedOption: Product | null, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          product: selectedOption,
                          uom: selectedOption ? selectedOption.uom : '',
                          dimensions: selectedOption?.dimensions ? selectedOption.dimensions.map((dim) => ({ name: `Dimension ${dim}`, value: '' })) : [],
                      }
                    : item
            )
        );
    };

    const handleProjectChange = (selectedOption: Project | null) => {
        setSelectedProject(selectedOption);
        setFormData((prev) => ({
            ...prev,
            projectName: selectedOption ? selectedOption.label : '',
        }));
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
            // border: 'none',
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
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Work Order', link: '/iron-smith/work-order', isActive: false },
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
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/iron-smith/work-order/view', icon: <IconArrowBackward className="text-4xl" /> }} />
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
                                styles={customStyles}
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
                                className="form-input"
                                value={formData.workOrderNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="workOrderDate">Work Order Date</label>
                            <input id="workOrderDate" name="workOrderDate" type="date" className="form-input" value={formData.workOrderDate} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name / Material Code</th>
                                        {/* <th>UOM</th>
                                        <th>PO Quantity</th>
                                        <th>Diameter</th>
                                        <th>Weight</th> */}
                                        <th>Member Details</th>
                                        <th>Bar Mark</th>
                                        <th>Delivery Date (optional)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
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
                                                        menuPortalTarget={document.body}
                                                        menuPosition="absolute"
                                                        menuPlacement="auto"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                width: '200px',
                                                            }),
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                            menu: (base) => ({ ...base, zIndex: 9999 }),
                                                        }}
                                                    />
                                                </td>
{/* 
                                                <td>
                                                    <input type="text" className="form-input w-32" placeholder="UOM" value={item.uom} readOnly />
                                                </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-input w-32"
                                                        placeholder="Quantity"
                                                        min={0}
                                                        value={item.quantity}
                                                        onChange={(e) => handleChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                    />
                                                </td>

                                                <td>
                                                    <input type="text" className="form-input w-32" placeholder="(in mm)" value={item.diameter} />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-input w-32" placeholder="" value={item.weight} />
                                                </td> */}

                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-32"
                                                        placeholder="Member Details"
                                                        value={item.memberDetails}
                                                        onChange={(e) => handleChange(item.id, 'memberDetails', e.target.value)}
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-32"
                                                        placeholder="Bar Mark"
                                                        value={item.barMark}
                                                        onChange={(e) => handleChange(item.id, 'barMark', e.target.value)}
                                                    />
                                                </td>

                                                <td>
                                                    <input type="date" className="form-input w-40" value={item.deliveryDate} onChange={(e) => handleChange(item.id, 'deliveryDate', e.target.value)} />
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => removeItem(item.id)}>
                                                        ❌
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>
                                                    <div className="bg-gray-100 p-3 rounded-lg shadow-md mt-2 flex justify-between items-center">
                                                        {/* <h4 className="text-lg font-semibold">Auto-Fetched Details:</h4> */}
                                                        <div className="flex space-x-6">
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">UOM:</p>
                                                                <input type="text" className="form-input w-32" placeholder="UOM" value={item.uom} readOnly />
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">PO Quantity:</p>
                                                                <input
                                                                    type="number"
                                                                    className="form-input w-32"
                                                                    placeholder="Quantity"
                                                                    min={0}
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Diameter:</p>
                                                                <input type="text" className="form-input w-32" placeholder="(in mm)" value={item.diameter} />
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Weight:</p>
                                                                <input type="text" className="form-input w-32" placeholder="" value={item.weight} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

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
                                                                    index % 2 === 0 ? (
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
                                                                            {item.dimensions[index + 1] ? (
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
