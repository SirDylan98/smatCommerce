import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Banner = () => {
  return (
    <div className="w-full mx-auto p-4">
      <div className="bg-black text-white rounded-2xl relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        
        {/* Main banner image */}
        <div className="absolute right-0 top-0 h-full w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdMHUCIfO_3zQ_yCO3PVORVCPPQqaDjaOPw&s"
            alt="iPhone showcase"
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        {/* Content section */}
        <div className="relative z-20 p-12 max-w-[600px]">
          {/* Logo section */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEUAAAD///9DQ0P7/PvKzMnZ3d6tsKzz9PKLjYrX2db4+fh7fnrm5+Wkp6PHycYVGRTR09Cvs7UOEA1KTUqQk4+4ureqrKoeIR03OjYcHhwYGRducGycn5t1eHQ8PjuRkpAoKyZXWlcHDgNiZWAuMC1RUlASFhBYVk/i4d63trFkYl0sKiQXFQseHBZ1cmzt6+c5MiwXDQB/eXhoYGEfGBgVDQ6hm5tWUlJEPz+PiYmDf36ppqkiHyM5Njl4dHjHxMcdIyUTGBo0PD9DS00mZxnlAAAEiUlEQVR4nO3c21raQBQF4IwBE0KEpArSAirVWmw9tNV6rDXa93+nCjF8CTOgldnsbbr+67nYi2SOJHEcAAAAAAAAAAAAAAAAAAAAAAAAAPifvFvfaLW5i6CzWa8ESqngHXchRDqrnkq95y6FRLOlJja5i6HgK1XqhJ1aPqD7gbse67pBPqA64a7Hug1VVOMuyLbeVEDV4q7IMi2g6nOXZFddC6i2uGuyal0PWLJuGOoJt7lrsmpND+jucBdlU0cPWLKRtGJI2OEuyqZB6S9hw5CwyV2UTVuGgD53UVbpqxkVcddk11AL6O1x12TVjn4JB9w12dXXAna5S7JsdTpgyfYU2lwRlO0KOk7hbEYNy7VnGitsK9a4q6GQSxi9/cVos6mf1EdP8dzG9CSxv9n8uJy6bNjs9irD8OQkDGstvxBlPNJ4kZ+/flv9cWvPC4e1tf5buLJ+rXgU6lX8ydXZ7fndlfxfFIN26BZau8MN2cffnZYyierGxm3P2LqyvuyyX2zPnG+ssVv8e2nHr81uHAnN2HNn15zerp/SO3D/kx/Nb6tWBW4aV/R9gyHl43BSC80351TLXe5A0wzHvAvqcUcq0tbUFlS4Q+WZjl8WV5MzcZiOCG0I97mTPaG5giND7mipA7KAQs6ppv/PtWuVO575FNuexgp3PuOfZdaIOOag7IQiZovPhAFl/GPzksXoKx1wZxs7pgvY4M6WmrPHW5CQuZ6uFwZfubOl6AbSY+5oqcOXbGVfRUgndL5QBVRC7lG6m1TGROEQLtgOuZM9OaIKKKUX0k33X7iTZdpEAb0j7mQZqsMLOWdsJ0QJ5TyLSRRQTjekSuhecgfLfCVKKGeguSRKKOftkhWihCF3sAkkfK3y36WelHU3WcJAzMNgpiearRAz43+jSnjNnSzznSqhmO0h2bpUznRBdtIm5nmh6PlaX0fMFxbIjto87mSZc6qE6gd3tCenZAmljDVnZAnFTIlkg6nyfnJnS1E9CqXEnOvTDTVSBpsLwoQyzqPO6DriY1c84443QraqGQklRLyiTKg8ATcq1TY/85s7IOkDQ2MH7PMi5Xwx5nGvbqjOvXNC5pmR+jYdcS84E9KOpinm7eISEp7zJpzzMpctvAGXMNbcMCekXbmN/OJOSHeWkYq5AzpOlTSge8udz3F+kyYUcAlpL2LA3gtHKHsi81yYobuIUk6/6ebEU+5omZgo4B13sAmiIykZw0zqmiThFXesPIq1m4j3RyduCRIKWM3k2f/igLivZNm+T+U8kZFJguer/gfePXcg3a7VhCK/xXdjMaCcp9kL7P1jKuMVYANbL0JVuYPMlNhZvYUCR5nMg40B1Uu4Y8zzsPhVDBPuEPPtze6LbhjF2/617/fi6uwfoppwR3iWeUR17+r5j3jcD3rmkwE5W8I5tg133naitxvc6Q3fyIehk6n39qqzPlGSTB0O3CXLLHMhD/Gko3nxn3kt/WowafiwrPLsGNTX4rjXnxtvbK/rt+P2tciFKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBn9BcakTE8Z0+SZAAAAAElFTkSuQmCC"
              alt="Apple logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-semibold">Apple</span>
          </div>
          
          {/* Main content */}
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            iPhone 14 Series
            <br />
            <span className="text-4xl text-gray-300">Next-gen Technology</span>
          </h2>
          
          {/* Offer section */}
          <div className="bg-white/10 backdrop-blur-sm inline-block px-6 py-3 rounded-full mb-8">
            <p className="text-2xl font-medium">
              Special Offer: <span className="text-yellow-400">10% OFF</span>
            </p>
          </div>
          
          {/* CTA section */}
          <div className="flex gap-4 items-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
              <ShoppingBag size={20} />
              Shop Now
            </button>
            <button className="border border-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors">
              Learn More
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;