import React, { useState } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select, { MultiValue } from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

interface WorkOrder {
    id: string;
    clientName: string;
    projectName: string;
    poQuantity: number;
}

interface Product {
    value: string;
    label: string;
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
    poQuantity: string | number;
    date: string;
    dia: string;
    plannedQuantity: string;
    actualQuantity: string;
    rejectedQuantity: string;
    selectedMachines: string[];
}

interface Item {
    id: number;
    product: Product | null;
    uom: string;
    quantity: number;
    plantCode: string;
    deliveryDate: string;
    plannedQuantity: number;
    scheduleDate: string;
    selectedMachines: string[];
    checked: boolean;
    dia: number | string;
    poQuantity: number;
    achievedQuantity: number;
    rejectedQuantity: number;
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
        dia: '',
        plannedQuantity: '',
        actualQuantity: '',
        rejectedQuantity: '',
        selectedMachines: [],
    });

    const [items, setItems] = useState<Item[]>([]);
    const [selectedPlant, setSelectedPlant] = useState<string>('');
    const [factories, setFactories] = useState<Factory[]>([]);
    const [selectedFactory, setSelectedFactory] = useState<string>('');
    const [date3, setDate3] = useState<any>('2025-07-05 to 2025-07-10');

    const workOrders: WorkOrder[] = [
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
    ];

    const machineOptions = [
        { value: 'machine1', label: 'Machine 1 - Bending' },
        { value: 'machine2', label: 'Machine 2 - Cutting' },
        { value: 'machine3', label: 'Machine 3 - Welding' },
        { value: 'machine4', label: 'Machine 4 - Drilling' },
        { value: 'machine5', label: 'Machine 5 - Grinding' },
    ];

    const products: Product[] = [
        { label: 'Steel Rod', value: 'Product1' },
        { label: 'Iron Rod', value: 'Product2' },
        { label: 'Cast Iron Rod', value: 'Product3' },
    ];

    const handleWorkOrderChange = (selectedOption: { value: string; label: string } | null) => {
        const selectedWorkOrder = workOrders.find((wo) => wo.id === selectedOption?.value);
        setFormData((prev) => ({
            ...prev,
            workOrderNumber: selectedOption?.value || '',
            clientName: selectedWorkOrder?.clientName || '',
            projectName: selectedWorkOrder?.projectName || '',
            poQuantity: selectedWorkOrder?.poQuantity || '',
        }));
    };

    const handleGlobalMachineChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
        setFormData((prev) => ({
            ...prev,
            selectedMachines: selectedOptions.map((option) => option.value),
        }));
    };

    const handleMachineInputChange = (id: number, value: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          selectedMachines: value
                              .split(',')
                              .map((v) => v.trim())
                              .filter((v) => v),
                      }
                    : item
            )
        );
    };

    const handlePlantChange = (selectedOption: { value: string; label: string } | null) => {
        const selectedPlant = plants.find((p) => p.id === selectedOption?.value);
        setSelectedPlant(selectedOption?.value || '');
        setFactories(selectedPlant ? selectedPlant.factories : []);
    };

    const handleFactoryChange = (selectedOption: { value: string; label: string } | null) => {
        setSelectedFactory(selectedOption?.value || '');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.workOrderNumber || !date3) {
            alert('Please fill all required fields.');
            return;
        }
        console.log('Form Data:', formData);
        console.log('Items:', items);
    };

    const addItem = () => {
        let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
        // Map selected machine values to their operation names (part after the dash)
        const selectedMachineLabels = formData.selectedMachines.map((machineValue) => {
            const label = machineOptions.find((option) => option.value === machineValue)?.label || machineValue;
            // Extract the part after the dash and trim whitespace
            return label.split('-').pop()?.trim() || label;
        });
        setItems([
            ...items,
            {
                id: maxId + 1,
                product: null,
                uom: 'Nos',
                quantity: 0,
                plantCode: '',
                deliveryDate: '',
                plannedQuantity: 0,
                scheduleDate: '',
                selectedMachines: selectedMachineLabels,
                checked: false,
                dia: '',
                poQuantity: 100,
                achievedQuantity: 50,
                rejectedQuantity: 10,
            },
        ]);
    };

    const removeItem = (item: Item) => {
        setItems(items.filter((d) => d.id !== item.id));
    };

    const updateField = (id: number, field: string, value: string | number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const handleCheckboxChange = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );
    };

    const handleProductChange = (selectedOption: Product | null, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, product: selectedOption } : item
            )
        );
    };

    const workOrderOptions = workOrders.map((wo) => ({
        value: wo.id,
        label: `${wo.id} - ${wo.clientName} - ${wo.projectName}`,
    }));
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
            '&:hover': { border: 'none' },
            '&:focus': { border: 'none', boxShadow: 'none' },
        }),
        input: (base: any) => ({ ...base, outline: 'none' }),
    };

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/job-order/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Job Order/Planning Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
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
                        <div>
                            <label htmlFor="machine">Machine</label>
                            <Select
                                id="machineSelection"
                                name="machineSelection"
                                options={machineOptions}
                                onChange={handleGlobalMachineChange}
                                value={machineOptions.filter((option) => formData.selectedMachines.includes(option.value))}
                                className="form-input"
                                placeholder="Select Machines"
                                isSearchable
                                isMulti
                                styles={customStyles}
                                menuPortalTarget={document.body}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead className="bg-black">
                                    <tr>
                                        <th> </th>
                                        <th>Shapes</th>
                                        <th>Dia (mm)</th>
                                        <th>Planned Quantity</th>
                                        <th>Schedule Date</th>
                                        <th>Machine</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length <= 0 && (
                                        <tr>
                                            <td colSpan={7} className="!text-center font-semibold">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                        className="form-checkbox"
                                                    />
                                                </td>
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
                                                        placeholder="Select Shapes"
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
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-input w-32"
                                                        placeholder="Enter Dia"
                                                        min={0}
                                                        value={item.dia}
                                                        onChange={(e) => updateField(item.id, 'dia', Number(e.target.value))}
                                                    />
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
                                                        id="scheduleDate"
                                                        name="scheduleDate"
                                                        type="date"
                                                        className="form-input"
                                                        value={item.scheduleDate}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        max={new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0]}
                                                        onChange={(e) => updateField(item.id, 'scheduleDate', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-input w-32"
                                                        placeholder="Enter Machines"
                                                        value={item.selectedMachines.join(', ')}
                                                        onChange={(e) => handleMachineInputChange(item.id, e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => removeItem(item)}>
                                                        <IconX className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className="bg-gray-100 p-3 rounded-lg shadow-md mt-2 flex justify-between items-center">
                                                        <h4 className="text-lg font-semibold">Auto-Fetched Details:</h4>
                                                        <div className="flex space-x-6">
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">UOM:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.uom}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">PO Quantity:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.poQuantity}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Achieved:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.achievedQuantity}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="font-medium mr-2">Rejected:</p>
                                                                <p className="bg-blue-100 px-3 py-1 rounded-md">{item.rejectedQuantity}</p>
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

                    <div className="flex gap-4">
                        <button type="submit" className="btn btn-success w-1/2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger w-1/2"
                            onClick={() => {
                                setFormData({
                                    workOrderNumber: '',
                                    clientName: '',
                                    projectName: '',
                                    salesOrderNumber: '',
                                    productId: '',
                                    uom: '',
                                    poQuantity: '',
                                    date: '',
                                    dia: '',
                                    plannedQuantity: '',
                                    actualQuantity: '',
                                    rejectedQuantity: '',
                                    selectedMachines: [],
                                });
                                setItems([]);
                            }}
                        >
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