
import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Eye, SlidersHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

// Component for price range slider
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

const ProductCard = ({ title, price, originalPrice, discount, rating, reviews, image }) => (
  <Card className="w-64">
    <CardContent className="p-0 relative">
      {discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
          -{discount}%
        </span>
      )}
      <div className="relative group">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
    
          <Button variant="ghost" size="icon" className="bg-white rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2">{title}</h3>
        <div className="flex gap-2 items-center">
          <span className="text-red-500 font-bold">${price}</span>
          <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
      
        </div>
        <Button className="w-full mt-4">Add To Cart</Button>
      </div>
    </CardContent>
  </Card>
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const allProducts = [
    {
      title: "Women's Summer Dress",
      price: 89,
      originalPrice: 120,
      image: "https://plus.unsplash.com/premium_photo-1738779001459-3c2efd2f6e88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      category: "Woman's Fashion"
    },
    {
      title: "Men's Casual Shirt",
      price: 45,
      originalPrice: 60,
      discount: 25,
      image: "https://plus.unsplash.com/premium_photo-1738935668154-08c71a4a63f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
      category: "Men's Fashion"
    },

  ];

  const categories = [
    "All Categories",
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ];

  useEffect(() => {
    setIsLoading(true);
    let results = [...allProducts];

    if (selectedCategory !== 'all' && selectedCategory !== 'All Categories') {
      results = results.filter(product => product.category === selectedCategory);
    }


    if (searchQuery) {
      results = results.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    results = results.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
 
        break;
    }

    setFilteredProducts(results);
    setIsLoading(false);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="max-w-full mx-auto px-4">
            <div className="flex-1">
          <div className="bg-black text-white p-12 rounded-lg relative overflow-hidden">
            <img src="/api/placeholder/400/320" alt="iPhone" className="absolute right-0 top-0 h-full" />
            <div className="w-1/2">
             <img src="/api/placeholder/50/50" alt="Apple logo" className="mb-4" />
              <h2 className="text-4xl font-bold mb-4">iPhone 14 Series</h2>
             <p className="text-3xl mb-6">Up to 10% off Voucher</p>
             <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
               Shop Now
              </Button>
           </div>
         </div>
         </div>

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
            <SelectItem value="rating">Highest Rated</SelectItem>
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
                    selectedCategory === category ? 'bg-gray-100 font-medium' : ''
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
                <ProductCard key={index} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;