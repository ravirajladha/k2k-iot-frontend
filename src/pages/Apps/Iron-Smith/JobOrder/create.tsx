import React, { useState, ChangeEvent } from 'react';

import IconX from '@/components/Icon/IconX';

import IconSave from '@/components/Icon/IconSave';
// IconSend
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconBell from '@/components/Icon/IconBell';
import IconCode from '@/components/Icon/IconCode';
interface WorkOrder {
    id: string;
    clientName: string;
    projectName: string;
    poQuantity: number;
}

interface Plant {
    id: string;
    name: string;
    factories: Factory[];
}

interface Factory {
    id: string;
    name: string;
}

interface FormData {
    workOrderNumber: string;
    clientName: string;
    projectName: string;
    salesOrderNumber: string;
    productId: string;
    uom: string;
    poQuantity: string | number; // Can be string (from input) or number (from `workOrders`)
    date: string;
    plannedQuantity: string;
    actualQuantity: string;
    rejectedQuantity: string;
    selectedMachines: string[];
}

const ProductionPlanning = () => {
    const [formData, setFormData] = useState<FormData>({
        workOrderNumber: '',
        clientName: '',
        projectName: '',
        salesOrderNumber: '',
        productId: '',
        uom: '',
        poQuantity: '',
        date: '',
        plannedQuantity: '',
        actualQuantity: '',
        rejectedQuantity: '',
        selectedMachines: [], // New field for machine selection
    });

    const workOrders = [
        { id: 'WO101', clientName: 'Client A', projectName: 'Project X', poQuantity: 100 },
        { id: 'WO102', clientName: 'Client B', projectName: 'Project Y', poQuantity: 200 },
        { id: 'WO103', clientName: 'Client C', projectName: 'Project Z', poQuantity: 300 },
    ];

    const plants: Plant[] = [
        {
            id: 'plant1',
            name: 'Plant 1',
            factories: [
                { id: 'factory1', name: 'Factory 1' },
                { id: 'factory2', name: 'Factory 2' },
            ],
        },
        {
            id: 'plant2',
            name: 'Plant 2',
            factories: [
                { id: 'factory3', name: 'Factory 3' },
                { id: 'factory4', name: 'Factory 4' },
            ],
        },
        // Add more plants and factories as needed
    ];

    const handleWorkOrderChange = (selectedOption: any) => {
        const selectedWorkOrder = workOrders.find((wo) => wo.id === selectedOption.value);
        setFormData((prev) => ({
            ...prev,
            workOrderNumber: selectedOption.value,
            clientName: selectedWorkOrder?.clientName || '',
            projectName: selectedWorkOrder?.projectName || '',
            poQuantity: selectedWorkOrder?.poQuantity || '',
        }));
    };

    const handleMachineChange = (selectedOptions: any, id: number) => {
        setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, selectedMachines: selectedOptions ? selectedOptions.map((option: any) => option.value) : [] } : item)));
    };
    const [selectedMachines, setSelectedMachines] = useState<string>('');

    const [selectedPlant, setSelectedPlant] = useState<string>('');
    const [factories, setFactories] = useState<Factory[]>([]);
    const [selectedFactory, setSelectedFactory] = useState<string>('');
    const [date3, setDate3] = useState<any>('2025-07-05 to 2025-07-10');

    const handlePlantChange = (selectedOption: any) => {
        const selectedPlant = plants.find((p) => p.id === selectedOption.value);
        setSelectedPlant(selectedOption.value);
        setFactories(selectedPlant ? selectedPlant.factories : []);
    };

    const handleFactoryChange = (selectedOption: any) => {
        setSelectedFactory(selectedOption.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const [items, setItems] = useState<any>([{ id: 1, title: 'Product 1', uom: 'KG', poQuantity: 5, achieved: 5, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 }]);

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
                plannedQuantity: 0,
                scheduleDate: '',
                selectedMachines: [], // Ensure machine selection resets
            },
        ]);
    };

    const removeItem = (item: any) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const updateField = (id: number, field: string, value: number) => {
        setItems((prevItems: any) => prevItems.map((item: any) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const workOrderOptions = workOrders.map((wo) => ({ value: wo.id, label: `${wo.id} - ${wo.clientName} - ${wo.projectName}` }));
    const plantOptions = plants.map((plant) => ({ value: plant.id, label: plant.name }));
    const factoryOptions = factories.map((factory) => ({ value: factory.id, label: factory.name }));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Job Order / Planning', link: '/iron-smith/job-order/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];
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

    const machineOptions = [
        { value: 'machine1', label: 'Machine 1 - Bending' },
        { value: 'machine2', label: 'Machine 2 - Cutting' },
        { value: 'machine3', label: 'Machine 3 - Welding' },
        { value: 'machine4', label: 'Machine 4 - Drilling' },
        { value: 'machine5', label: 'Machine 5 - Grinding' },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/iron-smith/job-order/view', icon: <IconArrowBackward className="text-4xl" /> }} />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Job Order/Planning Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
                        {/* Work Order Number */}
                        <div>
                            <label htmlFor="workOrderNumber">
                                Work Order Number <span className="text-red-700">*</span>
                            </label>
                            <Select
                                id="workOrderNumber"
                                name="workOrderNumber"
                                options={workOrderOptions}
                                onChange={handleWorkOrderChange}
                                value={workOrderOptions.find((option) => option.value === formData.workOrderNumber)}
                                className="form-input"
                                placeholder="Select Work Order"
                                isSearchable
                                styles={customStyles}
                            />
                        </div>

                        {formData.clientName && formData.projectName && (
                            <div className="border p-4 rounded-lg shadow-md bg-blue-100 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <h3 className="text-lg font-semibold text-gray-700">Client Details</h3>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Client Name:</span> {formData.clientName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Project Name:</span> {formData.projectName}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Sales Order Number */}
                        <div>
                            <label htmlFor="salesOrderNumber">Sales Order Number (Optional)</label>
                            <input
                                id="salesOrderNumber"
                                name="salesOrderNumber"
                                type="text"
                                placeholder="Enter Sales Order Number"
                                className="form-input"
                                value={formData.salesOrderNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="date">
                                Range Date (from and to) <span className="text-red-700">*</span>
                            </label>

                            <Flatpickr
                                options={{
                                    mode: 'range',
                                    dateFormat: 'Y-m-d',
                                    position: 'auto right',
                                }}
                                value={date3}
                                className="form-input"
                                onChange={(date3) => setDate3(date3)}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead className="bg-black ">
                                    <tr>
                                        <th>Product</th>
                                        <th>Planned Quantity</th>
                                        <th>Schedule Date</th>
                                        <th>Machine</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.length <= 0 && (
                                        <tr>
                                            <td colSpan={5} className="!text-center font-semibold">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((item: any) => (
                                        <React.Fragment key={item.id}>
                                            {/* Table Row: Editable Fields */}
                                            <tr>
                                                <td>
                                                    <input type="text" className="form-input min-w-[200px]" placeholder="Enter Item Name" defaultValue={item.title} readOnly />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-input w-32"
                                                        placeholder="Planned Quantity"
                                                        min={0}
                                                        value={item.plannedQuantity}
                                                        onChange={(e) => updateField(item.id, 'plannedQuantity', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        id="date"
                                                        name="date"
                                                        type="date"
                                                        className="form-input"
                                                        value={item.plannedQuantity}
                                                        min={new Date().toISOString().split('T')[0]} // Today's date
                                                        max={new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0]} // 7 days from today
                                                        onChange={(e) => updateField(item.id, 'plannedQuantity', Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <Select
                                                        id={`machineSelection-${item.id}`}
                                                        name="machineSelection"
                                                        options={machineOptions}
                                                        onChange={(selectedOptions) => handleMachineChange(selectedOptions, item.id)}
                                                        value={machineOptions.filter((option) => (item.selectedMachines || []).includes(option.value))} // ✅ Safe check
                                                        className="form-input"
                                                        placeholder="Select Machines"
                                                        isSearchable
                                                        isMulti
                                                        styles={customStyles}
                                                    />
                                                </td>

                                                <td>
                                                    <button type="button" onClick={() => removeItem(item)}>
                                                        <IconX className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Autofetch Details in a Card Below the Row */}
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="bg-gray-100 p-3 rounded-lg shadow-md mt-2 flex justify-between items-center">
                                                        <h4 className="text-lg font-semibold">Auto-Fetched Details:</h4>
                                                        <div className="flex space-x-6">
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">UOM:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.product ? item.uom : 'Nos'}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">PO Quantity:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.product ? item.poQuantity : '100'}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Achieved:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.product ? item.achievedQuantity : '50'}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Rejected:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.product ? item.rejectedQuantity : '10'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                            <div className="sm:mb-0 mb-6 ml-auto">
                                <button type="button" className="btn btn-primary" onClick={addItem}>
                                    <IconChecks className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Add Product
                                </button>
                            </div>
                        </div>
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

export default ProductionPlanning;
