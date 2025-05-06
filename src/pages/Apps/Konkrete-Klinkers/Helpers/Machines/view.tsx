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

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Helpers', link: '#', isActive: false },
    { label: 'Machines', link: '/machines', isActive: true },
];

const Machines = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMachines = async () => {
        try {
            dispatch(setPageTitle('Machines'));
            setLoading(true);
            const data = await fetchMachineData();
            console.log(data);

            setMachines(data);
        } catch (error) {
            console.error('Failed to fetch Machines:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMachines();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'name',
            title: 'Machine Name',
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
            <Breadcrumbs
                items={breadcrumbItems}
                addButton={{
                    label: 'Add Machine',
                    link: '/konkrete-klinkers/machines/create',
                    icon: <IconPlusCircle className="text-4xl" />,
                }}
            />
            {loading ? <CustomLoader /> : <CustomTable pageHeader={'Machines'} data={machines} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default Machines;
