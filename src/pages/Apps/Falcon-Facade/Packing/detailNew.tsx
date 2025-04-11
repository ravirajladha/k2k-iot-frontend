import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconArrowBackward from '@/components/Icon/IconArrowBackward';
import IconSave from '@/components/Icon/IconSave';
import IconTrashLines from '@/components/Icon/IconTrashLines';

const JobOrderPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { rowData, mode } = location.state || {};
    console.log('rowData', rowData);
    console.log('mode', mode);

    React.useEffect(() => {
        dispatch(setPageTitle('Packing Detail'));
    }, [dispatch]);

    if (!rowData) {
        return <div>No packing data available.</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '/', isActive: false },
        { label: 'Packing', link: '/falcon-facade/packing', isActive: false },
        { label: 'Detail Page', link: '#', isActive: true },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Back',
                    link: '/falcon-facade/packing',
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
                                <strong>Client Name:</strong> {rowData.clientName || 'Client Alpha'}
                            </p>
                            <p className="text-sm">
                                <strong>Project Name:</strong> {rowData.projectName || 'Project Phoenix'}
                            </p>
                        </div>
                        <div className="bg-blue-50 p-4 flex flex-col flex-1 rounded-lg shadow-md">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Work Order Details</h3>
                            <p className="text-sm">
                                <strong>Work Order Id:</strong> {rowData.workOrderId || 'WO12345'}
                            </p>
                            <p className="text-sm">
                                <strong>Job Order ID:</strong> {rowData.jobOrder || 'JO98765'}
                            </p>
                            <p className="text-sm">
                                <strong>Status:</strong> {rowData.status || 'Pending'}
                            </p>
                            <p className="text-sm">
                                <strong>Total Quantity:</strong> {rowData.totalQuantity || '60'}
                            </p>
                            <p className="text-sm">
                                <strong>UOM:</strong> Nos
                            </p>
                            <p className="text-sm">
                                <strong>Created By:</strong> {rowData.createdBy || 'Admin'}
                            </p>
                            <p className="text-sm">
                                <strong>Timestamp:</strong> {new Date(rowData.timestamp).toLocaleString() || '10-04-2025'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="panel mb-6 border">
                    <div className="flex flex-row gap-6 justify-center">
                        <div className="product-card bg-gray-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 1</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/1)</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                        <div className="product-card bg-blue-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 2</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/2)</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 mt-6 justify-center">
                        <div className="product-card bg-green-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 3</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/3)</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 3</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                        <div className="product-card bg-gray-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 4</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/4)</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 4</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6 mt-6 justify-center">
                        <div className="product-card bg-blue-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 5</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/5)</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 5</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                        <div className="product-card bg-green-100 border rounded-lg shadow p-4 flex flex-col w-[30rem] overflow-hidden relative">
                            <div className="serial-number absolute left-0 top-0 p-1 text-right">
                                <span className="font-semibold text-xs">S.No: 6</span>
                            </div>
                            <div className="product-header border-b border-gray-400 pb-1 mb-1 w-full mt-6">
                                <h3 className="text-sm font-semibold">Product: Flacon Windows</h3>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="product-details p-2 text-xs">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="font-semibold">Work Order Id</div>
                                        <div>: {rowData.workOrderId || 'WO12345'}</div>
                                        <div className="font-semibold">Job Order Id</div>
                                        <div>: {rowData.jobOrder || 'JO98765'}</div>
                                        <div className="font-semibold">Client Name</div>
                                        <div>: Client Alpha</div>
                                        <div className="font-semibold">Project Name</div>
                                        <div>: Project Phoenix</div>
                                        <div className="font-semibold">SF Id</div>
                                        <div>: SF JO98765-1-(1/6)</div>
                                        <div className="font-semibold">Bundle No</div>
                                        <div>: 6</div>
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
                                    {mode === 'create' ? <input type="text" className="form-input px-2 py-1 w-48" /> : <div>QR123</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {mode === 'create' && (
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
                )}
            </div>
        </div>
    );
};

export default JobOrderPage;
