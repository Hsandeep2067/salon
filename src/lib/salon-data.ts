// Salon POS System - Mock Data

import { 
  Customer, 
  Stylist, 
  Service, 
  Product, 
  Appointment, 
  Transaction,
  GiftCard,
  Category
} from './salon-types';

// Categories
export const categories: Category[] = [
  { id: '1', name: 'Hair Services', type: 'service', isActive: true },
  { id: '2', name: 'Nail Services', type: 'service', isActive: true },
  { id: '3', name: 'Spa Services', type: 'service', isActive: true },
  { id: '4', name: 'Hair Products', type: 'product', isActive: true },
  { id: '5', name: 'Nail Products', type: 'product', isActive: true },
  { id: '6', name: 'Spa Products', type: 'product', isActive: true },
];

// Services
export const services: Service[] = [
  { 
    id: '1', 
    name: 'Haircut & Style', 
    description: 'Professional haircut with styling', 
    duration: 45, 
    price: 45.00, 
    category: 'Hair Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    name: 'Full Color', 
    description: 'Full hair color service', 
    duration: 90, 
    price: 120.00, 
    category: 'Hair Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '3', 
    name: 'Highlights', 
    description: 'Partial or full highlights', 
    duration: 120, 
    price: 150.00, 
    category: 'Hair Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '4', 
    name: 'Manicure', 
    description: 'Classic manicure with polish', 
    duration: 30, 
    price: 25.00, 
    category: 'Nail Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '5', 
    name: 'Pedicure', 
    description: 'Classic pedicure with polish', 
    duration: 45, 
    price: 35.00, 
    category: 'Nail Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '6', 
    name: 'Gel Manicure', 
    description: 'Gel polish manicure', 
    duration: 60, 
    price: 45.00, 
    category: 'Nail Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '7', 
    name: 'Gel Pedicure', 
    description: 'Gel polish pedicure', 
    duration: 75, 
    price: 55.00, 
    category: 'Nail Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '8', 
    name: 'Facial', 
    description: 'Relaxing facial treatment', 
    duration: 60, 
    price: 80.00, 
    category: 'Spa Services', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// Products
export const products: Product[] = [
  { 
    id: '1', 
    name: 'Shampoo', 
    description: 'Professional grade shampoo', 
    price: 24.99, 
    cost: 12.00, 
    quantityInStock: 50, 
    category: 'Hair Products', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    name: 'Conditioner', 
    description: 'Professional grade conditioner', 
    price: 24.99, 
    cost: 12.00, 
    quantityInStock: 45, 
    category: 'Hair Products', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '3', 
    name: 'Hair Serum', 
    description: 'Repairing hair serum', 
    price: 39.99, 
    cost: 20.00, 
    quantityInStock: 30, 
    category: 'Hair Products', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '4', 
    name: 'Nail Polish', 
    description: 'Premium nail polish', 
    price: 14.99, 
    cost: 7.00, 
    quantityInStock: 100, 
    category: 'Nail Products', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '5', 
    name: 'Nail File Set', 
    description: 'Professional nail file set', 
    price: 19.99, 
    cost: 8.00, 
    quantityInStock: 25, 
    category: 'Nail Products', 
    isActive: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// Stylists
export const stylists: Stylist[] = [
  { 
    id: '1', 
    firstName: 'Emma', 
    lastName: 'Johnson', 
    email: 'emma@salon.com', 
    phone: '555-0101', 
    specialties: ['Haircut & Style', 'Full Color'], 
    commissionRate: 0.35, 
    isAvailable: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    firstName: 'James', 
    lastName: 'Smith', 
    email: 'james@salon.com', 
    phone: '555-0102', 
    specialties: ['Highlights', 'Haircut & Style'], 
    commissionRate: 0.35, 
    isAvailable: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '3', 
    firstName: 'Sophia', 
    lastName: 'Williams', 
    email: 'sophia@salon.com', 
    phone: '555-0103', 
    specialties: ['Manicure', 'Pedicure', 'Gel Manicure'], 
    commissionRate: 0.40, 
    isAvailable: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '4', 
    firstName: 'Michael', 
    lastName: 'Brown', 
    email: 'michael@salon.com', 
    phone: '555-0104', 
    specialties: ['Facial', 'Spa Services'], 
    commissionRate: 0.40, 
    isAvailable: true, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// Customers
export const customers: Customer[] = [
  { 
    id: '1', 
    firstName: 'Olivia', 
    lastName: 'Davis', 
    email: 'olivia@example.com', 
    phone: '555-0201', 
    loyaltyPoints: 120, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    firstName: 'Liam', 
    lastName: 'Miller', 
    email: 'liam@example.com', 
    phone: '555-0202', 
    loyaltyPoints: 85, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '3', 
    firstName: 'Ava', 
    lastName: 'Wilson', 
    email: 'ava@example.com', 
    phone: '555-0203', 
    loyaltyPoints: 210, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '4', 
    firstName: 'Noah', 
    lastName: 'Moore', 
    email: 'noah@example.com', 
    phone: '555-0204', 
    loyaltyPoints: 45, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// Gift Cards
export const giftCards: GiftCard[] = [
  { 
    id: '1', 
    code: 'GC1001', 
    initialAmount: 100.00, 
    balance: 75.00, 
    issuedAt: new Date(), 
    expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 
    isActive: true 
  },
  { 
    id: '2', 
    code: 'GC1002', 
    initialAmount: 50.00, 
    balance: 0.00, 
    issuedAt: new Date(), 
    expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 
    isActive: false 
  },
];

// Appointments (sample data for today)
const today = new Date();
export const appointments: Appointment[] = [
  { 
    id: '1', 
    customerId: '1', 
    stylistId: '1', 
    serviceIds: ['1'], 
    startTime: new Date(today.setHours(9, 0, 0, 0)), 
    endTime: new Date(today.setHours(9, 45, 0, 0)), 
    status: 'completed', 
    totalPrice: 45.00, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    customerId: '2', 
    stylistId: '2', 
    serviceIds: ['3'], 
    startTime: new Date(today.setHours(10, 0, 0, 0)), 
    endTime: new Date(today.setHours(12, 0, 0, 0)), 
    status: 'in-progress', 
    totalPrice: 150.00, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '3', 
    customerId: '3', 
    stylistId: '3', 
    serviceIds: ['6', '7'], 
    startTime: new Date(today.setHours(13, 0, 0, 0)), 
    endTime: new Date(today.setHours(15, 0, 0, 0)), 
    status: 'scheduled', 
    totalPrice: 100.00, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '4', 
    customerId: '4', 
    stylistId: '4', 
    serviceIds: ['8'], 
    startTime: new Date(today.setHours(14, 0, 0, 0)), 
    endTime: new Date(today.setHours(15, 0, 0, 0)), 
    status: 'scheduled', 
    totalPrice: 80.00, 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// Transactions
export const transactions: Transaction[] = [
  { 
    id: '1', 
    customerId: '1', 
    appointmentId: '1',
    items: [
      { id: '1', type: 'service', itemId: '1', itemName: 'Haircut & Style', quantity: 1, unitPrice: 45.00, totalPrice: 45.00 }
    ], 
    subtotal: 45.00, 
    tax: 3.60, 
    discount: 0.00, 
    total: 48.60, 
    paymentMethod: 'card', 
    paymentStatus: 'completed', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id: '2', 
    items: [
      { id: '1', type: 'product', itemId: '1', itemName: 'Shampoo', quantity: 2, unitPrice: 24.99, totalPrice: 49.98 },
      { id: '2', type: 'product', itemId: '4', itemName: 'Nail Polish', quantity: 3, unitPrice: 14.99, totalPrice: 44.97 }
    ], 
    subtotal: 94.95, 
    tax: 7.60, 
    discount: 0.00, 
    total: 102.55, 
    paymentMethod: 'cash', 
    paymentStatus: 'completed', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];