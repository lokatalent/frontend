// components/TopNav.tsx
// To navigate if needed
import PopoverExample from "./ui/gen/PopOver";
import NotificationsDropdown from "./nav/NotificationPopover";
// import profilePic from '@/assets/images/success.png'

const TopNav = () => {
  const username = "John Doe";
  return (
    <nav className="w-full bg-white p-3 shadow-lg flex justify-between items-center">
      {/* Logo or Brand */}
      <div className=" text-xl font-bold"></div>

      {/* Right Side: Notification Bell and User Profile */}
      <div className="flex items-center space-x-6 mr-8">
        {/* Notification Bell */}
        <NotificationsDropdown />

        <div className="h-10 w-[1px] bg-black"></div>

        {/* User Profile */}
        
          <PopoverExample username={username} />

      </div>
    </nav>
  );
};

export default TopNav;
