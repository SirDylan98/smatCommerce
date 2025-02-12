import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Tag,
  X
} from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    productDescription: '',
    productCategory: 'CLOTHES',
    productImage: '',
    productPrice: 0,
    onSale: false,
    productOnSalePrice: 0,
    currency: 'USD',
    startingQuantity: 0,
    minimumReorderLevel: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          uniquekey: editingProduct?.uniquekey || Date.now().toString(),
        }),
      });
      
      if (response.ok) {
        setProducts(prev => editingProduct 
          ? prev.map(p => p.uniquekey === editingProduct.uniquekey ? formData : p)
          : [...prev, formData]
        );
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      productCode: '',
      productName: '',
      productDescription: '',
      productCategory: 'CLOTHES',
      productImage: '',
      productPrice: 0,
      onSale: false,
      productOnSalePrice: 0,
      currency: 'USD',
      startingQuantity: 0,
      minimumReorderLevel: 0,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productCode">Product Code</Label>
                  <Input
                    id="productCode"
                    name="productCode"
                    value={formData.productCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productCategory">Category</Label>
                  <Select
                    name="productCategory"
                    value={formData.productCategory}
                    onValueChange={(value) => handleInputChange({ target: { name: 'productCategory', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLOTHES">Clothes</SelectItem>
                      <SelectItem value="ELECTRONICS">Electronics</SelectItem>
                      <SelectItem value="FURNITURE">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productImage">Image URL</Label>
                  <Input
                    id="productImage"
                    name="productImage"
                    value={formData.productImage}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productPrice">Price</Label>
                  <Input
                    id="productPrice"
                    name="productPrice"
                    type="number"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    name="currency"
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange({ target: { name: 'currency', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="onSale"
                      checked={formData.onSale}
                      onCheckedChange={(checked) => 
                        handleInputChange({ target: { name: 'onSale', value: checked } })
                      }
                    />
                    <Label htmlFor="onSale">On Sale</Label>
                  </div>
                  {formData.onSale && (
                    <Input
                      name="productOnSalePrice"
                      type="number"
                      value={formData.productOnSalePrice}
                      onChange={handleInputChange}
                      placeholder="Sale Price"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="productDescription">Description</Label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.uniquekey} className="relative">
            <CardContent className="p-4">
              <img
                src={product.productImage || '/api/placeholder/300/200'}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {product.onSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  On Sale
                </span>
              )}
              <h3 className="font-medium mb-2">{product.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.productCode}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className={product.onSale ? 'text-gray-400 line-through' : 'font-bold'}>
                  {product.currency} {product.productPrice}
                </span>
                {product.onSale && (
                  <span className="text-red-500 font-bold">
                    {product.currency} {product.productOnSalePrice}
                  </span>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;