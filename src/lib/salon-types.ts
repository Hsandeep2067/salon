// Salon POS System - Data Models

// Customer model
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: Date;
  notes?: string;
  loyaltyPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

// Stylist model
export interface Stylist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialties: string[];
  commissionRate: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Service model
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product model
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  quantityInStock: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment model
export interface Appointment {
  id: string;
  customerId: string;
  stylistId: string;
  serviceIds: string[]; // Can have multiple services
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction model
export interface Transaction {
  id: string;
  customerId?: string;
  appointmentId?: string;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'gift-card';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction item (service or product)
export interface TransactionItem {
  id: string;
  type: 'service' | 'product';
  itemId: string; // Reference to service or product
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Gift Card model
export interface GiftCard {
  id: string;
  code: string;
  initialAmount: number;
  balance: number;
  issuedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

// Category for services and products
export interface Category {
  id: string;
  name: string;
  type: 'service' | 'product';
  isActive: boolean;
}