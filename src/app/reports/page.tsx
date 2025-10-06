'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  DollarSignIcon, 
  TrendingUpIcon,
  DownloadIcon
} from "lucide-react";
import { 
  appointments, 
  customers, 
  services, 
  stylists, 
  transactions 
} from "@/lib/salon-data";

const ReportsPage = () => {
  // Calculate metrics
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  // This month's appointments
  const thisMonthAppointments = appointments.filter(app => 
    app.startTime >= thisMonth
  );
  
  // Last month's appointments
  const lastMonthAppointments = appointments.filter(app => 
    app.startTime >= lastMonth && app.startTime < thisMonth
  );
  
  // This month's revenue
  const thisMonthRevenue = transactions
    .filter(t => t.createdAt >= thisMonth)
    .reduce((sum, transaction) => sum + transaction.total, 0);
  
  // Last month's revenue
  const lastMonthRevenue = transactions
    .filter(t => t.createdAt >= lastMonth && t.createdAt < thisMonth)
    .reduce((sum, transaction) => sum + transaction.total, 0);
  
  // Calculate revenue change
  const revenueChange = lastMonthRevenue > 0 
    ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
    : 0;
  
  // Calculate appointment change
  const appointmentChange = lastMonthAppointments.length > 0 
    ? ((thisMonthAppointments.length - lastMonthAppointments.length) / lastMonthAppointments.length) * 100 
    : 0;
  
  // Top services
  const topServices = services.slice(0, 5);
  
  // Stylist performance
  const stylistPerformance = stylists.map(stylist => {
    const stylistAppointments = appointments.filter(app => app.stylistId === stylist.id);
    const totalRevenue = stylistAppointments.reduce((sum, app) => sum + app.totalPrice, 0);
    return {
      ...stylist,
      appointments: stylistAppointments.length,
      revenue: totalRevenue
    };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${thisMonthRevenue.toFixed(2)}</div>
            <p className={`text-xs ${revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthAppointments.length}</div>
            <p className={`text-xs ${appointmentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {appointmentChange >= 0 ? '+' : ''}{appointmentChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Service Rating</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-green-500">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Monthly revenue for the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between space-x-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
              <div key={month} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary rounded-t hover:bg-primary/80 transition-colors"
                  style={{ height: `${20 + index * 15}%` }}
                ></div>
                <span className="text-sm text-muted-foreground mt-2">{month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Services and Stylist Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
            <CardDescription>
              Most popular services this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${service.price.toFixed(2)} • {service.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">120 bookings</p>
                    <p className="text-sm text-muted-foreground">$1,200 revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stylist Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Stylist Performance</CardTitle>
            <CardDescription>
              Revenue generated by each stylist
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stylistPerformance.map((stylist, index) => (
                <div key={stylist.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {stylist.firstName} {stylist.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stylist.appointments} appointments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${stylist.revenue.toFixed(2)}
                    </p>
                    <Badge variant="secondary">
                      {stylist.commissionRate * 100}% commission
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;