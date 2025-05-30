import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
        plant: "Plant A",
        factory_name: "Factory Alpha",
        factory_address: "123 MG Road, Karnataka",
        machine_count: 25,
        created_at: "2025-01-01",
        status: "In Progress",
        created_by: "Admin"
    },
    {
        id: 2,
        plant: "Plant B",
        factory_name: "Factory Beta",
        factory_address: "123 MG Road, Karnataka",
        machine_count: 15,
        created_at: "2025-01-05",
        status: "Pending",
        created_by: "Admin"
    },
];



const Factories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Factories'));
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

    const [hideCols, setHideCols] = useState<any>(['isActive']);

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
        { accessor: 'client', title: 'Project Name' },
        { accessor: 'factory_name', title: 'Factory Name' },
        { accessor: 'factory_address', title: 'Factory Address' },
        { accessor: 'machine_count', title: 'Machine Count' }, // New column for machine count
        { accessor: 'status', title: 'Status' },
        { accessor: 'created_by', title: 'Created By' },
        { accessor: 'created_at', title: 'Created At' },
    ];


    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Helpers', link: '#', isActive: false },
        { label: 'Factories', link: '/factories', isActive: true },
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
                    item.plant.toLowerCase().includes(search.toLowerCase()) ||
                    item.factory_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.factory_address.toLowerCase().includes(search.toLowerCase()) ||
                    item.machine_count.toString().includes(search.toLowerCase()) || // Added machine_count filtering
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.created_by.toLowerCase().includes(search.toLowerCase()) ||
                    item.created_at.toLowerCase().includes(search.toLowerCase())
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
                    label: 'Add Factory', link: '/factory/create',
                    icon: <IconPlusCircle className="text-4xl" />
                }}
            />

            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Factories</h5>
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
                            {
                                accessor: 'id',
                                title: 'ID',
                                sortable: true,
                                hidden: hideCols.includes('id'),
                            },
                            {
                                accessor: 'plant',
                                title: 'Plant Name',
                                sortable: true,
                                hidden: hideCols.includes('plant'),
                            },
                            {
                                accessor: 'factory_name',
                                title: 'Factory Name',
                                sortable: true,
                                hidden: hideCols.includes('factory_name'),
                            },
                            {
                                accessor: 'factory_address',
                                title: 'Factory Address',
                                sortable: false,
                                hidden: hideCols.includes('factory_address'),
                            },
                            {
                                accessor: 'machine_count',
                                title: 'Machine Count',
                                sortable: false,
                                hidden: hideCols.includes('machine_count'),
                                render: ({ machine_count, factory_name }) => (
                                    <NavLink
                                        // to={`/konkrete_klinkers/machines/${encodeURIComponent(factory_name)}`} 
                                        to={`/machines`}

                                        className="text-blue-500 hover:underline"
                                    >
                                        {machine_count}
                                    </NavLink>
                                ),
                            },

                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                hidden: hideCols.includes('status'),
                                render: ({ status }) => (
                                    <div
                                        className={`${status === 'In Progress'
                                            ? 'text-info'
                                            : status === 'Pending'
                                                ? 'text-warning'
                                                : status === 'Completed'
                                                    ? 'text-success'
                                                    : 'text-danger'
                                            } capitalize`}
                                    >
                                        {status}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'created_by',
                                title: 'Created By',
                                sortable: true,
                                hidden: hideCols.includes('created_by'),
                            },
                            {
                                accessor: 'created_at',
                                title: 'Created At',
                                sortable: true,
                                hidden: hideCols.includes('created_at'),
                                render: ({ created_at }) => (
                                    <div>{new Date(created_at).toLocaleDateString()}</div>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                hidden: hideCols.includes('action'),
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`#`} className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </NavLink>
                                        <NavLink to={`#`} className="flex hover:text-primary">
                                            <IconEye />
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
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>

            </div>
        </div>
    );
};

export default Factories;
