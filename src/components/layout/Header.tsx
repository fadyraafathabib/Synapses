import { Search, Bell, Mail, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="border-b bg-[var(--gray-50)] ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 w-156 h-20 ">
          <img
            src="/logo.png"
            alt="Synapses"
            className="h-15 w-21.25 mt-2 rounded-full"
          />

          <nav className="font-bold hidden md:flex items-center space-x-6 h-6 w-52 hover:text-[var(--primary-500)] ">
            <a href="#">Home</a>
            <a href="#">Find Job</a>
            <a href="#">Finance</a>
          </nav>
        </div>

        <div className="flex items-center gap-4 w-117 h-12">
          <div className="relative flex items-center bg-[var(--gray-100)] rounded-full px-3 py-1 w-75 h-10">
            <Search className="h-4 w-4 text-[var(--gray-500)] mr-2" />
            <Input
              placeholder="Search..."
              className="bg-transparent border-none shadow-none focus:outline-none p-0 text-sm w-[180px]"
            />
            <span className="mx-2 text-[var(--gray-200)]">|</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <SlidersHorizontal className="h-4 w-4 text-[var(--gray-500)]" />
            </Button>
          </div>

          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[var(--primary-500)]">
            <img
              src="/Frame 626056.png"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
