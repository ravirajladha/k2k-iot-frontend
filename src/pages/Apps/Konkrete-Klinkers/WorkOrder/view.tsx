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
import { fetchWorkOrderData } from '@/api/konkreteKlinkers/workOrder';

    const breadcrumbItems = [
        { label: 'Home', link: '/', isActive: false },
        { label: 'Konkrete Klinkers', link: '#', isActive: false },
        { label: 'Work Order', link: '/konkrete-klinkers/work-order/view', isActive: true },
    ];
const Workorder = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getWorkOrders = async () => {
        try {
            dispatch(setPageTitle('Work Order'));
            setLoading(true);
            const data = await fetchWorkOrderData();
            setWorkOrders(data);
        } catch (error) {
            console.error('Failed to fetch Work Orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWorkOrders();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'work_order_number',
            title: 'Work Order Number',
            sortable: true,
        },
        {
            accessor: 'project_id.name',
            title: 'Project name',
            sortable: true,
        },
        {
            accessor: 'client_id.name',
            title: 'Client name',
            sortable: true,
        },
        {
            accessor: 'created_by.username',
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
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Add Work Order', link: '/konkrete-klinkers/work-order/create', icon: <IconPlusCircle className="text-4xl" /> }} />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Products'} data={workOrders} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Workorder;
