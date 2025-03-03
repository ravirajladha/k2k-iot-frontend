import { useState, useEffect } from 'react';
import IconSearch from '@/components/Icon/IconSearch';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';

const notifications = [
    {
        thumb: 'company-logo-1.png',
        title: 'KK - Packing',
        description: 'Packing Initiated',
        timestamp: '2 hours ago',
        status: 'Unread',
    },
    {
        thumb: 'company-logo-2.png',
        title: 'KK - Daily Production Report',
        description: 'A report has been submitted',
        timestamp: 'Yesterday',
        status: 'Read',
    },
    {
        thumb: 'company-logo-3.png',
        title: 'KK - Job Order',
        description: 'New Job Order Initiated',
        timestamp: '3 days ago',
        status: 'Unread',
    },
    {
        thumb: 'company-logo-4.png',
        title: 'KK - Work Order',
        description: 'New Work Order Created',
        timestamp: '1 week ago',
        status: 'Read',
    },
];

const NotificationsPage = () => {
    const [search, setSearch] = useState<string>('');
    const [filteredNotifications, setFilteredNotifications] = useState(notifications);

    useEffect(() => {
        setFilteredNotifications(() => {
            return notifications.filter((notification) =>
                notification.title.toLowerCase().includes(search.toLowerCase()) ||
                notification.description.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search]);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h5 className="font-semibold text-lg dark:text-white-light">Notifications</h5>
                <form className="w-1/3 relative">
                    <input
                        type="text"
                        value={search}
                        placeholder="Search Notifications..."
                        className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center"
                    >
                        <IconSearch className="mx-auto" />
                    </button>
                </form>
            </div>

            <div className="p-4 border border-white-dark/20 rounded-lg space-y-4 overflow-x-auto w-full block">
                {filteredNotifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-[#1b2e4b] rounded-xl shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] p-3 flex items-center justify-between
                            text-gray-500 font-semibold min-w-[625px] hover:text-primary transition-all duration-300 hover:scale-[1.01] ${
                                notification.status === 'Unread' ? 'bg-gray-100' : ''
                            }`}
                    >
                        {/* Company Image */}
                        <div className="user-profile">
                            <img
                                src={`/k2k_iot_logo.jfif`}
                                alt="img"
                                className="w-10 h-10 rounded-md object-cover"
                            />
                        </div>

                        {/* Notification Title and Description */}
                        <div className="flex-1 mx-4">
                            <div className="font-bold">{notification.title}</div>
                            <div className="text-sm text-gray-400">{notification.description}</div>
                        </div>

                        {/* Timestamp */}
                        <div className="text-sm text-gray-400">{notification.timestamp}</div>

                        {/* Action Icon */}
                        <div className="cursor-pointer">
                            <IconHorizontalDots className="w-6 h-6 opacity-70" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsPage;
