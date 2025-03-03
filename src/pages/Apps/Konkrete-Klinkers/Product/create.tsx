import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';

interface FormData {
    materialCode: string;
    description: string;
    piecesPerPunch: string;
    uom: string;
    qtyInBundle: string;
    qtyInNosPerBundle: string;
    length: string,
    breadth: string,
}

interface Client {
    id: string;
    name: string;
    // factories: Factory[];
  }
  

const ProductCreationForm: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Product'));
    });
    const [showTooltip, setShowTooltip] = useState(false);

const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const handleClientChange = (selectedOption: any) => {
    const clientId = selectedOption ? selectedOption.value : null;
    setSelectedClient(clientId);
    const client = clientsData.find((client) => client.id === clientId);
    // setFactories(client ? client.factories : []);
    // setSelectedFactory(null); 
  };
    const [formData, setFormData] = useState<FormData>({
        materialCode: '',
        description: '',
        piecesPerPunch: '',
        uom: '',
        qtyInBundle: '',
        qtyInNosPerBundle: '',
        length: "",
        breadth: "",
    });

      const [clientsData] = useState<Client[]>([
        {
          id: 'plant1',
          name: 'Plant 1',
        },
        {
          id: 'plant2',
          name: 'Plant 2',
        },
        // Add more clients as needed
      ]);

    const uomOptions = ['Square Metre', 'Nos'];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: ' Products', link: '/konkrete-klinkers/products', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (

        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{ label: 'Back', link: '/konkrete-klinkers/products', icon: <IconArrowBackward className="text-4xl" /> }}
            />
            <div className="panel">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="font-semibold text-lg dark:text-white-light">Product Creation Form</h5>
                <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 relative"
                >
                    <span className="flex items-center">
                        <IconInfoCircle className="me-2" />
                    </span>
                    {showTooltip && (
                        <div className="absolute top-0 right-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg">
                            <ul>
                                <li>The product UOM have serious dependency on the calculation of the product master data.</li>
                                <li>...</li>
                                <li>...</li>
                            </ul>
                        </div>
                    )}
                </button>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Material Code */}

                    <div>
              <label htmlFor="client">Plant</label>
              <Select
                id="client"
                value={selectedClient ? { value: selectedClient, label: clientsData.find(client => client.id === selectedClient)?.name } : null}
                onChange={handleClientChange}
                options={clientsData.map(client => ({ value: client.id, label: client.name }))}
                className="custom-select"
                classNamePrefix="custom-select"
                placeholder="Select Plant"
                isClearable
                required
              />
            </div>

                    <div>
                        <label htmlFor="materialCode">Material Code</label>
                        <input
                            id="materialCode"
                            name="materialCode"
                            type="text"
                            placeholder="Enter Material Code"
                            className="form-input"
                            value={formData.materialCode}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter Description"
                            className="form-input"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    {/* No. of Pieces Per Punch */}
                    <div>
                        <label htmlFor="piecesPerPunch">No. of Pieces Per Punch</label>
                        <input
                            id="piecesPerPunch"
                            name="piecesPerPunch"
                            type="number"
                            placeholder="Enter No. of Pieces Per Punch"
                            className="form-input"
                            value={formData.piecesPerPunch}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* UOM */}
                    <div>
                        <label htmlFor="uom">UOM</label>
                        <select
                            id="uom"
                            name="uom"
                            className="form-input"
                            value={formData.uom}
                            onChange={handleInputChange}
                        >
                            <option value="">Select UOM</option>
                            {uomOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formData.uom === 'Square Metre' && (
                        <>
                            {/* Length */}
                            <div>
                                <label htmlFor="length">Length (meters)</label>
                                <input
                                    id="length"
                                    name="length"
                                    type="number"
                                    placeholder="Enter Length"
                                    className="form-input"
                                    value={formData.length}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Breadth */}
                            <div>
                                <label htmlFor="breadth">Breadth (meters)</label>
                                <input
                                    id="breadth"
                                    name="breadth"
                                    type="number"
                                    placeholder="Enter Breadth"
                                    className="form-input"
                                    value={formData.breadth}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}

                    {/* Qty in Bundle */}
                    <div>
                        <label htmlFor="qtyInBundle">Qty in Bundle</label>
                        <input
                            id="qtyInBundle"
                            name="qtyInBundle"
                            type="number"
                            placeholder="Enter Qty in Bundle"
                            className="form-input"
                            value={formData.qtyInBundle}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Qty in Nos Per Bundle */}
                    <div>
                        <label htmlFor="qtyInNosPerBundle">Qty in Nos per Bundle</label>
                        <input
                            id="qtyInNosPerBundle"
                            name="qtyInNosPerBundle"
                            type="number"
                            placeholder="Enter Qty in Nos per Bundle"
                            className="form-input"
                            value={formData.qtyInNosPerBundle}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div></div>
    );
};

export default ProductCreationForm;
