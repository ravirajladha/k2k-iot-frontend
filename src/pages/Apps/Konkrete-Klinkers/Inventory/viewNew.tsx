import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IRootState } from '@/store/store';
import { setPageTitle } from '@/store/slices/themeConfigSlice';

import CustomTable from '@/components/CustomTable';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import CustomLoader from '@/components/Loader';
import { fetchMachineData } from '@/api/konkreteKlinkers/machine';
import { fetchDispatchData } from '@/api/konkreteKlinkers/dispatch';
import { fetchInventoryData } from '@/api/konkreteKlinkers/inventory';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'Inventories', link: '/konkrete-klinkers/inventories', isActive: true },
];

const Inventory = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInventory = async () => {
        try {
            dispatch(setPageTitle('Inventory'));
            setLoading(true);
            const data = await fetchInventoryData();
            console.log(data);

            setInventoryData(data);
        } catch (error) {
            console.error('Failed to fetch Inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInventory();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'material_code',
            title: 'Material Code',
            sortable: true,
        },
        {
            accessor: 'description',
            title: 'Product Description',
            sortable: true,
        },
        {
            accessor: 'uom',
            title: 'Uom',
            sortable: true,
        },
        {
            accessor: 'total_produced_quantity',
            title: 'Produced Quantity',
            sortable: true,
        },
        {
            accessor: 'total_po_quantity',
            title: 'PO Quantity',
            sortable: true,
        },
        {
            accessor: 'balance_quantity',
            title: 'Balanced Quantity',
            sortable: true,
        },
        {
            accessor: 'work_order_count',
            title: 'Work Order Count',
            sortable: true,
        },

        {
            accessor: 'status',
            title: 'Status',
            sortable: true,
            render: ({ status }) => <div className={`${status === 'Active' ? 'text-success' : 'text-danger'} capitalize`}>{status}</div>,
        },
        {
            accessor: 'action',
            title: 'Actions',
            sortable: false,
            render: ({ product_id }) => (
                <div className="flex gap-4 items-center w-max mx-auto">
                    <NavLink to={`${product_id}/detail`} className="flex hover:text-primary">
                        <IconEye />
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Dispatch'} data={inventoryData} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Inventory;
