import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle, Search, Plus, Minus, Save } from 'lucide-react';

const InventoryManagement = () => {
  // Sample initial inventory data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop XPS 15', sku: 'LAP-001', stock: 5, minStock: 10, price: 1299.99, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', sku: 'ACC-001', stock: 0, minStock: 20, price: 29.99, category: 'Accessories' },
    { id: 3, name: 'USB-C Cable', sku: 'ACC-002', stock: 15, minStock: 30, price: 19.99, category: 'Accessories' },
    { id: 4, name: 'Monitor 27"', sku: 'MON-001', stock: 2, minStock: 8, price: 399.99, category: 'Electronics' },
    { id: 5, name: 'Keyboard', sku: 'ACC-003', stock: 0, minStock: 15, price: 89.99, category: 'Accessories' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [updating, setUpdating] = useState({});

  const adjustStock = (id, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + amount);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  const updateInventory = async (item) => {
    try {
      setUpdating({ ...updating, [item.id]: true });
      
      const response = await fetch('/api/inventory/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to update inventory');
      }

      // Optional: Update local state with server response
      const updatedItem = await response.json();
      alert('Inventory updated successfully!');
      
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Failed to update inventory. Please try again.');
    } finally {
      setUpdating({ ...updating, [item.id]: false });
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterOutOfStock ? item.stock === 0 : true;
    return matchesSearch && matchesFilter;
  });

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-500' };
    if (stock < minStock) return { label: 'Low Stock', color: 'bg-yellow-500' };
    return { label: 'In Stock', color: 'bg-green-500' };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex items-center gap-4">
          <Button 
            variant={filterOutOfStock ? "secondary" : "outline"}
            onClick={() => setFilterOutOfStock(!filterOutOfStock)}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            {filterOutOfStock ? 'Show All' : 'Show Out of Stock'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inventory.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Out of Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">
              {inventory.filter(item => item.stock === 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-500">
              {inventory.filter(item => item.stock > 0 && item.stock < item.minStock).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Product Name</th>
                  <th className="text-left p-4 font-medium">SKU</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Stock Level</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">{item.sku}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="font-bold">{item.stock}</span>
                      <span className="text-gray-500 ml-1">/ {item.minStock} min</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getStockStatus(item.stock, item.minStock).color}`}>
                        {getStockStatus(item.stock, item.minStock).label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => adjustStock(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => adjustStock(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateInventory(item)}
                          disabled={updating[item.id]}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;