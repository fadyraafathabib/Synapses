import { useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import {
  Search,
  Bell,
  Mail,
  SlidersHorizontal,
  User,
  Heart,
  Briefcase,
  CircleCheckBig,
  Clock,
  RefreshCcw,
  Settings,

} from "lucide-react";
import { CiLogout } from "react-icons/ci";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// eslint-disable-next-line no-empty-pattern
export default function Header({}: { isOnMembershipPage?: boolean }) {
  const [, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname === "/membership" && path === "/membership") {
      // Scroll to pricing section instead of reloading
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
      setIsDropdownOpen(false);
      return;
    }

    navigate({ to: path });
    setIsDropdownOpen(false);
  };

  return (
    <header className="border-b border-primary-100 bg-gray-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src="/logo.png"
            alt="Synapses"
            className="h-15 w-22 mt-2 rounded-full flex-shrink-0"
          />

          <nav className="font-bold hidden md:flex items-center space-x-6">
            <a href="#" onClick={() => navigate({ to: "/" })}>
              Home
            </a>
            <a href="#">Find Job</a>
            <a href="#">Finance</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <Input
              placeholder="Search..."
              className="bg-transparent border-none shadow-none focus:outline-none p-0 text-sm w-45"
            />
            <span className="mx-2 text-gray-200">|</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </div>

          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 rounded-full cursor-pointer">
                <img
                  src="/Frame 626056.png"
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="absolute right-0 mt-6 w-48 bg-white rounded-lg shadow-lg border border-color-gray-100 z-20"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Dr. Sarah Tomas"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-color-gray-900 ">
                  Dr. Sarah Tomas
                </h3>
                <p className="text-xs text-color-gray-700 ">Anesthesiologist</p>

                <button
                  onClick={() => handleNavigation("#")}
                  className="flex items-center gap-2 text-color-gray-700 transition text-ms font-medium bg-transparent border-none cursor-pointer"
                >
                  <User className="w-5 h-5" />
                  <span>View Profile</span>
                </button>
              </div>
              <DropdownMenuSeparator className="border-t border-gray-100" />

              <DropdownMenuItem
                onClick={() => handleNavigation("#")}
                className="flex items-center gap-3 w-full px-4  cursor-pointer hover:bg-color-gray-100 text-xs bg-transparent border-none text-left"
              >
                <Briefcase className="w-5 h-5 text-color-gray-700" />
                <span className="text-color-gray-700 text-ms">
                  My Posted Jobs
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation("#")}
                className="flex items-center gap-3 w-full px-4 py-2 cursor-pointer hover:bg-color-gray-100 text-xs bg-transparent border-none text-left"
              >
                <Heart className="w-5 h-5 text-color-gray-700" />
                <span className="text-color-gray-700 text-ms">
                  Saved Jobs & Providers
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation("#")}
                className="flex items-center gap-3 w-full px-4 py-2 cursor-pointer hover:bg-color-gray-100 text-xs bg-transparent border-none text-left"
              >
                <Clock className="w-5 h-5 text-color-gray-700" />
                <span className="text-color-gray-700 text-ms">
                  Connects History
                </span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-t border-gray-100" />

              <div className="border-t border-color-gray-100" />

              <div className="py-2">
                <DropdownMenuItem
                  onClick={() => handleNavigation("/membership")}
                  className="flex items-center gap-3 w-full px-4 py-2 cursor-pointer hover:bg-color-gray-100 text-xs bg-transparent border-none text-left"
                >
                  <CircleCheckBig className="w-5 h-5 text-color-gray-600" />
                  <span className="text-color-gray-700 text-ms">
                    Membership Plan
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleNavigation("#")}
                  className="flex items-center gap-3 w-full px-4 py-2 cursor-pointer hover:bg-color-gray-100 text-xs bg-transparent border-none text-left"
                >
                  <Settings className="w-5 h-5 text-color-gray-700" />
                  <span className="text-color-gray-700">Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="border-t border-gray-100" />
              </div>

              <div className="border-t border-color-gray-100" />

              <div className="py-2">
                <div className="flex items-center gap-3 px-4 py-2 text-xs text-color-gray-700">
                  <RefreshCcw className="w-6 h-6 text-color-gray-700 bg-gray-100 py-1 px-1 rounded-md" />
                  <span className="text-ms text-gray-700">Switch Profile</span>
                </div>

                <div className="px-1 py-2 space-y-1 border border-color-gray-100 rounded-2xl mr-4 ml-4 text-xs test-(--color-gray-900)">
                  {[
                    { name: "Dr. Rachel Jones", isActive: true },
                    { name: "Dr. Rachel Jones", isActive: false },
                    { name: "Dr. Rachel Jones", isActive: false },
                  ].map((profile, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 w-full py-1.5 hover:bg-color-gray-50 rounded transition cursor-pointer bg-transparent border-b border-color-gray-100 text-left"
                    >
                      <div className="h-6 w-6 flex-shrink-0 rounded-full overflow-hidden bg-color-gray-200">
                        <img
                          src="/Frame 626056.png"
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{profile.name}</span>
                      {profile.isActive && (
                        <CircleCheckBig className="w-4 h-4 text-gray-700 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <DropdownMenuSeparator className="border-t border-gray-100" />
              <DropdownMenuItem
                onClick={() => handleNavigation("/signup")}
                className="flex items-center gap-3 w-full px-4 py-2 text-ms text-gray-700 font-normal bg-transparent border-none cursor-pointer text-left"
              >
                <CiLogout className="w-6 h-6 text-gray-700 " />
                <span>Logout</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-t border-gray-100" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
