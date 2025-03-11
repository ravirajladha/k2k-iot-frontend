import React, { useState } from 'react';
import Select from 'react-select';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';

interface FormData {
    fromWorkOrder: string;
    toWorkOrder: string;
    productId: string;
    quantity: string;
}

interface Product {
    id: string;
    name: string;
    bufferQuantity: number;
}

interface WorkOrderDetails {
    workOrder: string;
    productId: string;
    availableQuantity: number;
}

// Mock Data
const workOrders = ['Work Order 1', 'Work Order 2', 'Work Order 3'];
const products: Product[] = [
    { id: 'P1', name: 'Product A', bufferQuantity: 100 },
    { id: 'P2', name: 'Product B', bufferQuantity: 200 },
    { id: 'P3', name: 'Product C', bufferQuantity: 150 },
];

const BufferStockManagement: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fromWorkOrder: '',
        toWorkOrder: '',
        productId: '',
        quantity: '',
    });

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [toWorkOrderDetails, setToWorkOrderDetails] = useState<WorkOrderDetails | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSelectChange = (field: keyof FormData) => (selectedOption: any) => {
        const value = selectedOption ? selectedOption.value : '';
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === 'productId') {
            const product = products.find((p) => p.id === value);
            if (product) setSelectedProduct(product);
        }

        if (field === 'toWorkOrder' && formData.productId) {
            // Simulate API call for product availability in "To Work Order"
            const mockApiResponse: WorkOrderDetails | null = {
                workOrder: value,
                productId: formData.productId,
                availableQuantity: Math.random() > 0.5 ? 50 : 0, // Randomly decide if the product exists
            };

            if (mockApiResponse.availableQuantity === 0) {
                setShowPopup(true);
                setToWorkOrderDetails(null);
            } else {
                setToWorkOrderDetails(mockApiResponse);
                setShowPopup(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!showPopup) {
            console.log('Form Data:', formData);
        }
    };

    const workOrderOptions = workOrders.map((workOrder) => ({
        value: workOrder,
        label: workOrder,
    }));

    const productOptions = products.map((product) => ({
        value: product.id,
        label: `${product.name} (Buffer: ${product.bufferQuantity})`,
    }));

    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: 'Home', link: '/', isActive: false },
                    { label: 'Konkrete Klinkers', link: '/', isActive: false },
                    { label: 'Buffer Stock Management', link: '/konkrete-klinkers/stockManagement', isActive: false },
                    { label: 'Create', link: '/#', isActive: true },

                ]}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/stockManagement',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Transfer Stock Form</h5>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Select From Work Order */}
                        <div>
                            <label htmlFor="fromWorkOrder">From Work Order</label>
                            <Select
                                id="fromWorkOrder"
                                options={workOrderOptions}
                                value={workOrderOptions.find(
                                    (option) => option.value === formData.fromWorkOrder
                                )}
                                onChange={handleSelectChange('fromWorkOrder')}
                                placeholder="Select From Work Order"
                            />
                        </div>

                        {/* Select Product */}
                        <div>
                            <label htmlFor="productId">Product</label>
                            <Select
                                id="productId"
                                options={productOptions}
                                value={productOptions.find(
                                    (option) => option.value === formData.productId
                                )}
                                onChange={handleSelectChange('productId')}
                                placeholder="Select Product"
                                isDisabled={!formData.fromWorkOrder}
                            />
                        </div>

                        {/* Select To Work Order */}
                        <div>
                            <label htmlFor="toWorkOrder">To Work Order</label>
                            <Select
                                id="toWorkOrder"
                                options={workOrderOptions}
                                value={workOrderOptions.find(
                                    (option) => option.value === formData.toWorkOrder
                                )}
                                onChange={handleSelectChange('toWorkOrder')}
                                placeholder="Select To Work Order"
                                isDisabled={!formData.productId}
                            />
                        </div>

                        {/* Product Details */}
                        {selectedProduct && (
                            <div className="col-span-2 bg-gray-100 p-4 rounded">
                                <h6 className="font-bold">From Work Order Details</h6>
                                <p>Buffer Quantity: {selectedProduct.bufferQuantity}</p>
                            </div>
                        )}

                        {toWorkOrderDetails && (
                            <div className="col-span-2 bg-gray-100 p-4 rounded">
                                <h6 className="font-bold">To Work Order Details</h6>
                                <p>Available Quantity: {toWorkOrderDetails.availableQuantity}</p>
                            </div>
                        )}

                        {/* Quantity Input */}
                        <div>
                            <label htmlFor="quantity">Quantity to Transfer</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="Enter Quantity"
                                className="form-input"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                disabled={!formData.toWorkOrder || showPopup}
                            />
                        </div>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end gap-4">
                        <button type="submit" className="btn btn-success" disabled={showPopup}>
                            <IconSave className="mr-2" />
                            Transfer
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handlePopupClose}>
                            <IconTrashLines className="mr-2" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Popup for Product Unavailability */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h5>Product Not Available</h5>
                        <p>
                            The selected product is not available in the selected "To Work Order."
                        </p>
                        <button onClick={handlePopupClose} className="btn btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BufferStockManagement;
