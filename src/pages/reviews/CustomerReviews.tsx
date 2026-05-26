import React, { useState } from 'react';
import { Search, Filter, Star, MessageSquare, Calendar, Download, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useData } from '../../context/DataContext';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useData();
  const [search, setSearch] = useState('');

  const filteredReviews = reviews.filter(r => 
    r.customerName.toLowerCase().includes(search.toLowerCase()) ||
    r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Customer Reviews</h1>
          <p className="text-sm text-gray-500">Feedback and ratings from car owners</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Calendar size={18} />}>All Time</Button>
          <Button icon={<Download size={18} />}>Export Reviews</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-500">Average Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-3xl font-bold text-dark">4.8</h3>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-xs text-green-500 font-bold mt-2">+0.2 from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-500">Total Reviews</p>
          <h3 className="text-3xl font-bold text-dark mt-2">{reviews.length}</h3>
          <p className="text-xs text-gray-400 mt-2">100% response rate</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-500">Positive Feedback</p>
          <h3 className="text-3xl font-bold text-dark mt-2">96%</h3>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-green-500 h-full w-[96%]"></div>
          </div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reviews or customers..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" icon={<Filter size={16} />}>Rating</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                        {review.customerName.charAt(0)}
                      </div>
                      <span className="font-semibold text-dark text-sm">{review.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-xs truncate">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{review.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
