
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-orange-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and College Info */}
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/bb8028a4-f5bb-4175-9319-caf1acbf4ea4.png" 
              alt="ALVA's Education Foundation" 
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">ALVA's Alumni</h1>
              <p className="text-sm text-gray-600">Education Foundation</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-orange-500">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
