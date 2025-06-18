
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, MapPin, Phone, Mail, GraduationCap, Briefcase, Calendar, LogOut, School } from 'lucide-react';

const Dashboard = () => {
  const { alumni, logout } = useAuth();

  if (!alumni) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white border-b border-orange-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/bb8028a4-f5bb-4175-9319-caf1acbf4ea4.png" 
                alt="ALVA's Education Foundation" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <School className="h-5 w-5 text-orange-600" />
                  ALVA's Alumni Connect
                </h1>
                <p className="text-sm text-gray-600">Education Foundation</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {alumni.name}!
          </h2>
          <p className="text-gray-600">
            Your alumni profile and dashboard
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Status Banner */}
        <Card className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🚧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Application Under Development
                </h3>
                <p className="text-gray-700 max-w-2xl">
                  We're working hard to bring you an amazing alumni experience! 
                  New features and functionalities are being added regularly. 
                  Thank you for your patience as we build something special for our alumni community.
                </p>
                <Badge variant="secondary" className="mt-3 bg-orange-100 text-orange-800">
                  Coming Soon: Advanced Features
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="lg:col-span-2 border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-orange-100">
                Your basic profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">University Serial Number</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.usn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <p className="text-lg font-semibold text-gray-800">+91 {alumni.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Approval Status</label>
                  <div className="mt-1">
                    {alumni.is_approved ? (
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pending Approval
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-sm text-gray-800">{formatDate(alumni.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Login</label>
                  <p className="text-sm text-gray-800">
                    {alumni.last_login ? formatDate(alumni.last_login) : 'First time login'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Batch</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.batch}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Course</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.course}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Branch</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.branch}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">City</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">State</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.state}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Country</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Pincode</label>
                  <p className="text-lg font-semibold text-gray-800">{alumni.pincode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Position</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {alumni.current_position || 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Company</label>
                  <p className="text-lg font-semibold text-gray-800">
                    {alumni.current_company || 'Not specified'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            © 2024 ALVA's Education Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
