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
import { fetchProjectData } from '@/api/konkreteKlinkers/project';
import { fetchProductData } from '@/api/konkreteKlinkers/product';
import { fetchQcData } from '@/api/konkreteKlinkers/qc';

const breadcrumbItems = [
    { label: 'Home', link: '/', isActive: false },
    { label: 'Konkrete Klinkers', link: '#', isActive: false },
    { label: 'QC Check', link: '/konkrete-klinkers/qc-check', isActive: true },
];
const QcCheck = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [qcData, setQcData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getQcData = async () => {
        try {
            dispatch(setPageTitle('Quality Control Check'));
            setLoading(true);
            const data = await fetchQcData();
            setQcData(data);
        } catch (error) {
            console.error('Failed to fetch Products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQcData();
    }, [dispatch]);

    const columns = [
        {
            accessor: 'work_order_number',
            title: 'Work Order',
            sortable: true,
        },
        {
            accessor: 'job_order_number',
            title: 'Job Order',
            sortable: true,
        },
        {
            accessor: 'rejected_quantity',
            title: 'Rejected Quantity',
            sortable: true,
        },
        {
            accessor: 'recycled_quantity',
            title: 'Recycled Quantity',
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
            <Breadcrumbs items={breadcrumbItems} addButton={{ label: 'Add QC Check', link: '/konkrete-klinkers/qc-check/create', icon: <IconPlusCircle className="text-4xl" /> }} />

            {loading ? <CustomLoader /> : <CustomTable pageHeader={'QC data'} data={qcData} columns={columns} isRtl={isRtl} />}
        </div>
    );
};

export default QcCheck;
