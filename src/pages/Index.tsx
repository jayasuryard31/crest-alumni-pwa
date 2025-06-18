
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, GraduationCap } from "lucide-react";
import AlumniCard from '@/components/AlumniCard';
import AddAlumniModal from '@/components/AddAlumniModal';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';

// Mock data for demonstration
const mockAlumni = [
  {
    id: 1,
    name: "Rajesh Kumar",
    batch: "2020",
    department: "Computer Science",
    currentPosition: "Software Engineer",
    company: "TCS",
    location: "Bangalore",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Sharma",
    batch: "2019",
    department: "Electronics",
    currentPosition: "Project Manager",
    company: "Infosys",
    location: "Hyderabad",
    email: "priya@example.com",
    phone: "+91 9876543211",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b9e9e7b5?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Arjun Menon",
    batch: "2021",
    department: "Mechanical",
    currentPosition: "Design Engineer",
    company: "Mahindra",
    location: "Chennai",
    email: "arjun@example.com",
    phone: "+91 9876543212",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alumni, setAlumni] = useState(mockAlumni);

  const filteredAlumni = alumni.filter(alumnus =>
    alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumnus.batch.includes(searchTerm) ||
    alumnus.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAlumni = (newAlumni: any) => {
    const alumniWithId = {
      ...newAlumni,
      id: alumni.length + 1,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    };
    setAlumni([...alumni, alumniWithId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pb-6">
        <StatsCards totalAlumni={alumni.length} />
        
        {/* Search and Add Section */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search alumni by name, department, batch, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Alumni
          </Button>
        </div>

        {/* Alumni Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Users className="mr-2 h-5 w-5 text-orange-500" />
              Alumni Directory
            </h2>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
              {filteredAlumni.length} found
            </span>
          </div>
          
          {filteredAlumni.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No alumni found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAlumni.map((alumnus) => (
                <AlumniCard key={alumnus.id} alumni={alumnus} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AddAlumniModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAlumni}
      />
    </div>
  );
};

export default Index;
