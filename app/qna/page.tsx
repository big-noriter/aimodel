"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Search,
  Plus,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Filter,
  Send,
  Sparkles,
  User,
  ArrowUp,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { useChat } from "ai/react"
import Image from "next/image"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Question {
  id: string
  author: string
  avatar?: string
  title: string
  content: string
  category: string
  createdAt: Date
  likes: number
  isLiked: boolean
  status: "pending" | "answered"
  answer?: {
    content: string
    createdAt: Date
    likes: number
  }
  comments: Comment[]
  isPopular: boolean
}

interface Comment {
  id: string
  author: string
  avatar?: string
  content: string
  createdAt: Date
  likes: number
  isLiked: boolean
}

const categories = ["전체", "패션", "뷰티", "일상", "연애", "진로", "취미", "기타"]

const mockQuestions: Question[] = [
  {
    id: "1",
    author: "패션러버",
    title: "겨울 코트 추천해주세요!",
    content: "아이라님처럼 예쁜 겨울 코트를 찾고 있어요. 어떤 스타일이 좋을까요?",
    category: "패션",
    createdAt: new Date("2024-03-15T10:30:00"),
    likes: 24,
    isLiked: false,
    status: "answered",
    answer: {
      content:
        "안녕하세요! 겨울 코트는 정말 중요한 아이템이죠 💕 올해는 오버사이즈 울 코트나 패딩이 트렌드예요. 특히 베이지나 카멜 컬러를 추천드려요. 키가 작으시다면 허리 벨트가 있는 스타일로 선택하시면 비율이 더 예뻐 보일 거예요!",
      createdAt: new Date("2024-03-15T14:20:00"),
      likes: 45,
    },
    comments: [
      {
        id: "c1",
        author: "겨울공주",
        content: "저도 베이지 코트 샀는데 정말 예뻐요!",
        createdAt: new Date("2024-03-15T15:00:00"),
        likes: 3,
        isLiked: false,
      },
    ],
    isPopular: true,
  },
  {
    id: "2",
    author: "뷰티초보",
    title: "데일리 메이크업 순서가 궁금해요",
    content: "메이크업을 처음 시작하는데 어떤 순서로 해야 하는지 모르겠어요. 기초부터 알려주세요!",
    category: "뷰티",
    createdAt: new Date("2024-03-14T16:45:00"),
    likes: 18,
    isLiked: true,
    status: "answered",
    answer: {
      content:
        "메이크업 초보자시군요! 😊 기본 순서는 이래요: 1) 스킨케어 → 2) 선크림 → 3) 베이스 메이크업(프라이머, 파운데이션, 컨실러) → 4) 파우더 → 5) 아이브로우 → 6) 아이섀도 → 7) 아이라이너 → 8) 마스카라 → 9) 블러셔 → 10) 립! 처음엔 간단하게 시작해서 점점 늘려가세요 💄",
      createdAt: new Date("2024-03-14T18:30:00"),
      likes: 32,
    },
    comments: [],
    isPopular: false,
  },
  {
    id: "3",
    author: "대학생A",
    title: "아이라님은 어떻게 자신감을 얻으셨나요?",
    content: "저는 항상 자신감이 부족해서 고민이에요. 아이라님만의 자신감 비결이 있다면 알려주세요!",
    category: "일상",
    createdAt: new Date("2024-03-13T09:15:00"),
    likes: 56,
    isLiked: false,
    status: "pending",
    comments: [],
    isPopular: true,
  },
  {
    id: "4",
    author: "직장인언니",
    title: "직장에서 입기 좋은 옷 추천",
    content: "회사에서 입기 좋으면서도 예쁜 옷들 추천해주세요. 너무 캐주얼하지도 않고 너무 딱딱하지도 않은...",
    category: "패션",
    createdAt: new Date("2024-03-12T14:20:00"),
    likes: 12,
    isLiked: false,
    status: "answered",
    answer: {
      content:
        "직장 룩은 정말 고민이 많이 되죠! 저는 블라우스+슬랙스 조합을 자주 추천해요. 색상은 네이비, 베이지, 화이트 위주로 하시고, 포인트는 액세서리로 주세요. 카디건이나 재킷으로 레이어링하면 더 세련돼 보여요 👔",
      createdAt: new Date("2024-03-12T16:45:00"),
      likes: 28,
    },
    comments: [],
    isPopular: false,
  },
]

// 인기 질문 태그
const popularTags = [
  { name: "패션", count: 128 },
  { name: "뷰티", count: 98 },
  { name: "일상", count: 76 },
  { name: "음식", count: 64 },
  { name: "여행", count: 58 },
  { name: "취미", count: 42 }
]

export default function QnAPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(mockQuestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [sortBy, setSortBy] = useState("latest")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/qna-answer",
  })

  // Filter and sort questions
  useEffect(() => {
    let filtered = questions

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((q) => q.category === selectedCategory)
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((q) => q.status === filterStatus)
    }

    // Sort questions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "popular":
          return b.likes - a.likes
        case "answered":
          return a.status === "answered" ? -1 : 1
        default:
          return 0
      }
    })

    setFilteredQuestions(filtered)
  }, [questions, searchTerm, selectedCategory, sortBy, filterStatus])

  const handleLike = (questionId: string, type: "question" | "answer") => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          if (type === "question") {
            return {
              ...q,
              likes: q.isLiked ? q.likes - 1 : q.likes + 1,
              isLiked: !q.isLiked,
            }
          } else if (type === "answer" && q.answer) {
            return {
              ...q,
              answer: {
                ...q.answer,
                likes: q.answer.likes + 1,
              },
            }
          }
        }
        return q
      }),
    )
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.title || !newQuestion.content || !newQuestion.author) return

    const question: Question = {
      id: Date.now().toString(),
      author: newQuestion.author,
      title: newQuestion.title,
      content: newQuestion.content,
      category: newQuestion.category || "기타",
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      status: "pending",
      comments: [],
      isPopular: false,
    }

    setQuestions((prev) => [question, ...prev])
    setNewQuestion({ title: "", content: "", category: "", author: "" })
    setIsNewQuestionOpen(false)

    // Simulate AI answer after a delay
    setTimeout(() => {
      generateAIAnswer(question.id, question.content)
    }, 3000)
  }

  const generateAIAnswer = async (questionId: string, questionContent: string) => {
    // Simulate AI response
    const aiAnswers = [
      "안녕하세요! 좋은 질문이네요 😊 제 경험을 바탕으로 답변드릴게요!",
      "와, 정말 공감되는 고민이에요! 저도 비슷한 경험이 있어서 도움이 될 것 같아요 💕",
      "이런 질문 너무 좋아해요! 함께 고민해볼게요 ✨",
    ]

    const randomAnswer = aiAnswers[Math.floor(Math.random() * aiAnswers.length)]

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            status: "answered" as const,
            answer: {
              content: randomAnswer + " " + questionContent + "에 대한 제 생각을 공유해드릴게요!",
              createdAt: new Date(),
              likes: 0,
            },
          }
        }
        return q
      }),
    )
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    return `${days}일 전`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제 구현에서는 검색 로직 추가
    console.log("검색어:", searchTerm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* 헤더 */}
      <MainHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* 페이지 제목 */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              질문 게시판
            </h1>
            <p className="text-gray-600">아이라에게 궁금한 점을 물어보세요</p>
          </div>
          
          {/* 검색 및 필터 */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="질문 검색..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setFilterStatus(filterStatus === "all" ? "answered" : "all")}
                className="md:w-auto w-full flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                {filterStatus === "all" ? "답변완료된 질문" : "전체 질문"}
              </Button>
              
              <Button 
                className="md:w-auto w-full bg-gradient-to-r from-pink-500 to-purple-500"
                onClick={() => setIsNewQuestionOpen(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                질문하기
              </Button>
            </div>
            
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline"
                  className="cursor-pointer hover:bg-pink-50 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* 질문 탭 */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 md:mb-8 text-xs md:text-sm">
              <TabsTrigger value="all">전체 질문</TabsTrigger>
              <TabsTrigger value="popular">인기 질문</TabsTrigger>
              <TabsTrigger value="answered">답변 완료</TabsTrigger>
              <TabsTrigger value="unanswered">미답변</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* 질문 목록 */}
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            {filteredQuestions.map((question) => (
              <Card key={question.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                      <AvatarImage src="/images/aira.png" alt={question.author} />
                      <AvatarFallback>{question.author[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                        <h3 className="font-medium text-sm md:text-base line-clamp-1">{question.title}</h3>
                        {question.isPopular && (
                          <Badge variant="secondary" className="text-xs">인기</Badge>
                        )}
                        {question.category && (
                          <Badge className="bg-pink-100 text-pink-700 text-xs">{question.category}</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{question.content}</p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
                        <div className="flex items-center text-gray-500">
                          <span>{question.author}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            className="flex items-center text-gray-500 hover:text-pink-500"
                            onClick={() => handleLike(question.id, "question")}
                          >
                            <ThumbsUp className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${question.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                            <span>{question.likes}</span>
                          </button>
                          
                          <button 
                            className="flex items-center text-gray-500 hover:text-purple-500"
                            onClick={() => handleLike(question.id, "answer")}
                          >
                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span>{question.comments.length}</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* 답변 영역 */}
                      {question.status === "answered" && (
                        <div className="mt-4 space-y-4">
                          {/* 답변 목록 */}
                          {question.answer && (
                            <div className="pl-4 md:pl-6 border-l-2 border-pink-200">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-6 w-6 md:h-8 md:w-8">
                                  <AvatarImage src="/images/aira.png" alt="AIRA" />
                                  <AvatarFallback>AIRA</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-xs md:text-sm">AIRA</h4>
                                    <Badge className="text-[10px] md:text-xs bg-purple-100 text-purple-700">AI 인플루언서</Badge>
                                  </div>
                                  
                                  <p className="text-xs md:text-sm text-gray-600 mb-2">{question.answer.content}</p>
                                  
                                  <div className="flex items-center text-[10px] md:text-xs text-gray-500">
                                    <span>{formatDate(question.answer.createdAt)}</span>
                                    <button 
                                      className="ml-3 flex items-center hover:text-pink-500"
                                      onClick={() => handleLike(question.id, "answer")}
                                    >
                                      <ThumbsUp className={`w-3 h-3 mr-1 ${question.answer.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                                      <span>
                                        {question.answer.likes}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* 답변 입력 폼 */}
                          <div className="flex items-start gap-3 mt-4">
                            <Avatar className="h-6 w-6 md:h-8 md:w-8">
                              <AvatarImage src="/images/aira.png" alt="You" />
                              <AvatarFallback>YOU</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 relative">
                              <Textarea 
                                placeholder="답변을 작성해주세요..." 
                                className="min-h-[80px] pr-10 text-xs md:text-sm"
                                value={newQuestion.content}
                                onChange={(e) => setNewQuestion((prev) => ({ ...prev, content: e.target.value }))}
                              />
                              <Button 
                                size="icon" 
                                className="absolute right-2 bottom-2 h-6 w-6 bg-gradient-to-r from-pink-500 to-purple-500"
                                onClick={handleSubmitQuestion}
                                disabled={!newQuestion.content.trim()}
                              >
                                <Send className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <MainFooter />
    </div>
  )
}
