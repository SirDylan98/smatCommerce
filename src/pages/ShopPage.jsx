import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  addToCart,
  getAllProducts,
  getProductsByCategory,
  searchProduct,
} from "@/Service/apiServices";
import { v4 as uuidv4 } from "uuid";
import Banner from "@/components/shared/Banner";
import { toast, ToastContainer } from "react-toastify";

const PriceRangeFilter = ({ minPrice, maxPrice, onPriceChange }) => (
  <div className="p-4 border rounded-lg mb-4">
    <h3 className="font-medium mb-4">Price Range</h3>
    <Slider
      defaultValue={[minPrice, maxPrice]}
      max={2000}
      step={10}
      onValueChange={onPriceChange}
      className="mb-2"
    />
    <div className="flex justify-between text-sm text-gray-500">
      <span>${minPrice}</span>
      <span>${maxPrice}</span>
    </div>
  </div>
);
const notification = (msg) => {
  toast(msg, {
    autoClose: 2000,
    style: { background: "#000000", color: "white" },
  });
};
const handleAddToCart = async (productCode, productName) => {
  let request = {
    uniqueKey: uuidv4(), 
    productId: productCode,
    productName: productName, 
    userId: "R1813716x",
    quantity: 1,
  };

  console.log("====> This is Add to Cart Request Body", request);

  try {
    const response = await addToCart(request); 
    if (response.status == 200) {
      notification("Added to Cart Successfully");
    } else {
      toast.error("Error in adding to Cart");
    }
  } catch (error) {
    console.log("Error adding to cart:", error);
    toast.error("Something went wrong. Please try again.");
  }
};
const ProductCard = ({ product }) => (
  <Card className="w-64">
    <CardContent className="p-0 relative">
      <div className="relative group">
        <img
          src={`http://localhost:8086/api/v1/products/uploads/${product.productImage}`}
          alt={product?.productName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button variant="ghost" size="icon" className="bg-white rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2">{product?.productName}</h3>
        <div className="flex gap-2 items-center">
          {product?.onsale ? (
            <>
              <span className="text-red-500 font-bold">
                ${product?.priceOnSale}
              </span>
              <span className="text-gray-400 line-through text-sm">
                ${product?.productPrice}
              </span>
            </>
          ) : (
            <>
              <span className="text-green-400  text-sm">
                ${product?.productPrice}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2"></div>
        <Button
          onClick={() =>
            handleAddToCart(product.productCode, product.productName)
          }
          className="w-full mt-4"
        >
          Add To Cart
        </Button>
      </div>
    </CardContent>
  </Card>
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "All Categories",
    "CLOTHES",
    "FOOD",
    "COMPUTER_ACCESSORIES",
    "KITCHEN",
    "MEN_WARE",
    "GADGETS",
  ];
  //=========================FETCH BY CATEGORY ========================
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        if (selectedCategory == "All Categories") {
          const getAllProductsResponse = await getAllProducts();
          if (getAllProductsResponse.status == 200) {
            setFilteredProducts(getAllProductsResponse.data.body);
          }
        } else {
          const response = await getProductsByCategory(selectedCategory);
          if (response.status == 200) {
            setFilteredProducts(response.data.body);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // const notification = (msg) => {
  //   toast(msg, {
  //     autoClose: 2000,
  //     style: { background: "#000000", color: "white" },
  //   });
  // };

  //=========================Filter By PRODUCT Product Price Range ========================
  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter(
        (product) =>
          product.productPrice >= priceRange[0] &&
          product.productPrice <= priceRange[1]
      )
    );
  }, [priceRange]);

  //=========================FETCH BY PRODUCT FETCH ========================
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setSelectedCategory("All");
      let results = [];
      try {
        if (searchQuery && searchQuery != "") {
          const searchResponse = await searchProduct(searchQuery);
          if (searchResponse.status == 200) {
            results = searchResponse.data.body;
          }
        } else {
          const getAllProductsResponse = await getAllProducts();
          console.log("====> The response is ", getAllProductsResponse);
          console.log(
            "====> The response2 is ",
            getAllProductsResponse.data.body
          );
          results = [...getAllProductsResponse.data.body];
        }
        console.log("========> This is the result array ", results);
        switch (sortBy) {
          case "price-asc":
            results.sort((a, b) => a.productPrice - b.productPrice);
            break;
          case "price-desc":
            results.sort((a, b) => b.productPrice - a.productPrice);
            break;

          default:
            break;
        }
        console.log("=======> this is the result", results);
        setFilteredProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, sortBy]);

  return (
    <div className="max-w-full mx-auto px-4">
      <Banner />
      <ToastContainer/>

      <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-8 my-8">
        <div className="w-64 space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                    selectedCategory === category
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <PriceRangeFilter
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            onPriceChange={setPriceRange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
