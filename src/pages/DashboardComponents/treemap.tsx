import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ProductData {
  x: string;
  y: number;
  workOrders: number;
  readyStocks: number;
}

const InventoryTreemap: React.FC = () => {
  const series = [
    {
      data: [
        { x: 'Product A', y: 120, workOrders: 50, readyStocks: 70 },
        { x: 'Product B', y: 80, workOrders: 30, readyStocks: 50 },
        { x: 'Product C', y: 150, workOrders: 60, readyStocks: 90 },
        { x: 'Product D', y: 60, workOrders: 20, readyStocks: 40 },
        { x: 'Product E', y: 200, workOrders: 80, readyStocks: 120 },
        { x: 'Product A', y: 120, workOrders: 50, readyStocks: 70 },
        { x: 'Product B', y: 80, workOrders: 30, readyStocks: 50 },
        { x: 'Product C', y: 150, workOrders: 60, readyStocks: 90 },
        { x: 'Product D', y: 60, workOrders: 20, readyStocks: 40 },
        { x: 'Product E', y: 200, workOrders: 80, readyStocks: 120 },
      ],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'treemap',
      height: 350,
    },
    title: {
      text: 'Inventory Products Treemap',
    },
    tooltip: {
      enabled: true, // Enable tooltip
      y: {
        formatter: function (val: number, opts?: any) {
          const product = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
          return `Work Orders: ${product.workOrders}, Ready Stocks: ${product.readyStocks}`;
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts?: any) {
        const product = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex];
        return `${product.x}`;
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };
  

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="treemap" height={500} />
    </div>
  );
};

export default InventoryTreemap;
