import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import Dropdown from '../components/Dropdown';
import { useEffect } from 'react';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import IconPlus from '../components/Icon/IconPlus';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import Treemap from "@/pages/DashboardComponents/treemap";
import JobOrder from "@/pages/DashboardComponents/jobOrder";
import ProductionReportTable from "@/pages/DashboardComponents/ProductionReportTable";
import JobReportTable from "@/pages/DashboardComponents/JobReportTable";
import ColumnStacked from "@/pages/DashboardComponents/columnstacked";
import Downtime from "@/pages/DashboardComponents/downtime";
// import Dropdown from '../components/Dropdown';
const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dasboard'));
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

    

    const handleSelection = (plant: string) => {
        console.log(`Selected: ${plant}`);
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
            <div className="flex justify-end">
                <Dropdown
                    button="Select Plant"
                    btnClassName="px-4 py-2 bg-green-500 text-white rounded"
                >
                    <ul>
                        {['Plant 1', 'Plant 2', 'Plant 3'].map((plant, index) => (
                            <li
                                key={index}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded"
                                onClick={() => handleSelection(plant)}
                            >
                                {plant}
                            </li>
                        ))}
                    </ul>
                </Dropdown>
            </div>
            <div className="flex flex-wrap gap-4 pt-5">
                {/* Total Work Orders Card */}
                <div
                    className="panel h-full flex-1 overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                    style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                >
                    <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                        <h5 className="font-semibold text-lg">Total Work Orders...</h5>
                        <div className="relative text-xl whitespace-nowrap">
                            00
                            <span className="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto">+00</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center justify-between">
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                <IconPlus />
                            </button>
                            <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                <IconCreditCard />
                            </button>
                        </div>
                        <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#4361ee] z-10">
                            Report Generation
                        </button>
                    </div>
                </div>
                {/* Total Work Order Achieved Card */}
                <div className="panel h-full flex-1">
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Total Work Order Achieved</h5>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={isRtl ? 'bottom-start' : 'bottom-end'}
                                btnClassName="hover:text-primary"
                                button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                            >
                                <ul>
                                    <li><button type="button">This Week</button></li>
                                    <li><button type="button">Last Week</button></li>
                                    <li><button type="button">This Month</button></li>
                                    <li><button type="button">Last Month</button></li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="text-[#e95f2b] text-3xl font-bold my-10">
                        <span>00 </span>
                        <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                        <IconTrendingUp className="text-success inline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                            <div
                                className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                style={{ width: '00%' }}
                            ></div>
                        </div>
                        <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">00%</span>
                    </div>
                </div>



                {/* Total Job Cards Achieved Card */}
                <div className="panel h-full flex-1">
                    <div className="flex justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Total Job Orders Achieved</h5>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement={isRtl ? 'bottom-start' : 'bottom-end'}
                                btnClassName="hover:text-primary"
                                button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                            >
                                <ul>
                                    <li><button type="button">This Week</button></li>
                                    <li><button type="button">Last Week</button></li>
                                    <li><button type="button">This Month</button></li>
                                    <li><button type="button">Last Month</button></li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="text-[#e95f2b] text-3xl font-bold my-10">
                        <span>00 </span>
                        <span className="text-black text-sm dark:text-white-light ltr:mr-2 rtl:ml-2">this week</span>
                        <IconTrendingUp className="text-success inline" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                            <div
                                className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                style={{ width: '00%' }}
                            ></div>
                        </div>
                    </div>

                    {/* <span className="ltr:ml-5 rtl:mr-
::contentReference[oaicite:0]{index=0} */}


                </div>


            </div>
            <div className="pt-5">




                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        {/* Work Order Status Panel */}
                        <div className="panel overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Work Order Status</div>
                                </div>
                                <div className="dropdown">
                                    <Dropdown
                                        offset={[0, 5]}
                                        placement={isRtl ? 'bottom-start' : 'bottom-end'}
                                        btnClassName="hover:opacity-80"
                                        button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                    >
                                        <ul>
                                            <li>
                                                <button type="button">View</button>
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
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="text-primary">Total</div>
                                        <div className="mt-2 font-semibold text-2xl">00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Complete</div>
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
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                    <div className="grid gap-6 xl:grid-flow-row">
                        <div className="panel overflow-hidden">
                            <div className="flex flex-col space-y-6">
                                <div>
                                    <JobReportTable />
                                </div>
                                <div>

                                    <ProductionReportTable />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mb-6">
                    {/* <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <Product/>
                    </div> */}

                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <Treemap />
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <ColumnStacked />
                    </div>
                    {/* <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <ColumnStacked/>
                    </div> */}
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <Downtime />
                    </div>
                    {/* <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <Product1/>
                    </div> */}

                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        <JobOrder />
                    </div>


                </div>


            </div>
        </div>
    );
};

export default Index;
