import { detailedTours } from '@/data/toursData';
import { Star, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/Layout/AdminLayout';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const totalTours = detailedTours.length;
  const avgRating = (detailedTours.reduce((sum, t) => sum + t.rating, 0) / detailedTours.length).toFixed(1);
  const totalReviews = detailedTours.reduce((sum, t) => sum + t.reviewCount, 0);
  const totalRevenue = detailedTours.reduce((sum, t) => sum + t.price, 0);

  const stats = [
    { title: 'Total Tours',   value: totalTours,           icon: TrendingUp, color: 'text-brand-600' },
    { title: 'Avg Rating',    value: avgRating,            icon: Star,       color: 'text-amber-500' },
    { title: 'Total Reviews', value: totalReviews,         icon: Users,      color: 'text-emerald-600' },
    { title: 'Revenue',       value: `$${totalRevenue}`,   icon: DollarSign, color: 'text-purple-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm">Welcome back to your tours admin panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ title, value, icon: Icon, color }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
                <Icon className={`w-4 h-4 ${color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Tours</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {detailedTours.slice(0, 5).map((tour) => (
                <Link
                  key={tour.id}
                  href={`/admin/tours/${tour.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-900">{tour.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{tour.region} · {tour.category}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-semibold text-sm">${tour.price}</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
