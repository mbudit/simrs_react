import {
    FaBell,
    FaBook,
    FaCalendar,
    FaChartLine,
    FaCog,
    FaEnvelope,
    FaFile,
    FaHome,
    FaQuestionCircle,
    FaUser,
    FaSearch,
    FaHeart,
    FaStar,
    FaWheelchair,

} from "react-icons/fa";

export const menuItems = [
    {
        routerLink: "home", 
        icon: <FaHome />, 
        text: "Home" 
    },
    {
        routerLink: "profile", 
        icon: <FaUser />, 
        text: "Profile" 
    },
    {
        routerLink: "rawatjalan", 
        icon: <FaWheelchair />, 
        text: "Rawat Jalan" 
    },
    {
        routerLink: "messages", 
        icon: <FaEnvelope />, 
        text: "Messages" 
    },
    {
        routerLink: "notifications", 
        icon: <FaBell />, 
        text: "Notifications" 
    },
    {
        routerLink: "analytics", 
        icon: <FaChartLine />, 
        text: "Analytics" 
    },
    {
        routerLink: "calendar", 
        icon: <FaCalendar />, 
        text: "Calendar" 
    },
    {
        routerLink: "library", 
        icon: <FaBook />, 
        text: "Library" 
    },
    {
        routerLink: "documents", 
        icon: <FaFile />, 
        text: "Documents" 
    },
    {
        routerLink: "search", 
        icon: <FaSearch />, 
        text: "Search" 
    },
    {
        routerLink: "favorites", 
        icon: <FaHeart />, 
        text: "Favorites" 
    },
    {
        routerLink: "starred", 
        icon: <FaStar />, 
        text: "Starred" 
    },
    {
        routerLink: "help", 
        icon: <FaQuestionCircle />, 
        text: "Help" 
    },
]

