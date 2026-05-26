import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 font-sans">
      {/* Left Section */}
      <div className="lg:w-1/2 bg-primary-700 relative overflow-hidden flex flex-col justify-center p-12 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary-400 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 max-w-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-700 shadow-xl">
              <Droplets size={32} />
            </div>
            <span className="text-2xl font-bold tracking-tight">WashMaster Pro</span>
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Advanced Car Washing Management System
          </h1>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            The all-in-one enterprise platform for apartment car washing services, cleaner tracking, and real-time analytics.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-3xl font-bold mb-1">99.9%</p>
              <p className="text-sm text-primary-200 uppercase tracking-wider font-semibold">Uptime Status</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-3xl font-bold mb-1">2.4k+</p>
              <p className="text-sm text-primary-200 uppercase tracking-wider font-semibold">Daily Washes</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-gray-500">Login to manage your operations</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@washmaster.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 cursor-pointer" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Forgot Password?</a>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg font-bold"
                isLoading={loading}
              >
                Sign In to Dashboard
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-xs uppercase tracking-widest font-bold">
              <ShieldCheck size={16} />
              Secure Admin Access Only
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
