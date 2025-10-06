'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  ClockIcon, 
  DollarSignIcon, 
  UsersIcon, 
  ScissorsIcon, 
  TrendingUpIcon,
  PlusIcon
} from "lucide-react";
import { 
  appointments, 
  customers, 
  services, 
  stylists, 
  transactions 
} from "@/lib/salon-data";

const SalonDashboard = () => {
  // Calculate metrics
  const today = new Date();
  const todayAppointments = appointments.filter(app => 
    app.startTime.toDateString() === today.toDateString()
  );
  
  const completedAppointments = todayAppointments.filter(app => app.status === 'completed').length;
  const scheduledAppointments = todayAppointments.filter(app => app.status === 'scheduled').length;
  const inProgressAppointments = todayAppointments.filter(app => app.status === 'in-progress').length;
  
  const dailyRevenue = transactions
    .filter(t => t.createdAt.toDateString() === today.toDateString())
    .reduce((sum, transaction) => sum + transaction.total, 0);
  
  const popularServices = services.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Salon Dashboard</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dailyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedAppointments} completed, {inProgressAppointments} in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+180 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stylists</CardTitle>
            <ScissorsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stylists.length}</div>
            <p className="text-xs text-muted-foreground">
              {stylists.filter(s => s.isAvailable).length} available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments and Popular Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              {todayAppointments.length} appointments scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const customer = customers.find(c => c.id === appointment.customerId);
                const stylist = stylists.find(s => s.id === appointment.stylistId);
                const serviceNames = appointment.serviceIds
                  .map(id => services.find(s => s.id === id)?.name)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {serviceNames}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant={
                          appointment.status === 'completed' ? 'default' :
                          appointment.status === 'in-progress' ? 'secondary' :
                          appointment.status === 'scheduled' ? 'outline' : 'destructive'
                        }
                      >
                        {appointment.status}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        {appointment.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stylist ? `${stylist.firstName}` : 'Unknown Stylist'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Services</CardTitle>
            <CardDescription>Most requested services this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <TrendingUpIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${service.price.toFixed(2)} • {service.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">#{index + 1}</p>
                    <p className="text-sm text-muted-foreground">120 bookings</p>
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

export default SalonDashboard;