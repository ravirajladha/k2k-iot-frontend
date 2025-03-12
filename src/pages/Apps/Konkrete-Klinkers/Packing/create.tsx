import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';

const PackingCreation = () => {
    const [formData, setFormData] = useState({
        workOrder: '',
        productName: '',
        totalBricks: '',
        totalBatches: '',
        uom:'',
        batchInputs: [] as number[],
    });

    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [balancedQuantity, setBalancedQuantity] = useState(0);
    const [isGenerated, setIsGenerated] = useState(false);

    const products = ['Product A', 'Product B', 'Product C'];
    const workOrders = ["Work Order A", "Work Order B", "Work Order C"];
    const uoms = ["sqmt", "nos"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string) => (selectedOption: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : '',
        }));
    };

    const generateBatchInputs = () => {
        const totalBricks = parseInt(formData.totalBricks, 10);
        const totalBatches = parseInt(formData.totalBatches, 10);

        if (isNaN(totalBricks) || isNaN(totalBatches) || totalBatches === 0) return;

        let baseBlocks = Math.floor(totalBricks / totalBatches);
        let remainder = totalBricks % totalBatches;
        let batchValues = new Array(totalBatches).fill(baseBlocks);

        for (let i = 0; i < remainder; i++) {
            batchValues[i] += 1;
        }

        setFormData((prev) => ({ ...prev, batchInputs: batchValues }));
        setBalancedQuantity(totalBricks);
        setIsGenerated(true);
    };

    const handleBatchInputChange = (index: number, value: string) => {
        let newBatchInputs = [...formData.batchInputs];
        newBatchInputs[index] = parseInt(value, 10) || 0;

        // Calculate total packed and prevent the balanced quantity from exceeding the planned total
        const totalPacked = newBatchInputs.reduce((acc, val) => acc + val, 0);
        if (totalPacked <= balancedQuantity) {
            setFormData((prev) => ({
                ...prev,
                batchInputs: newBatchInputs,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const workOrderOptions = workOrders.map((workOrder) => ({
        value: workOrder,
        label: workOrder,
    }));

    const productOptions = products.map((product) => ({
        value: product,
        label: product,
    }));
    const uomOptions = uoms.map((uom) => ({
        value: uom,
        label: uom,
    }));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Packing', link: '/konkrete-klinkers/packing/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/job-order/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Packing Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="workOrder" className="block text-sm font-medium text-gray-700">
                                Work Order
                            </label>
                            <Select
                                options={workOrderOptions}
                                value={workOrderOptions.find(option => option.value === formData.workOrder)}
                                onChange={handleSelectChange('workOrder')}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>

                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <Select
                                options={productOptions}
                                value={productOptions.find(option => option.value === formData.productName)}
                                onChange={handleSelectChange('productName')}
                                placeholder="Select Product"
                                isSearchable
                            />
                        </div>

                        <div>
                            <label htmlFor="totalBricks" className="block text-sm font-medium text-gray-700">
                                Total Quantity
                            </label>
                            <input
                                id="totalBricks"
                                name="totalBricks"
                                type="number"
                                placeholder="Enter Total Bricks"
                                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                value={formData.totalBricks}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="totalBatches" className="block text-sm font-medium text-gray-700">
                                Total Bundles
                            </label>
                            <input
                                id="totalBatches"
                                name="totalBatches"
                                type="number"
                                placeholder="Enter Number of Batches"
                                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                value={formData.totalBatches}
                                onChange={handleInputChange}
                                onBlur={generateBatchInputs}
                            />
                        </div>
                        <div>
                            <label htmlFor="uom" className="block text-sm font-medium text-gray-700">
                                UOM
                            </label>
                            <Select
                                options={uomOptions}
                                value={uomOptions.find(option => option.value === formData.uom)}
                                onChange={handleSelectChange('uom')}
                                placeholder="Select Product"
                                isSearchable
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <h5 className="font-semibold text-lg">Packing Details</h5>
                            <p className="text-gray-600">Balanced Quantity: {balancedQuantity}</p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={generateBatchInputs}
                        >
                            Generate
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
                        {formData.batchInputs.map((value, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    Bundle {index + 1}
                                </label>
                                <input
                                    type="number"
                                    className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                    value={value}
                                    onChange={(e) => handleBatchInputChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">



                        <button type="submit" className="btn btn-success w-1/2">
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Submit
                        </button>
                        <button type="button" className="btn btn-danger w-1/2">
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>

                </form>
            </div >
        </div >
    );
};

export default PackingCreation;
