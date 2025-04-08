import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select'

const PackingCreation = () => {
    const [formData, setFormData] = useState({
        workOrder: '',

        productName: '',
        productQuantity: '',
        rejectedQuantity: '',
        qrCodeId: '',
    });

    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const products = ['Iron Rod', 'Steel Rod', 'Cast Iron Rod'];
    const workOrders = ["Work Order A", "Work Order B", "Work Order C"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string) => (selectedOption: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleScanResult = (result: string | null) => {
        if (result) {
            setFormData((prev) => ({ ...prev, qrCodeId: result }));
            setIsScannerOpen(false); // Close scanner after reading
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

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '/', isActive: false },
        { label: 'Packing', link: '/iron-smith/packing/view', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/iron-smith/packing/view',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Packing Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* Work Order Name */}
                        <div>
                            <label htmlFor="workOrder" className="block text-sm font-medium text-gray-700">
                                Work Order
                            </label>
                            <Select
                                id="workOrder"
                                options={workOrderOptions}
                                value={workOrderOptions.find(
                                    (option) => option.value === formData.workOrder
                                )}
                                onChange={handleSelectChange('workOrder')}
                                placeholder="Select Work Order"
                                isSearchable
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <Select
                                id="productName"
                                options={productOptions}
                                value={productOptions.find(
                                    (option) => option.value === formData.productName
                                )}
                                onChange={handleSelectChange('productName')}
                                placeholder="Select Product"
                                isSearchable
                            />
                        </div>

                        {/* Product Quantity */}
                        <div>
                            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">
                                Product Quantity
                            </label>
                            <input
                                id="productQuantity"
                                name="productQuantity"
                                type="number"
                                placeholder="Enter Product Quantity"
                                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                value={formData.productQuantity}
                                onChange={handleInputChange}
                                min={0}
                            />
                        </div>

                        {/* Rejected Quantity */}
                        <div>
                            <label htmlFor="rejectedQuantity" className="block text-sm font-medium text-gray-700">
                                Rejected Quantity
                            </label>
                            <input
                                id="rejectedQuantity"
                                name="rejectedQuantity"
                                type="number"
                                placeholder="Enter Rejected Quantity"
                                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                value={formData.rejectedQuantity}
                                onChange={handleInputChange}
                                min={0}
                            />
                        </div>

                        {/* QR Code ID */}
                        <div>
                            <label htmlFor="qrCodeId" className="block text-sm font-medium text-gray-700">
                                QR Code ID
                            </label>
                            <input
                                id="qrCodeId"
                                name="qrCodeId"
                                type="text"
                                placeholder="Scanned QR Code ID"
                                className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                value={formData.qrCodeId}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary mt-2"
                                onClick={() => setIsScannerOpen(true)}
                            >
                                Open QR Scanner
                            </button>
                        </div>
                    </div>

                    {/* QR Code Scanner */}
                    {isScannerOpen && (
                        <div className="mb-4">
                            <BarcodeScannerComponent
                                onUpdate={(error, result) => {
                                    if (result) handleScanResult(result.getText());
                                    if (error) console.warn(error);
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-danger mt-2"
                                onClick={() => setIsScannerOpen(false)}
                            >
                                Close Scanner
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
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
            </div>
        </div>
    );
};

export default PackingCreation;

