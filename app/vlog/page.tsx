"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  ImageIcon,
  FileText,
  Search,
  Calendar,
  Eye,
  Bookmark,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for vlog posts
const vlogPosts = [
  {
    id: 1,
    type: "video",
    title: "봄 패션 하울 🌸 새로운 옷들 소개해요!",
    description: "따뜻한 봄을 맞아 새로 구매한 옷들을 소개해드려요. 파스텔 톤 원피스부터 트렌치코트까지!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "12:34",
    date: "2024-03-15",
    views: 15420,
    likes: 1240,
    comments: 89,
    tags: ["패션", "하울", "봄옷", "스타일링"],
    category: "패션",
  },
  {
    id: 2,
    type: "photo",
    title: "오늘의 OOTD ✨ 캐주얼 데이트룩",
    description: "남자친구와의 데이트를 위한 캐주얼하면서도 예쁜 룩을 준비했어요. 포인트는 액세서리!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "2024-03-14",
    views: 8930,
    likes: 892,
    comments: 45,
    tags: ["OOTD", "데이트룩", "캐주얼", "액세서리"],
    category: "패션",
  },
  {
    id: 3,
    type: "text",
    title: "내가 좋아하는 스킨케어 루틴 💆‍♀️",
    description: "건강한 피부를 위한 저만의 스킨케어 루틴을 자세히 공유해드려요. 제품 추천도 함께!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "2024-03-13",
    views: 12100,
    likes: 1050,
    comments: 156,
    tags: ["스킨케어", "뷰티", "루틴", "제품추천"],
    category: "뷰티",
  },
  {
    id: 4,
    type: "video",
    title: "일주일 브이로그 📹 일상 속 소소한 행복",
    description: "평범하지만 특별한 일주일을 함께 보내요. 카페 투어, 친구들과의 만남, 새로운 취미까지!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "18:45",
    date: "2024-03-12",
    views: 22340,
    likes: 1890,
    comments: 234,
    tags: ["일상", "브이로그", "카페", "친구"],
    category: "라이프스타일",
  },
  {
    id: 5,
    type: "photo",
    title: "홈 카페 세팅 ☕ 집에서 즐기는 여유",
    description: "집에서도 카페 같은 분위기를 만들 수 있어요. 소품 배치부터 음료 만들기까지!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    date: "2024-03-11",
    views: 6780,
    likes: 567,
    comments: 32,
    tags: ["홈카페", "인테리어", "커피", "소품"],
    category: "라이프스타일",
  },
  {
    id: 6,
    type: "video",
    title: "메이크업 튜토리얼 💄 자연스러운 데일리 메이크업",
    description: "매일 하는 자연스러운 메이크업 방법을 단계별로 알려드려요. 초보자도 쉽게 따라할 수 있어요!",
    thumbnail: "/placeholder.svg?height=300&width=400",
    duration: "15:22",
    date: "2024-03-10",
    views: 18650,
    likes: 1456,
    comments: 178,
    tags: ["메이크업", "튜토리얼", "데일리", "뷰티"],
    category: "뷰티",
  },
]

const categories = ["전체", "패션", "뷰티", "라이프스타일"]
const contentTypes = ["전체", "video", "photo", "text"]

export default function VlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedType, setSelectedType] = useState("전체")
  const [sortBy, setSortBy] = useState("latest")

  const filteredPosts = vlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    const matchesType = selectedType === "전체" || post.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "photo":
        return <ImageIcon className="w-4 h-4" />
      case "text":
        return <FileText className="w-4 h-4" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "동영상"
      case "photo":
        return "사진"
      case "text":
        return "글"
      default:
        return ""
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  아이라의 브이로그
                </h1>
                <p className="text-gray-600 mt-1">일상과 트렌드를 함께 공유해요 ✨</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                북마크
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                공유
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="브이로그 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="타입" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="전체">전체</SelectItem>
                  <SelectItem value="video">동영상</SelectItem>
                  <SelectItem value="photo">사진</SelectItem>
                  <SelectItem value="text">글</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="views">조회순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">156</div>
              <div className="text-sm text-gray-600">총 포스트</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">2.4M</div>
              <div className="text-sm text-gray-600">총 조회수</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">89K</div>
              <div className="text-sm text-gray-600">총 좋아요</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">12K</div>
              <div className="text-sm text-gray-600">총 댓글</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`
                    ${post.type === "video" ? "bg-red-500" : ""}
                    ${post.type === "photo" ? "bg-blue-500" : ""}
                    ${post.type === "text" ? "bg-green-500" : ""}
                    text-white
                  `}
                  >
                    {getTypeIcon(post.type)}
                    <span className="ml-1">{getTypeLabel(post.type)}</span>
                  </Badge>
                </div>

                {/* Duration for videos */}
                {post.type === "video" && post.duration && (
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {post.duration}
                    </Badge>
                  </div>
                )}

                {/* Play button overlay for videos */}
                {post.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700">
                    더보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
            더 많은 포스트 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
