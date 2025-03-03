// "use client";
// import Dropdown from "@/components/dropdown";
// import IconBinance from "@/components/icon/icon-binance";
// import IconBitcoin from "@/components/icon/icon-bitcoin";
// import IconCircleCheck from "@/components/icon/icon-circle-check";
// import IconEthereum from "@/components/icon/icon-ethereum";
// import IconEye from "@/components/icon/icon-eye";
// import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
// import IconInfoCircle from "@/components/icon/icon-info-circle";
// import IconLitecoin from "@/components/icon/icon-litecoin";
// import IconSolana from "@/components/icon/icon-solana";
// import IconTether from "@/components/icon/icon-tether";
import { IRootState } from "@/store/store";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Index = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    //bitcoinoption
    const bitcoin: any = {
        series: [
            {
                data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#00ab55"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //ethereumoption
    const ethereum: any = {
        series: [
            {
                data: [44, 25, 59, 41, 66, 25, 21, 9, 36, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#e7515a"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //litecoinoption
    const litecoin: any = {
        series: [
            {
                data: [9, 21, 36, 12, 66, 25, 44, 25, 41, 59],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#00ab55"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //binanceoption
    const binance: any = {
        series: [
            {
                data: [25, 44, 25, 59, 41, 21, 36, 12, 19, 9],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#e7515a"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //tetheroption
    const tether: any = {
        series: [
            {
                data: [21, 59, 41, 44, 25, 66, 9, 36, 25, 12],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#00ab55"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    //solanaoption
    const solana: any = {
        series: [
            {
                data: [21, -9, 36, -12, 44, 25, 59, -41, 66, -25],
            },
        ],
        options: {
            chart: {
                height: 45,
                type: "line",
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
            },
            markers: {
                size: 0,
            },
            colors: ["#e7515a"],
            grid: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return "";
                        },
                    },
                },
            },
            responsive: [
                {
                    breakPoint: 576,
                    options: {
                        chart: {
                            height: 95,
                        },
                        grid: {
                            padding: {
                                top: 45,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        },
    };

    const isRtl =
        useSelector((state: IRootState) => state.themeConfig.rtlClass) ===
        "rtl";

    return (
        <div>
            <div className="">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                Data1
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {" "}
                                552{" "}
                            </div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                Data 2
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {" "}
                                74,137{" "}
                            </div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                Data 3
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {" "}
                                85{" "}
                            </div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
                                Data 4
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {" "}
                                14{" "}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="panel h-full w-full">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Recent Initiatives
                            </h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">
                                            Name
                                        </th>
                                        <th>Owner</th>
                                        <th>Date</th>
                                        <th>Area</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">
                                                    Green Energy
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-primary">
                                            John Doe
                                        </td>
                                        <td>10/08/2020</td>
                                        <td>London</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">
                                                Complete
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">
                                                    Green Energy
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-primary">
                                            John Doe
                                        </td>
                                        <td>10/08/2020</td>
                                        <td>London</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">
                                                    Green Energy
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-primary">
                                            John Doe
                                        </td>
                                        <td>10/08/2020</td>
                                        <td>London</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">
                                                Complete
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">
                                                    Green Energy
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-primary">
                                            John Doe
                                        </td>
                                        <td>10/08/2020</td>
                                        <td>London</td>
                                        <td>
                                            <span className="badge bg-danger shadow-md dark:group-hover:bg-transparent">
                                                Canceled
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">
                                                    Green Energy
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-primary">
                                            John Doe
                                        </td>
                                        <td>10/08/2020</td>
                                        <td>London</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">
                                                Complete
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="panel h-full w-full">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Recent Users
                            </h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr className="border-b-0">
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">
                                            Name
                                        </th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <p className="whitespace-nowrap">
                                                    John Doe
                                                </p>
                                            </div>
                                        </td>
                                        <td>johndoe@yahoo.com</td>
                                        <td>9876543255</td>
                                        <td>London</td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <p className="whitespace-nowrap">
                                                    John Doe
                                                </p>
                                            </div>
                                        </td>
                                        <td>johndoe@yahoo.com</td>
                                        <td>9876543255</td>
                                        <td>London</td>
                                    </tr>{" "}
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <p className="whitespace-nowrap">
                                                    John Doe
                                                </p>
                                            </div>
                                        </td>
                                        <td>johndoe@yahoo.com</td>
                                        <td>9876543255</td>
                                        <td>London</td>
                                    </tr>{" "}
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <p className="whitespace-nowrap">
                                                    John Doe
                                                </p>
                                            </div>
                                        </td>
                                        <td>johndoe@yahoo.com</td>
                                        <td>9876543255</td>
                                        <td>London</td>
                                    </tr>{" "}
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex">
                                                <p className="whitespace-nowrap">
                                                    John Doe
                                                </p>
                                            </div>
                                        </td>
                                        <td>johndoe@yahoo.com</td>
                                        <td>9876543255</td>
                                        <td>London</td>
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
