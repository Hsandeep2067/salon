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
  MinusIcon,
  SearchIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  DollarSignIcon,
  GiftIcon,
  TrashIcon
} from "lucide-react";
import { 
  services,
  products,
  customers 
} from "@/lib/salon-data";
import { Badge } from "@/components/ui/badge";

const POSPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    type: 'service' | 'product';
    name: string;
    price: number;
    quantity: number;
  }>>([]);
  
  // Filter services and products based on search term
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    service.isActive
  );
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.isActive &&
    product.quantityInStock > 0
  );

  // Add item to cart
  const addToCart = (item: { id: string; type: 'service' | 'product'; name: string; price: number }) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && cartItem.type === item.type
      );
      
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string, type: 'service' | 'product') => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  // Update item quantity
  const updateQuantity = (id: string, type: 'service' | 'product', quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, type);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Process payment
  const processPayment = (method: 'cash' | 'card' | 'gift-card') => {
    // In a real app, this would integrate with a payment processor
    alert(`Payment processed via ${method}. Total: $${total.toFixed(2)}`);
    setCartItems([]);
    setSelectedCustomer(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product/Service Selection */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Point of Sale</CardTitle>
            <CardDescription>
              Select services and products to add to the cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services and products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Services
                </Button>
                <Button variant="outline" className="flex-1">
                  Products
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex flex-col">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {service.duration} min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${service.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart({
                        id: service.id,
                        type: 'service',
                        name: service.name,
                        price: service.price
                      })}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredServices.length === 0 && (
                <div className="col-span-2 text-center py-4 text-muted-foreground">
                  No services found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      In stock: {product.quantityInStock}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart({
                        id: product.id,
                        type: 'product',
                        name: product.name,
                        price: product.price
                      })}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-2 text-center py-4 text-muted-foreground">
                  No products found matching your search criteria.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Cart and Payment */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Order</CardTitle>
            <CardDescription>
              {cartItems.length} items in cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCartIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-2 border-b">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => removeFromCart(item.id, item.type)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Customer Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedCustomer} value={selectedCustomer || undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer (optional)" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                disabled={cartItems.length === 0}
                onClick={() => processPayment('card')}
              >
                <CreditCardIcon className="mr-2 h-5 w-5" />
                Card Payment
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                disabled={cartItems.length === 0}
                onClick={() => processPayment('cash')}
              >
                <DollarSignIcon className="mr-2 h-5 w-5" />
                Cash Payment
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                disabled={cartItems.length === 0}
              >
                <GiftIcon className="mr-2 h-5 w-5" />
                Gift Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default POSPage;