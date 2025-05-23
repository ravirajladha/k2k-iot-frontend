import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconFile from '@/components/Icon/IconFile';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import { fetchDispatchById } from '@/api/konkreteKlinkers/dispatch';
import CustomLoader from '@/components/Loader';
import { Controller, useForm } from 'react-hook-form';
import { formatDateTime } from '@/utils/formatDate';
import FileUploader from '@/components/FileUploader';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';

interface UploadedFile {
    file?: File;
    preview: string;
    id?: string;
    name?: string;
}
interface FormData {
    workOrderNumber: string;
    invoiceSto: string;
    vehicleNumber: string;
    dispatchDate: string;
    uploads: UploadedFile[];
}
const DispatchDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const [dispatchData, setDispatchData] = useState<any>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    useEffect(() => {
        dispatch(setPageTitle('Dispatch Detail'));
    }, [dispatch]);

    useEffect(() => {
        const fetchDispatch = async () => {
            try {
                const data = await fetchDispatchById(id);
                setDispatchData(data);
                const existingUploads: UploadedFile[] = data.files.map((file: any) => ({
                    id: file._id,
                    preview: file.file_url,
                    name: file.file_name,
                }));

                setValue('workOrderNumber', data?.work_order_name || '');
                setValue('invoiceSto', data?.invoice_or_sto || '');
                setValue('vehicleNumber', data?.vehicle_number || '');
                setValue('dispatchDate', data?.dispatch_date ? new Date(data.dispatch_date).toISOString().split('T')[0] : '');
                setValue('uploads', existingUploads);
            } catch (error) {
                setApiError('Failed to fetch dispatch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDispatch();
    }, [id]);

    if (!dispatchData) {
        return <div>No dispatch data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Dispatch', link: '/konkrete-klinkers/dispatch', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    const onSubmit = (data: FormData) => {
        const payload = {
            invoice_or_sto: data.invoiceSto,
            vehicle_number: data.vehicleNumber,
            date: data.dispatchDate,
        };
        console.log(payload);
    };

    const handleFileChange = (imageList: ImageListType) => {
        // Handle file change logic here
    };

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const nextWeek = new Date();
    const minDate = sevenDaysAgo.toISOString().split('T')[0];
    const maxDate = nextWeek.toISOString().split('T')[0];
    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/dispatch',
                    icon: <IconArrowBackward className="text-4xl" />,
                }}
            />
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            {loading ? (
                <CustomLoader />
            ) : (
                <div className="p-4 pt-10">
                    {/* Client Details Section */}
                    <div className="panel mb-6 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Packing Details</h2>

                        <div className="bg-white p-4 w-full flex flex-row gap-4">
                            {/* Left Section: Client Details */}
                            <div className="bg-yellow-50 p-4 rounded-md shadow flex-1">
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                                <p className="text-sm">
                                    <strong>Client Name:</strong> {dispatchData.client_project.client_name || 'Client Alpha'}
                                </p>
                                <p className="text-sm">
                                    <strong>Project Name:</strong> {dispatchData.client_project.project_name || 'Project Phoenix'}
                                </p>
                            </div>

                            {/* Right Section: Work Order Details */}
                            <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                                <p className="text-sm">
                                    <strong>Work Order Id:</strong> {dispatchData.work_order_name || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Job Order ID:</strong> {dispatchData.job_order_name || 'N/A'}
                                </p>
                                {/* <p className="text-sm">
                                <strong>Status:</strong> {dispatchData.status || 'N/A'}
                            </p> */}
                                <p className="text-sm">
                                    <strong>Created By:</strong> {dispatchData.created.created_by || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <strong>Timestamp:</strong> {formatDateTime(dispatchData.created.created_at) || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            {/* Work Order Number */}
                            <div>
                                <label htmlFor="workOrderNumber" className="block text-sm font-medium text-bold">
                                    <strong> Work Order Number</strong>
                                </label>

                                <input type="text" className="form-input" {...register('workOrderNumber')} readOnly />
                            </div>

                            <div className="mt-6">
                                <div className="table-responsive">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 px-4 py-2">Product</th>
                                                <th className="border border-gray-300 px-4 py-2">UOM</th>
                                                <th className="border border-gray-300 px-4 py-2">Batch ID</th>
                                                <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dispatchData.products.map((product, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{product.uom}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{product.batch_id}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{product.dispatch_quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* date */}
                            <div>
                                <label htmlFor="dispatchDate">Date</label>
                                <Controller
                                    control={control}
                                    name="dispatchDate"
                                    rules={{ required: 'Dispatch Date is required' }}
                                    render={({ field }) => (
                                        <input id="dispatchDate" type="date" className="form-input" value={field.value} min={minDate} max={maxDate} onChange={(e) => field.onChange(e.target.value)} />
                                    )}
                                />
                                {errors.dispatchDate && <p className="text-red-500 text-sm mt-1">{errors.dispatchDate.message}</p>}
                            </div>
                            {/* Invoice/STO */}
                            <div>
                                <label htmlFor="invoiceSto">Invoice/STO</label>
                                <Controller
                                    control={control}
                                    name="invoiceSto"
                                    rules={{ required: 'Invoice/STO is required' }}
                                    render={({ field }) => (
                                        <input
                                            id="invoiceSto"
                                            type="text"
                                            placeholder="Enter Invoice or STO"
                                            className="form-input"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                {errors.invoiceSto && <p className="text-red-500 text-sm mt-1">{errors.invoiceSto.message}</p>}
                            </div>

                            {/* Vehicle Number */}
                            <div>
                                <label htmlFor="vehicleNumber">Vehicle Number</label>
                                <Controller
                                    control={control}
                                    name="vehicleNumber"
                                    rules={{ required: 'Vehicle Number is required' }}
                                    render={({ field }) => (
                                        <input
                                            id="vehicleNumber"
                                            type="text"
                                            placeholder="Enter Vehicle Number"
                                            className="form-input"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                {errors.vehicleNumber && <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber.message}</p>}
                            </div>

                            {/* File Upload */}
                            <div className="mb-12 gap-72">
                                <div className="flex items-center space-x-1">
                                    <label htmlFor="client">
                                        Upload Files <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="text-gray-500 hover:text-gray-700">
                                            <IconInfoCircle className="h-5 w-5" />
                                        </button>
                                        {showTooltip && (
                                            <div className="absolute top-0 left-full ml-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                                A single pdf is mandatory here, multiple files are also allowed.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Controller
                                    control={control}
                                    name="uploads"
                                    rules={{ required: 'Please upload at least one file' }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <FileUploader
                                                value={field.value}
                                                onChange={field.onChange}
                                                accept={{
                                                    'image/*': [],
                                                    'application/pdf': ['.pdf'],
                                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                                                    'text/csv': ['.csv'],
                                                }}
                                                maxFiles={5}
                                            />
                                            {fieldState.error && <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

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
            )}
        </div>
    );
};

export default DispatchDetailPage;
