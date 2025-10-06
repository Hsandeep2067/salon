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
  TrashIcon,
  SearchIcon
} from "lucide-react";
import { 
  services,
  categories 
} from "@/lib/salon-data";
import { Badge } from "@/components/ui/badge";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingService, setIsAddingService] = useState(false);

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={() => setIsAddingService(!isAddingService)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {isAddingService ? 'Cancel' : 'Add Service'}
        </Button>
      </div>

      {/* Add Service Form */}
      {isAddingService && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
            <CardDescription>
              Create a new service offering for your salon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input id="name" placeholder="Enter service name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="0.00" step="0.01" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="30" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(cat => cat.type === 'service')
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter service description" />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingService(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Service</Button>
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
                  placeholder="Search services..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories
                    .filter(cat => cat.type === 'service')
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <Card>
        <CardHeader>
          <CardTitle>Service Catalog</CardTitle>
          <CardDescription>
            {filteredServices.length} services available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {service.description}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold">
                      ${service.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.duration} min
                    </div>
                  </div>
                  
                  <Badge variant="secondary">
                    {categories.find(c => c.id === service.category)?.name || 'Uncategorized'}
                  </Badge>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        defaultChecked={service.isActive}
                        className="block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:bg-primary"
                        id={`switch-${service.id}`}
                      />
                      <label 
                        htmlFor={`switch-${service.id}`}
                        className="block h-6 w-10 rounded-full bg-muted cursor-pointer"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredServices.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No services found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesPage;