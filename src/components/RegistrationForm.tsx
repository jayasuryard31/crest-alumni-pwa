
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User, Mail, Lock, Phone, MapPin, GraduationCap, Briefcase, School, UserPlus } from 'lucide-react';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  usn: z.string().min(5, 'USN must be at least 5 characters').max(20, 'USN too long'),
  phone: z.string().regex(/^[6-9][0-9]{9}$/, 'Please enter a valid Indian mobile number'),
  batch: z.string().min(4, 'Please enter your batch year'),
  course: z.string().min(1, 'Please select your course'),
  branch: z.string().min(1, 'Please select your branch'),
  city: z.string().min(2, 'City name is required'),
  state: z.string().min(1, 'Please select your state'),
  country: z.string().default('India'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid Indian pincode'),
  current_position: z.string().optional(),
  current_company: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}

const courses = [
  'B.E/B.Tech', 'M.E/M.Tech', 'MBA', 'MCA', 'B.Sc', 'M.Sc', 'BCA', 'B.Com', 'M.Com', 'BBA', 'Other'
];

const branches = [
  'Computer Science', 'Information Technology', 'Electronics & Communication', 'Electrical', 
  'Mechanical', 'Civil', 'Chemical', 'Biotechnology', 'Automobile', 'Aeronautical', 'Other'
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Other'
];

const RegistrationForm = ({ onSwitchToLogin }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      country: 'India'
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...submitData } = data;
      const result = await registerUser(submitData);
      
      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: result.message,
        });
        onSwitchToLogin();
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* College Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/bb8028a4-f5bb-4175-9319-caf1acbf4ea4.png" 
              alt="ALVA's Education Foundation" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <School className="h-6 w-6 text-orange-600" />
              ALVA's Alumni Registration
            </h1>
            <p className="text-sm text-gray-600 mt-1">Join the Alumni Community</p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5 text-orange-600" />
              Alumni Registration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please fill in your details to join the alumni network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('name')}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('phone')}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usn" className="text-sm font-medium text-gray-700">
                      University Serial Number (USN) *
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="usn"
                        placeholder="e.g., 4AL18CS001"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('usn')}
                      />
                    </div>
                    {errors.usn && <p className="text-xs text-red-600">{errors.usn.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('password')}
                      />
                    </div>
                    {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('confirmPassword')}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch" className="text-sm font-medium text-gray-700">
                      Batch Year *
                    </Label>
                    <Input
                      id="batch"
                      placeholder="e.g., 2020"
                      className="border-orange-200 focus:border-orange-500"
                      {...register('batch')}
                    />
                    {errors.batch && <p className="text-xs text-red-600">{errors.batch.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-sm font-medium text-gray-700">
                      Course *
                    </Label>
                    <Select onValueChange={(value) => setValue('course', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-500">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.course && <p className="text-xs text-red-600">{errors.course.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-sm font-medium text-gray-700">
                      Branch/Specialization *
                    </Label>
                    <Select onValueChange={(value) => setValue('branch', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-500">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.branch && <p className="text-xs text-red-600">{errors.branch.message}</p>}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Address Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('city')}
                      />
                    </div>
                    {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State *
                    </Label>
                    <Select onValueChange={(value) => setValue('state', value)}>
                      <SelectTrigger className="border-orange-200 focus:border-orange-500">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="e.g., 560001"
                      className="border-orange-200 focus:border-orange-500"
                      {...register('pincode')}
                    />
                    {errors.pincode && <p className="text-xs text-red-600">{errors.pincode.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <Input
                      id="country"
                      value="India"
                      disabled
                      className="border-orange-200 bg-gray-50"
                      {...register('country')}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Professional Information (Optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_position" className="text-sm font-medium text-gray-700">
                      Current Position
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="current_position"
                        placeholder="e.g., Software Engineer"
                        className="pl-10 border-orange-200 focus:border-orange-500"
                        {...register('current_position')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current_company" className="text-sm font-medium text-gray-700">
                      Current Company
                    </Label>
                    <Input
                      id="current_company"
                      placeholder="e.g., Google, Microsoft"
                      className="border-orange-200 focus:border-orange-500"
                      {...register('current_company')}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? 'Registering...' : 'Register as Alumni'}
              </Button>
            </form>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
