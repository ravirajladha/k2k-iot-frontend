import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import ReactApexChart from 'react-apexcharts';
import Dropdown from '@/components/Dropdown';
import { setPageTitle } from '@/store/slices/themeConfigSlice';

import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';

import { ApexOptions } from 'apexcharts';
const FactoryDowntime: React.FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    //downtimeData
    const downtimeData = [
        {
            factory: 'Factory A',
            data: [
                { timestamp: '2025-01-01', downtime: 2 },
                { timestamp: '2025-01-02', downtime: 3 },
                // Add more daily data points
            ],
        },
        {
            factory: 'Factory B',
            data: [
                { timestamp: '2025-01-01', downtime: 1 },
                { timestamp: '2025-01-02', downtime: 4 },
                // Add more daily data points
            ],
        },
        // Add more factories as needed
    ];

    const downtimeSeries = downtimeData.map((factory) => ({
        name: factory.factory,
        data: factory.data.map((entry) => ({
            x: new Date(entry.timestamp).getTime(),
            y: entry.downtime,
        })),
    }));



    const downtimeChartOptions: ApexOptions = {
        chart: {
            height: 325,
            type: 'area',
            fontFamily: 'Nunito, sans-serif',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM',
                style: {
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            min: 0, // Set the minimum value of the y-axis to 0
            labels: {
                formatter: (value: any) => `${value} minutes`,
                style: {
                    fontSize: '12px',
                },
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
            y: {
                formatter: (value: any) => `${value} minutes`,
            },
        },
        colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '16px',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: isDark ? 0.19 : 0.28,
                opacityTo: 0.05,
                stops: isDark ? [100, 100] : [45, 100],
            },
        },
    };

    const [view, setView] = useState('daily');

    const aggregateData = (view: any) => {
        // Implement data aggregation logic based on the selected view
        // Return the aggregated series data
    };

    const handleViewChange = (newView: any) => {
        setView(newView);
        const aggregatedSeries = aggregateData(newView);
        // Update the chart series with the aggregated data
    };




    return (
        <div className="">
            <div className="pt-1    ">
                <div className="grid xl:grid-cols-1 gap-6 mb-6">
                    <div className=" h-full xl:col-span-2">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Factory Downtime</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 1]}
                                    placement={isRtl ? 'bottom-start' : 'bottom-end'}
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button" onClick={() => handleViewChange('daily')}>Daily</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => handleViewChange('weekly')}>Weekly</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => handleViewChange('monthly')}>Monthly</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                                
                            </div>
                            
                        </div>
                        <p className="text-lg dark:text-white-light/90">
                            Total Downtime Today <span className="text-primary ml-2">1 hour</span>
                        </p>
                        <div className="relative">
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    // <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />

                                    <ReactApexChart
                                        series={downtimeSeries}
                                        options={downtimeChartOptions}
                                        type="area"
                                        height={325}
                                    />

                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default FactoryDowntime;
