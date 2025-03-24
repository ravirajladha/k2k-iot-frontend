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
    batchNumber: string;
    actualQuantity: string;
    rejectedQuantity: string;
}

const ProductionPlanning = () => {
    const [formData, setFormData] = useState<FormData>({
        workOrderNumber: '',
        clientName: '',
        projectName: '',
        salesOrderNumber: '',
        productId: '',
        batchNumber: '',
        uom: '',
        poQuantity: '',
        date: '',
        plannedQuantity: '',
        actualQuantity: '',
        rejectedQuantity: '',
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

    const [items, setItems] = useState<any>([
        { id: 1, title: '1000010464/Paver Yellow 200*200*60', machineName: '', uom: 'Nos', poQuantity: 5, achieved: 5, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 },
    ]);
    interface Product {
        value: string;
        label: string;
        uom: string;
    }

    interface Machine {
        value: string;
        label: string;
    }

    const products: Product[] = [
        { label: '1000010188/Paver Black 200*200*60', value: 'Paver_Black_200_200_60', uom: 'sqmt' },
        { label: '1000010184/Paver Grey 200*200*60', value: 'Paver_Grey_200_200_60', uom: 'sqmt' },
        { label: '1000010185/Paver Dark Grey 200*200*60', value: 'Paver_Dark_Grey_200_200_60', uom: 'sqmt' },
        { label: '1000010186/Paver Red 200*200*60', value: 'Paver_Red_200_200_60', uom: 'sqmt' },
        { label: '1000010464/Paver Yellow 200*200*60', value: 'Paver_Yellow_200_200_60', uom: 'sqmt' },
        { label: '1000010180/Paver Black 200*100*60', value: 'Paver_Black_200_100_60', uom: 'nos' },
        { label: '1000010189/Pavers Dark Grey 200*100*60', value: 'Pavers_Dark_Grey_200_100_60', uom: 'nos' },
    ];
    const machines: Machine[] = [
        { label: 'Machine X', value: 'Machine_X' },
        { label: 'Machine Y', value: 'Machine_Y' },
    ];

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

    const handleMachineChange = (selectedOption: Machine | null, id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          machine: selectedOption,
                      }
                    : item
            )
        );
    };

    const addItem = () => {
        const maxId = items.length ? Math.max(...items.map((item: any) => item.id)) : 0;
        setItems([...items, { id: maxId + 1, title: '', machineName: '', uom: '', plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0 }]);
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
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Job Order / Planning', link: '/konkrete-klinkers/job-order/view', isActive: false },
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

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/job-order/view', icon: <IconArrowBackward className="text-4xl" /> }} />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Job Order/Planning Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
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

                        <div>
                            <label htmlFor="plant">
                                Plant Name <span className="text-red-700">*</span>
                            </label>
                            <Select
                                id="plant"
                                name="plant"
                                options={plantOptions}
                                onChange={handlePlantChange}
                                value={plantOptions.find((option) => option.value === selectedPlant)}
                                className="form-input"
                                placeholder="Select Plant"
                                styles={customStyles}
                                isSearchable
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
                        <div>
                            <label htmlFor="batchNumber">
                                Batch Number <span className="text-red-700">*</span>
                            </label>

                            <input id="batchNumber" name="batchNumber" type="text" className="form-input" placeholder="Enter Batch Number" value={formData.batchNumber} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Machine Name</th>
                                        <th className="w-1">UOM (autofetch)</th>
                                        <th className="w-1">PO Quantity (autofetch)</th>
                                        <th className="w-1">Achieved Till Now (autofetch)</th>

                                        {/* <th className="w-1">Achieved Quantity(autofetch)</th> */}
                                        <th className="w-1">Rejected Quantity (autofetch)</th>
                                        <th className="w-1">Planned Quantity</th>
                                        <th className="w-1">Schedule Date</th>

                                        <th className="w-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.length <= 0 && (
                                        <tr>
                                            <td colSpan={6} className="!text-center font-semibold">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}
                                    {items.map((item: any) => (
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
                                                <div className="relative z-99">
                                                    <Select
                                                        id={`machineDropdown-${item.id}`}
                                                        name={`machineDropdown-${item.id}`}
                                                        options={machines.map((p) => ({
                                                            ...p,
                                                            isDisabled: items.some((itm) => itm.machine?.value === p.value),
                                                        }))}
                                                        onChange={(selectedOption) => handleMachineChange(selectedOption, item.id)}
                                                        value={item.machine}
                                                        getOptionLabel={(e: Machine) => e.label}
                                                        getOptionValue={(e: Machine) => e.value}
                                                        placeholder="Select Machine"
                                                        isClearable
                                                        menuPortalTarget={document.body}
                                                        styles={{
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                            menu: (base) => ({ ...base, zIndex: 9999 }),
                                                        }}
                                                        className="w-full sm:w-48"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <input type="text" className="form-input w-32 bg-blue-100" placeholder="UOM" defaultValue={item.uom} readOnly />
                                            </td>
                                            <td>
                                                <input type="text" className="form-input w-32 bg-blue-100" placeholder="poQuantity" defaultValue={item.poQuantity} readOnly />
                                            </td>
                                            <td>
                                                <input type="text" className="form-input w-32 bg-blue-100" placeholder="achieved" defaultValue={item.poQuantity} readOnly />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32 bg-blue-100"
                                                    placeholder="Rejected Quantity"
                                                    min={0}
                                                    disabled
                                                    value={item.rejectedQuantity}
                                                    onChange={(e) => updateField(item.id, 'rejectedQuantity', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32 "
                                                    placeholder="Planned Quantity"
                                                    min={0}
                                                    value={item.plannedQuantity}
                                                    onChange={(e) => updateField(item.id, 'plannedQuantity', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                {/* <input
                                                    type="date"
                                                    className="form-input w-32"
                                                    placeholder="Planned Quantity"
                                                    min={0}
                                                    value={item.plannedQuantity}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'plannedQuantity', Number(e.target.value))
                                                    }
                                                /> */}

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
                                            {/* <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Achieved Quantity"
                                                    min={0}
                                                    value={item.achievedQuantity}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'achievedQuantity', Number(e.target.value))
                                                    }
                                                />
                                            </td> */}

                                            <td>
                                                <button type="button" onClick={() => removeItem(item)}>
                                                    <IconX className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
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
