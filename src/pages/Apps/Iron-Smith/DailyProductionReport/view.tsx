import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
// import { Breadcrumbs } from '../../Breadcrumbs../components/Breadcrumbs';
// import { Breadcrumbs } from '@mantine/core';
import Breadcrumbs from "@/pages/Components/Breadcrumbs";
const rowData = [
    {
        id: 1,
        salesOrderNumber: 'SO12345',
        jobOrderNumber: 'JO54321',
        workOrderId: 'WO98765',
        startTimestamp: '2025-01-28T10:00:00Z',
        endTimestamp: '2025-01-28T10:25:00Z',
        createdBy: 'Admin',
        percentageAchieved: 85,
        downtime: true,
        isCompleted: true,
    },
    {
        id: 2,
        salesOrderNumber: 'SO12346',
        jobOrderNumber: 'JO54322',
        workOrderId: 'WO98766',
        startTimestamp: '2025-01-28T11:00:00Z',
        endTimestamp: '2025-01-28T11:30:00Z',
        createdBy: 'User1',
        percentageAchieved: 72,
        downtime: false,
        isCompleted: false,

    },
    {
        id: 3,
        salesOrderNumber: 'SO12347',
        jobOrderNumber: 'JO54323',
        workOrderId: 'WO98767',
        startTimestamp: '2025-01-28T12:00:00Z',
        endTimestamp: '2025-01-28T12:45:00Z',
        createdBy: 'Manager',
        percentageAchieved: 90,
        downtime: true,
        isCompleted: false,

    },
];


const ColumnChooser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Daily Production Planning'));
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

    const [hideCols, setHideCols] = useState<any>(['Status']);

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
        { accessor: 'id', title: 'ID' },
        { accessor: 'salesOrderNumber', title: 'Sales Order Number' },
        { accessor: 'jobOrderNumber', title: 'Job Order Id' },
        { accessor: 'workOrderId', title: 'Work Order Id' },
        { accessor: 'createdBy', title: 'Created By' },
        { accessor: 'percentageAchieved', title: '% Achieved' },
        { accessor: 'downtime', title: 'Downtime' },
        { accessor: 'startTimestamp', title: 'Start Date-time' },
        { accessor: 'endTimestamp', title: 'End Date-time' },
        { accessor: 'isCompleted', title: 'Status' },
        { accessor: 'action', title: 'Actions' },
    ];

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '#', isActive: false },
        { label: 'Daily Production Report', link: '/konkrete-klinkers/production-planning/view', isActive: true },
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
                    item.salesOrderNumber.toLowerCase().includes(search.toLowerCase()) ||
                    item.jobOrderNumber.toLowerCase().includes(search.toLowerCase()) ||
                    item.workOrderId.toLowerCase().includes(search.toLowerCase()) ||
                    item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
                    item.percentageAchieved.toString().includes(search.toLowerCase()) ||
                    item.downtime.toString().toLowerCase().includes(search.toLowerCase()) ||
                    new Date(item.startTimestamp).toLocaleString().toLowerCase().includes(search.toLowerCase()) ||
                    new Date(item.endTimestamp).toLocaleString().toLowerCase().includes(search.toLowerCase())
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
        addButton={{ label: 'Add Daily Production Report', link: '/konkrete-klinkers/production-planning/create' ,
            icon: <IconPlusCircle className="text-4xl" /> }}
        />


            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Daily Production Report</h5>
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
            { accessor: 'id', title: 'ID', sortable: true, hidden: hideCols.includes('id') },
            { accessor: 'salesOrderNumber', title: 'Sales Order Number', sortable: true, hidden: hideCols.includes('salesOrderNumber') },
            { accessor: 'jobOrderNumber', title: 'Job Order Id', sortable: true, hidden: hideCols.includes('jobOrderNumber') },
            { accessor: 'workOrderId', title: 'Work Order Id', sortable: true, hidden: hideCols.includes('workOrderId') },
            { accessor: 'createdBy', title: 'Created By', sortable: true, hidden: hideCols.includes('createdBy') },
            {
                accessor: 'percentageAchieved',
                title: '% Achieved',
                sortable: true,
                hidden: hideCols.includes('percentageAchieved'),
                render: ({ percentageAchieved }) => <div>{percentageAchieved}%</div>,
            },
            {
                accessor: 'downtime',
                title: 'Downtime',
                sortable: true,
                hidden: hideCols.includes('downtime'),
                render: ({ downtime }) => (
                    <div className={downtime ? 'text-danger' : 'text-success'}>
                        {downtime ? 'Yes' : 'No'}
                    </div>
                ),
            },
            {
                accessor: 'startTimestamp',
                title: 'Start Date-time',
                sortable: true,
                hidden: hideCols.includes('startTimestamp'),
                render: ({ startTimestamp }) => (
                    <div>{new Date(startTimestamp).toLocaleString()}</div>
                ),
            },
            {
                accessor: 'endTimestamp',
                title: 'End Date-time',
                sortable: true,
                hidden: hideCols.includes('endTimestamp'),
                render: ({ endTimestamp }) => (
                    <div>{new Date(endTimestamp).toLocaleString()}</div>
                ),
            },
            {
                accessor: 'isCompleted',
                title: 'Status',
                sortable: true,
                hidden: hideCols.includes('isCompleted'),
                render: ({ isCompleted }) => (
                    <div className={isCompleted ? 'text-success' : 'text-danger'}>
                        {isCompleted ? 'True' : 'False'}
                    </div>
                ),
            },
            {
                accessor: 'action',
                title: 'Actions',
                render: ({ id }) => (
                    <div className="flex gap-4 items-center w-max mx-auto">
                        <NavLink to={`/edit/${id}`} className="flex hover:text-info">
                            <IconEdit className="w-4.5 h-4.5" />
                        </NavLink>
                        <NavLink to={`/view/${id}`} className="flex hover:text-primary">
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
