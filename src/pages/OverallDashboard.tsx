import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';

import Dropdown from '../components/Dropdown';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import IconCode from '../components/Icon/IconCode';

import IconChrome from '../components/Icon/IconChrome';
import IconSafari from '../components/Icon/IconSafari';
import IconGlobe from '../components/Icon/IconGlobe';
import IconUsersGroup from '../components/Icon/IconUsersGroup';
import IconLink from '../components/Icon/IconLink';
import IconChatDots from '../components/Icon/IconChatDots';
import IconThumbUp from '../components/Icon/IconThumbUp';
import IconCaretsDown from '../components/Icon/IconCaretsDown';
import IconSquareCheck from '../components/Icon/IconSquareCheck';
import IconClock from '../components/Icon/IconClock';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import IconInfoCircle from '@/components/Icon/IconInfoCircle';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Index Admin'));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // totalVisitOptions
    const totalVisit: any = {
        series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#009688',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#009688'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // paidVisitOptions
    const paidVisit: any = {
        series: [{ data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69] }],
        options: {
            chart: {
                height: 58,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#e2a03f',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e2a03f'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
 
    // followersOptions
    const followers: any = {
        series: [
            {
                data: [38, 60, 38, 52, 36, 40, 28],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // referralOptions
    const referral: any = {
        series: [
            {
                data: [60, 28, 52, 38, 40, 36, 38],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // engagementOptions
    const engagement: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 50, 36, 60, 38, 52, 38],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#1abc9c'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };

  // pieChartOptions
  const pieChart: any = {
    series: [44, 55, 13, 43, 22],
    options: {
        chart: {
            height: 300,
            type: 'pie',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        labels: ['Factory A', 'Factory B', 'Factory C', 'Factory D', 'Factory E'],
        colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
        stroke: {
            show: false,
        },
        legend: {
            position: 'bottom',
        },
    },
};

// donutChartOptions
const donutChart: any = {
    series: [44, 55, 13],
    options: {
        chart: {
            height: 300,
            type: 'donut',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            show: false,
        },
        labels: ['Factory A', 'Factory B', 'Factory C'],
        colors: ['#4361ee', '#805dca', '#e2a03f'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
        legend: {
            position: 'bottom',
        },
    },
};
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Index</span>
                </li>
            </ul>

            <div className="grid sm:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-3 xl:col-span-2">
                        <div className="flex items-start justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Work Order Completed</h5>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-primary/10 text-primary rounded-xl w-9 h-9 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                        <IconChrome className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Plant 1</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">65%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#009ffd] to-[#2a2a72] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '65%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-danger/10 text-danger rounded-xl w-9 h-9 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                        <IconSafari className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Plant 2</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">40%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#a71d31] to-[#3f0d12] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '40%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-warning/10 text-warning rounded-xl w-9 h-9 flex justify-center items-center dark:bg-warning dark:text-white-light">
                                        <IconGlobe className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Plant 3</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">25%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#fe5f75] to-[#fc9842] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '25%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Plant 1 Production</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={followers.series} options={followers.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-danger/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Plant 2 Production</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={referral.series} options={referral.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Plant 3 Production</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={engagement.series} options={engagement.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>
                </div>
                
            <div className="pt-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Statistics</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">This Week</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Week</button>
                                        </li>
                                        <li>
                                            <button type="button">This Month</button>
                                        </li>
                                        <li>
                                            <button type="button">Last Month</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold">
                            <div>
                                <div>
                                    <div>Online Users</div>
                                    <div className="text-[#f8538d] text-lg">00</div>
                                </div>

                                <ReactApexChart series={totalVisit.series} options={totalVisit.options} type="line" height={58} className="overflow-hidden" />
                            </div>

                            <div>
                                <div>
                                    <div>Offline Users</div>
                                    <div className="text-[#f8538d] text-lg">00</div>
                                </div>

                                <ReactApexChart series={paidVisit.series} options={paidVisit.options} type="line" height={58} className="overflow-hidden" />
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white">Factory Wise User</h5>
                        
                    </div>
                    <div className="mb-5">
                        <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={300} />
                    </div>
                    
                </div>

                <div className="panel">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white">Factory Wise Work Order</h5>
                        
                    </div>
                    <div className="mb-5">
                        <ReactApexChart series={donutChart.series} options={donutChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="donut" height={300} />
                    </div>
                   
                </div>
                </div>

               

                <div className="grid sm:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-3 xl:col-span-2">
                        <div className="flex items-start justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Work Order Completed</h5>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-primary/10 text-primary rounded-xl w-9 h-9 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                        <IconChrome className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Konkrete Klinker</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">65%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#009ffd] to-[#2a2a72] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '65%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-danger/10 text-danger rounded-xl w-9 h-9 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                        <IconSafari className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Iron Smith</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">40%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#a71d31] to-[#3f0d12] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '40%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-9 h-9">
                                    <div className="bg-warning/10 text-warning rounded-xl w-9 h-9 flex justify-center items-center dark:bg-warning dark:text-white-light">
                                        <IconGlobe className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="px-3 flex-initial w-full">
                                    <div className="w-summary-info flex justify-between font-semibold text-white-dark mb-1">
                                        <h6>Facades</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto text-xs">25%</p>
                                    </div>
                                    <div>
                                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="bg-gradient-to-r from-[#fe5f75] to-[#fc9842] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                                style={{ width: '25%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Konkrete Klinkers Production</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={followers.series} options={followers.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-danger/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Iron Smith</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={referral.series} options={referral.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                                <IconUsersGroup className="w-5 h-5" />
                            </div>
                            <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                <p className="text-xl dark:text-white-light">00</p>
                                <h5 className="text-[#506690] text-xs">Facades</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            <ReactApexChart series={engagement.series} options={engagement.options} type="area" height={160} className="w-full absolute bottom-0 overflow-hidden" />
                        </div>
                    </div>
                </div>

              

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        {/*  Previous Statement  */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Konkrete Klinkers</div>
                                    {/* <div className="text-success"> Paid on June 27, 2022 </div> */}
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">View </button>
                                            </li>
                                            <li>
                                                <button type="button">Edit</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-full h-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-primary">Total </div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Pending</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">In Progress</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Current Statement */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Iron Smith</div>
                                    {/* <div className="text-danger"> Must be paid before July 27, 2022 </div> */}
                                </div>
                                <div className="dropdown">
                                    <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}>
                                        <ul>
                                            <li>
                                                <button type="button">View </button>
                                            </li>
                                            <li>
                                                <button type="button">Edit</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-24 h-full" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                        <div className="text-primary">Total </div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Pending</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">In Progress</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Facades</div>
                                    {/* <div className="text-danger"> Must be paid before July 27, 2022 </div> */}
                                </div>
                                <div className="dropdown">
                                    <Dropdown offset={[0, 5]} placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}>
                                        <ul>
                                            <li>
                                                <button type="button">View </button>
                                            </li>
                                            <li>
                                                <button type="button">Edit</button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                                    <IconCircleCheck className="text-success opacity-20 w-24 h-full" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                        <div className="text-primary">Total </div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Pending</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">In Progress</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                </div>
                            </div>
                            
 
                        </div>
                    </div>

                    {/*  Recent Transactions  */}
                    <div className="panel">
                        <div className="mb-5 text-lg font-bold">Recent Transactions</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>XX</th>
                                        <th>XX</th>
                                        <th>XX</th>
                                        <th className="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">#01</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#02</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#03</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#04</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#05</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">#06</td>
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="whitespace-nowrap">XX</td>  
                                        <td className="whitespace-nowrap">XX</td>
                                        <td className="text-center">
                                            <span className="badge bg-info/20 text-info rounded-full hover:top-0">In Process</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
