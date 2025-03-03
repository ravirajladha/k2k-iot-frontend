import { useState, Fragment, useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import IconEdit from '@/components/Icon/IconEdit';
import IconEye from '@/components/Icon/IconEye';
import IconTrash from '@/components/Icon/IconTrash';



// import IconX from '@/components/Icon/IconX';
import IconUserPlus from '@/components/Icon/IconUserPlus';
import IconListCheck from '@/components/Icon/IconListCheck';
import IconLayoutGrid from '@/components/Icon/IconLayoutGrid';
import IconSearch from '@/components/Icon/IconSearch';
import IconUser from '@/components/Icon/IconUser';
import IconFacebook from '@/components/Icon/IconFacebook';
import IconInstagram from '@/components/Icon/IconInstagram';
import IconLinkedin from '@/components/Icon/IconLinkedin';
import IconTwitter from '@/components/Icon/IconTwitter';
import IconX from '@/components/Icon/IconX';
// import { useNavigate } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Users'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        employeeCode: '',
        role: '',
        location: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([
        {
            id: 1,
            path: 'profile-35.png',
            name: 'lorem epsum',
            role: 'Admin',
            employeeCode: 'EMP123',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 2,
            path: 'profile-35.png',
            name: 'lorem epsum',
            role: 'Admin',
            employeeCode: 'EMP123',

            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 3,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 4,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 5,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 6,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 7,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 8,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 9,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 10,
            path: 'profile-35.png',
            name: 'lorem epsum',
            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 11,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 12,
            path: 'profile-35.png',
            name: 'lorem epsum',
            role: 'Admin',
            employeeCode: 'EMP123',

            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },
        {
            id: 13,
            path: 'profile-35.png',
            name: 'lorem epsum',
            employeeCode: 'EMP123',

            role: 'Admin',
            email: 'k2k@gmail.com',
            location: 'Mg Road, India',
            phone: '+91 8986 00 XX XX',

        },

    ]);

    const navigate = useNavigate();


    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const saveUser = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.employeeCode) {
            showMessage('Employee Code is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Role is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.email = params.email;
            user.phone = params.phone;
            user.employeeCode = params.employeeCode;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                employeeCode: params.employeeCode,
                phone: params.phone,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
    };

    const editUser = (user = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            const json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        // setAddContactModal(true);
        navigate('/users/edit');
    };

    const addUser = (user = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            const json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
        // navigate('/users/edit');
    };
    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Users</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => addUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add User
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Users" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Employee Code</th>

                                    <th>Factory</th>
                                    <th>Location</th>
                                    <th>Phone</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    {contact.path && (
                                                        <div className="w-max">
                                                            <img src={`/assets/images/${contact.path}`} className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2" alt="avatar" />
                                                        </div>
                                                    )}
                                                    {!contact.path && contact.name && (
                                                        <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                    )}
                                                    {!contact.path && !contact.name && (
                                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                            <IconUser className="w-4.5 h-4.5" />
                                                        </div>
                                                    )}
                                                    <div>{contact.name}</div>
                                                </div>
                                            </td>
                                            <td>{contact.email}</td>
                                            <td>{contact.employeeCode}</td>

                                            <td>{"Konkrete Klinkers"}</td>
                                            <td>{"Super Admin"}</td>

                                            <td className="whitespace-nowrap">{contact.location}</td>
                                            <td className="whitespace-nowrap">{contact.phone}</td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <Link to="/users/profile">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" >
                                                        <IconEye className="w-4.5 h-4.5" />

                                                        </button>
                                                    </Link>
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
                                                    <IconEdit className="w-4.5 h-4.5" />

                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                                    <IconTrash className="w-4.5 h-4.5" />

                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
                    {filteredItems.map((contact: any) => {
                        return (
                            <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative" key={contact.id}>
                                <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                                    <div
                                        className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                                        style={{
                                            backgroundImage: `url('/assets/images/notification-bg.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <img className="object-contain w-4/5 max-h-40 mx-auto" src={`/assets/images/${contact.path}`} alt="contact_image" />
                                    </div>
                                    <div className="px-6 pb-24 -mt-10 relative">
                                        <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                            <div className="text-xl">{contact.name}</div>
                                            <div className="text-white-dark">
                                                <div className="flex justify-between">
                                                    <span className="font-bold">Factory:</span>
                                                    <span>Konkrete Klinkers</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-bold">Role:</span>
                                                    <span>{contact.role}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-bold">Employee Code:</span>
                                                    <span>{contact.employeeCode}</span>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                                <div className="truncate text-white-dark">{contact.email}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                                <div className="text-white-dark">{contact.phone}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-none ltr:mr-2 rtl:ml-2">Address :</div>
                                                <div className="text-white-dark">{contact.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                                        <Link to="/users/profile" className="w-1/4">
                                            <button type="button" className="btn btn-outline-primary w-full">
                                            <IconEye className="w-4.5 h-4.5" />

                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary w-1/4"
                                            onClick={() => editUser(contact)}
                                        >
                                            <IconEdit className="w-4.5 h-4.5" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger w-1/3"
                                            onClick={() => deleteUser(contact)}
                                        >
                                            
                                            <IconTrash className="w-4.5 h-4.5" />

                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Contact' : 'Add user'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Employee Code</label>
                                                <input id="employeeCode" type="text" placeholder="Enter Employee Code" className="form-input" value={params.employeeCode} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="role">Factory</label>
                                                <select
                                                    id="role"
                                                    className="form-input"
                                                    value={params.role}
                                                    onChange={(e) => changeValue(e)}
                                                >
                                                    <option value="">Select Factory</option>
                                                    <option value="admin">Konkrete Klinkers</option>
                                                    <option value="operator">Falcon Facades</option>
                                                    <option value="subadmin">Iron Smith</option>

                                                </select>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="role">Role</label>
                                                <select
                                                    id="role"
                                                    className="form-input"
                                                    value={params.role}
                                                    onChange={(e) => changeValue(e)}
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="operator">Operator</option>
                                                    <option value="subadmin">Subadmin</option>
                                                    <option value="planthead">Planthead</option>
                                                </select>
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="address">Address</label>
                                                <textarea
                                                    id="location"
                                                    rows={3}
                                                    placeholder="Enter Address"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.location}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Users;
