"use client"

import { useState, useEffect, useRef } from "react"
import {
  Bot,
  Star,
  Loader,
  ShoppingBag,
  Sparkles,
  Heart,
  ExternalLink,
  Store,
  MapPin,
  Shield,
  Award,
  Smartphone,
  Shirt,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Data Toko Real dari Tokopedia (sama seperti sebelumnya)
const stores = [
  {
    id: "samsung-official",
    name: "Samsung Official Store",
    type: "Official Store",
    rating: 4.9,
    location: "Jakarta",
    followers: "2.1M",
    responseTime: "< 1 jam",
    badges: ["Official Store", "Power Merchant", "Top Brand"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Toko resmi Samsung Indonesia dengan produk elektronik terlengkap",
    specialties: ["elektronik", "smartphone", "tv", "appliances"],
    storeUrl: "https://www.tokopedia.com/samsung-official-store",
    productUrl: "https://www.tokopedia.com/samsung-official-store/product",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "digitechmall",
    name: "Digitech Mall",
    type: "Power Merchant",
    rating: 4.8,
    location: "Jakarta Barat",
    followers: "856k",
    responseTime: "< 2 jam",
    badges: ["Power Merchant", "iPhone Specialist"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Spesialis iPhone dan produk Apple dengan garansi resmi",
    specialties: ["iphone", "apple", "smartphone"],
    storeUrl: "https://www.tokopedia.com/digitechmall",
    productUrl: "https://www.tokopedia.com/digitechmall/product",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "sneakersdept",
    name: "Sneakers Dept",
    type: "Power Merchant",
    rating: 4.7,
    location: "Bandung",
    followers: "423k",
    responseTime: "< 3 jam",
    badges: ["Power Merchant", "Sports Specialist"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Destinasi lengkap outfit olahraga dan sneakers premium",
    specialties: ["olahraga", "sneakers", "sportswear"],
    storeUrl: "https://www.tokopedia.com/sneakersdept",
    productUrl: "https://www.tokopedia.com/sneakersdept/product",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "erigo",
    name: "Erigo Official Store",
    type: "Official Store",
    rating: 4.8,
    location: "Bandung",
    followers: "1.2M",
    responseTime: "< 2 jam",
    badges: ["Official Store", "Local Brand", "Fashion Expert"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Brand fashion lokal terpercaya dengan desain modern dan berkualitas",
    specialties: ["fashion", "kaos", "jaket", "celana"],
    storeUrl: "https://www.tokopedia.com/erigo",
    productUrl: "https://www.tokopedia.com/erigo/product",
    icon: <Shirt className="w-5 h-5" />,
  },
  {
    id: "tenuedeattire",
    name: "Tenue de Attire",
    type: "Power Merchant",
    rating: 4.6,
    location: "Jakarta Selatan",
    followers: "234k",
    responseTime: "< 4 jam",
    badges: ["Power Merchant", "Formal Wear"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Kemeja formal dan business attire berkualitas premium",
    specialties: ["kemeja", "formal", "business"],
    storeUrl: "https://www.tokopedia.com/tenuedeattire",
    productUrl: "https://www.tokopedia.com/tenuedeattire/product",
    icon: <Shirt className="w-5 h-5" />,
  },
  {
    id: "footstepfootwear",
    name: "Footstep Footwear",
    type: "Power Merchant",
    rating: 4.7,
    location: "Surabaya",
    followers: "189k",
    responseTime: "< 3 jam",
    badges: ["Power Merchant", "Shoe Specialist"],
    avatar: "/placeholder.svg?height=60&width=60",
    description: "Koleksi sepatu formal dan kasual untuk pria dan wanita",
    specialties: ["sepatu", "formal", "leather"],
    storeUrl: "https://www.tokopedia.com/footstepfootwear",
    productUrl: "https://www.tokopedia.com/footstepfootwear/product",
    icon: <Award className="w-5 h-5" />,
  },
]

// Data Produk yang Diperluas - Menambah lebih banyak produk per toko
const initialProducts = [
  // Samsung Official Store - Lebih banyak produk
  {
    id: "p1",
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: "Rp 18.999.000",
    originalPrice: "Rp 20.999.000",
    discount: 10,
    rating: 4.9,
    sold: "3.2k",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Flagship Samsung dengan S Pen dan kamera 200MP",
    specifications: ["Snapdragon 8 Gen 3", "12GB RAM", "256GB Storage", "200MP Camera"],
  },
  {
    id: "p2",
    name: "Samsung Smart TV 55 inch QLED 4K",
    price: "Rp 12.999.000",
    originalPrice: "Rp 14.999.000",
    discount: 13,
    rating: 4.8,
    sold: "1.8k",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Smart TV QLED dengan teknologi Quantum Dot",
    specifications: ["55 inch QLED", "4K Resolution", "Smart TV", "HDR10+"],
  },
  {
    id: "p3",
    name: "Samsung Galaxy Buds3 Pro",
    price: "Rp 3.499.000",
    originalPrice: "Rp 3.999.000",
    discount: 13,
    rating: 4.7,
    sold: "5.1k",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Earbuds premium dengan ANC dan audio berkualitas tinggi",
    specifications: ["Active Noise Cancelling", "Wireless Charging", "IPX7", "8 Hours Battery"],
  },
  // Tambahan produk Samsung yang tidak ditampilkan di rating
  {
    id: "p17",
    name: "Samsung Galaxy Watch 6 Classic",
    price: "Rp 5.999.000",
    originalPrice: "Rp 6.999.000",
    discount: 14,
    rating: 4.8,
    sold: "2.3k",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Smartwatch premium dengan rotating bezel dan health monitoring",
    specifications: ["Wear OS", "Health Sensors", "GPS", "Water Resistant"],
  },
  {
    id: "p18",
    name: "Samsung Galaxy Tab S9 Ultra",
    price: "Rp 16.999.000",
    originalPrice: "Rp 18.999.000",
    discount: 11,
    rating: 4.9,
    sold: "1.1k",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Tablet premium untuk produktivitas dan kreativitas",
    specifications: ["14.6 inch Display", "S Pen Included", "Snapdragon 8 Gen 2", "12GB RAM"],
  },
  {
    id: "p19",
    name: "Samsung Refrigerator Side by Side",
    price: "Rp 24.999.000",
    originalPrice: "Rp 27.999.000",
    discount: 11,
    rating: 4.6,
    sold: "456",
    storeId: "samsung-official",
    features: { kategori: "elektronik", brand: "Samsung", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kulkas side by side dengan teknologi Twin Cooling Plus",
    specifications: ["Twin Cooling Plus", "Digital Inverter", "Water Dispenser", "Ice Maker"],
  },

  // Digitech Mall (iPhone) - Tambahan produk
  {
    id: "p4",
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    price: "Rp 21.999.000",
    originalPrice: "Rp 22.999.000",
    discount: 4,
    rating: 4.9,
    sold: "2.1k",
    storeId: "digitechmall",
    features: { kategori: "elektronik", brand: "Apple", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "iPhone terbaru dengan chip A17 Pro dan kamera 48MP",
    specifications: ["A17 Pro Chip", "48MP Pro Camera", "256GB Storage", "Titanium Design"],
  },
  {
    id: "p5",
    name: "iPhone 14 128GB Blue",
    price: "Rp 13.999.000",
    originalPrice: "Rp 15.999.000",
    discount: 13,
    rating: 4.8,
    sold: "4.3k",
    storeId: "digitechmall",
    features: { kategori: "elektronik", brand: "Apple", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "iPhone 14 dengan performa powerful dan kamera canggih",
    specifications: ["A15 Bionic Chip", "Dual Camera", "128GB Storage", "6.1 inch Display"],
  },
  {
    id: "p6",
    name: "AirPods Pro 2nd Generation",
    price: "Rp 3.799.000",
    originalPrice: "Rp 4.199.000",
    discount: 10,
    rating: 4.9,
    sold: "6.7k",
    storeId: "digitechmall",
    features: { kategori: "elektronik", brand: "Apple", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "AirPods Pro dengan Active Noise Cancellation terbaru",
    specifications: ["H2 Chip", "Active Noise Cancellation", "Spatial Audio", "MagSafe Charging"],
  },
  // Tambahan produk Apple
  {
    id: "p20",
    name: "MacBook Air M3 13 inch",
    price: "Rp 18.999.000",
    originalPrice: "Rp 20.999.000",
    discount: 10,
    rating: 4.9,
    sold: "1.8k",
    storeId: "digitechmall",
    features: { kategori: "elektronik", brand: "Apple", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "MacBook Air terbaru dengan chip M3 yang powerful",
    specifications: ["M3 Chip", "8GB RAM", "256GB SSD", "13.6 inch Display"],
  },
  {
    id: "p21",
    name: "iPad Pro 12.9 inch M2",
    price: "Rp 16.999.000",
    originalPrice: "Rp 18.999.000",
    discount: 11,
    rating: 4.8,
    sold: "1.2k",
    storeId: "digitechmall",
    features: { kategori: "elektronik", brand: "Apple", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "iPad Pro dengan chip M2 untuk produktivitas maksimal",
    specifications: ["M2 Chip", "12.9 inch Display", "Apple Pencil Support", "Face ID"],
  },

  // Sneakers Dept - Tambahan produk
  {
    id: "p7",
    name: "Nike Air Max 270 React",
    price: "Rp 1.899.000",
    originalPrice: "Rp 2.299.000",
    discount: 17,
    rating: 4.8,
    sold: "3.4k",
    storeId: "sneakersdept",
    features: { kategori: "olahraga", brand: "Nike", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu running dengan teknologi Air Max dan React foam",
    specifications: ["Air Max Technology", "React Foam", "Mesh Upper", "Rubber Outsole"],
  },
  {
    id: "p8",
    name: "Adidas Ultraboost 22",
    price: "Rp 2.599.000",
    originalPrice: "Rp 2.999.000",
    discount: 13,
    rating: 4.7,
    sold: "2.1k",
    storeId: "sneakersdept",
    features: { kategori: "olahraga", brand: "Adidas", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu lari premium dengan teknologi Boost",
    specifications: ["Boost Technology", "Primeknit Upper", "Continental Rubber", "Energy Return"],
  },
  {
    id: "p9",
    name: "Under Armour Training Set",
    price: "Rp 899.000",
    originalPrice: "Rp 1.199.000",
    discount: 25,
    rating: 4.6,
    sold: "1.8k",
    storeId: "sneakersdept",
    features: { kategori: "olahraga", brand: "Under Armour", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Set training lengkap dengan teknologi moisture-wicking",
    specifications: ["Moisture-Wicking", "4-Way Stretch", "Anti-Odor", "Complete Set"],
  },
  // Tambahan produk olahraga
  {
    id: "p22",
    name: "Puma RS-X Reinvention",
    price: "Rp 1.599.000",
    originalPrice: "Rp 1.899.000",
    discount: 16,
    rating: 4.7,
    sold: "2.8k",
    storeId: "sneakersdept",
    features: { kategori: "olahraga", brand: "Puma", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sneakers retro dengan teknologi modern untuk gaya kasual",
    specifications: ["RS Technology", "Mesh Upper", "Rubber Sole", "Retro Design"],
  },
  {
    id: "p23",
    name: "New Balance 990v5",
    price: "Rp 2.299.000",
    originalPrice: "Rp 2.699.000",
    discount: 15,
    rating: 4.8,
    sold: "1.9k",
    storeId: "sneakersdept",
    features: { kategori: "olahraga", brand: "New Balance", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu premium dengan kenyamanan dan durabilitas tinggi",
    specifications: ["ENCAP Technology", "Suede Upper", "Made in USA", "Premium Comfort"],
  },

  // Erigo - Tambahan produk
  {
    id: "p10",
    name: "Erigo T-Shirt Oversize Premium",
    price: "Rp 199.000",
    originalPrice: "Rp 249.000",
    discount: 20,
    rating: 4.7,
    sold: "12.3k",
    storeId: "erigo",
    features: { kategori: "fashion", brand: "Erigo", performa: "standar", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kaos oversize dengan bahan cotton combed premium",
    specifications: ["Cotton Combed 30s", "Oversize Fit", "Screen Printing", "Various Colors"],
  },
  {
    id: "p11",
    name: "Erigo Jacket Bomber Premium",
    price: "Rp 459.000",
    originalPrice: "Rp 599.000",
    discount: 23,
    rating: 4.8,
    sold: "5.6k",
    storeId: "erigo",
    features: { kategori: "fashion", brand: "Erigo", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Jaket bomber dengan desain modern dan bahan berkualitas",
    specifications: ["Premium Material", "Bomber Style", "Full Zip", "Multiple Pockets"],
  },
  {
    id: "p12",
    name: "Erigo Chino Pants Slim Fit",
    price: "Rp 299.000",
    originalPrice: "Rp 399.000",
    discount: 25,
    rating: 4.6,
    sold: "8.9k",
    storeId: "erigo",
    features: { kategori: "fashion", brand: "Erigo", performa: "standar", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Celana chino dengan potongan slim fit yang nyaman",
    specifications: ["Cotton Twill", "Slim Fit", "Belt Loops", "Side Pockets"],
  },
  // Tambahan produk Erigo
  {
    id: "p24",
    name: "Erigo Hoodie Fleece Premium",
    price: "Rp 399.000",
    originalPrice: "Rp 499.000",
    discount: 20,
    rating: 4.8,
    sold: "4.2k",
    storeId: "erigo",
    features: { kategori: "fashion", brand: "Erigo", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Hoodie fleece dengan kualitas premium dan desain modern",
    specifications: ["Fleece Material", "Kangaroo Pocket", "Adjustable Hood", "Ribbed Cuffs"],
  },
  {
    id: "p25",
    name: "Erigo Polo Shirt Classic",
    price: "Rp 249.000",
    originalPrice: "Rp 319.000",
    discount: 22,
    rating: 4.6,
    sold: "6.8k",
    storeId: "erigo",
    features: { kategori: "fashion", brand: "Erigo", performa: "standar", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Polo shirt klasik untuk gaya kasual yang elegan",
    specifications: ["Cotton Pique", "Classic Fit", "Collar Design", "Button Placket"],
  },

  // Tenue de Attire - Tambahan produk
  {
    id: "p13",
    name: "Kemeja Formal Slim Fit Premium",
    price: "Rp 399.000",
    originalPrice: "Rp 499.000",
    discount: 20,
    rating: 4.7,
    sold: "3.2k",
    storeId: "tenuedeattire",
    features: { kategori: "fashion", brand: "Tenue de Attire", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kemeja formal dengan bahan premium dan potongan slim fit",
    specifications: ["Premium Cotton", "Slim Fit", "Non-Iron", "French Seam"],
  },
  {
    id: "p14",
    name: "Business Shirt Long Sleeve",
    price: "Rp 349.000",
    originalPrice: "Rp 449.000",
    discount: 22,
    rating: 4.6,
    sold: "2.8k",
    storeId: "tenuedeattire",
    features: { kategori: "fashion", brand: "Tenue de Attire", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kemeja bisnis dengan kualitas premium untuk profesional",
    specifications: ["Business Grade", "Wrinkle Resistant", "Classic Collar", "Cuff Links Ready"],
  },
  // Tambahan produk kemeja
  {
    id: "p26",
    name: "Tuxedo Shirt Black Tie",
    price: "Rp 599.000",
    originalPrice: "Rp 799.000",
    discount: 25,
    rating: 4.8,
    sold: "1.1k",
    storeId: "tenuedeattire",
    features: { kategori: "fashion", brand: "Tenue de Attire", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kemeja tuxedo untuk acara formal dan black tie event",
    specifications: ["Tuxedo Style", "Wing Collar", "French Cuffs", "Pleated Front"],
  },
  {
    id: "p27",
    name: "Casual Shirt Linen Blend",
    price: "Rp 299.000",
    originalPrice: "Rp 399.000",
    discount: 25,
    rating: 4.5,
    sold: "3.9k",
    storeId: "tenuedeattire",
    features: { kategori: "fashion", brand: "Tenue de Attire", performa: "standar", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Kemeja kasual dengan campuran linen untuk kenyamanan maksimal",
    specifications: ["Linen Blend", "Casual Fit", "Breathable", "Easy Care"],
  },

  // Footstep Footwear - Tambahan produk
  {
    id: "p15",
    name: "Oxford Leather Shoes Premium",
    price: "Rp 899.000",
    originalPrice: "Rp 1.199.000",
    discount: 25,
    rating: 4.8,
    sold: "1.9k",
    storeId: "footstepfootwear",
    features: { kategori: "sepatu", brand: "Footstep", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu oxford kulit asli untuk acara formal dan bisnis",
    specifications: ["Genuine Leather", "Oxford Style", "Leather Sole", "Handcrafted"],
  },
  {
    id: "p16",
    name: "Loafers Casual Formal",
    price: "Rp 699.000",
    originalPrice: "Rp 899.000",
    discount: 22,
    rating: 4.7,
    sold: "2.4k",
    storeId: "footstepfootwear",
    features: { kategori: "sepatu", brand: "Footstep", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu loafers yang cocok untuk casual maupun formal",
    specifications: ["Synthetic Leather", "Slip-On Style", "Cushioned Insole", "Flexible Sole"],
  },
  // Tambahan produk sepatu
  {
    id: "p28",
    name: "Derby Shoes Classic Brown",
    price: "Rp 799.000",
    originalPrice: "Rp 999.000",
    discount: 20,
    rating: 4.7,
    sold: "1.6k",
    storeId: "footstepfootwear",
    features: { kategori: "sepatu", brand: "Footstep", performa: "tinggi", harga: "menengah" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu derby klasik dengan warna coklat yang elegan",
    specifications: ["Full Grain Leather", "Derby Style", "Goodyear Welt", "Classic Brown"],
  },
  {
    id: "p29",
    name: "Monk Strap Shoes Black",
    price: "Rp 1.099.000",
    originalPrice: "Rp 1.399.000",
    discount: 21,
    rating: 4.8,
    sold: "987",
    storeId: "footstepfootwear",
    features: { kategori: "sepatu", brand: "Footstep", performa: "tinggi", harga: "premium" },
    image: "/placeholder.svg?height=100&width=100",
    description: "Sepatu monk strap premium untuk gaya formal yang distinctive",
    specifications: ["Premium Leather", "Double Monk Strap", "Blake Construction", "Italian Style"],
  },
]

// Komponen Store Card (sama seperti sebelumnya)
const StoreCard = ({ store, isSelected, onSelect, productCount }) => (
  <Card
    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
      isSelected ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-gray-50"
    }`}
    onClick={() => onSelect(store.id)}
  >
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white">
          {store.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{store.name}</h3>
            {store.type === "Official Store" && <Shield className="w-4 h-4 text-blue-500" />}
          </div>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{store.rating}</span>
            <span className="text-xs text-gray-400">•</span>
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">{store.location}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {store.badges.slice(0, 2).map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                {badge}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{store.followers} followers</span>
            <span>{productCount} produk</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 text-xs h-7 bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              window.open(store.storeUrl, "_blank")
            }}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Kunjungi Toko
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Komponen Product Card (sama seperti sebelumnya)
const ProductCard = ({ product, onRate, isRated, userRating, store }) => {
  const [hoveredStar, setHoveredStar] = useState(0)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg bg-gray-100"
            />
            {product.discount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">{product.name}</h3>
              <Button variant="ghost" size="sm" className="p-1 h-auto text-gray-400 hover:text-red-500">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-green-600">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-xs text-gray-400">• {product.sold} terjual</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Store className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-600">{store?.name}</span>
              {store?.type === "Official Store" && <Shield className="w-3 h-3 text-blue-500" />}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onRate(product, rating)}
                    onMouseEnter={() => setHoveredStar(rating)}
                    onMouseLeave={() => setHoveredStar(0)}
                    disabled={isRated}
                    className={`p-1 rounded transition-colors duration-200 ${
                      isRated ? "cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
                  >
                    <Star
                      size={16}
                      className={`${
                        hoveredStar >= rating || userRating >= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } ${isRated ? "opacity-50" : ""}`}
                    />
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => window.open(store?.productUrl, "_blank")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Lihat
              </Button>
            </div>

            {isRated && <p className="text-xs text-green-600 mt-1 font-medium">✓ Rating diberikan: {userRating}/5</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Komponen untuk menampilkan rekomendasi yang diperbaiki
const SmartRecommendationCard = ({ product, rank, store, reason }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
    <CardContent className="p-4">
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg bg-gray-100"
          />
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {rank}
          </div>
          {product.discount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-green-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
            )}
            <Badge variant="secondary" className="text-xs">
              {product.sold} terjual
            </Badge>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">• {product.features.brand}</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white">
              {store?.icon}
            </div>
            <span className="text-sm text-gray-600">{store?.name}</span>
            {store?.type === "Official Store" && <Shield className="w-4 h-4 text-blue-500" />}
          </div>

          {/* Alasan rekomendasi */}
          <div className="bg-blue-50 p-2 rounded-lg mb-3">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Mengapa direkomendasikan:</span>
            </div>
            <p className="text-xs text-blue-700">{reason}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Skor: {product.predictedRating?.toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open(store?.storeUrl, "_blank")}>
                <Store className="w-3 h-3 mr-1" />
                Toko
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open(store?.productUrl, "_blank")}
              >
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Komponen utama aplikasi
export default function ImprovedRecommendationSystem() {
  const [userRatings, setUserRatings] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [selectedStore, setSelectedStore] = useState("samsung-official")
  const [activeTab, setActiveTab] = useState("stores")
  const [recommendationType, setRecommendationType] = useState("smart") // "smart", "store-only", "cross-store"

  const chatEndRef = useRef(null)

  const selectedStoreData = stores.find((store) => store.id === selectedStore)
  const storeProducts = initialProducts.filter((product) => product.storeId === selectedStore)
  const ratedProductIds = Object.keys(userRatings)

  // Hanya tampilkan beberapa produk untuk rating (tidak semua)
  const productsForRating = storeProducts.slice(0, 4)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [recommendations])

  const handleRateProduct = (product, rating) => {
    const newRatings = { ...userRatings, [product.id]: rating }
    setUserRatings(newRatings)
  }

  const calculateSmartRecommendations = () => {
    if (Object.keys(userRatings).length < 2) {
      alert("Silakan beri rating minimal 2 produk untuk mendapatkan rekomendasi yang akurat.")
      return
    }

    setIsCalculating(true)

    setTimeout(() => {
      // ALGORITMA REKOMENDASI YANG DIPERBAIKI
      const calculateSimilarity = (productA, productB) => {
        let similarityScore = 0
        const featuresA = productA.features
        const featuresB = productB.features

        // Bobot untuk toko yang sama (lebih tinggi)
        if (productA.storeId === productB.storeId) {
          similarityScore += 4
        }

        // Bobot untuk brand yang sama
        if (featuresA.brand === featuresB.brand) {
          similarityScore += 3
        }

        // Bobot untuk kategori yang sama
        if (featuresA.kategori === featuresB.kategori) {
          similarityScore += 2
        }

        // Bobot untuk performa yang sama
        if (featuresA.performa === featuresB.performa) {
          similarityScore += 1
        }

        // Bobot untuk harga range yang sama
        if (featuresA.harga === featuresB.harga) {
          similarityScore += 1
        }

        return similarityScore
      }

      // Ambil produk yang diberi rating tinggi (4-5 bintang)
      const highRatedProducts = Object.keys(userRatings)
        .filter((productId) => userRatings[productId] >= 4)
        .map((productId) => initialProducts.find((p) => p.id === productId))
        .filter(Boolean)

      // Jika tidak ada produk dengan rating tinggi, gunakan semua produk yang diberi rating
      const referenceProducts =
        highRatedProducts.length > 0
          ? highRatedProducts
          : Object.keys(userRatings)
              .map((productId) => initialProducts.find((p) => p.id === productId))
              .filter(Boolean)

      let candidateProducts = []

      if (recommendationType === "smart" || recommendationType === "cross-store") {
        // REKOMENDASI LINTAS TOKO - Cari produk serupa dari semua toko
        candidateProducts = initialProducts.filter((p) => !userRatings.hasOwnProperty(p.id))
      } else {
        // REKOMENDASI DALAM TOKO - Hanya dari toko yang dipilih
        candidateProducts = initialProducts.filter(
          (p) => p.storeId === selectedStore && !userRatings.hasOwnProperty(p.id),
        )
      }

      const predictions = []

      candidateProducts.forEach((candidate) => {
        let weightedSum = 0
        let similaritySum = 0
        const reasons = []

        referenceProducts.forEach((reference) => {
          const similarity = calculateSimilarity(candidate, reference)
          if (similarity > 0) {
            const userRating = userRatings[reference.id]
            weightedSum += similarity * userRating
            similaritySum += similarity

            // Buat alasan rekomendasi
            if (candidate.storeId === reference.storeId) {
              reasons.push(`Dari toko yang sama dengan ${reference.name} yang Anda sukai`)
            }
            if (candidate.features.brand === reference.features.brand) {
              reasons.push(`Brand ${candidate.features.brand} seperti produk yang Anda rating tinggi`)
            }
            if (candidate.features.kategori === reference.features.kategori) {
              reasons.push(`Kategori ${candidate.features.kategori} sesuai preferensi Anda`)
            }
          }
        })

        const predictedRating = similaritySum > 0 ? weightedSum / similaritySum : 0

        if (predictedRating > 0) {
          // Ambil alasan terbaik (maksimal 2)
          const uniqueReasons = [...new Set(reasons)].slice(0, 2)
          const reason = uniqueReasons.length > 0 ? uniqueReasons.join(" dan ") : "Produk serupa dengan preferensi Anda"

          predictions.push({
            ...candidate,
            predictedRating,
            reason,
          })
        }
      })

      // Urutkan berdasarkan predicted rating dan ambil top 8
      predictions.sort((a, b) => b.predictedRating - a.predictedRating)
      const topRecommendations = predictions.slice(0, 8)

      setRecommendations(topRecommendations)
      setActiveTab("recommendations")
      setIsCalculating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Product Recommendations</h1>
                <p className="text-sm text-gray-600">Rekomendasi cerdas berdasarkan preferensi Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {ratedProductIds.length} produk dinilai
              </Badge>
              {selectedStoreData && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {selectedStoreData.icon}
                  {selectedStoreData.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stores" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Pilih Toko
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Rating Produk
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Rekomendasi Cerdas
            </TabsTrigger>
          </TabsList>

          {/* Tab Pilih Toko */}
          <TabsContent value="stores" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Pilih Toko untuk Memulai
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Pilih toko yang ingin Anda jelajahi. Sistem akan memberikan rekomendasi berdasarkan produk dari toko
                  ini dan toko lainnya yang serupa.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stores.map((store) => {
                    const storeProductCount = initialProducts.filter((p) => p.storeId === store.id).length
                    return (
                      <StoreCard
                        key={store.id}
                        store={store}
                        isSelected={selectedStore === store.id}
                        onSelect={setSelectedStore}
                        productCount={storeProductCount}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Rating Produk */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {selectedStoreData?.icon}
                      Sample Produk dari {selectedStoreData?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Beri rating pada beberapa produk sample ini. Sistem akan mencari produk serupa dari toko ini dan
                      toko lainnya.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={recommendationType} onValueChange={setRecommendationType}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smart">Rekomendasi Cerdas</SelectItem>
                        <SelectItem value="store-only">Hanya Toko Ini</SelectItem>
                        <SelectItem value="cross-store">Lintas Semua Toko</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={calculateSmartRecommendations}
                      disabled={isCalculating || ratedProductIds.length < 2}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isCalculating ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Menghitung...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Dapatkan Rekomendasi
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productsForRating.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRate={handleRateProduct}
                      isRated={ratedProductIds.includes(product.id)}
                      userRating={userRatings[product.id]}
                      store={selectedStoreData}
                    />
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-800 mb-1">Cara Kerja Sistem Rekomendasi Baru</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Sistem akan mencari produk serupa dari SEMUA toko, bukan hanya toko yang dipilih</li>
                        <li>• Produk dengan rating tinggi (4-5 bintang) menjadi referensi untuk mencari yang serupa</li>
                        <li>• Rekomendasi berdasarkan brand, kategori, dan karakteristik produk yang Anda sukai</li>
                        <li>• Anda akan mendapat penjelasan mengapa produk tersebut direkomendasikan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Rekomendasi */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-500" />
                      Rekomendasi Cerdas Untuk Anda
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Berdasarkan produk yang Anda sukai, berikut adalah rekomendasi dari berbagai toko terpercaya
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("products")}>
                    Rating Lagi
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {recommendations.map((product, index) => {
                      const productStore = stores.find((s) => s.id === product.storeId)
                      return (
                        <SmartRecommendationCard
                          key={product.id}
                          product={product}
                          rank={index + 1}
                          store={productStore}
                          reason={product.reason}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Rekomendasi</h3>
                    <p className="text-gray-600 mb-4">
                      Berikan rating pada minimal 2 produk untuk mendapatkan rekomendasi cerdas
                    </p>
                    <Button onClick={() => setActiveTab("products")}>Mulai Rating Produk</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {recommendations.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800 mb-1">Mengapa Sistem Ini Lebih Baik?</p>
                      <p className="text-sm text-green-700">
                        Sistem rekomendasi baru tidak terbatas pada produk yang belum Anda rating atau hanya dari satu
                        toko. Sistem mencari produk serupa berdasarkan karakteristik produk yang Anda sukai dari SEMUA
                        toko yang tersedia. Ini memberikan pilihan yang lebih luas dan akurat sesuai preferensi Anda.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
