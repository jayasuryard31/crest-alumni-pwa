
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Mail, Phone, MapPin, GraduationCap, Briefcase, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { alumni, logout } = useAuth();

  if (!alumni) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/bb8028a4-f5bb-4175-9319-caf1acbf4ea4.png" 
                alt="ALVA's Education Foundation" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">ALVA's Alumni Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {alumni.name}!</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Status Message */}
        {!alumni.is_approved && (
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">Account Pending Approval</h3>
                <p className="text-sm text-yellow-700">
                  Your registration is under review. You'll be notified once approved by the admin.
                </p>
              </div>
            </div>
          </div>
        )}

        {alumni.is_approved && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">Account Approved</h3>
                <p className="text-sm text-green-700">
                  Welcome to the ALVA's Alumni Community! Your profile is now active.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Building Message */}
        <div className="mb-8">
          <Card className="border-dashed border-2 border-orange-300 bg-gradient-to-r from-orange-100 to-red-100">
            <CardContent className="text-center py-12">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  🎉 The Application is in Building Phase! 🎉
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We're working hard to bring you amazing features. Stay tuned for the big surprise coming your way!
                </p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-orange-200 text-orange-800 px-4 py-2">
                    Coming Soon: Alumni Directory, Events, Job Portal & More!
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-orange-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{alumni.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{alumni.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{alumni.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">USN</p>
                  <p className="font-medium">{alumni.usn}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-orange-600" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Batch</p>
                  <p className="font-medium">{alumni.batch}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-medium">{alumni.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium">{alumni.branch}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{alumni.city}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{alumni.state}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{alumni.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Pincode</p>
                  <p className="font-medium">{alumni.pincode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-orange-600" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alumni.current_position || alumni.current_company ? (
                <>
                  {alumni.current_position && (
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Current Position</p>
                        <p className="font-medium">{alumni.current_position}</p>
                      </div>
                    </div>
                  )}
                  {alumni.current_company && (
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Current Company</p>
                        <p className="font-medium">{alumni.current_company}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic">No professional information provided</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Status */}
        <div className="mt-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registration Status</p>
                  <p className="text-sm text-gray-500">
                    Registered on {new Date(alumni.created_at).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <Badge 
                  variant={alumni.is_approved ? "default" : "secondary"}
                  className={alumni.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                >
                  {alumni.is_approved ? "Approved" : "Pending Approval"}
                </Badge>
              </div>
              {alumni.last_login && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Last login: {new Date(alumni.last_login).toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
