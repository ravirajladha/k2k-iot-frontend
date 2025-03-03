import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/slices/themeConfigSlice';
import { IRootState } from '@/store/store';
import IconArrowWaveLeftUp from '@/components/Icon/IconArrowWaveLeftUp';
import IconDesktop from '@/components/Icon/IconDesktop';
import IconUser from '@/components/Icon/IconUser';
import IconBox from '@/components/Icon/IconBox';
import IconDollarSignCircle from '@/components/Icon/IconSave';
import IconRouter from '@/components/Icon/IconChecks';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import IconMinusCircle from '@/components/Icon/IconMinusCircle';



import IconCode from '@/components/Icon/IconCode';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconFolder from '@/components/Icon/IconFolder';
import IconTxtFile from '@/components/Icon/IconTxtFile';
import IconFolderPlus from '@/components/Icon/IconFolderPlus';
import IconFolderMinus from '@/components/Icon/IconFolderMinus';



const Faq = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('FAQ'));
    });
   
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [activeTab, setActiveTab] = useState<String>('general');
    const [active1, setActive1] = useState<any>(1);
    const [active2, setActive2] = useState<any>(1);

    // const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Faq'));
    });

    const [treeview1, setTreeview1] = useState<string[]>(['images']);
    const [pagesSubMenu, setPagesSubMenu] = useState(false);

    const toggleTreeview1 = (name: any) => {
        if (treeview1.includes(name)) {
            setTreeview1((value) => value.filter((d) => d !== name));
        } else {
            setTreeview1([...treeview1, name]);
        }
    };


    return (
        <div>
            <div className="relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10">
                <div className="absolute -bottom-1 -end-6 hidden text-[#DBE7FF] rtl:rotate-y-180 dark:text-[#1B2E4B] lg:block xl:end-0">
                    <img src={isDark ? '/assets/images/faq/faq-dark.svg' : '/assets/images/faq/faq-light.svg'} alt="faqs" className="w-56 object-cover xl:w-80" />
                </div>
                <div className="relative">
                    <div className="flex flex-col items-center justify-center sm:-ms-32 sm:flex-row xl:-ms-60">
                        <div className="mb-2 flex gap-1 text-end text-base leading-5 sm:flex-col xl:text-xl">
                            <span>It's free </span>
                            <span>For everyone</span>
                        </div>
                        <div className="me-4 ms-2 hidden sm:block text-[#0E1726] dark:text-white rtl:rotate-y-180">
                            <IconArrowWaveLeftUp className="w-16 xl:w-28" />
                        </div>
                        <div className="mb-2 text-center text-2xl font-bold dark:text-white md:text-5xl">FAQs</div>
                    </div>
                    <p className="mb-9 text-center text-base font-semibold">Search instant answers & questions asked by popular users</p>
                    <form action="" method="" className="mb-6">
                        <div className="relative mx-auto max-w-[580px]">
                            <input type="text" placeholder="Ask a question" className="form-input py-3 ltr:pr-[100px] rtl:pl-[100px]" />
                            <button type="button" className="btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1">
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5">
                        <div className="whitespace-nowrap font-medium text-black dark:text-white">Popular topics :</div>
                        <div className="flex items-center justify-center gap-2 sm:gap-5">
                            <Link to="#" className="duration-300 hover:underline">
                                Konkrete Kinlkers
                            </Link>
                            <Link to="#" className="duration-300 hover:underline">
                                Facades
                            </Link>
                            <Link to="#" className="duration-300 hover:underline">
                                Iron Smith
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]">
                <ul className="mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8">
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'general' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <IconDesktop fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Konkrete Kinkers</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'quick-support' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('quick-support')}
                    >
                        <IconUser fill={true} className="w-8 h-8" />

                        <h5 className="font-bold text-black dark:text-white">Iron Smith</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'free-updates' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('free-updates')}
                    >
                        <IconBox fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Facades</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'pricing' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        <IconDollarSignCircle fill={true} />

                        <h5 className="font-bold text-black dark:text-white">User Permission</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'hosting' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('hosting')}
                    >
                        <IconRouter fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Analytics</h5>
                    </li>
                </ul>
            </div>
            <h3 className="mb-8 text-center text-xl font-semibold md:text-2xl">
                Frequently asked <span className="text-primary">questions</span>
            </h3>
            <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">General topics?</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 1 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 1 ? null : 1)}
                            >
                                <span>How to give the user permission?</span>
                                {active1 !== 1 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 2 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 2 ? null : 2)}
                            >
                                <span> Tell me about the cycle of Job order and production planning?</span>
                                {active1 !== 2 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
addition of dates  in job order will help the DPR.
creation of individual DPR.

                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 3 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 3 ? null : 3)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active1 !== 3 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === 5 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive1(active1 === 5 ? null : 5)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active1 !== 5 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active1 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-white dark:bg-black">
                    <div className="border-b border-white-light p-6 text-[22px] font-bold dark:border-dark dark:text-white">Quick support & Free update</div>
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 1 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 1 ? null : 1)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active2 !== 1 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 1 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 2 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 2 ? null : 2)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active2 !== 2 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 2 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 3 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 3 ? null : 3)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active2 !== 3 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 3 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                        <div>
                            <div
                                className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active2 === 5 ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                onClick={() => setActive2(active2 === 5 ? null : 5)}
                            >
                                <span> Lorem ipsum dolor sit amet.?</span>

                                {active2 !== 5 ? (
                                    <span className="shrink-0">
                                        <IconPlusCircle duotone={false} />
                                    </span>
                                ) : (
                                    <span className="shrink-0">
                                        <IconMinusCircle fill={true} />
                                    </span>
                                )}
                            </div>
                            <AnimateHeight duration={300} height={active2 === 5 ? 'auto' : 0}>
                                <div className="px-1 py-3 font-semibold text-white-dark">
                                    <p>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                        Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                        beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </p>
                                </div>
                            </AnimateHeight>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
                {/* Animated */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Software Folder Structure</h5>
                      
                    </div>
                    <div className="mb-5">
                        <ul className="font-semibold">
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('css') ? 'active' : ''}`} onClick={() => toggleTreeview1('css')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('css') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Dashboard
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('css') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Main
                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Konkrete Klinkers
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('images') ? 'active' : ''}`} onClick={() => toggleTreeview1('images')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('images') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Konkrete Klinkers
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('images') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Work Order                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Job Order
                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Daily Production report
                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            QC Check                                        </li>
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Packing                                   </li>
                                            <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Dispatch                                   </li>
                                            <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Inventory                                   </li>
                                            <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Buffer Stock Management                                   </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('helpers') ? 'active' : ''}`} onClick={() => toggleTreeview1('helpers')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('helpers') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Helpers
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('helpers') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <button type="button" className={`${pagesSubMenu ? 'open' : ''} `} onClick={() => setPagesSubMenu(!pagesSubMenu)}>
                                                <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('pages') && 'rotate-180'}`} />
                                                <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                Plants
                                            </button>
                                            <AnimateHeight duration={300} height={pagesSubMenu ? 'auto' : 0}>
                                                <ul className="ltr:pl-14 rtl:pr-14">
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                                        Plants
                                                    </li>
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
Factories                                                    </li>
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
Machines                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        <li className="py-[5px]">
                                            <button type="button" className={`${pagesSubMenu ? 'open' : ''} `} onClick={() => setPagesSubMenu(!pagesSubMenu)}>
                                                <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('pages') && 'rotate-180'}`} />
                                                <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                                Clients
                                            </button>
                                            <AnimateHeight duration={300} height={pagesSubMenu ? 'auto' : 0}>
                                                <ul className="ltr:pl-14 rtl:pr-14">
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                                        Clients
                                                    </li>
                                                    <li className="py-[5px]">
                                                        <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
Projects                                                    </li>
                                                  
                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                        {/* <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            file name
                                        </li>
                                        <li className="py-[5px] ltr:pl-8 rtl:pr-8">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            file name
                                        </li> */}
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('user') ? 'active' : ''}`} onClick={() => toggleTreeview1('user')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('user') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Users
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('user') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            User
                                        </li>
                                       
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <li className="py-[5px]">
                                <button type="button" className={`${treeview1.includes('user') ? 'active' : ''}`} onClick={() => toggleTreeview1('faq')}>
                                    <IconCaretDown className={`w-5 h-5 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${treeview1.includes('faq') && 'rotate-180'}`} />
                                    <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                                    Faqs
                                </button>
                                <AnimateHeight duration={300} height={treeview1.includes('faq') ? 'auto' : 0}>
                                    <ul className="ltr:pl-14 rtl:pr-14">
                                        <li className="py-[5px]">
                                            <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                            Faq
                                        </li>
                                       
                                    </ul>
                                </AnimateHeight>
                            </li>
                            {/* <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                index.html
                            </li>
                            <li className="py-[5px] ltr:pl-7 rtl:pr-7">
                                <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                                components.html
                            </li> */}
                        </ul>
                    </div>

                </div>
            </div>

            <div className="panel mt-10 text-center md:mt-20">
                <h3 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">Still need help?</h3>
                <div className="text-lg font-medium text-white-dark">
                    Our backend team at Kods are always happy to help. Contact us during standard business hours or email us24/7 and we'll get back to you.
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button type="button" className="btn btn-primary">
                        New Contact Form Coming Soon...
                    </button>
                    {/* <button type="button" className="btn btn-primary">
                        Visit our community
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Faq;
