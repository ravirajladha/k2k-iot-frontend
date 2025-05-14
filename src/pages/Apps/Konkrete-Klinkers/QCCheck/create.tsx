import React, { useState } from 'react';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import { fetchProductByJobOrder, storeQcData } from '@/api/konkreteKlinkers/qc';
import { fetchJobOrderDropdown } from '@/api/konkreteKlinkers/dropdowns';

interface FormValues {
    jobOrder: string;
    workOrder: string;
    productId: string;
    rejectedQuantity: string;
    recycledQuantity: string;
    rejectionReason: string;
}
const QcCreateForm = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const [jobOrderOptions, setJobOrderOptions] = useState<{ value: string; label: string }[]>([]);
    const [productOptions, setProductOptions] = useState<{ label: string; value: string }[]>([]);
    const [workOrder, setWorkOrder] = useState<any>();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();
    const selectedJobOrderId = watch('jobOrder');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Qc Create'));
    });

    useEffect(() => {
        const fetchJobOrder = async () => {
            const options = await fetchJobOrderDropdown();
            const jobOrderData = options.map((jobOrder: any) => ({
                value: jobOrder._id,
                label: `${jobOrder.job_order_id}`,
            }));
            setJobOrderOptions(jobOrderData);
        };
        fetchJobOrder();
    }, []);

    useEffect(() => {
        if (selectedJobOrderId) {
            const fetchProducts = async () => {
                const res = await fetchProductByJobOrder(selectedJobOrderId);
                console.log(res);

                const products = res.products;
                const formatted = products.map((product: any) => ({
                    value: product._id,
                    label: product.material_code,
                }));
                setProductOptions(formatted);
                setWorkOrder(res.work_order);
                setValue('productId', '');
                setValue('workOrder', res.work_order?.work_order_number);
            };
            fetchProducts();
        } else {
            setProductOptions([]);
        }
    }, [selectedJobOrderId, setValue]);
    const onSubmit = async (data: FormValues) => {
        setApiError('');
        try {
            await storeQcData({
                job_order: data.jobOrder,
                work_order: workOrder._id,
                product_id: data.productId,
                rejected_quantity: Number(data.rejectedQuantity),
                recycled_quantity: Number(data.recycledQuantity),
                remarks: data.rejectionReason,
            });
            navigate('/konkrete-klinkers/qc-check');
        } catch (error: any) {
            console.error('Error creating product:', error);
            setApiError(error.response?.data?.message || 'Failed to create product. Please try again.');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'QC Check', link: '/konkrete-klinkers/qc-check', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Back', link: '/konkrete-klinkers/qc-check', icon: <IconArrowBackward className="text-4xl" /> }} />
            <div className="panel">
                {apiError && <div className="alert alert-danger mb-5">{apiError}</div>}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="client">Job Order</label>
                            <Controller
                                control={control}
                                name="jobOrder"
                                rules={{ required: 'Job Order is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={jobOrderOptions}
                                        placeholder="Select Job Order"
                                        className="flex-1"
                                        value={jobOrderOptions.find((option) => option.value === field.value)}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                    />
                                )}
                            />
                            {errors.jobOrder && <p className="text-red-500 text-sm">{errors.jobOrder.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="workOrder">Work Order</label>
                            <input id="workOrder" type="text" className="form-input" {...register('workOrder')} readOnly />
                        </div>

                        <div>
                            <label htmlFor="product">Product Name</label>
                            <Controller
                                control={control}
                                name="productId"
                                rules={{ required: 'product is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={productOptions}
                                        placeholder="Select Product"
                                        value={productOptions.find((option) => option.value === field.value)}
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        isDisabled={!selectedJobOrderId}
                                        isClearable
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label htmlFor="rejectedQuantity">Rejected Quantity</label>
                            <input id="rejectedQuantity" type="text" className="form-input" {...register('rejectedQuantity')} />
                        </div>
                        <div>
                            <label htmlFor="recycledQuantity">Recycled Quantity</label>
                            <input id="recycledQuantity" type="text" className="form-input" {...register('recycledQuantity')} />
                        </div>
                        <div>
                            <label htmlFor="rejectionReason">Rejection Reason</label>
                            <textarea id="rejectionReason" {...register('rejectionReason')} placeholder="Enter Remarks" className="form-input"></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button type="submit" className="btn btn-success flex-1" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 inline-block align-middle"></span>
                            ) : (
                                <>
                                    <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Submit
                                </>
                            )}
                        </button>
                        <button type="button" className="btn btn-danger flex-1" onClick={() => navigate('/konkrete-klinkers/products')} disabled={isSubmitting}>
                            <IconTrashLines className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QcCreateForm;
