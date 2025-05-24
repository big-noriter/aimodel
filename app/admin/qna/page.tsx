"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Clock,
  Search,
  Reply,
  Trash2,
  Eye,
  Heart,
  User,
  Calendar,
  Download,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  author: string
  email?: string
  title: string
  content: string
  category: string
  status: "pending" | "answered" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: Date
  likes: number
  views: number
  answer?: {
    content: string
    createdAt: Date
    adminName: string
  }
  tags: string[]
}

const mockQuestions: Question[] = [
  {
    id: "1",
    author: "패션러버",
    email: "fashion@example.com",
    title: "겨울 코트 추천해주세요!",
    content: "아이라님처럼 예쁜 겨울 코트를 찾고 있어요. 어떤 스타일이 좋을까요?",
    category: "패션",
    status: "answered",
    priority: "medium",
    createdAt: new Date("2024-03-15T10:30:00"),
    likes: 24,
    views: 156,
    answer: {
      content:
        "안녕하세요! 겨울 코트는 정말 중요한 아이템이죠 💕 올해는 오버사이즈 울 코트나 패딩이 트렌드예요. 특히 베이지나 카멜 컬러를 추천드려요.",
      createdAt: new Date("2024-03-15T14:20:00"),
      adminName: "아이라",
    },
    tags: ["코트", "겨울", "추천"],
  },
  {
    id: "2",
    author: "뷰티초보",
    email: "beauty@example.com",
    title: "데일리 메이크업 순서가 궁금해요",
    content: "메이크업을 처음 시작하는데 어떤 순서로 해야 하는지 모르겠어요.",
    category: "뷰티",
    status: "pending",
    priority: "high",
    createdAt: new Date("2024-03-16T16:45:00"),
    likes: 18,
    views: 89,
    tags: ["메이크업", "초보", "순서"],
  },
  {
    id: "3",
    author: "대학생A",
    email: "student@example.com",
    title: "자신감을 얻는 방법이 있나요?",
    content: "저는 항상 자신감이 부족해서 고민이에요. 아이라님만의 비결이 있다면 알려주세요!",
    category: "일상",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2024-03-17T09:15:00"),
    likes: 56,
    views: 234,
    tags: ["자신감", "고민", "조언"],
  },
]

export default function QnAManagement() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [isAnswerOpen, setIsAnswerOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [answerContent, setAnswerContent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const categories = ["패션", "뷰티", "일상", "연애", "진로", "취미", "기타"]

  const handleAnswer = () => {
    if (!selectedQuestion || !answerContent.trim()) return

    const updatedQuestions = questions.map((q) =>
      q.id === selectedQuestion.id
        ? {
            ...q,
            status: "answered" as const,
            answer: {
              content: answerContent,
              createdAt: new Date(),
              adminName: "아이라",
            },
          }
        : q,
    )

    setQuestions(updatedQuestions)
    setIsAnswerOpen(false)
    setSelectedQuestion(null)
    setAnswerContent("")
  }

  const handleStatusChange = (questionId: string, newStatus: "pending" | "answered" | "closed") => {
    const updatedQuestions = questions.map((q) => (q.id === questionId ? { ...q, status: newStatus } : q))
    setQuestions(updatedQuestions)
  }

  const handlePriorityChange = (questionId: string, newPriority: "low" | "medium" | "high") => {
    const updatedQuestions = questions.map((q) => (q.id === questionId ? { ...q, priority: newPriority } : q))
    setQuestions(updatedQuestions)
  }

  const handleDelete = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  const openAnswerModal = (question: Question) => {
    setSelectedQuestion(question)
    setAnswerContent(question.answer?.content || "")
    setIsAnswerOpen(true)
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || question.status === filterStatus
    const matchesCategory = filterCategory === "all" || question.category === filterCategory
    const matchesPriority = filterPriority === "all" || question.priority === filterPriority

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "answered":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            답변완료
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <Clock className="w-3 h-3 mr-1" />
            답변대기
          </Badge>
        )
      case "closed":
        return <Badge className="bg-gray-100 text-gray-700">종료</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">높음</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">보통</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-700">낮음</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Q&A 관리</h1>
                <p className="text-gray-600">질문 답변 및 관리</p>
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
                  <p className="text-sm font-medium text-gray-600">총 질문</p>
                  <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">답변 대기</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {questions.filter((q) => q.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">답변 완료</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {questions.filter((q) => q.status === "answered").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(questions.reduce((sum, q) => sum + q.views, 0))}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
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
                  placeholder="질문 검색..."
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
                  <SelectItem value="pending">답변 대기</SelectItem>
                  <SelectItem value="answered">답변 완료</SelectItem>
                  <SelectItem value="closed">종료</SelectItem>
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
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 우선순위</SelectItem>
                  <SelectItem value="high">높음</SelectItem>
                  <SelectItem value="medium">보통</SelectItem>
                  <SelectItem value="low">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Questions Table */}
        <Card>
          <CardHeader>
            <CardTitle>질문 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>작성자</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>우선순위</TableHead>
                  <TableHead>조회수</TableHead>
                  <TableHead>좋아요</TableHead>
                  <TableHead>작성일</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{question.author}</p>
                          {question.email && <p className="text-xs text-gray-500">{question.email}</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-1">{question.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{question.content}</p>
                        {question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {question.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={question.status}
                        onValueChange={(value: "pending" | "answered" | "closed") =>
                          handleStatusChange(question.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">답변 대기</SelectItem>
                          <SelectItem value="answered">답변 완료</SelectItem>
                          <SelectItem value="closed">종료</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={question.priority}
                        onValueChange={(value: "low" | "medium" | "high") => handlePriorityChange(question.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">높음</SelectItem>
                          <SelectItem value="medium">보통</SelectItem>
                          <SelectItem value="low">낮음</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{formatNumber(question.views)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{formatNumber(question.likes)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(question.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openAnswerModal(question)}>
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(question.id)}>
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

        {/* Answer Modal */}
        <Dialog open={isAnswerOpen} onOpenChange={setIsAnswerOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>질문 답변하기</DialogTitle>
            </DialogHeader>
            {selectedQuestion && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{selectedQuestion.author}</span>
                    <Badge variant="outline">{selectedQuestion.category}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{selectedQuestion.title}</h3>
                  <p className="text-gray-700">{selectedQuestion.content}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedQuestion.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedQuestion.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedQuestion.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="answer">답변 내용</Label>
                  <Textarea
                    id="answer"
                    placeholder="친근하고 도움이 되는 답변을 작성해주세요..."
                    rows={6}
                    value={answerContent}
                    onChange={(e) => setAnswerContent(e.target.value)}
                  />
                </div>

                {selectedQuestion.answer && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">기존 답변</h4>
                    <p className="text-blue-700">{selectedQuestion.answer.content}</p>
                    <p className="text-xs text-blue-600 mt-2">
                      {selectedQuestion.answer.adminName} • {formatDate(selectedQuestion.answer.createdAt)}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAnswerOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleAnswer} className="bg-gradient-to-r from-pink-500 to-purple-500">
                    답변 등록
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
