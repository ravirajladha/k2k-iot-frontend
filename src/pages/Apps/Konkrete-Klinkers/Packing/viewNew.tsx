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
import { fetchPackingData } from '@/api/konkreteKlinkers/packing';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'Packing', link: '/konkrete-klinkers/packing/view', isActive: true },
];
const Packings = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [packingData, setpackingData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPackingData = async () => {
        try {
            dispatch(setPageTitle('Packing'));
            setLoading(true);
            const data = await fetchPackingData();
            setpackingData(data);
        } catch (error) {
            console.error('Failed to fetch Products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPackingData();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'work_order_number',
            title: 'Work Order',
            sortable: true,
        },
        {
            accessor: 'product_name',
            title: 'Product Name',
            sortable: true,
        },
        {
            accessor: 'total_quantity',
            title: 'Total Quantity',
            sortable: true,
        },
        {
            accessor: 'total_bundles',
            title: 'Total Bundles',
            sortable: true,
        },
        {
            accessor: 'uom',
            title: 'UOM',
            sortable: true,
        },

        {
            accessor: 'created_by',
            title: 'Created By',
            sortable: true,
        },
        {
            accessor: 'createdAt',
            title: 'Created At',
            sortable: true,
            render: ({ createdAt }) => <div>{new Date(createdAt).toLocaleDateString()}</div>,
        },
        {
            accessor: 'action',
            title: 'Actions',
            sortable: false,
            render: ({ work_order_id, product_id }) => (
                <div className="flex gap-4 items-center w-max mx-auto">
                    <NavLink to={`${work_order_id}/${product_id}/edit`} className="flex hover:text-info">
                        <IconEdit className="w-4.5 h-4.5" />
                    </NavLink>
                    <NavLink to={`${work_order_id}/${product_id}/detail`} className="flex hover:text-primary">
                        <IconEye />
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Add Packing',
                    link: '/konkrete-klinkers/packing/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'QC data'} data={packingData} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Packings;
