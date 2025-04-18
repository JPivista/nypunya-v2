import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaTimes, FaBars, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import { serviceSubmenu, submenuItems } from "../../../utils/navBarData";


const DesktopNavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredSubservice, setHoveredSubservice] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubservice, setSelectedSubservice] = useState(null);
    const [selectedSubmenuItem, setSelectedSubmenuItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 180);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const isActive = (path) => location.pathname === path;

    const isSubmenuItemActive = (service, item) => {
        if (item === "Transformation") {
            return (
                location.pathname === "/gallery" &&
                location.state?.category === service.name
            );
        } else {
            return (
                location.pathname === service.path &&
                location.state?.scrollTo === item.toLowerCase().replace(/\s+/g, "-")
            );
        }
    };

    const isSubserviceActive = (service) => {
        return submenuItems.some((item) => isSubmenuItemActive(service, item));
    };

    const isCategoryActive = (category) => {
        return category.subservices.some((service) => isSubserviceActive(service));
    };
    const isServicesMenuActive = () => {
        return serviceSubmenu.some((category) =>
            category.subservices.some((service) =>
                submenuItems.some((item) =>
                    item !== "Transformation" && isSubmenuItemActive(service, item)
                )
            )
        );
    };


    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md top-0 px-6" : "bg-transparent top-2"}`}>
            {/* Top Contact Bar */}
            <div className={`w-[90%] flex justify-between mx-auto ${isScrolled ? "hidden" : "flex"}`}>
                <div className="flex gap-3 text-white">
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        <a href="mailto:clinic.nypunyaaesthetic@gmail.com" className="hidden md:inline">
                            clinic.nypunyaaesthetic@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center">
                        <FaPhoneAlt className="mr-2" />
                        <a href="tel:+918136822727" className="hidden md:inline">+91 813 682 2727</a>
                        <a href="tel:+919778412980" className="hidden md:inline">, +91 977 841 2980</a>
                    </div>
                </div>
                <button className="bg-[#92E0E0] text-black px-4 py-2 rounded-xl rounded-bl-none rounded-br-none flex items-center">
                    <FaCalendarAlt className="mr-2 text-black" />
                    Appointments
                </button>
            </div>
            {/* Main Navbar */}
            <div className={`h-1/20 transition-all duration-300 mx-auto flex md:justify-center justify-between ${isScrolled ? "bg-white w-full" : "bg-white w-[90%] rounded-3xl rounded-t-none md:px-6"}`}>
                <div className="w-[90%] mx-auto flex justify-between items-center md:p-4 p-2 h-full">
                    <div className="text-xl font-bold">
                        <Link to="/" >
                            <img src="/site-logo.svg" alt="Nypunya Logo" className="md:w-[100%]" />
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:items-center">
                        <ul className="flex space-x-6">
                            <li><Link to="/" className={`${isActive("/") ? "text-[#92E0E0] font-bold " : "text-gray-800"}`}>Home</Link></li>
                            <li><Link to="/about-us" className={`${isActive("/about-us") ? "text-[#92E0E0] font-bold " : "text-gray-800"}`}>About Us</Link></li>

                            {/* SERVICES MENU */}
                            <li
                                className="relative"
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => {
                                    setIsServicesOpen(false);
                                    setHoveredCategory(null);
                                    setHoveredSubservice(null);
                                }}
                            >
                                <Link to="/services" className={`${isActive("/services") || isServicesMenuActive() ? "text-[#92E0E0] font-bold" : "text-gray-800"} flex items-center cursor-pointer gap-1`}>
                                    Services <FaChevronDown className="text-sm mt-[1px]" />
                                </Link>

                                {isServicesOpen && (
                                    <div className="absolute top-full left-0  bg-white shadow-lg rounded-md py-4 px-4 z-50 w-64">
                                        <ul>
                                            {serviceSubmenu.map((category, idx) => (
                                                <li
                                                    key={idx}
                                                    className="relative"
                                                    onMouseEnter={() => setHoveredCategory(category.category)}
                                                >
                                                    <div
                                                        className={`flex justify-between items-center w-full px-4 py-2 m-1 hover:bg-[#92E0E0] rounded cursor-pointer ${isCategoryActive(category) ? "text-gray-800 bg-[#92E0E0]" : "text-gray-800"
                                                            }`}
                                                    >
                                                        <span className="font-medium">{category.category}</span>
                                                        <FaChevronRight className="text-sm text-gray-500" />
                                                    </div>

                                                    {hoveredCategory === category.category && (
                                                        <div className="absolute top-0 left-full ml-2 bg-white shadow-lg rounded-md p-4 w-72 z-50">
                                                            <ul className="space-y-2">
                                                                {category.subservices.map((service, subIdx) => (
                                                                    <li
                                                                        key={subIdx}
                                                                        className="relative"
                                                                        onMouseEnter={() => setHoveredSubservice(service.name)}
                                                                        onMouseLeave={() => setHoveredSubservice(null)}
                                                                    >
                                                                        <div
                                                                            className={`px-3 py-2 rounded-md font-medium flex justify-between items-center ${isSubserviceActive(service)
                                                                                ? "text-gray-800 bg-[#92E0E0]"
                                                                                : "text-gray-800 hover:bg-[#92E0E0]"
                                                                                }`}
                                                                        >
                                                                            {service.name}
                                                                            <FaChevronRight className="text-xs ml-2" />
                                                                        </div>

                                                                        {hoveredSubservice === service.name && (
                                                                            <ul className="mt-1 bg-gray-50 border border-gray-200 rounded-md p-2 ml-4">
                                                                                {submenuItems.map((item, i) => (
                                                                                    <li key={i}>
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                setSelectedCategory(category.category);
                                                                                                setSelectedSubservice(service.name);
                                                                                                setSelectedSubmenuItem(item);
                                                                                                setIsServicesOpen(false);
                                                                                                setHoveredCategory(null);
                                                                                                setHoveredSubservice(null);

                                                                                                if (item === "Transformation") {
                                                                                                    navigate("/gallery", {
                                                                                                        state: { category: service.name },
                                                                                                    });
                                                                                                } else {
                                                                                                    navigate(service.path, {
                                                                                                        state: {
                                                                                                            scrollTo: item.toLowerCase().replace(/\s+/g, "-"),
                                                                                                        },
                                                                                                    });
                                                                                                }
                                                                                            }}
                                                                                            className={`block px-2 py-1 text-sm w-full text-left ${isSubmenuItemActive(service, item)
                                                                                                ? "text-[#92E0E0] font-semibold"
                                                                                                : "text-gray-700 hover:text-[#92E0E0]"
                                                                                                }`}
                                                                                        >
                                                                                            {item}
                                                                                        </button>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li><Link to="/our-doctors" className={`${isActive("/our-doctors") ? "text-[#92E0E0] font-bold" : "text-gray-800"}`}>Our Doctors</Link></li>
                            <li><Link to="/gallery" className={`${isActive("/gallery") ? "text-[#92E0E0] font-bold" : "text-gray-800"}`}>Gallery</Link></li>
                            <li><Link to="/contact-us" className={`${isActive("/contact-us") ? "text-[#92E0E0] font-bold" : "text-gray-800"}`}>Contact Us</Link></li>
                            <li><Link to="/blogs" className={`${isActive("/blogs") ? "text-[#92E0E0] font-bold" : "text-gray-800"}`}>Blog</Link></li>
                        </ul>
                    </nav>
                    {/* Hamburger Icon (Visible only on mobile) */}
                    <div className="md:hidden p-2 flex justify-between items-center shadow-sm">
                        <button
                            className="text-gray-800 z-10"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <FaBars size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileNavBar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
        </header>
    );
};

export default DesktopNavBar;
