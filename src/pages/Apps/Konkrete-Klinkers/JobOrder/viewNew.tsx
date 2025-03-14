import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconEye from '@/components/Icon/IconEye';
import { rowData } from './sampleData';

// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
interface Product {
    productId: string;
    productName: string;
    uom: string;
    poQuantity: number;
    achievedTillNow: number;
    rejectedQuantity: number;
    plannedQuantity: number;
    date: string;
}

interface JobOrder {
    id: number;
    jobOrderId: string;
    workOrderId: string;
    fromDate: string;
    toDate: string;
    plantName: string;
    factoryName: string;
    clientName: string;
    batchNumber: string;
    projectName: string;
    products: Product[];
}

const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Job Order / Planning'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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

    const [hideCols, setHideCols] = useState<any>(['plantName', 'clientName']);

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

    // data table modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobOrder, setSelectedJobOrder] = useState<JobOrder | null>(null);

    const handleViewDetails = (jobOrder: JobOrder) => {
        setSelectedJobOrder(jobOrder);
        setIsModalOpen(true);
    };

    const cols = [
        { accessor: 'id', title: 'Serial Number' },
        { accessor: 'jobOrderId', title: 'Job Order ID' },
        { accessor: 'workOrderId', title: 'Work Order ID' },
        { accessor: 'fromDate', title: 'From Date' },
        { accessor: 'toDate', title: 'To Date' },
        { accessor: 'plantName', title: 'Plant Name' },
        // { accessor: 'factoryName', title: 'Factory Name' },
        { accessor: 'clientName', title: 'Client Name' },
        { accessor: 'projectName', title: 'Project Name' },
        { accessor: 'action', title: 'Actions' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '#', isActive: false },
        { label: 'Job Order / Planning', link: '/konkrete-klinkers/job-order/view', isActive: true },
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
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.jobOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.fromDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.toDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.plantName.toLowerCase().includes(search.toLowerCase()) ||
                    // item.factoryName.toLowerCase().includes(search.toLowerCase()) ||
                    item.clientName.toLowerCase().includes(search.toLowerCase()) ||
                    item.projectName.toLowerCase().includes(search.toLowerCase())
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
                addButton={{
                    label: 'Add Job Order',
                    link: '/konkrete-klinkers/job-order/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Job Order / Planning</h5>
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
                            { accessor: 'id', title: 'Serial Number', sortable: true, hidden: hideCols.includes('id') },
                            {
                                accessor: 'jobOrderId',
                                title: 'Job Order ID',
                                sortable: true,
                                hidden: hideCols.includes('jobOrderId'),
                            },
                            {
                                accessor: 'workOrderId',
                                title: 'Work Order ID',
                                sortable: true,
                                hidden: hideCols.includes('workOrderId'),
                            },
                            {
                                accessor: 'batchNumber',
                                title: 'Batch No',
                                sortable: true,
                                hidden: hideCols.includes('batchNumber'),
                            },
                            {
                                accessor: 'fromDate',
                                title: 'From Date',
                                sortable: true,
                                hidden: hideCols.includes('fromDate'),
                                render: ({ fromDate }) => <div>{formatDate(fromDate)}</div>,
                            },
                            {
                                accessor: 'toDate',
                                title: 'To Date',
                                sortable: true,
                                hidden: hideCols.includes('toDate'),
                                render: ({ toDate }) => <div>{formatDate(toDate)}</div>,
                            },
                            {
                                accessor: 'plantName',
                                title: 'Plant Name',
                                sortable: true,
                                hidden: hideCols.includes('plantName'),
                            },
                            // {
                            //     accessor: 'factoryName',
                            //     title: 'Factory Name',
                            //     sortable: true,
                            //     hidden: hideCols.includes('factoryName'),
                            // },
                            {
                                accessor: 'clientName',
                                title: 'Client Name',
                                sortable: true,
                                hidden: hideCols.includes('clientName'),
                            },
                            {
                                accessor: 'projectName',
                                title: 'Project Name',
                                sortable: true,
                                hidden: hideCols.includes('projectName'),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                render: (jobOrder) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        {/* <button className="flex hover:text-primary" onClick={() => handleViewDetails(jobOrder)}>
                                            <IconEye />
                                        </button> */}
                                        <NavLink to={`/konkrete-klinkers/job-order/detail`} state={{ rowData: jobOrder }} className="flex hover:text-info">
                                            <IconEye className="w-4.5 h-4.5" />
                                        </NavLink>
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
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColumnChooser;
