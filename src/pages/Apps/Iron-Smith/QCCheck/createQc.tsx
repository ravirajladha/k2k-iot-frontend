import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Select from 'react-select';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
interface FormData {
    workOrder: string;
    jobOrder: string;
    productId: string;
    rejectedQuantity: string;
    recycledQuantity: string;
    rejectionReason: string;
}

const QcCheckForm: React.FC = () => {
    //tooltip
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleCode = (code: string) => {
        setShowTooltip((prev) => !prev);
    };
    const [formData, setFormData] = useState<FormData>({
        workOrder: '',
        jobOrder: '',
        productId: '',
        rejectedQuantity: '',
        recycledQuantity: '',
        rejectionReason: '',
    });

    const workOrders = ['Work Order 1', 'Work Order 2', 'Work Order 3'];

    const jobOrdersMap: { [key: string]: { jobOrders: string[]; workOrder: string } } = {
        'WO-001': { workOrder: 'WO-001', jobOrders: ['JO-1001', 'JO-1002'] },
        'WO-002': { workOrder: 'WO-002', jobOrders: ['JO-2001', 'JO-2002'] },
        'WO-003': { workOrder: 'WO-003', jobOrders: ['JO-3001', 'JO-3002'] },
    };

    const products = ['Steel Rod', 'Iron Rod', 'Cast Iron Rod'];
    const handleJobOrderChange = (selectedOption: any) => {
        if (!selectedOption) return;
        const selectedJobOrder = selectedOption.value;

        // Find which work order contains this job order
        for (const workOrderKey in jobOrdersMap) {
            if (jobOrdersMap[workOrderKey].jobOrders.includes(selectedJobOrder)) {
                setFormData((prev) => ({
                    ...prev,
                    jobOrder: selectedJobOrder,
                    workOrder: jobOrdersMap[workOrderKey].workOrder, // Automatically setting work order
                }));
                break;
            }
        }
    };

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form Submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    // Generate Job Order options dynamically
    const jobOrderOptions = Object.values(jobOrdersMap)
        .flatMap(({ jobOrders }) => jobOrders)
        .map((jobOrder) => ({
            value: jobOrder,
            label: jobOrder,
        }));

    // Generate Product Options
    const productOptions = products.map((product) => ({
        value: product,
        label: product,
    }));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Iron Smith', link: '#', isActive: false },
        { label: 'QC Check', link: '/iron-smith/qc-check', isActive: true },
    ];
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/iron-smith/qc-check/view', icon: <IconArrowBackward className="text-4xl" /> }} />

            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <h5 className="font-semibold text-lg dark:text-white-light">QC Check Form</h5>
                    <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600 relative"
                    >
                        <span className="flex items-center">
                            <IconInfoCircle className="me-2" />
                        </span>
                        {showTooltip && (
                            <div className="absolute top-0 right-full ml-2 w-64 bg-gray-800 text-white text-sm p-3 rounded shadow-lg z-50">
                                This form is used for QC checks. Select the appropriate job order, work order will be autofetched on the basis of Job order, and select product ID. Fill out the
                                rejected quantity or recycled quantity and reason for rejection.
                            </div>
                        )}
                    </button>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {/* Job Order */}
                        <div>
                            <label htmlFor="jobOrder">Job Order</label>
                            <Select
                                id="jobOrder"
                                options={jobOrderOptions}
                                value={jobOrderOptions.find((option) => option.value === formData.jobOrder)}
                                onChange={handleJobOrderChange}
                                placeholder="Select Job Order"
                                isSearchable
                            />
                        </div>

                        {/* Work Order (Auto-Filled) */}
                        <div>
                            <label htmlFor="workOrder">Work Order</label>
                            <input id="workOrder" type="text" className="form-input" value={formData.workOrder} readOnly />
                        </div>

                        {/* Product Selection */}
                        <div>
                            <label htmlFor="productId">Product</label>
                            <Select
                                id="productId"
                                options={productOptions}
                                value={productOptions.find((option) => option.value === formData.productId)}
                                onChange={(selectedOption) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        productId: selectedOption ? selectedOption.value : '',
                                    }))
                                }
                                placeholder="Select Product"
                                isSearchable
                            />
                        </div>
                        {/* Rejected Quantity */}
                        <div>
                            <label htmlFor="rejectedQuantity">Rejected Quantity</label>
                            <input
                                id="rejectedQuantity"
                                name="rejectedQuantity"
                                type="number"
                                placeholder="Enter Rejected Quantity"
                                className="form-input"
                                value={formData.rejectedQuantity}
                                onChange={handleInputChange}
                                min={0}
                            />
                        </div>
                        <div>
                            <label htmlFor="recycledQuantity">Recycled Quantity</label>
                            <input
                                id="recycledQuantity"
                                name="recycledQuantity"
                                type="number"
                                placeholder="Enter Recycled Quantity"
                                className="form-input"
                                value={formData.recycledQuantity}
                                onChange={handleInputChange}
                                min={0}
                            />
                        </div>
                        {/* Rejection Reason */}
                        <div>
                            <label htmlFor="rejectionReason">Remarks</label>

                            <textarea
                                id="rejectionReason"
                                name="rejectionReason"
                                placeholder="Enter Remarks"
                                className="form-input"
                                value={formData.rejectionReason}
                                onChange={handleInputChange}
                            ></textarea>
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

export default QcCheckForm;
