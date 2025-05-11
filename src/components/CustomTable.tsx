import { useMemo, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

import Dropdown from '@/components/Dropdown';
import IconCaretDown from '@/components/Icon/IconCaretDown';

const PAGE_SIZES = [10, 20, 30, 50, 100];

interface Column {
    accessor: string;
    title: string;
    sortable?: boolean;
    hidden?: boolean;
    render?: (row: any, index: number) => React.ReactNode;
}

interface CustomTableProps {
    pageHeader: string;
    data: any[];
    columns: Column[];
    defaultSort?: DataTableSortStatus;
    pageSizeOptions?: number[];
    isRtl?: boolean;
}

const CustomTable = ({ pageHeader, data, columns, defaultSort = { columnAccessor: 'createdAt', direction: 'desc' }, pageSizeOptions = PAGE_SIZES, isRtl = false }: CustomTableProps) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>(defaultSort);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    const toggleColumnVisibility = (col: string) => {
        setHiddenColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]));
    };

    const slNoColumn: Column = {
        accessor: 'slno',
        title: 'Sl. No.',
        sortable: false,
        render: (_row: any, index: number) => <div>{(page - 1) * pageSize + index + 1}</div>,
    };

    // const visibleColumns = useMemo(() => columns.filter((col) => !hiddenColumns.includes(col.accessor)), [columns, hiddenColumns]);
    const visibleColumns = useMemo(() => {
        const userDefinedColumns = columns.filter((col) => !hiddenColumns.includes(col.accessor));
        return [slNoColumn, ...userDefinedColumns];
    }, [columns, hiddenColumns, page, pageSize]);

    const filteredAndSortedData = useMemo(() => {
        let filtered = [...data];

        if (search.trim()) {
            const keyword = search.toLowerCase();
            filtered = filtered.filter((item) =>
                columns.some((col) => {
                    if (col.accessor.includes('.')) {
                        const value = col.accessor.split('.').reduce((acc, key) => acc?.[key], item);
                        return value?.toString().toLowerCase().includes(keyword);
                    }
                    return item[col.accessor]?.toString().toLowerCase().includes(keyword);
                })
            );
        }

        const sorted = sortBy(filtered, sortStatus.columnAccessor);
        return sortStatus.direction === 'desc' ? sorted.reverse() : sorted;
    }, [data, search, sortStatus, columns]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredAndSortedData.slice(start, start + pageSize);
    }, [filteredAndSortedData, page, pageSize]);

    return (
        <>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-4">{pageHeader}</h5>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="dropdown">
                            <Dropdown
                                placement={isRtl ? 'bottom-end' : 'bottom-start'}
                                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                button={
                                    <>
                                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                        <IconCaretDown className="w-5 h-5" />
                                    </>
                                }
                            >
                                <ul className="!min-w-[140px]">
                                    {columns.map((col, idx) => (
                                        <li key={idx} onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center px-4 py-1">
                                                <label className="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        checked={!hiddenColumns.includes(col.accessor)}
                                                        onChange={() => toggleColumnVisibility(col.accessor)}
                                                    />
                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Dropdown>
                        </div>

                        <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        columns={visibleColumns}
                        records={paginatedData}
                        totalRecords={filteredAndSortedData.length}
                        recordsPerPage={pageSize}
                        recordsPerPageOptions={pageSizeOptions}
                        page={page}
                        onPageChange={setPage}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        highlightOnHover
                        paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </>
    );
};

export default CustomTable;
