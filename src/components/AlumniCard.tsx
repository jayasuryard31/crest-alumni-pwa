
import { MapPin, Briefcase, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alumni {
  id: number;
  name: string;
  batch: string;
  department: string;
  currentPosition: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniCard = ({ alumni }: AlumniCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={alumni.profileImage}
            alt={alumni.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-orange-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{alumni.name}</h3>
            <p className="text-orange-600 font-medium">{alumni.currentPosition}</p>
            <p className="text-gray-600 text-sm">{alumni.company}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {alumni.batch}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">{alumni.department}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{alumni.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;
