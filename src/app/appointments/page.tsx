'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  CalendarIcon, 
  ClockIcon, 
  PlusIcon,
  SearchIcon
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  appointments, 
  customers, 
  services, 
  stylists 
} from "@/lib/salon-data";
import { Badge } from "@/components/ui/badge";

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Filter appointments based on selected date and search term
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = date ? 
      appointment.startTime.toDateString() === date.toDateString() : 
      true;
    
    const customer = customers.find(c => c.id === appointment.customerId);
    const customerName = customer ? 
      `${customer.firstName} ${customer.lastName}`.toLowerCase() : '';
    
    const matchesSearch = searchTerm ? 
      customerName.includes(searchTerm.toLowerCase()) : 
      true;
    
    return matchesDate && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>
            {filteredAppointments.length} appointments found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => {
              const customer = customers.find(c => c.id === appointment.customerId);
              const stylist = stylists.find(s => s.id === appointment.stylistId);
              const serviceNames = appointment.serviceIds
                .map(id => services.find(s => s.id === id)?.name)
                .filter(Boolean)
                .join(', ');

              return (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
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
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm font-medium">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {appointment.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stylist ? `${stylist.firstName} ${stylist.lastName}` : 'Unknown Stylist'}
                      </div>
                    </div>
                    
                    <Badge 
                      variant={
                        appointment.status === 'completed' ? 'default' :
                        appointment.status === 'in-progress' ? 'secondary' :
                        appointment.status === 'scheduled' ? 'outline' : 'destructive'
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No appointments found for the selected date and search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* New Appointment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Appointment</CardTitle>
          <CardDescription>
            Book a new appointment for a customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} (${service.price.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stylist">Stylist</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select stylist" />
                </SelectTrigger>
                <SelectContent>
                  {stylists.map((stylist) => (
                    <SelectItem key={stylist.id} value={stylist.id}>
                      {stylist.firstName} {stylist.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" />
            </div>
            
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Schedule Appointment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsPage;