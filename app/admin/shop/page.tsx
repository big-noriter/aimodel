"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  Download,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  category: string
  subcategory: string
  images: string[]
  description: string
  stock: number
  status: "active" | "inactive" | "out_of_stock"
  rating: number
  reviewCount: number
  isNew: boolean
  isBestseller: boolean
  isAiraChoice: boolean
  createdAt: Date
  updatedAt: Date
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  products: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  createdAt: Date
  shippingAddress: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "실크 블라우스",
    brand: "AIRA Collection",
    price: 89000,
    originalPrice: 120000,
    category: "패션",
    subcategory: "상의",
    images: ["/placeholder.svg?height=300&width=300"],
    description: "부드러운 실크 소재로 제작된 우아한 블라우스",
    stock: 15,
    status: "active",
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isBestseller: true,
    isAiraChoice: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    name: "글로우 세럼",
    brand: "Beauty Lab",
    price: 45000,
    category: "뷰티",
    subcategory: "스킨케어",
    images: ["/placeholder.svg?height=300&width=300"],
    description: "비타민C와 히알루론산이 함유된 글로우 세럼",
    stock: 32,
    status: "active",
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    isBestseller: false,
    isAiraChoice: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-16"),
  },
  {
    id: "3",
    name: "미니 크로스백",
    brand: "Luxury Line",
    price: 180000,
    originalPrice: 220000,
    category: "액세서리",
    subcategory: "가방",
    images: ["/placeholder.svg?height=300&width=300"],
    description: "고급 가죽으로 제작된 미니 크로스백",
    stock: 0,
    status: "out_of_stock",
    rating: 4.9,
    reviewCount: 67,
    isNew: false,
    isBestseller: true,
    isAiraChoice: false,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-14"),
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "김민지",
    customerEmail: "minji@example.com",
    products: [
      { productId: "1", productName: "실크 블라우스", quantity: 1, price: 89000 },
      { productId: "2", productName: "글로우 세럼", quantity: 2, price: 45000 },
    ],
    totalAmount: 179000,
    status: "processing",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-16T10:30:00"),
    shippingAddress: "서울시 강남구 테헤란로 123",
  },
  {
    id: "ORD-002",
    customerName: "이서연",
    customerEmail: "seoyeon@example.com",
    products: [{ productId: "3", productName: "미니 크로스백", quantity: 1, price: 180000 }],
    totalAmount: 180000,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-15T14:20:00"),
    shippingAddress: "부산시 해운대구 센텀로 456",
  },
]

export default function ShopManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState("products")
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    description: "",
    stock: "",
    status: "active" as const,
    isNew: false,
    isBestseller: false,
    isAiraChoice: false,
  })

  const categories = ["패션", "뷰티", "액세서리", "라이프스타일"]
  const subcategories = {
    패션: ["상의", "하의", "원피스", "아우터", "신발"],
    뷰티: ["스킨케어", "메이크업", "헤어케어", "향수"],
    액세서리: ["가방", "주얼리", "시계", "선글라스"],
    라이프스타일: ["홈데코", "테크", "운동", "여행"],
  }

  const handleCreateProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name,
      brand: productForm.brand,
      price: Number.parseInt(productForm.price),
      originalPrice: productForm.originalPrice ? Number.parseInt(productForm.originalPrice) : undefined,
      category: productForm.category,
      subcategory: productForm.subcategory,
      images: ["/placeholder.svg?height=300&width=300"],
      description: productForm.description,
      stock: Number.parseInt(productForm.stock),
      status: productForm.status,
      rating: 0,
      reviewCount: 0,
      isNew: productForm.isNew,
      isBestseller: productForm.isBestseller,
      isAiraChoice: productForm.isAiraChoice,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setProducts([newProduct, ...products])
    setIsProductModalOpen(false)
    resetProductForm()
  }

  const handleEditProduct = () => {
    if (!selectedProduct) return

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            name: productForm.name,
            brand: productForm.brand,
            price: Number.parseInt(productForm.price),
            originalPrice: productForm.originalPrice ? Number.parseInt(productForm.originalPrice) : undefined,
            category: productForm.category,
            subcategory: productForm.subcategory,
            description: productForm.description,
            stock: Number.parseInt(productForm.stock),
            status: productForm.status,
            isNew: productForm.isNew,
            isBestseller: productForm.isBestseller,
            isAiraChoice: productForm.isAiraChoice,
            updatedAt: new Date(),
          }
        : product,
    )

    setProducts(updatedProducts)
    setIsProductModalOpen(false)
    setIsEditMode(false)
    setSelectedProduct(null)
    resetProductForm()
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      stock: product.stock.toString(),
      status: product.status,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      isAiraChoice: product.isAiraChoice,
    })
    setIsEditMode(true)
    setIsProductModalOpen(true)
  }

  const resetProductForm = () => {
    setProductForm({
      name: "",
      brand: "",
      price: "",
      originalPrice: "",
      category: "",
      subcategory: "",
      description: "",
      stock: "",
      status: "active",
      isNew: false,
      isBestseller: false,
      isAiraChoice: false,
    })
  }

  const handleOrderStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || product.status === filterStatus
    const matchesCategory = filterCategory === "all" || product.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">활성</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">비활성</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-700">품절</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            대기중
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <Package className="w-3 h-3 mr-1" />
            처리중
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-700">
            <Truck className="w-3 h-3 mr-1" />
            배송중
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            배송완료
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3 mr-1" />
            취소됨
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-700">결제완료</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">결제대기</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-700">결제실패</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-700">환불완료</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const totalOrders = orders.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  대시보드
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">쇼핑몰 관리</h1>
                <p className="text-gray-600">상품 및 주문 관리</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 매출</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 상품</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                  <p className="text-xs text-green-600">활성: {activeProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 주문</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">평균 주문액</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalOrders > 0 ? totalRevenue / totalOrders : 0)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">상품 관리</TabsTrigger>
            <TabsTrigger value="orders">주문 관리</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="상품 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                      <SelectItem value="out_of_stock">품절</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 카테고리</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={() => {
                          setIsEditMode(false)
                          resetProductForm()
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />새 상품
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{isEditMode ? "상품 편집" : "새 상품 추가"}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">상품명</Label>
                            <Input
                              id="name"
                              placeholder="상품명을 입력하세요"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="brand">브랜드</Label>
                            <Input
                              id="brand"
                              placeholder="브랜드명을 입력하세요"
                              value={productForm.brand}
                              onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">상품 설명</Label>
                          <Textarea
                            id="description"
                            placeholder="상품 설명을 입력하세요"
                            rows={3}
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">카테고리</Label>
                            <Select
                              value={productForm.category}
                              onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="카테고리 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="subcategory">세부 카테고리</Label>
                            <Select
                              value={productForm.subcategory}
                              onValueChange={(value) => setProductForm({ ...productForm, subcategory: value })}
                              disabled={!productForm.category}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="세부 카테고리 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {productForm.category &&
                                  subcategories[productForm.category as keyof typeof subcategories]?.map((sub) => (
                                    <SelectItem key={sub} value={sub}>
                                      {sub}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="price">판매가</Label>
                            <Input
                              id="price"
                              type="number"
                              placeholder="0"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="originalPrice">정가 (선택)</Label>
                            <Input
                              id="originalPrice"
                              type="number"
                              placeholder="0"
                              value={productForm.originalPrice}
                              onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="stock">재고</Label>
                            <Input
                              id="stock"
                              type="number"
                              placeholder="0"
                              value={productForm.stock}
                              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="status">상태</Label>
                          <Select
                            value={productForm.status}
                            onValueChange={(value: "active" | "inactive" | "out_of_stock") =>
                              setProductForm({ ...productForm, status: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">활성</SelectItem>
                              <SelectItem value="inactive">비활성</SelectItem>
                              <SelectItem value="out_of_stock">품절</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>특별 표시</Label>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={productForm.isNew}
                                onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                              />
                              <span className="text-sm">신상품</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={productForm.isBestseller}
                                onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                              />
                              <span className="text-sm">베스트셀러</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={productForm.isAiraChoice}
                                onChange={(e) => setProductForm({ ...productForm, isAiraChoice: e.target.checked })}
                              />
                              <span className="text-sm">아이라 추천</span>
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>
                            취소
                          </Button>
                          <Button
                            onClick={isEditMode ? handleEditProduct : handleCreateProduct}
                            className="bg-gradient-to-r from-pink-500 to-purple-500"
                          >
                            {isEditMode ? "수정" : "생성"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>상품 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이미지</TableHead>
                      <TableHead>상품명</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>가격</TableHead>
                      <TableHead>재고</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>평점</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative w-16 h-16">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                            <div className="flex space-x-1 mt-1">
                              {product.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                              {product.isBestseller && <Badge className="bg-orange-500 text-white text-xs">BEST</Badge>}
                              {product.isAiraChoice && (
                                <Badge className="bg-pink-500 text-white text-xs">아이라 추천</Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge variant="outline">{product.category}</Badge>
                            <p className="text-xs text-gray-500 mt-1">{product.subcategory}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{formatPrice(product.price)}</p>
                            {product.originalPrice && (
                              <p className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviewCount})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => openEditModal(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>주문 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>주문번호</TableHead>
                      <TableHead>고객정보</TableHead>
                      <TableHead>상품</TableHead>
                      <TableHead>총액</TableHead>
                      <TableHead>주문상태</TableHead>
                      <TableHead>결제상태</TableHead>
                      <TableHead>주문일시</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <p className="font-medium">{order.id}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-gray-500">{order.customerEmail}</p>
                            <p className="text-xs text-gray-500 mt-1">{order.shippingAddress}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.products.map((product, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{product.productName}</span>
                                <span className="text-gray-500"> x{product.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold">{formatPrice(order.totalAmount)}</p>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value: Order["status"]) => handleOrderStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">대기중</SelectItem>
                              <SelectItem value="processing">처리중</SelectItem>
                              <SelectItem value="shipped">배송중</SelectItem>
                              <SelectItem value="delivered">배송완료</SelectItem>
                              <SelectItem value="cancelled">취소됨</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
