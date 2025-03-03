import React, { useState, useEffect } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import Select from 'react-select'
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
interface WorkOrder {
    id: string;
    clientName: string;
    projectName: string;
    poQuantity: number;
}
interface PlantData {
    id: string;
    plantName: string;
}
interface FactoryData {
    id: string;
    factoryName: string;
}

// jobDetails

interface JobOrder {
    workOrderId: string;
    jobOrders: { id: string; jobDetails: string }[];
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
    recycledQuantity: string;
    jobOrderNumber: string;
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
        jobOrderNumber: "",
        recycledQuantity: '',
    });

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // Formats to 'YYYY-MM-DD'
        setCurrentDate(formattedDate);
    }, []);


    const [showTooltip, setShowTooltip] = useState(false);

    const workOrders: WorkOrder[] = [
        { id: 'WO101', clientName: 'Client A', projectName: 'Project X', poQuantity: 100 },
        { id: 'WO102', clientName: 'Client B', projectName: 'Project Y', poQuantity: 200 },
        { id: 'WO103', clientName: 'Client C', projectName: 'Project Z', poQuantity: 300 },
    ];

    const jobOrders: JobOrder[] = [
        {
            workOrderId: 'WO101',
            jobOrders: [
                { id: 'JO101', jobDetails: 'Cutting Process' },
                { id: 'JO102', jobDetails: 'Assembly Process' },
            ],
        },
        {
            workOrderId: 'WO102',
            jobOrders: [
                { id: 'JO201', jobDetails: 'Painting Process' },
                { id: 'JO202', jobDetails: 'Quality Check' },
            ],
        },
        {
            workOrderId: 'WO103',
            jobOrders: [
                { id: 'JO301', jobDetails: 'Packaging' },
                { id: 'JO302', jobDetails: 'Shipping Preparation' },
            ],
        },
    ];

    const handleJobOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedJobOrderId = e.target.value;
        const selectedJobOrder = jobOrders.find((jo) =>
            jo.jobOrders.some((job) => job.id === selectedJobOrderId)
        );

        if (selectedJobOrder) {
            const relatedWorkOrder = workOrders.find(
                (wo) => wo.id === selectedJobOrder.workOrderId
            );

            setFormData((prev) => ({
                ...prev,
                jobOrderNumber: selectedJobOrderId,
                workOrderNumber: selectedJobOrder.workOrderId,
                clientName: relatedWorkOrder?.clientName || '',
                projectName: relatedWorkOrder?.projectName || '',
            }));
        }
    };

    const relevantJobOrders = jobOrders.find(
        (jo) => jo.workOrderId === formData.workOrderNumber
    )?.jobOrders;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    // const relevantJobOrders = jobOrders.find(
    //     (jo) => jo.workOrderId === formData.workOrderNumber
    // )?.jobOrders;

    const [items, setItems] = useState<any>([
        { id: 1, title: 'Product 1', uom: 'KG', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
        // { id: 2, title: 'Product 2', uom: 'Piece', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
        // { id: 3, title: 'Product 3', uom: 'Box', poQuantity: 0, plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 },
    ]);

    //add item can be used if new adding of items are required
    const addItem = () => {
        const maxId = items.length ? Math.max(...items.map((item: any) => item.id)) : 0;
        setItems([...items, { id: maxId + 1, title: '', uom: '', plannedQuantity: 0, achievedQuantity: 0, rejectedQuantity: 0, recycledQuantity: 0 }]);
    };

    const removeItem = (item: any) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const updateField = (id: number, field: string, value: number) => {
        setItems((prevItems: any) =>
            prevItems.map((item: any) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    // **Downtime Details State**
    const [downtimeItems, setDowntimeItems] = useState<any[]>([
        { id: 1, description: '', minutes: 0, remarks: '' },
    ]);

    const addDowntimeItem = () => {
        const maxId = downtimeItems.length ? Math.max(...downtimeItems.map((item) => item.id)) : 0;
        setDowntimeItems([...downtimeItems, { id: maxId + 1, description: '', minutes: 0, remarks: '' }]);
    };

    const removeDowntimeItem = (item: any) => {
        setDowntimeItems(downtimeItems.filter((d: any) => d.id !== item.id));
    };

    const handleDowntimeChange = (id: number, field: string, value: string | number) => {
        setDowntimeItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };



    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Daily Production Report', link: '/konkrete-klinkers/production-planning/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (

        <div>

        <Breadcrumbs
            items={breadcrumbItems}
            addButton={{ label: 'Back', link: '/konkrete-klinkers/job-order/view', icon: <IconArrowBackward className="text-4xl" /> }}

        />
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg">Daily Production Report Creation</h5>
            </div>
            <form className="" onSubmit={(e) => e.preventDefault()}>
                {/* Left Section: Input Fields */}
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-6 items-start">
                        {/* Left Section: Input Fields */}
                        <div className="space-y-5  p-4 shadow-md rounded">
                            {/* <h5 className="font-semibold text-lg mb-4">Input Fields</h5> */}
                            {/* Sales Order Number */}
                            <div>
                                <label htmlFor="salesOrderNumber" className="block text-sm font-medium text-gray-700">
                                    Sales Order Number (Optional)
                                </label>
                                <input
                                    id="salesOrderNumber"
                                    name="salesOrderNumber"
                                    type="text"
                                    placeholder="Enter Sales Order Number"
                                    className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                    value={formData.salesOrderNumber}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, salesOrderNumber: e.target.value }))
                                    }
                                />
                            </div>

                            {/* Job Order Dropdown */}
                            <div>
                                <label htmlFor="jobOrderNumber" className="block text-sm font-medium text-gray-700">
                                    Job Order Number <span className="text-red-400">*</span>
                                </label>


                                <Select
                                    id="jobOrderNumber"
                                    options={jobOrders.flatMap((jo) =>
                                        jo.jobOrders.map((job) => ({
                                            value: job.id,
                                            label: `${job.id} - ${job.jobDetails}`,
                                        }))
                                    )}
                                    value={
                                        jobOrders
                                            .flatMap((jo) =>
                                                jo.jobOrders.map((job) => ({
                                                    value: job.id,
                                                    label: `${job.id} - ${job.jobDetails}`,
                                                }))
                                            )
                                            .find((option) => option.value === formData.jobOrderNumber) || null
                                    }
                                    onChange={(selectedOption) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            jobOrderNumber: selectedOption?.value || '',
                                        }))
                                    }
                                    placeholder="Select Job Order"
                                    isSearchable
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '2px',
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 9999, // Ensures dropdown visibility over other components
                                        }),
                                    }}
                                />

                                {/* </select> */}
                            </div>
                        </div>

                        {/* Right Section: Display Fetched Details */}
                        <div className="space-y-4  p-4 shadow-md rounded">
                            <h5 className="font-semibold text-lg mb-4">Fetched Details</h5>
                            <div className="grid grid-cols-2 gap-6 ">
                                {/* Work Order Number */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Work Order
                                    </label>
                                    <p className=" text-sm  px-2 py-1 rounded border border-gray-200">
                                        {formData.workOrderNumber || 'N/A'}
                                    </p>
                                </div>

                                {/* Client Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Client Name
                                    </label>
                                    <p className=" text-sm  px-2 py-1 rounded border border-gray-200">
                                        {formData.clientName || 'N/A'}
                                    </p>
                                </div>

                                {/* Project Name */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Project Name
                                    </label>
                                    <p className=" text-sm  px-2 py-1 rounded border border-gray-200">
                                        {formData.projectName || 'N/A'}
                                    </p>
                                </div>

                                {/* Current Date */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Current Date
                                    </label>
                                    <p className=" text-sm  px-2 py-1 rounded border border-gray-200">
                                        {currentDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="mt-8 mb-8">
                    {/* <h3 className="font-semibold text-lg">Plan Production </h3> */}
                    <div className="flex items-center space-x-1">
                        <h3 className="font-semibold text-lg">Plan Production </h3>
                        <span className="text-red-500">*</span>

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
                                    Here, the rejected, recycled are different with total quantity.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="w-1">UOM</th>
                                    <th className="w-1">PO Quantity (autofetch)</th>
                                    <th className="w-1">Planned Quantity (autofetch)</th>
                                    <th className="w-1">Achieved Quantity</th>
                                    <th className="w-1">Rejected Quantity</th>
                                    <th className="w-1">Recycled Quantity</th>

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
                                            <input
                                                type="text"
                                                className="form-input min-w-[200px]"
                                                placeholder="Enter Item Name"
                                                defaultValue={item.title}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-input w-32"
                                                placeholder="UOM"
                                                defaultValue={item.uom}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="PO Quantity"
                                                min={0}
                                                value={item.poQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'poQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="Planned Quantity"
                                                min={0}
                                                value={item.plannedQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'plannedQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
                                        <td>
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
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="Rejected Quantity"
                                                min={0}
                                                value={item.rejectedQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'rejectedQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-input w-32"
                                                placeholder="Recycled Quantity"
                                                min={0}
                                                value={item.recycledQuantity}
                                                onChange={(e) =>
                                                    updateField(item.id, 'recycledQuantity', Number(e.target.value))
                                                }
                                            />
                                        </td>
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
                    {/* <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                <div className="sm:mb-0 mb-6"> */}
                    <button type="button" className="btn btn-primary mt-4 mb-4 float-right" onClick={addItem}>
                        <IconChecks className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Add Product
                    </button>
                    {/* </div>


            </div> */}
                </div>

                {/* downtime section */}
                {/* downtime section */}
                <h3 className="font-semibold text-lg pt-5">Add Downtime Details</h3>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>SL Number</th>
                                <th>Description</th>
                                <th>Minutes</th>
                                <th>Remarks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {downtimeItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            className="form-input"
                                            value={item.description}
                                            onChange={(e) =>
                                                handleDowntimeChange(item.id, 'description', e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder="Minutes"
                                            className="form-input"
                                            value={item.minutes}
                                            onChange={(e) =>
                                                handleDowntimeChange(item.id, 'minutes', Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Remarks"
                                            className="form-input"
                                            value={item.remarks}
                                            onChange={(e) => handleDowntimeChange(item.id, 'remarks', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => removeDowntimeItem(item)}>
                                            <IconX className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        className="btn btn-primary mt-2 float-right"
                        onClick={addDowntimeItem}
                    >
                        <IconChecks className="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Add Downtime Detail
                    </button>
                </div>


                {/* </div> */}


                {/* Submit Button */}
                <div className="flex gap-4 mt-4">
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
