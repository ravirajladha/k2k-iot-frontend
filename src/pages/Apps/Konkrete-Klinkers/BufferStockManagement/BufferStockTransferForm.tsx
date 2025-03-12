import React, { useState } from 'react';
import Select from 'react-select';
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

// Mock Data: Adjusted for each work order's product list.
const workOrders = [
    { id: '1', name: 'Work Order 1' },
    { id: '2', name: 'Work Order 2' },
    { id: '3', name: 'Work Order 3' },
];

const products: { [workOrderId: string]: Product[] } = {
    '1': [
        { id: 'P1', name: 'Paver Block', bufferQuantity: 100 },
        { id: 'P2', name: 'Paver Grey', bufferQuantity: 50 },
    ],
    '2': [
        { id: 'P1', name: 'Paver Block', bufferQuantity: 200 },
        { id: 'P3', name: 'Paver Grey', bufferQuantity: 150 },
    ],
    '3': [
        { id: 'P2', name: 'Paver Grey', bufferQuantity: 80 },
        { id: 'P3', name: 'Paver Red', bufferQuantity: 300 },
    ],
};

const BufferStockTransferForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fromWorkOrder: '',
        toWorkOrder: '',
        productId: '',
        quantity: '',
    });
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSelectChange = (field: keyof FormData) => (selectedOption: any) => {
        const value = selectedOption ? selectedOption.value : '';
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Handle the product selection based on work orders
        if (field === 'fromWorkOrder') {
            // Get products for the selected "From Work Order"
            if (products[value]) {
                setAvailableProducts(products[value]);
                setErrorMessage('');
            } else {
                setAvailableProducts([]);
                setErrorMessage('No products available in this work order.');
            }
        }

        if (field === 'toWorkOrder' && formData.productId) {
            // Check if the selected product is available in the "To Work Order"
            const toWorkOrderProducts = products[value];
            if (toWorkOrderProducts && !toWorkOrderProducts.some((p) => p.id === formData.productId)) {
                setErrorMessage('The selected product is not available in the "To Work Order."');
            } else {
                setErrorMessage('');
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!errorMessage) {
            console.log('Buffer Stock Transfer Form Data:', formData);
            // API call for buffer stock transfer here
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const workOrderOptions = workOrders.map((workOrder) => ({
        value: workOrder.id,
        label: workOrder.name,
    }));

    const productOptions = availableProducts.map((product) => ({
        value: product.id,
        label: `${product.name} (Buffer: ${product.bufferQuantity})`,
    }));

    return (
        <div className="panel mt-6">
            <h5 className="font-semibold text-lg">Buffer Stock Transfer Form</h5>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {formData.productId && (
                        <div className="col-span-2 bg-gray-100 p-4 rounded">
                            <h6 className="font-bold">From Work Order Details</h6>
                            <p>Buffer Quantity: {availableProducts.find((product) => product.id === formData.productId)?.bufferQuantity}</p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="col-span-2 bg-red-100 p-4 rounded text-red-800">
                            <h6 className="font-bold">Error:</h6>
                            <p>{errorMessage}</p>
                        </div>
                    )}

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
                            disabled={showPopup}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="submit" className="btn btn-success" disabled={showPopup || !!errorMessage}>
                        <IconSave className="mr-2" />
                        Transfer
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handlePopupClose}>
                        <IconTrashLines className="mr-2" />
                        Cancel
                    </button>
                </div>
            </form>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h5>Invalid Quantity</h5>
                        <p>The quantity you entered is not valid for transfer.</p>
                        <button onClick={handlePopupClose} className="btn btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BufferStockTransferForm;
