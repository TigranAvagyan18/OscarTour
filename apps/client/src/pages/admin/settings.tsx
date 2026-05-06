import AdminLayout from '@/components/Layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage admin panel settings and preferences</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Settings coming soon…</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
