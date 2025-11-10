import { Search, Bell, Mail, SlidersHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src="../../../public/logo.png"
            alt="Synapses"
            className="h-10 w-15 rounded-full"
          />

          <nav className="hidden md:flex items-center space-x-6 ml-6">
            <a href="#" className="font-medium hover:text-primary">Home</a>
            <a href="#" className="font-medium hover:text-primary">Find Job</a>
            <a href="#" className="font-medium hover:text-primary">Finance</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-1">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <Input
              placeholder="Search..."
              className="bg-transparent border-none shadow-none focus:outline-none p-0 text-sm"
              style={{ width: '180px' }}
            />
            <span className="mx-2 text-gray-300">|</span>
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

          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary">
            <img
              src="../../../public/Frame 626056.png"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}