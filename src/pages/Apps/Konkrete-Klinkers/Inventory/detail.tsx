import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconFile from '@/components/Icon/IconFile';
import AnimateHeight from 'react-animate-height';
import { fetchInventoryDataByProduct } from '@/api/konkreteKlinkers/inventory';
import CustomLoader from '@/components/Loader';
import { formatDateTime } from '@/utils/formatDate';

const InventoryDetailPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const [inventoryData, setInventoryData] = useState<any>(null);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDispatch = async () => {
            try {
                const data = await fetchInventoryDataByProduct(productId);
                setInventoryData(data.product_details);
            } catch (error) {
                setApiError('Failed to fetch dispatch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDispatch();
    }, [productId]);

    useEffect(() => {
        dispatch(setPageTitle('Inventory Detail'));
    }, [dispatch]);

    if (!inventoryData || !productId) {
        return <div>No job order data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '/', isActive: false },
        { label: 'Inventory', link: '/konkrete-klinkers/inventories', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const minDate = sevenDaysAgo.toISOString().split('T')[0];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/konkrete-klinkers/inventories',
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
                    {inventoryData.length > 0 &&
                        inventoryData.map((item, index) => (
                            <div className="panel mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Client & Work Order Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
                                    {/* Left Section: Client Details */}
                                    <div className="bg-yellow-50 p-4 rounded-md shadow">
                                        <h3 className="text-md font-semibold text-gray-700 mb-2">Client Details</h3>
                                        <p className="text-sm">
                                            <strong>Client Name:</strong> {item.client.name}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Address:</strong> {item.client.address}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Project Name:</strong> {item.project.name}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Address:</strong> {item.project.address}
                                        </p>
                                    </div>

                                    {/* Right Section: Work Order Details */}
                                    <div className="bg-blue-50 p-4 rounded-md shadow">
                                        <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                                        <p className="text-sm">
                                            <strong>Work Order Number:</strong> {item.work_order.work_order_number}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Created At:</strong> {formatDateTime(item.work_order.created_at)}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Created By:</strong> {item.work_order.created_by}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Status:</strong>
                                            <span className="ml-2 px-2 py-1 rounded text-sm font-semibold text-blue-500">{item.work_order.status}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="panel my-6 bg-blue-100">
                                    <h2 className="text-lg font-semibold mb-4">Products</h2>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full border-collapse border border-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Material Code</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Product Description</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Unit of Measurement</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">PO Quantity</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Produced Quantity</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Packed Quantity</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Dispatched Quantity</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Available Quantity</th>
                                                    <th className="px-4 py-2 text-left border border-gray-300">Balance Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border border-gray-300">{item.material_code}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.description}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.uom}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.po_quantity}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.produced_quantity}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.packed_quantity}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.dispatched_quantity}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.available_stock}</td>
                                                    <td className="px-4 py-2 border border-gray-300">{item.balance_quantity}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default InventoryDetailPage;
