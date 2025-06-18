
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, School, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: result.message,
        });
      } else {
        toast({
          title: "Login Failed",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
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
              ALVA's Alumni Connect
            </h1>
            <p className="text-sm text-gray-600 mt-1">Education Foundation</p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5 text-orange-600" />
              Alumni Login
            </CardTitle>
            <CardDescription className="text-gray-600">
              Welcome back to your alumni community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Not registered yet?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  Register as Alumni
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 ALVA's Education Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
