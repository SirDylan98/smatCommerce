import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
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
import axios from "axios";
import { createProduct, updateProduct } from "@/Service/apiServices";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "CLOTHES",
    productImage: "",
    productPrice: 0,
    onSale: false,
    productOnSalePrice: 0,
    currency: "USD",
    startingQuantity: 0,
    minimumReorderLevel: 0,
    uniquekey: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      notification("Please select a file first");
      return;
    }

    setIsUploading(true);
    const fileFormData = new FormData();
    fileFormData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8086/api/v1/products/upload",
        fileFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Selected File:", selectedFile);
      console.log("Form Data:", fileFormData.get("file"));
      console.log("======> this is the response Data", response.data);
      if (response.data) {
        setUploadedFileName(response.data.filePath);
        setFormData((prev) => ({
          ...prev,
          productImage: response.data.filePath,
        }));
        notification("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alnotificationert(
        "Failed to upload file: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("=======> " + JSON.stringify(formData));
    if (!uploadedFileName) {
      notification("Please upload an image first");
      return;
    }

    const uniqueKey = uuidv4().toString();
    const productData = {
      ...formData,
      uniquekey: uniqueKey,
      productImage: uploadedFileName,
    };
    console.log("=======> " + JSON.stringify(productData));
    try {
      if(editingProduct){
        const response = await updateProduct(productData);

        if (response.status === 200) {
          console.log("=====> this is the response ", response.data);
          setProducts((prev) =>
            prev.map((product) =>
              product.id === response.data.body.id ? response.data.body : product
            )
          );
          resetForm();
          setIsModalOpen(false);
         // notification("Product updated successfully!");
          alert("Product updated successfully!");
        }
      }else{
        const response = await createProduct(productData);

        if (response.status === 200) {
          console.log("=====> this is the response ", response.data);
          setProducts((prev) => [...prev, response.data.body]);
          resetForm();
          setIsModalOpen(false);
          notification("Product created successfully!");
          //alert("Product created successfully!");
        }
      }
      
    } catch (error) {
      console.error("Error creating product:", error);
      notification(
        "Failed to create product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      productDescription: "",
      productCategory: "CLOTHES",
      productImage: "",
      productPrice: 0,
      onSale: false,
      productOnSalePrice: 0,
      currency: "USD",
      startingQuantity: 0,
      minimumReorderLevel: 0,
    });
    setSelectedFile(null);
    setUploadedFileName("");
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setUploadedFileName(product.productImage);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  const notification = (msg) => {
    toast(msg, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
      style: { background: "#FCB040", color: "white" },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer/>
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
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "productCategory", value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLOTHES">Clothes</SelectItem>
                      <SelectItem value="FOOD">Food</SelectItem>
                      <SelectItem value="COMPUTER_ACCESSORIES">
                        Computer Accessories
                      </SelectItem>
                      <SelectItem value="KITCHEN">Kitchen</SelectItem>
                      <SelectItem value="MEN_WARE">Men's Wear</SelectItem>
                      <SelectItem value="GADGETS">Gadgets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productImage">Product Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleFileUpload}
                      disabled={!selectedFile || isUploading}
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                  {uploadedFileName && (
                    <p className="text-sm text-green-600">
                      File uploaded: {uploadedFileName}
                    </p>
                  )}
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
                {editingProduct ? null : (
                  <div className="space-y-2">
                    <Label htmlFor="startingQuantity">Starting Inventory</Label>
                    <Input
                      id="startingQuantity"
                      name="startingQuantity"
                      type="number"
                      value={formData.startingQuantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                {editingProduct ? null : (
                  <div className="space-y-2">
                    <Label htmlFor="minimumReorderLevel">Reorder Level</Label>
                    <Input
                      id="minimumReorderLevel"
                      name="minimumReorderLevel"
                      type="number"
                      value={formData.minimumReorderLevel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    name="currency"
                    value={formData.currency}
                    onValueChange={(value) =>
                      handleInputChange({ target: { name: "currency", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="ZIG">ZIG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="onSale"
                      checked={formData.onSale}
                      onCheckedChange={(checked) =>
                        handleInputChange({
                          target: { name: "onSale", value: checked },
                        })
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!uploadedFileName || isUploading}
                >
                  {editingProduct ? "Update Product" : "Add Product"}
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
          <Card key={product.productCode} className="relative">
            <CardContent className="p-4">
              <img
                src={`http://localhost:8086/api/v1/products/uploads/${product.productImage}`}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {product.onSale && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  On Sale
                </span>
              )}
              <h3 className="font-medium mb-2">{product.productName}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={
                    product.onSale ? "text-gray-400 line-through" : "font-bold"
                  }
                >
                  {product.currency} {product.productPrice}
                </span>
                {product.onSale && (
                  <span className="text-red-500 font-bold">
                    {product.currency} {product.productOnSalePrice}
                  </span>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
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
