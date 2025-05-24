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
import { ArrowLeft, Plus, Edit, Trash2, Eye, Search, Play, ImageIcon, BarChart3, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface VlogPost {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl?: string
  category: string
  tags: string[]
  status: "draft" | "published" | "scheduled"
  views: number
  likes: number
  comments: number
  createdAt: Date
  publishedAt?: Date
  duration?: string
}

const mockVlogPosts: VlogPost[] = [
  {
    id: "1",
    title: "봄 패션 하울 🌸 새로운 옷들 소개해요!",
    description: "따뜻한 봄을 맞아 새로 구매한 옷들을 소개해드려요. 파스텔 톤 원피스부터 트렌치코트까지!",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/spring-haul.mp4",
    category: "패션",
    tags: ["패션", "하울", "봄옷", "스타일링"],
    status: "published",
    views: 15420,
    likes: 1240,
    comments: 89,
    createdAt: new Date("2024-03-15"),
    publishedAt: new Date("2024-03-15"),
    duration: "12:34",
  },
  {
    id: "2",
    title: "데일리 메이크업 튜토리얼 💄",
    description: "매일 하는 자연스러운 메이크업 방법을 단계별로 알려드려요.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "뷰티",
    tags: ["메이크업", "튜토리얼", "데일리", "뷰티"],
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date("2024-03-16"),
    duration: "15:22",
  },
  {
    id: "3",
    title: "일주일 브이로그 📹",
    description: "평범하지만 특별한 일주일을 함께 보내요.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "라이프스타일",
    tags: ["일상", "브이로그", "카페", "친구"],
    status: "scheduled",
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date("2024-03-17"),
    publishedAt: new Date("2024-03-20"),
    duration: "18:45",
  },
]

export default function VlogManagement() {
  const [posts, setPosts] = useState<VlogPost[]>(mockVlogPosts)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<VlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    status: "draft" as const,
    thumbnail: "",
    videoUrl: "",
    duration: "",
  })

  const categories = ["패션", "뷰티", "라이프스타일", "여행", "음식"]

  const handleCreate = () => {
    const newPost: VlogPost = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail || "/placeholder.svg?height=200&width=300",
      videoUrl: formData.videoUrl,
      category: formData.category,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      status: formData.status,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      publishedAt: formData.status === "published" ? new Date() : undefined,
      duration: formData.duration,
    }

    setPosts([newPost, ...posts])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!selectedPost) return

    const updatedPosts = posts.map((post) =>
      post.id === selectedPost.id
        ? {
            ...post,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: formData.tags.split(",").map((tag) => tag.trim()),
            status: formData.status,
            thumbnail: formData.thumbnail || post.thumbnail,
            videoUrl: formData.videoUrl || post.videoUrl,
            duration: formData.duration || post.duration,
            publishedAt: formData.status === "published" && post.status !== "published" ? new Date() : post.publishedAt,
          }
        : post,
    )

    setPosts(updatedPosts)
    setIsEditOpen(false)
    setSelectedPost(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const openEditModal = (post: VlogPost) => {
    setSelectedPost(post)
    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      tags: post.tags.join(", "),
      status: post.status,
      thumbnail: post.thumbnail,
      videoUrl: post.videoUrl || "",
      duration: post.duration || "",
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      status: "draft",
      thumbnail: "",
      videoUrl: "",
      duration: "",
    })
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    const matchesCategory = filterCategory === "all" || post.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700">게시됨</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-700">임시저장</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700">예약됨</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
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
                <h1 className="text-2xl font-bold text-gray-900">브이로그 관리</h1>
                <p className="text-gray-600">콘텐츠 업로드 및 편집</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
                    <Plus className="w-4 h-4 mr-2" />새 브이로그
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 브이로그 만들기</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">제목</Label>
                      <Input
                        id="title"
                        placeholder="브이로그 제목을 입력하세요"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">설명</Label>
                      <Textarea
                        id="description"
                        placeholder="브이로그 설명을 입력하세요"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">카테고리</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                        <Label htmlFor="status">상태</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: "draft" | "published" | "scheduled") =>
                            setFormData({ ...formData, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">임시저장</SelectItem>
                            <SelectItem value="published">즉시 게시</SelectItem>
                            <SelectItem value="scheduled">예약 게시</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="tags">태그</Label>
                      <Input
                        id="tags"
                        placeholder="태그를 쉼표로 구분하여 입력하세요"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">영상 길이</Label>
                        <Input
                          id="duration"
                          placeholder="예: 12:34"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="thumbnail">썸네일 URL</Label>
                        <Input
                          id="thumbnail"
                          placeholder="썸네일 이미지 URL"
                          value={formData.thumbnail}
                          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="videoUrl">영상 URL</Label>
                      <Input
                        id="videoUrl"
                        placeholder="영상 파일 URL"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleCreate} className="bg-gradient-to-r from-pink-500 to-purple-500">
                        생성
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <p className="text-sm font-medium text-gray-600">총 브이로그</p>
                  <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                </div>
                <Play className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(posts.reduce((sum, post) => sum + post.views, 0))}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">게시된 영상</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {posts.filter((post) => post.status === "published").length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">임시저장</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {posts.filter((post) => post.status === "draft").length}
                  </p>
                </div>
                <ImageIcon className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="published">게시됨</SelectItem>
                  <SelectItem value="draft">임시저장</SelectItem>
                  <SelectItem value="scheduled">예약됨</SelectItem>
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
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>브이로그 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>썸네일</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>조회수</TableHead>
                  <TableHead>좋아요</TableHead>
                  <TableHead>생성일</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="relative w-16 h-12">
                        <Image
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                        {post.duration && (
                          <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1 rounded">
                            {post.duration}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-1">{post.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell>{formatNumber(post.views)}</TableCell>
                    <TableCell>{formatNumber(post.likes)}</TableCell>
                    <TableCell>{formatDate(post.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
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

        {/* Edit Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>브이로그 편집</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">제목</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">설명</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">카테고리</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="edit-status">상태</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "draft" | "published" | "scheduled") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">임시저장</SelectItem>
                      <SelectItem value="published">게시됨</SelectItem>
                      <SelectItem value="scheduled">예약됨</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-tags">태그</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleEdit} className="bg-gradient-to-r from-pink-500 to-purple-500">
                  저장
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
