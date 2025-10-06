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
  PlusIcon,
  EditIcon,
  SearchIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon
} from "lucide-react";
import { 
  customers,
  appointments 
} from "@/lib/salon-data";
import { Badge } from "@/components/ui/badge";

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  // Get customer appointment history
  const getCustomerAppointments = (customerId: string) => {
    return appointments.filter(app => app.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={() => setIsAddingCustomer(!isAddingCustomer)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {isAddingCustomer ? 'Cancel' : 'Add Customer'}
        </Button>
      </div>

      {/* Add Customer Form */}
      {isAddingCustomer && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Customer</CardTitle>
            <CardDescription>
              Register a new customer in your salon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Enter any special notes" />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingCustomer(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Customer</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="appointments">Most Appointments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers in your salon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => {
              const customerAppointments = getCustomerAppointments(customer.id);
              const totalSpent = customerAppointments.reduce((sum, app) => sum + app.totalPrice, 0);
              
              return (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </span>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <PhoneIcon className="mr-1 h-4 w-4" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MailIcon className="mr-1 h-4 w-4" />
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end">
                      <div className="text-lg font-bold">
                        {customerAppointments.length} visits
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total spent: ${totalSpent.toFixed(2)}
                      </div>
                    </div>
                    
                    <Badge variant="secondary">
                      {customer.loyaltyPoints} pts
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredCustomers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No customers found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;