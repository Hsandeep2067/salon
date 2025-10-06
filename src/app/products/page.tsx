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
  products,
  categories 
} from "@/lib/salon-data";
import { Badge } from "@/components/ui/badge";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setIsAddingProduct(!isAddingProduct)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {isAddingProduct ? 'Cancel' : 'Add Product'}
        </Button>
      </div>

      {/* Add Product Form */}
      {isAddingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Add a new retail product to your salon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Selling Price ($)</Label>
                <Input id="price" type="number" placeholder="0.00" step="0.01" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cost">Cost Price ($)</Label>
                <Input id="cost" type="number" placeholder="0.00" step="0.01" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity in Stock</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(cat => cat.type === 'product')
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
                <Input id="description" placeholder="Enter product description" />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
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
                  placeholder="Search products..."
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
                    .filter(cat => cat.type === 'product')
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

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            {filteredProducts.length} products in inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {product.description}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cost: ${product.cost.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <Badge variant={product.quantityInStock > 10 ? "default" : product.quantityInStock > 0 ? "secondary" : "destructive"}>
                      {product.quantityInStock} in stock
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {categories.find(c => c.id === product.category)?.name || 'Uncategorized'}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        defaultChecked={product.isActive}
                        className="block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:bg-primary"
                        id={`switch-${product.id}`}
                      />
                      <label 
                        htmlFor={`switch-${product.id}`}
                        className="block h-6 w-10 rounded-full bg-muted cursor-pointer"
                      ></label>
                    </div>
                    <Button variant="ghost" size="icon">
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;