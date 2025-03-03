import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store/store';
import { setPageTitle } from '@/store/slices/themeConfigSlice';


interface JobOrder {
    date: string; // e.g., '2025-01-01'
    requiredQuantity: number;
    achievedQuantity: number;
}


const JobOrderProgressChart: React.FC = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const generateJobOrders = (startDate: string, days: number): JobOrder[] => {
        const jobOrders: JobOrder[] = [];
        const start = new Date(startDate);

        for (let i = 0; i < days; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);

            const requiredQuantity = Math.floor(Math.random() * 101) + 100; // Random number between 100 and 200
            const achievedQuantity = Math.floor(Math.random() * (requiredQuantity + 1)); // Random number between 0 and requiredQuantity

            jobOrders.push({
                date: currentDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
                requiredQuantity,
                achievedQuantity,
            });
        }

        return jobOrders;
    };

    const jobOrders = generateJobOrders('2025-01-01', 20);


    const dates = jobOrders.map(order => order.date);
    const requiredQuantities = jobOrders.map(order => order.requiredQuantity);
    const achievedQuantities = jobOrders.map(order => order.achievedQuantity);


    const series = [
        {
            name: 'Required Quantity',
            data: requiredQuantities,
        },
        {
            name: 'Achieved Quantity',
            data: achievedQuantities,
        },
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                // endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],

        },
        xaxis: {
            categories: dates,
            title: {
                text: 'Date',
            },
        },
        yaxis: {
            title: {
                text: 'Quantity',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val} units`,
            },
        },
    };

    return (
        <div id="chart">
                            <h5 className="font-semibold text-lg">Production Report</h5>

            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default JobOrderProgressChart;
