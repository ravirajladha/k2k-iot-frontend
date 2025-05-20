import React, { useEffect, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { fetchWorkOrderData } from '@/api/konkreteKlinkers/workOrder';
import { Controller, useForm } from 'react-hook-form';
import { getProductByWorkOrder } from '@/api/konkreteKlinkers/dropdowns';
import { createPacking, createPackingBundles, getBundleSizeByProduct } from '@/api/konkreteKlinkers/packing';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    workOrder: string;
    productId: string;
    totalQuantity: string;
    bundleSize: string;
    uom: string;
}

const PackingCreation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [workOrderOptions, setWorkOrderOption] = useState<{ value: string; label: string }[]>([]);
    const [productOptions, setProductOptions] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState('');
    const [bundleInputs, setBundleInputs] = useState<{ bundle: string; qrCode: string }[]>([]);
    const [isGenerated, setIsGenerated] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const selectedWorkOrderId = watch('workOrder');
    const selectedProductId = watch('productId');

    const getWorkOrders = async () => {
        try {
            dispatch(setPageTitle('Create Packing'));
            setLoading(true);
            const options = await fetchWorkOrderData();
            const workOrder = options.map((workOrder: any) => ({
                value: workOrder._id,
                label: `${workOrder.work_order_number}`,
            }));
            setWorkOrderOption(workOrder);
            setValue('productId', '');
        } catch (error) {
            console.error('Failed to fetch Work Orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWorkOrders();
    }, [dispatch]);

    useEffect(() => {
        if (selectedWorkOrderId) {
            const fetchProducts = async () => {
                try {
                    const products = await getProductByWorkOrder(selectedWorkOrderId);
                    const formatted = products.map((product: any) => ({
                        value: product.product_id,
                        label: product.material_code,
                    }));
                    setProductOptions(formatted);
                    setValue('productId', '');
                } catch (error) {
                    console.error('Failed to fetch products:', error);
                }
            };

            fetchProducts();
        } else {
            setProductOptions([]);
        }
    }, [selectedWorkOrderId, setValue]);
    useEffect(() => {
        console.log(selectedProductId);

        if (selectedProductId) {
            const fetchBundleSize = async () => {
                try {
                    const bundleSize = await getBundleSizeByProduct(selectedProductId);
                    setValue('bundleSize', bundleSize.qty_in_bundle);
                } catch (error) {
                    console.error('Failed to fetch bundle size:', error);
                    setValue('bundleSize', '');
                }
            };
            fetchBundleSize();
        }
    }, [selectedProductId, setValue]);

    const onSubmit = async (data: FormValues) => {
        setApiError('');
        console.log(data);

        try {
            const response = await createPackingBundles({
                work_order: data.workOrder,
                product: data.productId,
                product_quantity: Number(data.totalQuantity),
                bundle_size: Number(data.bundleSize),
                uom: data.uom,
            });
            const array = response.data || [];
            const formattedInputs = array.map((item) => ({ bundle: item._id, qrCode: '' }));
            setBundleInputs(formattedInputs);
            setIsGenerated(true);
        } catch (error: any) {
            console.error('Error creating product:', error);
            setApiError(error.response?.data?.message || 'Failed to create product. Please try again.');
        }
    };

    const handleQrSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter/validate if needed (optional)
        const payload = bundleInputs.map((item) => ({
            packing_id: item.bundle,
            qrCodeId: item.qrCode.trim(), // Ensure it's a string
        }));

        const isAnyEmpty = payload.some((p) => !p.qrCodeId);
        if (isAnyEmpty) {
            alert('Please fill all QR Codes before submitting.');
            return;
        }

        try {
            const response = await createPacking({ packings: payload });
            navigate('/konkrete-klinkers/packing');
        } catch (error) {
            console.error('Failed to submit QR data', error);
            // Handle or show error message
        }
    };

    const uoms = ['sqmt', 'nos'];

    const uomOptions = uoms.map((uom) => ({
        value: uom,
        label: uom,
    }));

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Packing', link: '/konkrete-klinkers/packing', isActive: false },
        { label: 'Create', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/packing',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />

            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Packing Creation</h5>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="workOrder" className="block text-sm font-medium text-gray-700">
                                Work Order
                            </label>
                            <Controller
                                control={control}
                                name="workOrder"
                                rules={{ required: 'Work Order is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={workOrderOptions}
                                        placeholder="Select Work Order"
                                        className="flex-1"
                                        value={workOrderOptions.find((option) => option.value === field.value)}
                                        onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                                        // isSearchable
                                    />
                                )}
                            />
                            {errors.workOrder && <p className="text-red-500 text-sm">{errors.workOrder.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
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
                                        isDisabled={!selectedWorkOrderId}
                                        isClearable
                                        // isSearchable
                                    />
                                )}
                            />
                        </div>

                        <div>
                            <label htmlFor="totalBricks" className="block text-sm font-medium text-gray-700">
                                Total Quantity
                            </label>
                            <input id="totalQuantity" type="text" className="form-input" {...register('totalQuantity')} />
                        </div>

                        <div>
                            <label htmlFor="totalBatches" className="block text-sm font-medium text-gray-700">
                                Total Bundles
                            </label>
                            <input id="bundleSize" type="text" className="form-input" {...register('bundleSize')} readOnly />
                        </div>
                        <div>
                            <label htmlFor="uom" className="block text-sm font-medium text-gray-700">
                                UOM
                            </label>

                            <Controller
                                control={control}
                                name="uom"
                                rules={{ required: 'UOM is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={uomOptions}
                                        onChange={(selected) => field.onChange(selected?.value)}
                                        value={uomOptions.find((option) => option.value === field.value)}
                                        placeholder="UOM"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            <h5 className="font-semibold text-lg">Packing Details</h5>
                            {/* <p className="text-gray-600">Balanced Quantity: {balancedQuantity}</p> */}
                        </div>
                        {!isGenerated && (
                            <button type="submit" className="btn btn-primary">
                                Generate
                            </button>
                        )}
                    </div>
                </form>
                <form onSubmit={handleQrSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
                        {bundleInputs.map((value, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">Bundle {index + 1}</label>
                                <input
                                    type="text"
                                    className="form-input w-full mt-1 border border-gray-300 rounded px-3 py-2"
                                    value={bundleInputs[index].qrCode}
                                    placeholder="Enter Qr Code"
                                    onChange={(e) => {
                                        const updated = [...bundleInputs];
                                        updated[index].qrCode = e.target.value;
                                        setBundleInputs(updated);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {isGenerated && (
                        <div className="flex justify-center mt-4">
                            <button type="submit" className="btn btn-success w-1/2">
                                <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Submit
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PackingCreation;
