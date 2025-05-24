"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Search,
  Filter,
  Star,
  Eye,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  Tag,
  Minus,
  Plus,
  X,
  ShoppingBag,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  subcategory: string
  images: string[]
  description: string
  features: string[]
  rating: number
  reviewCount: number
  stock: number
  isNew: boolean
  isBestseller: boolean
  isAiraChoice: boolean
  colors: string[]
  sizes: string[]
  tags: string[]
  isFavorite: boolean
  isRecommended: boolean
  badge?: string
}

interface CartItem {
  productId: string
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

const categories = ["전체", "패션", "뷰티", "액세서리", "라이프스타일"]
const subcategories = {
  패션: ["상의", "하의", "원피스", "아우터", "신발"],
  뷰티: ["스킨케어", "메이크업", "헤어케어", "향수"],
  액세서리: ["가방", "주얼리", "시계", "선글라스"],
  라이프스타일: ["홈데코", "테크", "운동", "여행"],
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "실크 블라우스",
    brand: "AIRA Collection",
    price: 89000,
    originalPrice: 120000,
    discount: 26,
    category: "패션",
    subcategory: "상의",
    images: ["/images/aira.png", "/images/aira.png"],
    description: "부드러운 실크 소재로 제작된 우아한 블라우스입니다. 데일리부터 오피스룩까지 다양하게 활용 가능해요.",
    features: ["100% 실크", "드라이클리닝", "슬림핏", "한국 제조"],
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    isNew: false,
    isBestseller: true,
    isAiraChoice: true,
    colors: ["화이트", "블랙", "네이비", "베이지"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["오피스룩", "데이트", "우아함"],
    isFavorite: false,
    isRecommended: true,
  },
  {
    id: "2",
    name: "글로우 세럼",
    brand: "Beauty Lab",
    price: 45000,
    category: "뷰티",
    subcategory: "스킨케어",
    images: ["/images/aira.png"],
    description: "비타민C와 히알루론산이 함유된 글로우 세럼으로 촉촉하고 빛나는 피부를 만들어줍니다.",
    features: ["비타민C 10%", "히알루론산", "무향료", "비건 제품"],
    rating: 4.6,
    reviewCount: 89,
    stock: 32,
    isNew: true,
    isBestseller: false,
    isAiraChoice: true,
    colors: [],
    sizes: ["30ml"],
    tags: ["글로우", "보습", "비타민C"],
    isFavorite: false,
    isRecommended: true,
  },
  {
    id: "3",
    name: "미니 크로스백",
    brand: "Luxury Line",
    price: 180000,
    originalPrice: 220000,
    discount: 18,
    category: "액세서리",
    subcategory: "가방",
    images: ["/images/aira.png", "/images/aira.png"],
    description: "고급 가죽으로 제작된 미니 크로스백입니다. 컴팩트하면서도 실용적인 디자인이 매력적이에요.",
    features: ["진짜 가죽", "조절 가능한 스트랩", "내부 포켓", "골드 하드웨어"],
    rating: 4.9,
    reviewCount: 67,
    stock: 8,
    isNew: false,
    isBestseller: true,
    isAiraChoice: false,
    colors: ["블랙", "브라운", "화이트"],
    sizes: [],
    tags: ["미니백", "크로스백", "데일리"],
    isFavorite: false,
    isRecommended: false,
  },
  {
    id: "4",
    name: "와이드 데님",
    brand: "Denim Studio",
    price: 95000,
    category: "패션",
    subcategory: "하의",
    images: ["/images/aira.png"],
    description: "편안한 와이드 핏의 데님 팬츠입니다. 트렌디하면서도 편안한 착용감을 제공해요.",
    features: ["100% 코튼", "와이드 핏", "하이웨스트", "스트레치"],
    rating: 4.4,
    reviewCount: 156,
    stock: 25,
    isNew: true,
    isBestseller: false,
    isAiraChoice: true,
    colors: ["라이트블루", "다크블루", "블랙"],
    sizes: ["25", "26", "27", "28", "29"],
    tags: ["와이드", "데님", "캐주얼"],
    isFavorite: false,
    isRecommended: false,
  },
  {
    id: "5",
    name: "매트 립스틱",
    brand: "Color Me",
    price: 28000,
    category: "뷰티",
    subcategory: "메이크업",
    images: ["/images/aira.png"],
    description: "부드럽고 매트한 질감의 립스틱입니다. 오래 지속되며 다양한 컬러로 만나보세요.",
    features: ["매트 피니시", "12시간 지속", "비건", "파라벤 프리"],
    rating: 4.7,
    reviewCount: 203,
    stock: 45,
    isNew: false,
    isBestseller: true,
    isAiraChoice: false,
    colors: ["코랄", "레드", "핑크", "베리"],
    sizes: [],
    tags: ["매트", "립스틱", "롱래스팅"],
    isFavorite: false,
    isRecommended: true,
  },
  {
    id: "6",
    name: "골드 체인 목걸이",
    brand: "Jewelry Box",
    price: 65000,
    originalPrice: 85000,
    discount: 24,
    category: "액세서리",
    subcategory: "주얼리",
    images: ["/images/aira.png"],
    description: "세련된 골드 체인 목걸이입니다. 심플하면서도 고급스러운 디자인으로 어떤 옷에도 잘 어울려요.",
    features: ["14K 골드 도금", "알레르기 프리", "조절 가능", "선물 포장"],
    rating: 4.5,
    reviewCount: 78,
    stock: 12,
    isNew: false,
    isBestseller: false,
    isAiraChoice: true,
    colors: ["골드"],
    sizes: [],
    tags: ["목걸이", "골드", "심플"],
    isFavorite: false,
    isRecommended: false,
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedSubcategory, setSelectedSubcategory] = useState("전체")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by subcategory
    if (selectedSubcategory !== "전체") {
      filtered = filtered.filter((product) => product.subcategory === selectedSubcategory)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.reviewCount - a.reviewCount
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return a.isNew ? -1 : 1
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedSubcategory, sortBy, priceRange])

  const addToCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.productId === productId && item.selectedColor === color && item.selectedSize === size,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...prev, { productId, quantity: 1, selectedColor: color, selectedSize: size }]
      }
    })
  }

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.selectedColor === color && item.selectedSize === size),
      ),
    )
  }

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 상품 필터링 로직
    const filtered = mockProducts.filter(product => {
      // 검색어 필터링
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      // 카테고리 필터링
      const matchesCategory = selectedCategory === "전체" || 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      
      return matchesSearch && matchesCategory
    })
    
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* 헤더 */}
      <MainHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* 페이지 제목 */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            아이라 쇼핑
          </h1>
          <p className="text-gray-600">아이라가 직접 추천하는 패션 아이템들을 만나보세요</p>
        </div>
        
        {/* 검색 및 필터 */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Input
                type="text"
                placeholder="상품 검색..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 text-gray-500">
                검색
              </Button>
            </form>
            
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>
          </div>
          
          {/* 필터 패널 */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-fade-in-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">가격대</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-1" className="mr-2" />
                      <label htmlFor="price-1" className="text-sm">~30,000원</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-2" className="mr-2" />
                      <label htmlFor="price-2" className="text-sm">30,000원~50,000원</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-3" className="mr-2" />
                      <label htmlFor="price-3" className="text-sm">50,000원~100,000원</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-4" className="mr-2" />
                      <label htmlFor="price-4" className="text-sm">100,000원~</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">정렬</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input type="radio" name="sort" id="sort-1" className="mr-2" defaultChecked />
                      <label htmlFor="sort-1" className="text-sm">인기순</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="sort" id="sort-2" className="mr-2" />
                      <label htmlFor="sort-2" className="text-sm">최신순</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="sort" id="sort-3" className="mr-2" />
                      <label htmlFor="sort-3" className="text-sm">가격 낮은순</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" name="sort" id="sort-4" className="mr-2" />
                      <label htmlFor="sort-4" className="text-sm">가격 높은순</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">특징</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="feature-1" className="mr-2" />
                      <label htmlFor="feature-1" className="text-sm">할인상품</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="feature-2" className="mr-2" />
                      <label htmlFor="feature-2" className="text-sm">신상품</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="feature-3" className="mr-2" />
                      <label htmlFor="feature-3" className="text-sm">아이라 추천</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="feature-4" className="mr-2" />
                      <label htmlFor="feature-4" className="text-sm">베스트셀러</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">평점</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-1" className="mr-2" />
                      <label htmlFor="rating-1" className="text-sm flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-2" className="mr-2" />
                      <label htmlFor="rating-2" className="text-sm flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                        <Star className="w-3 h-3 text-gray-300 mr-1" />
                        이상
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setShowFilters(false)}
                >
                  취소
                </Button>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-purple-500"
                  onClick={() => {
                    // 필터 적용 로직
                    setShowFilters(false)
                  }}
                >
                  필터 적용
                </Button>
              </div>
            </div>
          )}
          
          {/* 카테고리 탭 - 모바일 최적화 */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-6 md:mb-8 overflow-x-auto">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs md:text-sm whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* 이벤트 배너 - 모바일 최적화 */}
        <div className="mb-8 md:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 md:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full -mt-10 -mr-10"></div>
          <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-white/10 rounded-full -mb-8 -ml-8"></div>
          
          <div className="relative z-10 md:w-2/3">
            <Badge className="bg-white text-pink-600 mb-2 md:mb-4 text-xs md:text-sm">한정 이벤트</Badge>
            <h2 className="text-xl md:text-3xl font-bold mb-2">봄맞이 특별 할인 🌸</h2>
            <p className="text-sm md:text-base mb-3 md:mb-4">아이라가 엄선한 봄 필수템 최대 30% 할인! 3월 한 달간 진행되는 특별 이벤트를 놓치지 마세요.</p>
            <Button className="text-sm md:text-base bg-white text-pink-600 hover:bg-pink-50">
              이벤트 상품 보기
            </Button>
          </div>
        </div>
        
        {/* 상품 그리드 - 모바일 최적화 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src={product.images[0] || "/images/aira.png"}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <button
                  className={`absolute top-2 md:top-3 right-2 md:right-3 w-6 md:w-8 h-6 md:h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center transition-colors ${wishlist.includes(product.id) ? 'text-pink-500' : 'text-gray-400'}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`w-3 md:w-4 h-3 md:h-4 ${wishlist.includes(product.id) ? 'fill-pink-500' : ''}`} />
                </button>
                
                {product.isNew && (
                  <Badge className="absolute bottom-2 md:bottom-3 left-2 md:left-3 bg-green-500 text-xs">NEW</Badge>
                )}
              </div>
              
              <CardContent className="p-3 md:p-4">
                <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center mb-1 md:mb-2">
                  <div className="flex items-center mr-1 md:mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{product.rating}</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  {product.discount && (
                    <>
                      <span className="font-bold text-xs md:text-sm">{product.discount}% OFF</span>
                      <span className="text-xs md:text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                    </>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-3 md:p-4 pt-0">
                <div className="w-full text-xs text-gray-500 mb-2">
                  {product.isRecommended && (
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-pink-500 mr-1" />
                      <span>아이라 추천 상품</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Truck className="w-3 h-3 mr-1" />
                    <span>무료배송</span>
                  </div>
                </div>
                <Button className="w-full text-xs md:text-sm bg-gradient-to-r from-pink-500 to-purple-500">
                  <ShoppingBag className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                  장바구니
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-4">다른 검색어나 필터 조건을 사용해보세요.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("전체")
                setFilteredProducts(mockProducts)
              }}
            >
              필터 초기화
            </Button>
          </div>
        )}
      </main>
      
      {/* 푸터 */}
      <MainFooter />

      {/* Product Detail Modal - 모바일 최적화 */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <Image
                  src={selectedProduct.images[0] || "/images/aira.png"}
                  alt={selectedProduct.name}
                  width={400}
                  height={500}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-sm md:text-base text-gray-600">{selectedProduct.brand}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-3xl font-bold text-pink-600">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm md:text-lg text-gray-500 line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating) ? "fill-current text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{selectedProduct.rating}</span>
                  <span className="text-gray-500">({selectedProduct.reviewCount} 리뷰)</span>
                </div>

                <p className="text-gray-700">{selectedProduct.description}</p>

                <div>
                  <h4 className="font-semibold mb-2">특징</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {selectedProduct.colors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">색상</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color, index) => (
                        <Badge key={index} variant="outline">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.sizes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">사이즈</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size, index) => (
                        <Badge key={index} variant="outline">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500"
                    onClick={() => {
                      addToCart(selectedProduct.id)
                      setSelectedProduct(null)
                    }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    장바구니 담기
                  </Button>
                  <Button variant="outline" onClick={() => toggleWishlist(selectedProduct.id)}>
                    <Heart
                      className={`w-4 h-4 ${wishlist.includes(selectedProduct.id) ? "fill-current text-red-500" : ""}`}
                    />
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4" />
                    <span>무료배송</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>품질보증</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RotateCcw className="w-4 h-4" />
                    <span>교환/반품</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>장바구니</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">장바구니가 비어있습니다</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item, index) => {
                    const product = products.find((p) => p.id === item.productId)
                    if (!product) return null

                    return (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Image
                          src={product.images[0] || "/images/aira.png"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                          {item.selectedColor && <p className="text-xs text-gray-500">색상: {item.selectedColor}</p>}
                          {item.selectedSize && <p className="text-xs text-gray-500">사이즈: {item.selectedSize}</p>}
                          <p className="font-bold text-pink-600">{formatPrice(product.price)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateCartQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize,
                              )
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateCartQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize,
                              )
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>총 금액:</span>
                    <span className="text-pink-600">{formatPrice(getCartTotal())}</span>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500">
                    주문하기 ({getCartItemCount()}개 상품)
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
