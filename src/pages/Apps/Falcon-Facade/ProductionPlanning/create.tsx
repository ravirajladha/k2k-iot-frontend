import React, { useState, ChangeEvent } from 'react';

import IconX from '@/components/Icon/IconX';

import IconSave from '@/components/Icon/IconSave';
// IconSend
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconBell from '@/components/Icon/IconBell';
import IconPlus from '@/components/Icon/IconPlus';
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
  // factories: Factory[];
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

  // const plants: Plant[] = [
  //   {
  //     id: 'plant1',
  //     name: 'Plant 1',
  //     factories: [
  //       { id: 'factory1', name: 'Factory 1' },
  //       { id: 'factory2', name: 'Factory 2' },
  //     ],
  //   },
  //   {
  //     id: 'plant2',
  //     name: 'Plant 2',
  //     factories: [
  //       { id: 'factory3', name: 'Factory 3' },
  //       { id: 'factory4', name: 'Factory 4' },
  //     ],
  //   },
  // ];

  const plants: Plant[] = [
    { id: '1', name: "Plant1" },
    { id: '2', name: "Plant2" },
    { id: '3', name: "Plant3" },
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
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, selectedMachines: selectedOptions ? selectedOptions.map((option: any) => option.value) : [] }
          : item
      )
    );
  };
  const [selectedMachines, setSelectedMachines] = useState<string>('');

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
      title: "Product 1",
      plannedQuantity: 0,
      scheduleDate: "",
      sfSteps: [
        {
          id: 1,
          name: "Semi Finished 1",
          image: null,
          remark: "",
          processes: {
            cutting: false,
            assembling: false,
            machining: false,
            glazing: false,
          },
          processRemarks: {
            cutting: "",
            assembling: "",
            machining: "",
            glazing: "",
          },
        },
      ],
    },
  ]);

  // Add a new product along with its first SF step
  const addItem = () => {
    let maxId = items.length ? Math.max(...items.map((item) => item.id)) : 0;
    setItems([
      ...items,
      {
        id: maxId + 1,
        title: `Product ${maxId + 1}`,
        plannedQuantity: 0,
        sfSteps: [
          {
            id: 1,
            name: "Semi Finished 1",
            scheduleDate: "",
            plantId: plants[0].id,
            plantName: plants[0].name,
            image: null,
            remark: "",
            processes: {
              cutting: false,
              assembling: false,
              machining: false,
              glazing: false,
            },
            processRemarks: {
              cutting: "",
              assembling: "",
              machining: "",
              glazing: "",
            },
          },
        ],
      },
    ]);
  };

  // Remove a product
  const removeItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
  };
  // Add a new SF step to a product
  // Add a new SF step to the correct product
  const addSFStep = (productId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
            ...item,
            sfSteps: [
              ...item.sfSteps,
              {
                id: item.sfSteps.length + 1, // Assign new unique SF id
                name: `Semi Finished ${item.sfSteps.length + 1}`,
                scheduleDate: "",
                plantId: plants[0].id,
                plantName: plants[0].name,
                image: null,
                remark: "",
                processes: {
                  cutting: false,
                  assembling: false,
                  machining: false,
                  glazing: false,
                },
                processRemarks: {
                  cutting: "",
                  assembling: "",
                  machining: "",
                  glazing: "",
                },
              },
            ],
          }
          : item
      )
    );
  };


  // Remove SF Step
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
  // Update SF process checkboxes and remarks
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

  // Update SF remarks for a process
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

  // Handle image upload for SF steps
  const handleImageUpload = (productId: number, sfId: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setItems(
        items.map((item) =>
          item.id === productId
            ? {
              ...item,
              sfSteps: item.sfSteps.map((sf) =>
                sf.id === sfId ? { ...sf, image: reader.result } : sf
              ),
            }
            : item
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const updateField = (id: number, field: string, value: number) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };



  const workOrderOptions = workOrders.map(wo => ({ value: wo.id, label: `${wo.id} - ${wo.clientName} - ${wo.projectName}` }));
  const plantOptions = plants.map(plant => ({ value: plant.id, label: plant.name }));
  const factoryOptions = factories.map(factory => ({ value: factory.id, label: factory.name }));

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

  const machineOptions = [
    { value: "machine1", label: "Cutting Process" },
    { value: "machine2", label: "Machining" },

    { value: "machine3", label: "Assembling" },
    { value: "machine4", label: "Glass Fixing / Glazing" },
  ];


  return (
    <div>
      <Breadcrumbs
        items={breadcrumbItems}
        addButton={{ label: 'Back', link: '/falcon-facade/job-order', icon: <IconArrowBackward className="text-4xl" /> }}
      />

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
                value={workOrderOptions.find(option => option.value === formData.workOrderNumber)}
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
              <label htmlFor="date">Range Date (from and to) <span className="text-red-700">*</span></label>

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
                    <th className="p-2 border">Product</th>
                    <th className="p-2 border">Planned Quantity</th>
                    <th className="p-2 border"></th>
                  </tr>
                </thead>

                <tbody>
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center font-semibold bg-gray-100 p-4">
                        No Item Available
                      </td>
                    </tr>
                  )}

                  {items.map((item) => (
                    <React.Fragment key={item.id}>
                      {/* Product Row */}
                      <tr className="bg-blue-200">
                        <td className="p-3 border">
                          <input type="text" className="form-input w-full" value={item.title} readOnly />
                        </td>
                        <td className="p-3 border">
                          <input type="number" className="form-input w-32" min={0} value={item.plannedQuantity} />
                        </td>
                        <td className="p-3 border text-center">
                          <button type="button" onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">
                            ❌
                          </button>
                        </td>
                      </tr>

                      {/* SF Steps Section */}
                      {item.sfSteps.map((sf) => (
                        <tr key={sf.id} className="bg-gray-50">
                          <td colSpan={3} className="p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                              <h4 className="text-lg font-semibold">{sf.name}</h4>
                              <button
                                type="button"
                                onClick={() => removeSFStep(item.id, sf.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                ❌ Remove SF Step
                              </button>
                            </div>

                            {/* Image Upload & Remarks */}
                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <input type="file" onChange={(e) => handleImageUpload(item.id, sf.id, e.target.files[0])} />
                                {sf.image && <img src={sf.image} alt="Uploaded SF" className="w-24 h-24 mt-2" />}
                              </div>
                              <div>
                                <textarea placeholder="Remark" className="form-textarea w-full mt-2"></textarea>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Button to Add SF Step (Placed Inside Each Product Row) */}
                      <tr>
                        <td colSpan={3} className="p-3 border text-center bg-gray-100">
                          <button
                            className="bg-gray-300 text-black px-3 py-1 text-sm rounded hover:bg-gray-400"
                            onClick={() => addSFStep(item.id)}
                          >
                            ➕ Add Semi Finished Process
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Button to Add New Product */}
            <div className="flex justify-end mt-6 px-4 space-x-3">
              <button type="button" className="btn btn-primary" onClick={addItem}>
                ➕ Add Product
              </button>
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
