
import { time } from "console";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdHome, IoIosListBox } from "react-icons/io";
import { MdEditSquare, MdNewspaper, MdAutoFixHigh } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import AddressRepairman from "@/pages/members/AddressRepairman";
import LoginModal from "@/pages/login";


interface SubmenuItem {
    href: string;
    text: string;
}

interface MenuItem {
    href: string;
    text: string;
    icon: JSX.Element;
    submenu?: SubmenuItem[];
}

interface SidenavProps {
    openSidebar: () => void;
}

const SideNav: React.FC<SidenavProps> = ({ openSidebar }) => {
    // Menu Sidebar
    const navigationItems: MenuItem[] = [
        { href: '/', text: 'Home', icon: <IoMdHome /> },
        { href: '/members', text: 'Members', icon: <FaUserCog /> },
        { href: '/appointment', text: 'Appointments', icon: <IoIosListBox /> },
        { href: '/order', text: 'Oders', icon: <TbClipboardList /> },
        { href: '/products', text: 'Products', icon: <FaProductHunt /> },
        { href: '/editAboutPages', text: 'About Pages', icon: <MdAutoFixHigh /> },
        { href: '/editNews', text: 'Edit News', icon: <MdNewspaper /> },
        { href: '/editBlog', text: 'Edit Blog', icon: <MdEditSquare /> },
    ];

    // open Sidebar
    const [isMaxSidebar, setIsMaxSidebar] = useState(true);
    const openNav = () => {
        setIsMaxSidebar((prev) => !prev);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const router = useRouter();

    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้ใน Cookies
        Cookies.remove('user');

        // ทำการ redirect หน้าไปที่หน้า login หรือหน้าที่คุณต้องการ
        router.push('/login');
        // รีเฟซหน้าจอ
        window.location.reload();
    };
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const openAddModal = () => {
        setAddModalOpen(true);
    };

    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            const userDataFromCookies = Cookies.get('user');
            if (userDataFromCookies) {
                const parsedUser = JSON.parse(userDataFromCookies);
                console.log(parsedUser); // ตรวจสอบข้อมูลผู้ใช้ใน console
                setLoggedInUser(parsedUser);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const sidebar = document.querySelector("aside");
        const maxSidebar = document.querySelector(".max");
        const miniSidebar = document.querySelector(".mini");
        const maxToolbar = document.querySelector(".max-toolbar");
        const logo = document.querySelector('.logo');
        const content = document.querySelector('.content');

        if (!sidebar || !maxSidebar || !miniSidebar || !maxToolbar || !logo || !content) {
            // Handle cases where elements are not found
            return;
        }

        if (!isMaxSidebar) {
            // mini sidebar
            sidebar.classList.add("-translate-x-48");
            sidebar.classList.remove("translate-x-none");
            maxSidebar.classList.add("hidden");
            maxSidebar.classList.remove("flex");
            miniSidebar.classList.add("flex");
            miniSidebar.classList.remove("hidden");
            maxToolbar.classList.add("translate-x-24", "scale-x-0");
            maxToolbar.classList.remove("translate-x-0");
            logo.classList.add('ml-12');
            content.classList.remove("ml-12", "md:ml-60");
            content.classList.add("ml-12");
        } else {
            // max sidebar
            sidebar.classList.remove("-translate-x-48");
            sidebar.classList.add("translate-x-none");
            maxSidebar.classList.remove("hidden");
            maxSidebar.classList.add("flex");
            miniSidebar.classList.remove("flex");
            miniSidebar.classList.add("hidden");
            maxToolbar.classList.add("translate-x-0");
            maxToolbar.classList.remove("translate-x-24", "scale-x-0");
            logo.classList.remove("ml-12");
            content.classList.remove("ml-12");
            content.classList.add("ml-12", "md:ml-60");
        }
    }, [isMaxSidebar]);



    return (
        <>

            <div className="fixed w-full z-30 flex bg-white p-2 items-center justify-center h-16 px-10">
                <div className="logo ml-8 md:ml-14 text-black font-bold transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
                    MNR - Dashboard
                </div>
                {/* <!-- SPACER --> */}
                <div className="grow h-full flex items-center justify-center"></div>

                <div className="flex-none h-full text-center flex items-center justify-center">

                    {loggedInUser ? (
                        <Link href={"#"} >
                            <div className="flex space-x-3 items-center px-3">
                                <div className="flex-none flex justify-center">
                                    <div className="w-8 h-8 flex ">
                                        <button onClick={openAddModal} className="bg-[#1E293B] text-white py-0.5 px-1.5 md:py-1.5 md:px-3 text-xs md:text-sm font-semibold rounded-full"
                                        >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU" alt="profile" className="shadow rounded-full object-cover" />
                                        </button>
                                        <AddressRepairman isAddModalOpen={isAddModalOpen} onClose={closeAddModal} />
                                    </div>
                                </div>

                                <div className="hidden md:block text-sm md:text-base text-black dark:text-white" onClick={openAddModal}>{loggedInUser.fname} {loggedInUser.lname} </div>
                                {/* Display other user information as needed */}
                                <div>
                                    <h1>Welcome, {loggedInUser.Address.district}!</h1>

                                </div>
                                {/*  */}
                                <button className="">
                                    <div className="flex space-x-3 items-center px-3">
                                        <Link href="./login" className="hidden md:block text-sm md:text-base text-black dark:text-white" onClick={handleLogout}>ออกจากระบบ</Link>
                                    </div>
                                </button>
                            </div>
                        </Link >
                    ) : (
                        <div className="flex space-x-3 items-center px-3">
                            <button className="" onClick={openAddModal}>
                                <div className="flex space-x-3 items-center px-3">
                                    เข้าสู่ระบบ
                                </div>
                                <LoginModal isAddModalOpen={isAddModalOpen} onClose={closeAddModal} />

                            </button>

                        </div>
                    )}

                </div>
            </div>

            <aside className={`w-60 md:w-64 ${isMaxSidebar ? '' : '-translate-x-48'} fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]`}>
                {/* <!-- open sidebar button --> */}
                <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12">
                    <div className="flex pl-4 items-center space-x-2">
                        <div >
                            <div className="moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            </div>
                            <div className="sun hidden text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                            </div>
                        </div >
                    </div>
                    <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-1 py-1 rounded-full text-white">
                        <div className="transform ease-in-out duration-300 mr-11 md:mr-12 font-bold text-sm md:text-base">
                            MNR - Dashboard
                        </div>
                    </div>
                </div>
                <div onClick={openNav} className="-right-7 md:-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                </div>

                {/* <!-- MAX SIDEBAR--> */}
                <div className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] text-sm md:text-base">
                    {navigationItems.map((item, index) => (
                        <div
                            key={index}
                            className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                            {item.icon}
                            <Link href={item.href}>
                                {item.text}
                            </Link>
                        </div>
                    ))}
                </div>


                {/* <!-- MINI SIDEBAR--> */}
                <div className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
                    {navigationItems.map((item, index) => (
                        <div key={index} className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                            <Link href={item.href}>{item.icon}</Link>
                        </div>
                    ))}
                </div>

            </aside>
        </>
    )
}
export default SideNav;