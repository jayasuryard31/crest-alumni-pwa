
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AddAlumniModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (alumni: any) => void;
}

const AddAlumniModal = ({ isOpen, onClose, onAdd }: AddAlumniModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    department: "",
    currentPosition: "",
    company: "",
    location: "",
    email: "",
    phone: "",
  });

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Information Technology",
    "Electrical",
    "Biotechnology",
    "Business Administration",
    "Commerce",
    "Arts",
    "Science"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.batch || !formData.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onAdd(formData);
    setFormData({
      name: "",
      batch: "",
      department: "",
      currentPosition: "",
      company: "",
      location: "",
      email: "",
      phone: "",
    });
    
    toast({
      title: "Success",
      description: "Alumni added successfully!",
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Add New Alumni</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              className="border-orange-200 focus:border-orange-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch" className="text-sm font-medium text-gray-700">
                Batch Year *
              </Label>
              <Input
                id="batch"
                type="text"
                value={formData.batch}
                onChange={(e) => handleInputChange("batch", e.target.value)}
                placeholder="e.g., 2020"
                className="border-orange-200 focus:border-orange-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-sm font-medium text-gray-700">
              Current Position
            </Label>
            <Input
              id="position"
              type="text"
              value={formData.currentPosition}
              onChange={(e) => handleInputChange("currentPosition", e.target.value)}
              placeholder="e.g., Software Engineer"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-gray-700">
              Company
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="e.g., TCS, Infosys"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Bangalore, Mumbai"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="alumni@example.com"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+91 9876543210"
              className="border-orange-200 focus:border-orange-400"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Add Alumni
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlumniModal;
