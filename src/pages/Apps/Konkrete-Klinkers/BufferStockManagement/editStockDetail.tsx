import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';

interface Product {
    id: string;
    name: string;
    bufferQuantity: number;
}

interface FormData {
    fromWorkOrder: string;
    toWorkOrder: string;
    productId: string;
    quantity: string;
}

const products: Product[] = [
    { id: 'P1', name: 'Paver Black', bufferQuantity: 100 },
    { id: 'P2', name: 'Paver Grey', bufferQuantity: 200 },
    { id: 'P3', name: 'Paver Red', bufferQuantity: 150 },
];

const productOptions = products.map((product) => ({
    value: product.id,
    label: `${product.name}`,
}));

const workOrders = ['Work Order 1', 'Work Order 2', 'Work Order 3'];

const workOrderOptions = workOrders.map((workOrder) => ({
    value: workOrder,
    label: workOrder,
}));

const StockEditPage = () => {
    console.log('inside stock management edit page');

    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData } = location.state || {}; // Access the rowData passed from the previous component
    console.log('rowData', rowData);

    const [formData, setFormData] = useState<FormData>({
        fromWorkOrder: rowData.workOrderId || '',
        toWorkOrder: rowData.to_work_order_id || '',
        productId: rowData.product_id || '',
        quantity: rowData.quantity ? rowData.quantity.toString() : '',
    });

    useEffect(() => {
        dispatch(setPageTitle('Stock Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No dispatch data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Stock Management', link: '/konkrete-klinkers/stockManagement', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    const handleSelectChange = (field: keyof FormData) => (selectedOption: any) => {
        const value = selectedOption ? selectedOption.value : '';
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
        // Handle form submission logic here
        console.log('Updated Stock Transfer Form Data:', formData);
    };

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/stockManagement',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="p-4 pt-10">
                {/* Client Details Section */}
                <div className="panel mb-6 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Edit Transfer Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fromWorkOrder">From Work Order</label>
                                <input id="fromWorkOrder" name="fromWorkOrder" value={formData.fromWorkOrder} type="text" className="form-input" readOnly />
                            </div>

                            <div>
                                <label htmlFor="productId">Product</label>
                                <Select
                                    id="productId"
                                    options={productOptions}
                                    value={productOptions.find((option) => option.value === formData.productId)}
                                    onChange={handleSelectChange('productId')}
                                    placeholder="Select Product"
                                />
                            </div>

                            <div>
                                <label htmlFor="toWorkOrder">To Work Order</label>
                                <Select
                                    id="toWorkOrder"
                                    options={workOrderOptions}
                                    value={workOrderOptions.find((option) => option.value === formData.toWorkOrder)}
                                    onChange={handleSelectChange('toWorkOrder')}
                                    placeholder="Select To Work Order"
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
                                    // value={formData.quantity}
                                    onChange={handleInputChange}
                                    min={0}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button type="submit" className="btn btn-success">
                                <IconSave className="mr-2" />
                                Update
                            </button>
                            <button type="button" className="btn btn-danger">
                                <IconTrashLines className="mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StockEditPage;
