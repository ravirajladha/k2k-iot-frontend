import React, { useState } from 'react';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconBell from '@/components/Icon/IconBell';
import IconPlus from '@/components/Icon/IconPlus';
import IconCode from '@/components/Icon/IconCode';
import IconFile from '@/components/Icon/IconFile';

interface WorkOrder {
    id: string;
    clientName: string;
    projectName: string;
    poQuantity: number;
    jobOrderId: string;
}

interface Plant {
    id: string;
    name: string;
}

interface Factory {
    id: string;
    name: string;
}

interface FormData {
    jobOrderNumber: string;
    workOrderNumber: string;
    clientName: string;
    projectName: string;
    salesOrderNumber: string;
    productId: string;
    uom: string;
    poQuantity: string | number;
    date: string;
    plannedQuantity: string;
    actualQuantity: string;
    rejectedQuantity: string;
    selectedMachines: string[];
    system: string;
    productSystem: string;
    productName: string;
}

const ProductionPlanning = () => {
    const [formData, setFormData] = useState<FormData>({
        jobOrderNumber: '',
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
        selectedMachines: [],
        system: '',
        productSystem: '',
        productName: '',
    });

    const jobOrders = [
        { id: 'JO100', name: 'Job Order 100' },
        { id: 'JO101', name: 'Job Order 101' },
        { id: 'JO102', name: 'Job Order 102' },
    ];

    const workOrders: WorkOrder[] = [
        { id: 'WO101', clientName: 'Client A', projectName: 'Project X', poQuantity: 100, jobOrderId: 'JO100' },
        { id: 'WO102', clientName: 'Client B', projectName: 'Project Y', poQuantity: 200, jobOrderId: 'JO101' },
        { id: 'WO103', clientName: 'Client C', projectName: 'Project Z', poQuantity: 300, jobOrderId: 'JO102' },
    ];

    const plants: Plant[] = [
        { id: '1', name: 'Plant1' },
        { id: '2', name: 'Plant2' },
        { id: '3', name: 'Plant3' },
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

    const handleJobOrderChange = (selectedOption: any) => {
        const selectedJobOrderId = selectedOption.value;
        const filteredWorkOrders = workOrders.filter((wo) => wo.jobOrderId === selectedJobOrderId);

        setFormData((prev) => ({
            ...prev,
            jobOrderNumber: selectedOption.value,
            workOrderNumber: filteredWorkOrders.length > 0 ? filteredWorkOrders[0].id : '',
            clientName: filteredWorkOrders.length > 0 ? filteredWorkOrders[0].clientName : '',
            projectName: filteredWorkOrders.length > 0 ? filteredWorkOrders[0].projectName : '',
            poQuantity: filteredWorkOrders.length > 0 ? filteredWorkOrders[0].poQuantity : '',
        }));

        setFilteredWorkOrders(filteredWorkOrders);
    };

    const [filteredWorkOrders, setFilteredWorkOrders] = useState(workOrders);
    const [factories, setFactories] = useState<Factory[]>([]);
    const [date3, setDate3] = useState<any>('2025-07-05 to 2025-07-10');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: 'Product 1',
            plannedQuantity: 0,
            scheduleDate: '',
            sfSteps: [
                {
                    id: 1,
                    name: 'Semi Finished 1',
                    image: null,
                    remark: '',
                    processes: {
                        cutting: false,
                        assembling: false,
                        machining: false,
                        glazing: false,
                    },
                    processRemarks: {
                        cutting: '',
                        assembling: '',
                        machining: '',
                        glazing: '',
                    },
                    checkedSteps: {},
                    remarks: {},
                    images: {},
                },
            ],
        },
    ]);

    const addItem = () => {
        let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
        // console.log("maxId",maxId);
        
        setItems([
            ...items,
            {
                id: maxId + 1,
                title: `Product ${maxId + 1}`,
                system: '',
                productSystem: '',
                plannedQuantity: 0,
                sfSteps: [
                    {
                        id: 1,
                        name: 'Semi Finished 1',
                        scheduleDate: '',
                        plantId: plants[0].id,
                        plantName: plants[0].name,
                        image: null,
                        remark: '',
                        processes: {
                            cutting: false,
                            assembling: false,
                            machining: false,
                            glazing: false,
                        },
                        processRemarks: {
                            cutting: '',
                            assembling: '',
                            machining: '',
                            glazing: '',
                        },
                        checkedSteps: {},
                        remarks: {},
                        images: {},
                    },
                ],
            },
        ]);
    };

    const removeItem = (itemId: number) => {
        setItems(items.filter((item) => item.id !== itemId));
    };

    const addSFStep = (productId: number) => {
      console.log("productId",productId);
      
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          sfSteps: [
                              ...item.sfSteps,
                              {
                                  id: item.sfSteps.length + 1,
                                  name: `Semi Finished ${item.sfSteps.length + 1}`,
                                  scheduleDate: '',
                                  plantId: plants[0].id,
                                  plantName: plants[0].name,
                                  image: null,
                                  remark: '',
                                  processes: {
                                      cutting: false,
                                      assembling: false,
                                      machining: false,
                                      glazing: false,
                                  },
                                  processRemarks: {
                                      cutting: '',
                                      assembling: '',
                                      machining: '',
                                      glazing: '',
                                  },
                                  checkedSteps: {},
                                  remarks: {},
                                  images: {},
                              },
                          ],
                      }
                    : item
            )
        );
    };

    const removeSFStep = (productId: number, sfId: number) => {
        setItems(
            items.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          sfSteps: item.sfSteps.filter((sf) => sf.id !== sfId),
                      }
                    : item
            )
        );
    };

    const updateSFProcess = (productId: number, sfId: number, process: string, value: boolean) => {
        setItems(
            items.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          sfSteps: item.sfSteps.map((sf) =>
                              sf.id === sfId
                                  ? {
                                        ...sf,
                                        processes: { ...sf.processes, [process]: value },
                                    }
                                  : sf
                          ),
                      }
                    : item
            )
        );
    };

    const updateSFRemark = (productId: number, sfId: number, process: string, value: string) => {
        setItems(
            items.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          sfSteps: item.sfSteps.map((sf) =>
                              sf.id === sfId
                                  ? {
                                        ...sf,
                                        processRemarks: { ...sf.processRemarks, [process]: value },
                                    }
                                  : sf
                          ),
                      }
                    : item
            )
        );
    };

    const handleImageUpload = (productId: number, sfId: number, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setItems(
                items.map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              sfSteps: item.sfSteps.map((sf) => (sf.id === sfId ? { ...sf, image: reader.result } : sf)),
                          }
                        : item
                )
            );
        };
        reader.readAsDataURL(file);
    };

    const updateField = (id: number, field: string, value: number) => {
        setItems((prevItems: any) => prevItems.map((item: any) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    const jobOrderOptions = jobOrders.map((jo) => ({ value: jo.id, label: jo.name }));
    const workOrderOptions = filteredWorkOrders.map((wo) => ({ value: wo.id, label: `${wo.id} - ${wo.clientName} - ${wo.projectName}` }));
    const plantOptions = plants.map((plant) => ({ value: plant.id, label: plant.name }));
    const factoryOptions = factories.map((factory) => ({ value: factory.id, label: factory.name }));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Job Order / Planning', link: '/falcon-facade/job-order/view', isActive: false },
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

    const fakeSystems = [
        { value: 'Schuco', label: 'Schuco' },
        { value: 'Schuco', label: 'Schuco' },
        { value: 'Schuco', label: 'Schuco' },
        { value: 'Schuco', label: 'Schuco' },
    ];

    const fakeProjects = [
        { value: 'Inward Door', label: 'Inward Door' },
        { value: 'Fixed Door', label: 'Fixed Door' },
        { value: 'Fixed Window', label: 'Fixed Window' },
        { value: 'Facade', label: 'Facade' },
    ];

    const machineOptions = [
        { value: 'machine1', label: 'Cutting Process' },
        { value: 'machine2', label: 'Machining' },
        { value: 'machine3', label: 'Assembling' },
        { value: 'machine4', label: 'Glass Fixing / Glazing' },
    ];

    const fakeProductSystems = {
        system1: [
            { value: 'productSystem1', label: 'Product System 1' },
            { value: 'productSystem2', label: 'Product System 2' },
        ],
        system2: [
            { value: 'productSystem3', label: 'Product System 3' },
            { value: 'productSystem4', label: 'Product System 4' },
        ],
        system3: [
            { value: 'productSystem5', label: 'Product System 5' },
            { value: 'productSystem6', label: 'Product System 6' },
        ],
        system4: [
            { value: 'productSystem7', label: 'Product System 7' },
            { value: 'productSystem8', label: 'Product System 8' },
        ],
    };

    const [availableProductSystems, setAvailableProductSystems] = useState<any[]>([]);

    const handleSystemChange = (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, system: selectedOption.value, productSystem: '' }));
    };

    const handleProductSystemChange = (selectedOption: any) => {
        setFormData((prev) => ({ ...prev, productName: selectedOption.value }));
        setAvailableProductSystems(fakeProductSystems[selectedOption.value] || []);
    };

    const handleCheckboxChange = (sfId, step, isChecked) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.sfSteps.some((sf) => sf.id === sfId)
                    ? {
                          ...item,
                          sfSteps: item.sfSteps.map((sf) =>
                              sf.id === sfId
                                  ? {
                                        ...sf,
                                        checkedSteps: {
                                            ...sf.checkedSteps,
                                            [step]: isChecked,
                                        },
                                    }
                                  : sf
                          ),
                      }
                    : item
            )
        );
    };

    const handleCheckboxImageUpload = (sfId, step, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.sfSteps.some((sf) => sf.id === sfId)
                        ? {
                              ...item,
                              sfSteps: item.sfSteps.map((sf) =>
                                  sf.id === sfId
                                      ? {
                                            ...sf,
                                            images: {
                                                ...sf.images,
                                                [step]: reader.result,
                                            },
                                        }
                                      : sf
                              ),
                          }
                        : item
                )
            );
        };
        reader.readAsDataURL(file);
    };

    const handleRemarksChange = (sfId, step, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.sfSteps.some((sf) => sf.id === sfId)
                    ? {
                          ...item,
                          sfSteps: item.sfSteps.map((sf) =>
                              sf.id === sfId
                                  ? {
                                        ...sf,
                                        remarks: {
                                            ...sf.remarks,
                                            [step]: value,
                                        },
                                    }
                                  : sf
                          ),
                      }
                    : item
            )
        );
    };

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/falcon-facade/job-order', icon: <IconArrowBackward className="text-4xl" /> }} />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Job Order/Planning Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="jobOrderNumber">
                                Job Order Number <span className="text-red-700">*</span>
                            </label>
                            <Select
                                id="jobOrderNumber"
                                name="jobOrderNumber"
                                options={jobOrderOptions}
                                onChange={handleJobOrderChange}
                                value={jobOrderOptions.find((option) => option.value === formData.jobOrderNumber)}
                                className="form-input"
                                placeholder="Select Job Order"
                                isSearchable
                                styles={customStyles}
                            />
                        </div>
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
                    </div>
                    <div className="mt-8">
                        <div className="table-responsive">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-800 text-dark">
                                    <tr>
                                        <th className="p-2 border w-48">Product</th>
                                        {/* <th className="p-2 border w-48">System</th> */}
                                        <th className="p-2 border w-48">Product System</th>
                                        <th className="p-2 border">Planned Quantity</th>
                                        <th className="p-2 border">Color Code (autofetch)</th>
                                        <th className="p-2 border">Production Req Date (autofetch)</th>
                                        <th className="p-2 border">Production Reqr Date (autofetch)</th>
                                        <th className="p-2 border"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="text-center font-semibold bg-gray-100 p-4">
                                                No Item Available
                                            </td>
                                        </tr>
                                    )}

                                    {items.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <tr className="bg-blue-200">
                                                <td className="p-3 border">
                                                    <Select
                                                        id="system"
                                                        value={formData.productName ? { value: formData.productName, label: formData.productName } : null}
                                                        onChange={handleProductSystemChange}
                                                        options={fakeProjects}
                                                        className="custom-select flex-1"
                                                        classNamePrefix="custom-select"
                                                        placeholder="Select a System"
                                                        isClearable
                                                        menuPortalTarget={document.body}
                                                        required
                                                    />
                                                </td>

                                                {/* <td>
                                                    <Select
                                                        id="system"
                                                        value={formData.system ? { value: formData.system, label: formData.system } : null}
                                                        onChange={handleSystemChange}
                                                        options={fakeSystems}
                                                        className="custom-select flex-1"
                                                        classNamePrefix="custom-select"
                                                        placeholder="Select a System"
                                                        isClearable
                                                        menuPortalTarget={document.body}
                                                        required
                                                    />
                                                </td> */}
                                                <td>
                                                    <input type="text" className="form-input w-full" value={item.title} readOnly />
                                                </td>
                                                <td className="p-3 border">
                                                    <input type="number" className="form-input w-32" min={0} value={item.plannedQuantity} />
                                                </td>
                                                <td className="p-3 border">
                                                    <input type="text" className="form-input w-32" value="RAL 9092" disabled />
                                                </td>
                                                <td className="p-3 border">
                                                    <input type="text" className="form-input w-32" value="2025-01-02" disabled />
                                                </td>
                                                <td className="p-3 border">
                                                    <input type="text" className="form-input w-32" value="2025-01-03" disabled />
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <button type="button" onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">
                                                        ❌
                                                    </button>
                                                </td>
                                            </tr>

                                            {item.sfSteps.map((sf) => (
                                                <tr key={sf.id} className="bg-gray-50">
                                                    <td colSpan={8} className="p-4 rounded-lg shadow-md">
                                                        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                                            <h4 className="text-lg font-semibold">{sf.name}</h4>
                                                            <button type="button" onClick={() => removeSFStep(item.id, sf.id)} className="text-red-600 hover:text-red-800">
                                                                ❌ Remove SF Step
                                                            </button>
                                                        </div>


                                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                                            <div className="relative inline-block">
                                                                <button type="button" className="btn btn-primary mb-2 flex items-center space-x-2">
                                                                    <IconFile className="shrink-0" />
                                                                    <span>Upload File</span>
                                                                </button>
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) => handleImageUpload(item.id, sf.id, e.target.files[0])}
                                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                                />
                                                            </div>
                                                            <div>{sf.image && <img src={sf.image} alt="Uploaded Invoice" className="w-24 h-24 mt-2" />}</div>

                                                            <div>
                                                                <textarea placeholder="Remark" className="form-textarea w-full mt-2"></textarea>
                                                            </div>
                                                        </div>


                                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                                            {['Cutting Process', 'Machining', 'Assembling', 'Glass Fixing / Glazing'].map((step, index) => (
                                                                <label key={index} className="flex items-center space-x-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`sfStep-${sf.id}`}
                                                                        value={step}
                                                                        className="form-checkbox"
                                                                        onChange={(e) => handleCheckboxChange(sf.id, step, e.target.checked)}
                                                                    />
                                                                    <span>{step}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                                            {Object.keys(sf.checkedSteps).map((step) =>
                                                                sf.checkedSteps[step] ? (
                                                                    <div key={step} className="p-4 border rounded shadow-md w-full">
                                                                        <h4 className="text-lg font-semibold">{step}</h4>
                                                                        <div className="mt-2">
                                                                            <div className="relative inline-block">
                                                                                <button type="button" className="btn btn-primary mb-2 flex items-center space-x-2">
                                                                                    <IconFile className="shrink-0" />
                                                                                    <span>Upload File</span>
                                                                                </button>
                                                                                <input
                                                                                    type="file"
                                                                                    onChange={(e) => handleCheckboxImageUpload(sf.id, step, e.target.files[0])}
                                                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                                                />
                                                                            </div>
                                                                            {sf.images[step] && <img src={sf.images[step]} alt={`Uploaded ${step}`} className="w-24 h-24 mt-2" />}
                                                                        </div>
                                                                        <div className="mt-2">
                                                                            <textarea
                                                                                placeholder="Remark"
                                                                                className="form-textarea w-full mt-2"
                                                                                value={sf.remarks[step] || ''}
                                                                                onChange={(e) => handleRemarksChange(sf.id, step, e.target.value)}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                ) : null
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr>
                                                <td colSpan={8} className="p-3 border text-center bg-gray-100">
                                                    <button className="bg-gray-300 text-black px-3 py-1 text-sm rounded hover:bg-gray-400" onClick={() => addSFStep(item.id)}>
                                                        ➕ Add Semi Finished Process
                                                    </button>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-6 px-4 space-x-3">
                            <button type="button" className="btn btn-primary" onClick={addItem}>
                                ➕ Add Product
                            </button>
                        </div>
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

export default ProductionPlanning;
