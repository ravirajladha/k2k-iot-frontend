import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import { fetchPackingById } from '@/api/konkreteKlinkers/packing';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const { workOrderId, productId } = useParams<{ workOrderId: string; productId: string }>();

    const [packingDetail, setPackingDetail] = useState<any>([]);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPacking = async () => {
            try {
                const data = await fetchPackingById(workOrderId, productId);
                console.log(data);

                setPackingDetail(data);
            } catch (error) {
                setApiError('Failed to fetch JobOrder details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPacking();
    }, [workOrderId, productId]);

    React.useEffect(() => {
        dispatch(setPageTitle('Packing Detail'));
    }, [dispatch]);

    if (!packingDetail) {
        return <div>No packing data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Packing', link: '/konkrete-klinkers/packing', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
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
            <button onClick={() => window.print()} className="mb-10 bg-blue-500 text-white px-4 py-2 rounded float-right">
                Print Page
            </button>
            <div className="p-4 pt-10 border">
                <div className="panel mb-6 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Packing Details</h2>
                    <div className="bg-white p-4 w-full flex flex-row gap-4">
                        <div className="bg-yellow-50 p-4 rounded-md shadow flex-1">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                            <p className="text-sm">
                                <strong>Client Name:</strong> {packingDetail.clientName || ''}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {packingDetail.projectName || ''}
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Id:</strong> {packingDetail.work_order_number}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {packingDetail.jobOrder || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Status:</strong> {packingDetail.status || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Total Quantity:</strong> {packingDetail.total_quantity || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Total Quantity:</strong> {packingDetail.total_bundles || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>UOM:</strong>
                                {packingDetail.uom}
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {packingDetail.created_by || 'N/A'}
                            </p>
                            <p className="text-sm">
                                <strong>Timestamp:</strong> {new Date(packingDetail.timestamp).toLocaleString() || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                {packingDetail?.length > 0 && (
                    <div className="panel mb-6 border">
                        <div className="flex flex-wrap gap-6 justify-start">
                            {packingDetail.map((item, index) => (
                                <div key={item._id} className="bg-gray-100 border rounded-lg shadow p-4 flex flex-col w-full sm:w-[48%] overflow-hidden relative">
                                    <div className="absolute left-0 top-0 p-1 text-right">
                                        <span className="font-semibold text-xs">S.No: {index + 1}</span>
                                    </div>

                                    <div className="border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                        <h3 className="text-sm font-semibold">Product: {item.product_name || 'N/A'}</h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="p-2 text-xs">
                                            <div className="grid grid-cols-2 gap-1">
                                                <div className="font-semibold">Work Order Id</div>
                                                <div>: {item.work_order_number}</div>
                                                <div className="font-semibold">Job Order Id</div>
                                                <div>: {item.jobOrder}</div>
                                                <div className="font-semibold">Client Name</div>
                                                <div>: {item.clientName || 'N/A'}</div>
                                                <div className="font-semibold">Project Name</div>
                                                <div>: {item.projectName || 'N/A'}</div>
                                                <div className="font-semibold">Bundle No</div>
                                                <div>: {index + 1}</div>
                                                <div className="font-semibold">Product Qty</div>
                                                <div>: {item.product_quantity || 'N/A'}</div>
                                                <div className="font-semibold">Created By</div>
                                                <div>: {item.created_by || 'Admin'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center flex-col">
                                            <img src={item.qrCodeUrl || 'https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png'} alt="QR Code" className="w-32 h-32 mb-4" />
                                            <strong className="mr-1">QR Id:</strong>
                                            <div>{item.qr_id || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* <div className="panel mb-6 border">
                    <div className="flex flex-row gap-6 justify-center">
                        <div className="product-card bg-gray-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 1</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Paver Black</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {packingDetail.workOrder}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {packingDetail.jobOrder}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 1</div>
                                        <div>
                                            <strong>Qty</strong>
                                        </div>
                                        <div>: 10</div>
                                        <div>
                                            <strong>Created By</strong>
                                        </div>
                                        <div>: Admin</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex flex-col">
                                    <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt="QR Code" className="w-36 h-36 mb-4" />
                                    <strong className="mr-1">QR Id:</strong>
                                    <div>QR123</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-card bg-blue-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 2</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Paver Black</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {packingDetail.workOrder}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {packingDetail.jobOrder}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 2</div>
                                        <div>
                                            <strong>Qty</strong>
                                        </div>
                                        <div>: 10</div>
                                        <div>
                                            <strong>Created By</strong>
                                        </div>
                                        <div>: Admin</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center flex flex-col">
                                    <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png" alt="QR Code" className="w-36 h-36 mb-4" />
                                    <strong className="mr-1">QR Id:</strong>
                                    <div>QR123</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* {mode === 'create' && (
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
                )} */}
            </div>
        </div>
    );
};

export default JobOrderPage;
