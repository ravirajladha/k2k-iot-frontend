import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';

import IconPencilPaper from '@/components/Icon/IconPencilPaper';
import IconCoffee from '@/components/Icon/IconCoffee';
import IconCalendar from '@/components/Icon/IconCalendar';
import IconMapPin from '@/components/Icon/IconMapPin';
import IconMail from '@/components/Icon/IconMail';
import IconPhone from '@/components/Icon/IconPhone';
import IconUser from '@/components/Icon/IconUser';

const Profile = () => {
    const dispatch = useDispatch();

    // Fetch user details from Redux
    const userDetail = useSelector((state: IRootState) => state.auth.user);

    useEffect(() => {
        dispatch(setPageTitle('Profile'));
    }, [dispatch]);

    const permissions = [
        { name: 'Create Work Order', allowed: true },
        { name: 'Approval of Work Order', allowed: false },
        { name: 'Daily Production Report', allowed: true },
        { name: 'Dispatch', allowed: false },
        { name: 'Operator', allowed: true },
        { name: 'Packing', allowed: false },
    ];

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    {/* Profile Section */}
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            <Link to="/users/edit" className="ltr:ml-auto rtl:mr-auto btn btn-primary p-2 rounded-full">
                                <IconPencilPaper />
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src="/assets/images/profile-34.jpeg"
                                    alt="img"
                                    className="w-24 h-24 rounded-full object-cover mb-5"
                                />
                                <p className="font-semibold text-primary text-xl">{userDetail?.fullName || 'Guest User'}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    {'Employee'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconUser className="shrink-0" />
                                    {'EMP123'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    { 'Jan 20, 1989'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    {'India, RR Nagar'}
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">{userDetail?.email || 'employee@example.com'}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {'+91 8986787878'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Permissions Section */}
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Permissions</h5>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Permission</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        {permissions.map((permission, index) => (
                                            <tr key={index}>
                                                <td>{permission.name}</td>
                                                <td>
                                                    <span
                                                        className={`${
                                                            permission.allowed ? 'text-success' : 'text-danger'
                                                        } font-bold`}
                                                    >
                                                        {permission.allowed ? 'Allowed' : 'Denied'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
