import React, { useState, useEffect } from 'react';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import Select from 'react-select';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { fetchWorkOrderData, fetchWorkOrderById } from '@/api/konkreteKlinkers/workOrder';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconChecks from '@/components/Icon/IconChecks';
import { uniqueId } from 'lodash';
import { fetchProductData } from '@/api/konkreteKlinkers/product';
import { fetchJobOrderById, fetchMachinesByProductId, storeJobOrderData } from '@/api/konkreteKlinkers/jobOrder';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLoader from '@/components/Loader';
import { getProductByWorkOrder } from '@/api/konkreteKlinkers/dropdowns';

interface ProductOption {
    label: string;
    value: string;
}
interface MachineOption {
    label: string;
    value: string;
    uom: number | string;
}
interface Item {
    id: string; // or number depending on your key logic
    product: ProductOption | null;
    machine: MachineOption | null;
    sechduledDate?: string;
    plannedQuantity: number | string;
    uom: number | string;
}
interface FormData {
    workOrderNumber: string;
    salesOrderNumber: string;
    batchNumber: number;
    items: Item[];
}

const ProductionPlanning = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [workOrders, setWorkOrders] = useState([]);
    const [selectedWorkOrderData, setSelectedWorkOrderData] = useState<any>(null);
    const [dateRange, setDateRange] = useState<Date[] | null>(null);
    const [products, setProducts] = useState([]);
    const [machinesByRow, setMachinesByRow] = useState<Record<string, MachineOption[]>>({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            items: [],
        },
    });

    const {
        fields: items,
        append,
        remove,
        update,
    } = useFieldArray({
        control,
        name: 'items',
    });

    const addItem = () => {
        append({
            id: uniqueId(),
            product: null,
            machine: null,
            sechduledDate: '',
            plannedQuantity: '',
            uom: '',
        });
    };
    const fetchWorkOrder = async () => {
        const options = await fetchWorkOrderData();
        const workOrderData = options.map((workOrder: any) => ({
            value: workOrder._id,
            label: workOrder.work_order_number,
            client: workOrder.client_id,
            project: workOrder.project_id,
        }));
        setWorkOrders(workOrderData);
    };

    const handleWorkOrderChange = (selectedId: string | null) => {
        setValue('workOrderNumber', selectedId || '');
        console.log('fasdfas', selectedId);

        if (selectedId) {
            const selectedData = workOrders.find((w) => w.value === selectedId);
            setSelectedWorkOrderData(selectedData);
            fetchProducts(selectedId);
        } else {
            setSelectedWorkOrderData(null);
        }
    };
    const fetchProducts = async (selectedId) => {
        const products = await getProductByWorkOrder(selectedId);
        const formatted = products.map((product: any) => ({
            value: product.product_id,
            label: product.material_code,
        }));
        setProducts(formatted);
    };

    const handleProductChange = async (selectedProduct: ProductOption | null, index: number, itemId: string) => {
        const updatedItems = [...items];
        updatedItems[index].product = selectedProduct;
        updatedItems[index].machine = null; // Reset machine
        setValue(`items.${index}.product`, selectedProduct);
        setValue(`items.${index}.machine`, null);

        if (selectedProduct) {
            const response = await fetchMachinesByProductId(selectedProduct.label);
            const machineOptions = response.map((m: any) => ({ label: m.name, value: m._id, uom: m.uom }));

            setMachinesByRow((prev) => ({
                ...prev,
                [itemId]: machineOptions,
            }));
        }
    };

    const onSubmit = async (formValues: FormData) => {
        if (!dateRange || dateRange.length < 2) {
            alert('Please select a valid date range.');
            return;
        }

        const formattedDateRange = {
            from: dateRange[0].toISOString().split('T')[0],
            to: dateRange[1].toISOString().split('T')[0],
        };
        const payload = {
            work_order: formValues.workOrderNumber,
            sales_order_number: formValues.salesOrderNumber,
            batch_number: Number(formValues.batchNumber),
            products: formValues.items.map((item) => ({
                product: item.product.value,
                machine_name: item.machine.value,
                scheduled_date: item.sechduledDate,
                planned_quantity: Number(item.plannedQuantity),
                date: formattedDateRange, // attaches the same date range to each item
            })),
            date: formattedDateRange,
        };

        console.log('Formatted Submission:', payload);
        // Handle submission logic here
        await storeJobOrderData(payload);
        navigate('/konkrete-klinkers/job-order');
    };

    useEffect(() => {
        const init = async () => {
            try {
                fetchWorkOrder();
                if (id) {
                    const data = await fetchJobOrderById(id);
                    console.log(data.products);
                    const items = await Promise.all(
                        (data.products || []).map(async (item: any, index: number) => {
                            const product = {
                                value: item.product,
                                label: item.material_code,
                                uom: item.uom || '',
                            };

                            const machine = {
                                value: item.machine_id,
                                label: item.machine_name,
                            };

                            const machineOptionsRes = await fetchMachinesByProductId(item.material_code);
                            const machineOptions = machineOptionsRes.map((m: any) => ({
                                label: m.name,
                                value: m._id,
                            }));

                            const itemId = uniqueId();

                            // Set options into machinesByRow
                            setMachinesByRow((prev) => ({
                                ...prev,
                                [itemId]: machineOptions,
                            }));

                            return {
                                product,
                                machine,
                                plannedQuantity: item.planned_quantity || '',
                                sechduledDate: item.scheduled_date?.slice(0, 10) || '',
                                id: itemId,
                                uom: item.uom || '',
                            };
                        })
                    );

                    if (data.date?.from && data.date?.to) {
                        const fromDate = new Date(data.date.from);
                        const toDate = new Date(data.date.to);
                        setDateRange([fromDate, toDate]);
                    }
                    // Prepopulate form
                    reset({
                        workOrderNumber: data.work_order_details._id || '',
                        salesOrderNumber: data.sales_order_number || '',
                        batchNumber: data.batch_number || '',
                        items: items,
                    });
                }
            } catch (error: any) {
                setApiError(error.response?.data?.message || 'Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [id, reset]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Job Order / Planning', link: '/konkrete-klinkers/job-order/view', isActive: false },
        { label: 'Update', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/job-order',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <div className="panel">
                <div className="mb-5">
                    <h5 className="font-semibold text-lg">Job Order/Planning Creation</h5>
                </div>
                {loading ? (
                    <CustomLoader />
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-start">
                            {/* Work Order Number Dropdown */}
                            <div>
                                <label htmlFor="workOrderNumber">
                                    Work Order Number <span className="text-red-700">*</span>
                                </label>
                                <Controller
                                    control={control}
                                    name="workOrderNumber"
                                    rules={{ required: 'Work Order Number is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={workOrders}
                                            placeholder="Select Work Order"
                                            className="flex-1"
                                            value={workOrders.find((option) => option.value === field.value)}
                                            onChange={(selectedOption) => handleWorkOrderChange(selectedOption?.value || null)}
                                            isClearable
                                        />
                                    )}
                                />
                            </div>

                            {selectedWorkOrderData && (
                                <div className="border p-4 rounded-lg shadow-md bg-blue-100 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Client Details</h3>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Client Name:</span> {selectedWorkOrderData.client?.name || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Project Name:</span> {selectedWorkOrderData.project?.name || 'N/A'}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 items-start">
                            <div>
                                <label htmlFor="salesOrderNumber">Sales Order Number</label>
                                <input type="text" {...register('salesOrderNumber')} className="form-input" placeholder="Enter Sales Order Number" />
                                {errors.salesOrderNumber && <p className="text-red-500">{errors.salesOrderNumber.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="batchNumber">
                                    Batch Number <span className="text-red-700">*</span>
                                </label>
                                <input type="number" {...register('batchNumber', { required: 'Batch Number is required' })} className="form-input" placeholder="Enter Batch Number" />
                                {errors.batchNumber && <p className="text-red-500">{errors.batchNumber.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="date">
                                    Range Date (from and to) <span className="text-red-700">*</span>
                                </label>

                                <Flatpickr
                                    options={{
                                        mode: 'range',
                                        dateFormat: 'Y-m-d',
                                        position: 'auto right',
                                    }}
                                    value={dateRange || []}
                                    onChange={(dates: Date[]) => setDateRange(dates)}
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Machine Name</th>
                                            <th className="w-1">UOM (autofetch)</th>
                                            {/* <th className="w-1">PO Quantity (autofetch)</th> */}
                                            {/* <th className="w-1">Achieved Till Now (autofetch)</th> */}

                                            {/* <th className="w-1">Achieved Quantity(autofetch)</th> */}
                                            {/* <th className="w-1">Rejected Quantity (autofetch)</th> */}
                                            <th className="w-1">Planned Quantity</th>
                                            <th className="w-1">Schedule Date</th>

                                            <th className="w-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="!text-center font-semibold">
                                                    No Item Available
                                                </td>
                                            </tr>
                                        )}
                                        {items.map((item, index) => (
                                            <tr className="align-top" key={item.id}>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`items.${index}.product`}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={products.map((p) => ({
                                                                    ...p,
                                                                    isDisabled: items.some((itm, idx) => idx !== index && itm.product?.value === p.value),
                                                                }))}
                                                                // onChange={(selected) => field.onChange(selected)}
                                                                onChange={(selected) => handleProductChange(selected, index, item.id)}
                                                                value={field.value}
                                                                placeholder="Select Product"
                                                                menuPortalTarget={document.body}
                                                                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                                className="w-full sm:w-96"
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td>
                                                    <Controller
                                                        control={control}
                                                        name={`items.${index}.machine`}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={machinesByRow[item.id] || []}
                                                                value={field.value}
                                                                placeholder="Select Machine"
                                                                menuPortalTarget={document.body}
                                                                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                                                isDisabled={!machinesByRow[item.id]}
                                                                className="w-full sm:w-60"
                                                                onChange={(selectedOption) => {
                                                                    field.onChange(selectedOption);
                                                                    setValue(`items.${index}.uom`, selectedOption?.uom || '');
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-input w-32" placeholder="uom" {...register(`items.${index}.uom`)} readOnly />
                                                </td>
                                                <td>
                                                    <input type="number" className="form-input w-32" placeholder="Planned Quantity" {...register(`items.${index}.plannedQuantity`)} />
                                                </td>
                                                <td>
                                                    <input type="date" className="form-input w-34" {...register(`items.${index}.sechduledDate`)} />
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => remove(index)}>
                                                        ❌
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between sm:flex-row flex-col mt-6 px-4 float-right">
                                <div className="sm:mb-0 mb-6">
                                    <button type="button" className="btn btn-primary" onClick={addItem}>
                                        ➕ Add Product
                                    </button>
                                </div>
                            </div>
                        </div>

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
                )}
            </div>
        </div>
    );
};

export default ProductionPlanning;
