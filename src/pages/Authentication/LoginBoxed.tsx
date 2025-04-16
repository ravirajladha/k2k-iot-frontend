import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '@/store/slices/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { loginUser } from '@/store/slices/authSlice';
import { AppDispatch, IRootState } from '@/store/store';
import { useAppDispatch } from '@/store/hooks';
import withAuthRedirect from '@/utils/withAuthRedirect';
import { isTokenValid } from '@/utils/isTokenValid';
const LoginCover = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { isLoading, error, isAuthenticated, user } = useSelector((state: IRootState) => state.auth);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Starting login...');
        dispatch(loginUser({ username, password }));
    };

    // Check token validity
    const token = user?.accessToken || null;
    const tokenIsValid = isTokenValid(token);
    console.log('checking login error:', error);
    console.log('Current loading state:', isLoading);
    console.log('Current authentication state:', isAuthenticated);
    console.log('Token is valid:', tokenIsValid);
    console.log('Current loading state:', isLoading);
    // Current authentication state
    console.log('Current authentication state:', isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            setShowSuccessMessage(true);
            console.log('Redirecting to dashboard after successful login...');
            // addAlert('Welcome! Your account has been created successfully.', 'success');
            // navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);
    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/3234129.jpg" alt="Background" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="Decorative" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="Decorative" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="Decorative" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="Decorative" className="absolute bottom-0 end-[28%]" />

                <div className="relative w-full max-w-[870px] rounded-md p-2 bg-[linear-gradient(45deg,#E9F7EF_0%,rgba(233,247,239,0.5)_50%,rgba(233,247,239,0)_100%)] dark:bg-[linear-gradient(45deg,#0F3D3E_0%,rgba(15,61,62,0.5)_50%,rgba(15,61,62,0)_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        {/* Logo Image */}
                        <div className="flex justify-center mb-10">
                            <img src="/k2k_iot_logo.jfif" alt="Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                        </div>

                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-success md:text-4xl">Login Page</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>

                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Username">Username</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setUsername(e.target.value)}
                                            id="Username"
                                            type="text"
                                            placeholder="Enter Username"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                {error && <div className="alert text-danger">{error}</div>}

                                {/* <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Subscribe to weekly newsletter</span>
                                    </label>
                                </div> */}
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuthRedirect(LoginCover);
