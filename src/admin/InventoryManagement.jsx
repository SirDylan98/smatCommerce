import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToastContainer, toast } from "react-toastify";
import {
  Package,
  AlertTriangle,
  Search,
  Plus,
  Minus,
  Save,
} from "lucide-react";
import { getAllInventory, updateInventoryLevel } from "@/Service/apiServices";

const InventoryManagement = () => {
  // Sample initial inventory data
  const [inventory, setInventory] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [updating, setUpdating] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const notification = (msg) => {
    toast(msg, {
      autoClose: 2000,
      style: { background: "#000000", color: "white" },
    });
    
  };
  const adjustStock = (id, amount) => {
    console.log("=======> this is the product Code ",id)
    setInventory(
      inventory.map((item) => {
        //console.log("=======> this is the product Inventory ",item)
        if (item.productCode === id) {
          console.log("*****************> we a in with",item)
          const newStock = Math.max(0, item.availableQuantity + amount);
          return { ...item, availableQuantity: newStock };
        }else{
          
        }
        return item;
      })
    );
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        
          const getAllProductsResponse = await getAllInventory();
          if (getAllProductsResponse.status == 200) {
            setInventory(getAllProductsResponse.data.body);
          }
        
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const updateInventory = async (item) => {
    try {
      setUpdating({ ...updating, [item.productCode]: true });
      let request={
        
          productCode: item?.productCode,
          availableQuantity: item?.availableQuantity,
      }

      const response = await updateInventoryLevel(request);

      if (response.status!=200) {
        toast.error("Failed to update inventory. Please try again.")
      }else{
        notification("Inventory updated successfully!")
      }

      // // Optional: Update local state with server response
      // const updatedItem = await response.json();
     
     
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory. Please try again.")
  
    } finally {
      setUpdating({ ...updating, [item.productCode]: false });
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterOutOfStock ? item.availableQuantity === 0 : true;
    return matchesSearch && matchesFilter;
  });

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-500" };
    if (stock < minStock) return { label: "Low Stock", color: "bg-yellow-500" };
    return { label: "In Stock", color: "bg-green-500" };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ToastContainer/>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex items-center gap-4">
          <Button
            variant={filterOutOfStock ? "secondary" : "outline"}
            onClick={() => setFilterOutOfStock(!filterOutOfStock)}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            {filterOutOfStock ? "Show All" : "Show Out of Stock"}
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
              {inventory.filter((item) => item.availableQuantity === 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-500">
              {
                inventory.filter(
                  (item) => item.availableQuantity > 0 && item.availableQuantity < item.restockLevel
                ).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name or product Code..."
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
                 
                
                  <th className="text-left p-4 font-medium">Stock Level</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.productCode} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{item?.productName}</td>
                    <td className="p-4">{item.productCode}</td>
                    
                 
                    <td className="p-4">
                      <span className="font-bold">{item.availableQuantity}</span>
                      <span className="text-gray-500 ml-1">
                        / {item.restockLevel} min
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${
                          getStockStatus(item.availableQuantity, item.restockLevel).color
                        }`}
                      >
                        {getStockStatus(item.availableQuantity, item.restockLevel).label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => adjustStock(item.productCode, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => adjustStock(item.productCode, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateInventory(item)}
                          disabled={updating[item.productCode]}
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
