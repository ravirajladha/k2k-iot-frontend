import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import { fetchDispatchById } from '@/api/konkreteKlinkers/dispatch';
import CustomLoader from '@/components/Loader';
import { formatDateTime } from '@/utils/formatDate';

const DispatchViewDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [dispatchData, setDispatchData] = useState<any>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispatch = async () => {
            try {
                const data = await fetchDispatchById(id);
                setDispatchData(data);
            } catch (error) {
                setApiError('Failed to fetch dispatch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDispatch();
    }, [id]);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setPageTitle('Dispatch Detail'));
    }, [dispatch]);

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Dispatch', link: '/konkrete-klinkers/dispatch', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

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
                        <h2 className="text-lg font-semibold mb-4">Dispatch Details</h2>

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
                    <div className="panel mb-6 p-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="table-responsive">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Product</th>
                                            <th className="border border-gray-300 px-4 py-2">UOM</th>
                                            <th className="border border-gray-300 px-4 py-2">Batch ID</th>
                                            <th className="border border-gray-300 px-4 py-2">Dispatch Quantity</th>
                                            <th className="border border-gray-300 px-4 py-2">Date</th>
                                            <th className="border border-gray-300 px-4 py-2">Invoice/STO</th>
                                            <th className="border border-gray-300 px-4 py-2">Vehicle No</th>
                                            <th className="border border-gray-300 px-4 py-2">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dispatchData.products.map((product, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{product.uom}</td>
                                                <td className="border border-gray-300 px-4 py-2">{product.batch_id}</td>
                                                <td className="border border-gray-300 px-4 py-2">{product.dispatch_quantity}</td>
                                                <td className="border border-gray-300 px-4 py-2">{formatDateTime(dispatchData.dispatch_date)}</td>
                                                <td className="border border-gray-300 px-4 py-2">{dispatchData.invoice_or_sto}</td>
                                                <td className="border border-gray-300 px-4 py-2">{dispatchData.vehicle_number}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {' '}
                                                    <a href={dispatchData.invoice_file} target="_blank">
                                                        <IconFile className="text-gray-600" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchViewDetailPage;
