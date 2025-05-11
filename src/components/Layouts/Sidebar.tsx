import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '@/store/slices/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store/store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconFolderPlus from "@/components/Icon/IconFolderPlus";
// import IconMenuDashboard from "@/components/Icon/Menu/IconMenuDashboard";

import Iconusers from "@/components/Icon/IconUsers";
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [currentSubMenu, setCurrentSubMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setCurrentMenu((prevMenu) => (prevMenu === menu ? null : menu));
        setCurrentSubMenu(null); // Close any open submenus when switching main menu
    };

    const toggleSubMenu = (subMenu: string) => {
        setCurrentSubMenu((prevSubMenu) => (prevSubMenu === subMenu ? null : subMenu));
    };

    const falconFacadeBasePath = "/falcon-facade"; // Change this value to switch environments

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300  ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className=" dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            {/* <img className="w-8 ml-[5px] flex-none" src="/k2k_iot_logo.jfif" alt="logo" /> */}
                            <img className="w-8 ml-[5px] flex-none" src="/k2k_iot_logo.jfif" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('K2K-IOT')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard
                                            className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/overallDashboard">{t('Overall')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/">{t('Konkrete Klinkers')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/">{t('Iron Smith')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/">{t('Falcon Facade')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Falcon Facade')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/work-orders`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Work Order')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/work-order`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Job Order')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/job-order`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Internal Work Order')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    {/* <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/production`}className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Production')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/productionNew`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Production ')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    {/* <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/production-planning-new/view`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Production')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                    {/* <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/qc-check/view`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('QC Check')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/packing`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Packing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/dispatch`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Dispatch')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/qc-check`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('QC Check')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink
                                            to={`${falconFacadeBasePath}/dispatch/invoice/view`}
                                            state={{
                                                dispatchData: {
                                                    workOrderNumber: 'WO101',
                                                    clientName: 'Client A',
                                                    projectName: 'Project X',
                                                    productId: 'Product A',
                                                    uom: 'Box',
                                                    dispatchQuantity: 10,
                                                    invoiceSto: 'INV-12345',
                                                    vehicleNumber: 'KA-01-1234',
                                                },
                                            }}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">
                                                    {t('Dispatch Invoice')}
                                                </span>
                                            </div>
                                        </NavLink>

                                    </li> */}
                                    {/*
                                    <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/inventories`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Inventory')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                    {/* <li className="nav-item">
                                        <NavLink to="/iron-smith/stockManagement" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Buffer Stock Management')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                     */}

                                    {/* <li className="nav-item">
                                        <NavLink to={`${falconFacadeBasePath}/products`} className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Products')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <button
                                    type="button"
                                    className={`${currentMenu === 'helpers' ? 'active' : ''} nav-link group w-full`}
                                    onClick={() => toggleMenu('helpers')}
                                >
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            {t('Master Data')}
                                        </span>
                                    </div>
                                    <div className={currentMenu !== 'helpers' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'helpers' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">

                                        {/* Clients Submenu */}
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${currentSubMenu === 'clients' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => toggleSubMenu('clients')}
                                            >
                                                <div className="flex items-center">
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">
                                                        {t('Master Clients')}
                                                    </span>
                                                </div>
                                                <div className={currentSubMenu !== 'clients' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentSubMenu === 'clients' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 pl-6"> {/* Added padding for nested items */}
                                                    <li>
                                                        <NavLink to={`${falconFacadeBasePath}/clients`}>{t('Clients')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={`${falconFacadeBasePath}/projects`}>{t('Projects')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        {/* Products Submenu */}
                                        <li className="menu nav-item">
                                            <button
                                                type="button"
                                                className={`${currentSubMenu === 'products' ? 'active' : ''} nav-link group w-full`}
                                                onClick={() => toggleSubMenu('products')}
                                            >
                                                <div className="flex items-center">
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">
                                                        {t('Master Products')}
                                                    </span>
                                                </div>
                                                <div className={currentSubMenu !== 'products' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentSubMenu === 'products' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500 pl-6"> {/* Added padding for nested items */}
                                                    <li>
                                                        <NavLink to={`${falconFacadeBasePath}/systems`}>{t('Systems')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={`${falconFacadeBasePath}/product-systems`}>{t('Product System')}</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={`${falconFacadeBasePath}/products`}>{t('Products')}</NavLink>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Konkrete Klinkers')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/work-order" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Work Order')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/job-order/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Job Order / Planning')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/production-planning/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Prdouction')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/production-planning-new/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Production')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/qc-check/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('QC Check')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/packing/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Packing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/dispatch/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Dispatch')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink
                                            to="/konkrete-klinkers/dispatch/invoice/view"
                                            state={{
                                                dispatchData: {
                                                    workOrderNumber: 'WO101',
                                                    clientName: 'Client A',
                                                    projectName: 'Project X',
                                                    productId: 'Product A',
                                                    uom: 'Box',
                                                    dispatchQuantity: 10,
                                                    invoiceSto: 'INV-12345',
                                                    vehicleNumber: 'KA-01-1234',
                                                },
                                            }}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">
                                                    {t('Dispatch Invoice')}
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/inventories" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Inventory')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/konkrete-klinkers/stockManagement" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Stock Management')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* IconMenuTodo */}

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'page' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('page')}>
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('pages')}</span>
                                            </div>

                                            <div className={currentMenu !== 'page' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'page' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">


                                                <li>
                                                    <NavLink to="/pages/coming-soon-cover" target="_blank">
                                                        {t('coming_soon_cover')}
                                                    </NavLink>
                                                </li>
                                                <li className="menu nav-item">
                                                    <button
                                                        type="button"
                                                        className={`${errorSubMenu ? 'open' : ''
                                                            } w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900`}
                                                        onClick={() => setErrorSubMenu(!errorSubMenu)}
                                                    >
                                                        {t('error')}
                                                        <div className={`${errorSubMenu ? 'rtl:rotate-90 -rotate-90' : ''} ltr:ml-auto rtl:mr-auto`}>
                                                            <IconCaretsDown fill={true} className="w-4 h-4" />
                                                        </div>
                                                    </button>
                                                    <AnimateHeight duration={300} height={errorSubMenu ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-500">
                                                            <li>
                                                                <a href="/pages/error404" target="_blank">
                                                                    {t('404')}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="/pages/error500" target="_blank">
                                                                    {t('500')}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="/pages/error503" target="_blank">
                                                                    {t('503')}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </AnimateHeight>
                                                </li>

                                                <li>
                                                    <NavLink to="/pages/maintenence" target="_blank">
                                                        {t('maintenence')}
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                    {/* new helpers section */}
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'ironSmithHelpers' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('ironSmithHelpers')}>
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Master Data')}</span>
                                            </div>
                                            <div className={currentMenu !== 'ironSmithHelpers' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'ironSmithHelpers' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">

                                                {/* Plants Submenu */}
                                                <li className="menu nav-item">
                                                    <button type="button" className={`${currentSubMenu === 'ironSmithPlants' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleSubMenu('ironSmithPlants')}>
                                                        <div className="flex items-center">
                                                            {/* <IconFolderPlus className="group-hover:!text-primary shrink-0" /> */}
                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Plants')}</span>
                                                        </div>
                                                        <div className={currentSubMenu !== 'ironSmithPlants' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                            <IconCaretDown />
                                                        </div>
                                                    </button>

                                                    <AnimateHeight duration={300} height={currentSubMenu === 'ironSmithPlants' ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-500">
                                                            <li><NavLink to="/konkrete-klinkers/plants">{t('Plants')}</NavLink></li>
                                                            <li><NavLink to="/konkrete-klinkers/machines">{t('Machines')}</NavLink></li>
                                                        </ul>
                                                    </AnimateHeight>
                                                </li>

                                                {/* Clients Submenu */}
                                                <li><NavLink to="/konkrete-klinkers/clients">{t('Clients')}</NavLink></li>
                                                <li><NavLink to="/konkrete-klinkers/projects">{t('Projects')}</NavLink></li>
                                                <li><NavLink to="/konkrete-klinkers/products">{t('Products')}</NavLink></li>




                                            </ul>
                                        </AnimateHeight>
                                    </li>


                                </ul>
                            </li>


                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Iron Smith')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/work-order" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Work Order')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/job-order/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Job Order / Planning')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/production-planning-new/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Production')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/qc-check/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('QC Check')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/packing/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Packing')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/dispatch/view" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Dispatch')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/iron-smith/dispatch/invoice/view"
                                            state={{
                                                dispatchData: {
                                                    workOrderNumber: 'WO101',
                                                    clientName: 'Client A',
                                                    projectName: 'Project X',
                                                    productId: 'Product A',
                                                    uom: 'Box',
                                                    dispatchQuantity: 10,
                                                    invoiceSto: 'INV-12345',
                                                    vehicleNumber: 'KA-01-1234',
                                                },
                                            }}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">
                                                    {t('Dispatch Invoice')}
                                                </span>
                                            </div>
                                        </NavLink>

                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/iron-smith/inventories" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Inventory')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    {/* <li className="nav-item">
                                        <NavLink to="/iron-smith/stockManagement" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Buffer Stock Management')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                     */}

                                    {/* <li className="nav-item">
                                        <NavLink to="/iron-smith/products" className="group">
                                            <div className="flex items-center">
                                                <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Products')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                </ul>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'helpers' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('helpers')}>
                                    <div className="flex items-center">
                                        <IconMenuPages className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Master Data')}</span>
                                    </div>
                                    <div className={currentMenu !== 'helpers' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'helpers' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">

                                        {/* Plants Submenu */}
                                        {/* <li className="menu nav-item">
                                            <button type="button" className={`${currentSubMenu === 'machines' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleSubMenu('machines')}>
                                                <div className="flex items-center"> */}
                                                    {/* <IconFolderPlus className="group-hover:!text-primary shrink-0" /> */}
                                                    {/* <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Machines')}</span>
                                                </div>
                                                <div className={currentSubMenu !== 'machines' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                    <IconCaretDown />
                                                </div>
                                            </button> */}

                                            {/* <AnimateHeight duration={300} height={currentSubMenu === 'machines' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500"> */}
                                                    {/* <li><NavLink to="/iron-smith/plants">{t('Plants')}</NavLink></li> */}
                                                    {/* <li><NavLink to="/iron-smith/machines">{t('Machines')}</NavLink></li>
                                                </ul>
                                            </AnimateHeight> */}
                                        {/* </li> */}


                                        <li><NavLink to="/iron-smith/machines">{t('Machines')}</NavLink></li>
                                        <li><NavLink to="/iron-smith/clients">{t('Clients')}</NavLink></li>
                                        <li><NavLink to="/iron-smith/projects">{t('Projects')}</NavLink></li>
                                        <li><NavLink to="/iron-smith/products">{t('Shapes')}</NavLink></li>



                                    </ul>
                                </AnimateHeight>
                            </li>




                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Users')}</span>
                            </h2>

                            <li className="nav-item">
                                <NavLink to="/users" className="group">
                                    <div className="flex items-center">
                                        <Iconusers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Users')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('Users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/users">{t('Users')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/users/profile">{t('Profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/users/edit">{t('Account Settings')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>








                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Help')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/faq" className="nav-link group">
                                    <div className="flex items-center">
                                        <IconMenuDocumentation className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#ffffff] dark:group-hover:text-primary">{t('FAQ')}</span>
                                    </div>
                                </NavLink>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
