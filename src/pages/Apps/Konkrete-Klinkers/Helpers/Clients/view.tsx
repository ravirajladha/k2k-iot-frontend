import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { IRootState } from '@/store/store';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { fetchClientData } from '@/api/konkreteKlinkers/client';

import CustomTable from '@/components/CustomTable';
import Breadcrumbs from '@/pages/Components/Breadcrumbs';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import CustomLoader from '@/components/Loader';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Helpers', link: '#', isActive: false },
    { label: 'Clients', link: '/clients', isActive: true },
];

const Clients = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const getClients = async () => {
        try {
            dispatch(setPageTitle('Clients'));
            setLoading(true);
            const data = await fetchClientData();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClients();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'name',
            title: 'Client Name',
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
    ];

    return (
        <div>
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Add Client',
                    link: '/konkrete-klinkers/clients/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Clients'} data={clients} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Clients;
