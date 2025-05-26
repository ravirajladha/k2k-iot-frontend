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

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'Dispatch', link: '/konkrete-klinkers/dispatch', isActive: true },
];

const Dispatch = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [dispatchData, setDispatchData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDispatch = async () => {
        try {
            dispatch(setPageTitle('Dispatch'));
            setLoading(true);
            const data = await fetchDispatchData();
            console.log(data);

            setDispatchData(data);
        } catch (error) {
            console.error('Failed to fetch Dispatch:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDispatch();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'work_order_number',
            title: 'Work Order',
            sortable: true,
        },
        {
            accessor: 'client_name',
            title: 'Client Name',
            sortable: true,
        },
        {
            accessor: 'project_name',
            title: 'Project Name',
            sortable: true,
        },
        {
            accessor: 'products',
            title: 'Products',
            sortable: true,
            render: ({ product_names }) => (
                <div>
                    {product_names.map((product, index) => (
                        <div key={index}>
                            {product.name} - {product.dispatch_quantity}
                        </div>
                    ))}
                </div>
            ),
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
            render: ({ _id }) => (
                <div className="flex gap-4 items-center w-max mx-auto">
                    <NavLink to={`${_id}/edit`} className="flex hover:text-info">
                        <IconEdit className="w-4.5 h-4.5" />
                    </NavLink>
                    <NavLink to={`${_id}/detail`} className="flex hover:text-primary">
                        <IconEye />
                    </NavLink>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Add Dispatch', link: '/konkrete-klinkers/dispatch/create', icon: <IconPlusCircle className="text-4xl" /> }} />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Dispatch'} data={dispatchData} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Dispatch;
