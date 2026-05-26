import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Download, FileText, BarChart, PieChart, Calendar, ArrowUpRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Reports: React.FC = () => {
  const washReportOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Internal Wash', 'External Wash', 'Deep Clean'], bottom: 0 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { type: 'value' },
    series: [
      { name: 'Internal Wash', type: 'bar', stack: 'total', data: [320, 332, 301, 334, 390, 330], color: '#3b82f6' },
      { name: 'External Wash', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90, 230], color: '#60a5fa' },
      { name: 'Deep Clean', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290, 330], color: '#93c5fd' }
    ]
  };

  const attendanceOption = {
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['50%', '70%'],
      data: [
        { value: 85, name: 'Present', itemStyle: { color: '#10b981' } },
        { value: 10, name: 'Absent', itemStyle: { color: '#ef4444' } },
        { value: 5, name: 'Leave', itemStyle: { color: '#f59e0b' } }
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Analytics & Reports</h1>
          <p className="text-sm text-gray-500">Comprehensive insights into service performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Calendar size={18} />}>June 2025</Button>
          <Button icon={<Download size={18} />}>Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12,450', trend: '+14%', icon: BarChart, color: 'text-blue-600 bg-blue-50' },
          { label: 'Wash Efficiency', value: '94.2%', trend: '+2.1%', icon: ArrowUpRight, color: 'text-green-600 bg-green-50' },
          { label: 'Active Subscriptions', value: '842', trend: '+42', icon: FileText, color: 'text-purple-600 bg-purple-50' },
          { label: 'Customer Rating', value: '4.8/5', trend: '0.1', icon: PieChart, color: 'text-amber-600 bg-amber-50' },
        ].map((kpi, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <span className="text-xs font-bold text-green-500">{kpi.trend}</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-dark mt-1">{kpi.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-bold text-lg text-dark mb-6">Monthly Wash Distribution</h3>
          <ReactECharts option={washReportOption} style={{ height: '400px' }} />
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-lg text-dark mb-6">Staff Attendance Rate</h3>
          <ReactECharts option={attendanceOption} style={{ height: '400px' }} />
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Average Daily Attendance</span>
              <span className="font-bold text-dark">92%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-[92%]"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
