import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconX from '@/components/Icon/IconX';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';



import Breadcrumbs from "@/pages/Components/Breadcrumbs";

interface Product {
    materialCode: number;
    productDescription: string;
    quantity: number;
    requiredQuantity: number;
    bufferQuantity: number;
    balanceQuantity: number;
    unitOfMeasurement: string;
    noOfPiecesPerPunch: number;
    qtyInBundle: number;
    qtyInNoPerBundle: number;
    status: string;
}


const rowData = [
    {
        materialCode: 101,
        productDescription: 'Concrete Blocks',
        quantity: 500,
        bufferQuantity: 100,
        requiredQuantity: 300,
        balanceQuantity: 200,
        unitOfMeasurement: 'sqmt',
        noOfPiecesPerPunch: 5,
        qtyInBundle: 6.4,
        qtyInNoPerBundle: 160,
        status: 'Active',
    },
    {
        materialCode: 102,
        productDescription: 'Cement Bags',
        quantity: 250,
        bufferQuantity: 100,
        requiredQuantity: 200,
        balanceQuantity: 50,
        unitOfMeasurement: 'nos',
        noOfPiecesPerPunch: 10,
        qtyInBundle: 25,
        qtyInNoPerBundle: 25,
        status: 'Active',
    },
    {
        materialCode: 103,
        productDescription: 'Steel Rods',
        quantity: 100,
        bufferQuantity: 100,
        requiredQuantity: 80,
        balanceQuantity: 20,
        unitOfMeasurement: 'nos',
        noOfPiecesPerPunch: 2,
        qtyInBundle: 20,
        qtyInNoPerBundle: 20,
        status: 'Inactive',
    },
    {
        materialCode: 104,
        productDescription: 'Bricks',
        quantity: 1000,
        bufferQuantity: 100,
        requiredQuantity: 900,
        balanceQuantity: 100,
        unitOfMeasurement: 'sqmt',
        noOfPiecesPerPunch: 8,
        qtyInBundle: 8.32,
        qtyInNoPerBundle: 208,
        status: 'Active',
    },
];



const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Inventory'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal10, setModal10] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // show/hide
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };
    const cols = [
        { accessor: 'materialCode', title: 'Material Code' },
        { accessor: 'productDescription', title: 'Product Description' },
        { accessor: 'quantity', title: 'Quantity' },
        { accessor: 'requiredQuantity', title: 'Required Quantity' },
        { accessor: 'bufferQuantity', title: 'Buffer Quantity' },



        { accessor: 'balanceQuantity', title: 'Balance Quantity' },
        { accessor: 'unitOfMeasurement', title: 'Unit of Measurement' },
        { accessor: 'noOfPiecesPerPunch', title: 'No. of Pieces Per Punch' },
        { accessor: 'qtyInBundle', title: 'Quantity in Bundle' },
        { accessor: 'qtyInNoPerBundle', title: 'Quantity in No. Per Bundle' },
        { accessor: 'status', title: 'Status' },
        { accessor: 'action', title: 'Actions' }, // Placeholder for actions like edit/delete.
    ];


    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Inventories / Product', link: '/falcon-facade/product', isActive: true },
    ];

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.materialCode.toString().includes(search.toLowerCase()) ||
                    item.productDescription.toLowerCase().includes(search.toLowerCase()) ||
                    item.quantity.toString().includes(search.toLowerCase()) ||
                    item.requiredQuantity.toString().includes(search.toLowerCase()) ||
                    item.bufferQuantity.toString().includes(search.toLowerCase()) ||

                    item.balanceQuantity.toString().includes(search.toLowerCase()) ||
                    item.unitOfMeasurement.toLowerCase().includes(search.toLowerCase()) ||
                    item.noOfPiecesPerPunch.toString().includes(search.toLowerCase()) ||
                    item.qtyInBundle.toString().includes(search.toLowerCase()) ||
                    item.qtyInNoPerBundle.toString().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);


    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
              
            />


            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Inventories </h5>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={!hideCols.includes(col.accessor)}
                                                                className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                                onChange={(event: any) => {
                                                                    setHideCols(event.target.value);
                                                                    showHideColumns(col.accessor, event.target.checked);
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'materialCode', title: 'Material Code', sortable: true, hidden: hideCols.includes('materialCode') },
                            {
                                accessor: 'productDescription',
                                title: 'Product Description',
                                sortable: true,
                                hidden: hideCols.includes('productDescription'),
                            },
                            {
                                accessor: 'unitOfMeasurement',
                                title: 'Unit of Measurement',
                                sortable: true,
                                hidden: hideCols.includes('unitOfMeasurement'),
                            },

                            { accessor: 'quantity', title: 'Quantity', sortable: true, hidden: hideCols.includes('quantity') },
                     

                            {
                                accessor: 'requiredQuantity',
                                title: 'Required Quantity',
                                sortable: true,
                                hidden: hideCols.includes('requiredQuantity'),
                            },
                            {
                                accessor: 'balanceQuantity',
                                title: 'Balance Quantity',
                                sortable: true,
                                hidden: hideCols.includes('balanceQuantity'),
                            },

                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                hidden: hideCols.includes('status'),
                                render: ({ status }) => (
                                    <div className={`${status === 'Active' ? 'text-success' : 'text-danger'} capitalize`}>
                                        {status}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                hidden: hideCols.includes('action'),
                                render: ({ materialCode }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`/edit/${materialCode}`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to={`/view/${materialCode}`} className="flex hover:text-primary">
                                            <IconEye />
                                        </NavLink>

                                        {/* SlideIn Down */}
                                        <div>
                                            <button
                                                onClick={() => {
                                                    const product = rowData.find((item) => item.materialCode === materialCode);
                                                    setSelectedProduct(product || null); // Handle undefined case by setting null
                                                    setModal10(true);
                                                }}
                                                type="button"
                                                className="btn btn-info"
                                            >
                                                View
                                            </button>

                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />

                    <Transition appear show={modal10} as={Fragment}>
                        <Dialog as="div" open={modal10} onClose={() => setModal10(false)} className="relative z-50">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {/* Background Overlay */}
                                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                            </TransitionChild>
                            <div className="fixed inset-0 z-[999] overflow-y-auto">
                                <div className="flex min-h-screen items-start justify-center px-4">
                                    <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark bg-white dark:bg-gray-800">
                                        {/* Modal Header */}
                                        <div className="flex items-center justify-between bg-gray-100 px-5 py-3 dark:bg-[#121c2c]">
                                            <h5 className="text-lg font-bold">{selectedProduct?.productDescription}</h5>
                                            <button
                                                onClick={() => setModal10(false)}
                                                type="button"
                                                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                                            >
                                                <IconX />
                                            </button>
                                        </div>
                                        {/* Modal Body */}
                                        <div>
                                            {/* Full-width Product Image */}
                                            <img
                                                src="/assets/images/profile-34.jpeg" alt="Product"
                                                className="w-full h-60 object-cover"
                                            />
                                            {/* Product Details */}
                                            <div className="p-5">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Material Code:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.materialCode || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Quantity:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.quantity || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Buffer Quantity:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.bufferQuantity || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Required Quantity:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.requiredQuantity || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Balance Quantity:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.balanceQuantity || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Unit of Measurement:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.unitOfMeasurement || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Status:</p>
                                                        <span
                                                            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${selectedProduct?.status === 'Active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                                }`}
                                                        >
                                                            {selectedProduct?.status || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-8 flex items-center justify-end">
                                                    <button
                                                        onClick={() => setModal10(false)}
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>


                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
