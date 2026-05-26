import React from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  Users, 
  Droplets, 
  Home, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Star, 
  Activity 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { generateWashRecords } from '../utils/mockData';

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-dark">{value}</h3>
        {trend && (
          <div className={`flex items-center mt-2 text-xs font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={14} className="mr-1" />
            {trend > 0 ? '+' : ''}{trend}% from last month
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const recentWashes = generateWashRecords(5);

  const washChartOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#3b82f6' }, { offset: 1, color: '#ffffff' }]
        }
      },
      lineStyle: { color: '#3b82f6', width: 3 }
    }]
  };

  const performanceOption = {
    tooltip: { trigger: 'item' },
    series: [{
      name: 'Cleaner Performance',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: 1048, name: 'Excellent' },
        { value: 735, name: 'Good' },
        { value: 580, name: 'Average' },
        { value: 484, name: 'Below Avg' }
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark">Dashboard Overview</h1>
        <div className="text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          Last updated: Today, 10:45 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Total Customers" value="1,284" icon={Users} trend={12} color="bg-blue-500" />
        <StatCard title="Total Cleaners" value="48" icon={UserCheck} trend={4} color="bg-indigo-500" />
        <StatCard title="Total Flats" value="3,450" icon={Home} color="bg-purple-500" />
        <StatCard title="Today's Washes" value="142" icon={Droplets} trend={8} color="bg-cyan-500" />
        <StatCard title="Pending Washes" value="24" icon={Clock} color="bg-amber-500" />
        <StatCard title="Active Cleaners" value="36" icon={Activity} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-dark">Daily Wash Activity</h3>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-primary-500 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <ReactECharts option={washChartOption} style={{ height: '350px' }} />
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg text-dark mb-6">Cleaner Performance</h3>
          <ReactECharts option={performanceOption} style={{ height: '350px' }} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-dark">Recent Wash Activity</h3>
            <button className="text-primary-600 text-sm font-bold hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-4">Cleaner</th>
                  <th className="pb-4">Flat / Customer</th>
                  <th className="pb-4">Time</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentWashes.map((wash) => (
                  <tr key={wash.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                          {wash.cleanerName.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{wash.cleanerName}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-dark">{wash.flatNumber}</p>
                      <p className="text-xs text-gray-500">{wash.customerName}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{wash.startTime}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        wash.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        wash.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {wash.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg text-dark mb-6">Customer Feedback</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-50 shrink-0 flex items-center justify-center text-primary-600 font-bold">
                  {['JD', 'MS', 'RK'][i-1]}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-dark mb-1">Excellent service!</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    The cleaner was very professional and did a great job on my SUV.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
