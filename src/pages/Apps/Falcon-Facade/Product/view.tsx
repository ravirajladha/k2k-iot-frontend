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
    name: string;
    status: string;
    system: string;
    product_system: string;
    created_by: string;
    created_at: string;
}

const rowData: Product[] = [
    {
        name: 'Concrete Blocks',
        status: 'Active',
        system: 'System 1',
        product_system: 'Product System 1',
        created_by: 'User 1',
        created_at: '2024-02-17 14:30',
    },
    {
        name: 'Cement Bags',
        status: 'Active',
        system: 'System 2',
        product_system: 'Product System 2',
        created_by: 'User 2',
        created_at: '2024-02-16 10:15',
    },
    {
        name: 'Steel Rods',
        status: 'Inactive',
        system: 'System 3',
        product_system: 'Product System 3',
        created_by: 'User 3',
        created_at: '2024-02-15 12:45',
    },
    {
        name: 'Bricks',
        status: 'Active',
        system: 'System 4',
        product_system: 'Product System 4',
        created_by: 'User 4',
        created_at: '2024-02-14 08:00',
    },
];



const ProductView = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Product'));
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

    const [hideCols, setHideCols] = useState<any>(['quantity']);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };
    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setModal10(true);
    };

    const closeModal = () => {
        setModal10(false);
    };



    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Falcon Facade', link: '#', isActive: false },
        { label: 'Products', link: '/falcon-facade/products', isActive: true },
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
                    item.name.toLowerCase().includes(search.toLowerCase()) || // Search in name
                    item.status.toLowerCase().includes(search.toLowerCase()) || // Search in status
                    item.system.toLowerCase().includes(search.toLowerCase()) || // Search in system
                    item.product_system.toLowerCase().includes(search.toLowerCase()) || // Search in product_system
                    item.created_by.toLowerCase().includes(search.toLowerCase()) || // Search in created_by
                    item.created_at.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const cols = [
        { accessor: 'name', title: 'Product Name', sortable: true },
        { accessor: 'status', title: 'Status', sortable: true },
        { accessor: 'system', title: 'System', sortable: true },
        { accessor: 'product_system', title: 'Product System', sortable: true },
        { accessor: 'created_by', title: 'Created By', sortable: true },
        { accessor: 'created_at', title: 'Created At', sortable: true },
        {
            accessor: 'action',
            title: 'Actions',
            render: (product: Product) => ( // Accept the full product object
                <div className="flex gap-4 items-center">
                    <button onClick={() => openModal(product)} className="btn btn-info">
                        <IconEye className="text-4xl" />
                    </button>
                </div>
            ),
        },
    ];
    
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
                addButton={{
                    label: 'Add Product', link: '/falcon-facade/product/create',
                    icon: <IconPlusCircle className="text-4xl" />
                }}
            />


            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Products </h5>
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
                        columns={cols}
                        highlightOnHover
                        totalRecords={recordsData.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />

                    <Transition appear show={modal10} as={Fragment}>
                        <Dialog as="div" open={modal10} onClose={closeModal} className="relative z-50">
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
                                            <h5 className="text-lg font-bold">{selectedProduct?.name}</h5>
                                            <button onClick={closeModal} type="button" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                                                <IconX />
                                            </button>
                                        </div>

                                        {/* Modal Body */}
                                        <div>
                                            {/* Full-width Product Image */}
                                            <img
                                                src="/assets/images/profile-34.jpeg"
                                                alt="Product"
                                                className="w-full h-60 object-cover"
                                            />

                                            {/* Product Details */}
                                            <div className="p-5">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Name:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.name || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">System:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.system || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Product System:</p>
                                                        <p className="text-base font-medium text-gray-800 dark:text-white">{selectedProduct?.product_system || 'N/A'}</p>
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
                                                    <button onClick={closeModal} type="button" className="btn btn-outline-danger">
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

export default ProductView;
