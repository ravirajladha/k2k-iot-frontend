import React from 'react';
import ReactApexChart from 'react-apexcharts';
import IconCode from '@/components/Icon/IconCode';
import { ApexOptions } from 'apexcharts';

const codeArr: string[] = [];


const HorizontalStackedBarChart: React.FC = () => {
    const simpleColumnStacked: {
        series: { name: string; data: number[] }[];
        options: ApexOptions;
    } = {
        series: [
            {
                name: 'Work Order PO Quantity',
                data: [120, 100, 90, 80, 70, 60, 50, 40, 30, 20, 110, 100, 90, 120, 130, 140, 50, 60, 70, 80, 90, 100, 110, 50, 40, 30, 20, 10, 50, 100],
            },
            {
                name: 'Current Stock',
                data: [80, 70, 60, 50, 40, 30, 20, 10, 90, 100, 80, 70, 90, 100, 120, 60, 40, 30, 20, 10, 60, 80, 100, 70, 50, 40, 30, 20, 10, 70],
            },
        ],
        options: {
            chart: {
                height: 600,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            colors: ['#2196f3', '#f44336'], // Colors for each dataset
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '90%', // Increased bar height to 90%
                },
            },
            xaxis: {
                categories: [
                    'Product 1',
                    'Product 2',
                    'Product 3',
                    'Product 4',
                    'Product 5',
                    'Product 6',
                    'Product 7',
                    'Product 8',
                    'Product 9',
                    'Product 10',
                    'Product 11',
                    'Product 12',
                    'Product 13',
                    'Product 14',
                    'Product 15',
                    'Product 16',
                    'Product 17',
                    'Product 18',
                    'Product 19',
                    'Product 20',
                    'Product 21',
                    'Product 22',
                    'Product 23',
                    'Product 24',
                    'Product 25',
                    'Product 26',
                    'Product 27',
                    'Product 28',
                    'Product 29',
                    'Product 30',
                ],
                axisBorder: {
                    color: '#e0e6ed',
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#6c757d',
                    },
                },
            },
            grid: {
                borderColor: '#e0e6ed',
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                theme: 'light',
            },
            fill: {
                opacity: 0.9,
            },
        },
    };

    const toggleCode = (code: string) => {
        // Handle toggle functionality
    };

    const codeArr: string[] = [];


    return (
        <div className="">
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white">Inventory </h5>
                {/* <button
                    type="button"
                    className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                    onClick={() => toggleCode('code4')}
                >
                    <span className="flex items-center">
                        <IconCode className="me-2" />
                        Code
                    </span>
                </button> */}
            </div>
            <div className="mb-5">
                <ReactApexChart
                    series={simpleColumnStacked.series}
                    options={simpleColumnStacked.options}
                    className="rounded-lg bg-white dark:bg-black overflow-hidden"
                    type="bar"
                    height={500}
                    width={'100%'}
                />
            </div>
            {codeArr.includes('code4') && (
                <pre className="language-typescript">{`// Code goes here`}</pre>
            )}
        </div>
    );
};

export default HorizontalStackedBarChart;
