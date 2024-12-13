// components/TopNav.tsx
import PopoverExample from "./nav/Menu";
import NotificationsDropdown from "./nav/NotificationPopover";

const TopNav = () => {
  const username = "John Doe";
  return (
    <nav className="w-full fixed top-0 z-10 left-0 bg-white h-[70px] shadow-lg flex justify-between items-center">
      {/* Logo or Brand */}
      <div className=" text-xl font-bold"></div>

      {/* Right Side: Notification Bell and User Profile */}
      <div className="flex items-center space-x-6 mr-8">
        {/* Notification*/}
        <NotificationsDropdown />

        <div className="h-10 w-[1px] bg-black"></div>

        {/* User Profile */}
        <PopoverExample username={username} />
      </div>
    </nav>
  );
};

export default TopNav;
