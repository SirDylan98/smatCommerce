import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, BarChart3 } from "lucide-react";
import ProductManagement from "./ProductsManagement";
import InventoryManagement from "./InventoryManagement";

const Dashboard = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Back Office</h1>

      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="product" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Product Management
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Finance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>
        <TabsContent value="finance">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$45,231.89</p>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$12,234.45</p>
                <p className="text-xs text-muted-foreground">
                  -4.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">72.3%</p>
                <p className="text-xs text-muted-foreground">
                  +2.4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
