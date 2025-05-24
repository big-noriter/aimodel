"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Camera, 
  Sparkles, 
  Upload, 
  RefreshCw, 
  MessageCircle, 
  Palette, 
  Search, 
  Shirt, 
  ThumbsUp, 
  Briefcase, 
  Coffee, 
  Wine, 
  CalendarDays 
} from "lucide-react"
import Image from "next/image"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

// 코디 스타일 타입
interface StyleOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

// 코디 목적 타입
interface PurposeOption {
  id: string
  name: string
  icon: React.ReactNode
}

// 코디 결과 타입
interface OutfitItem {
  id: string
  name: string
  category: string
  image: string
  description: string
  price: number
  link?: string
}

interface OutfitResult {
  id: string
  title: string
  description: string
  items: OutfitItem[]
  styleComment: string
  tips: string[]
}

// 스타일 옵션
const styleOptions: StyleOption[] = [
  { 
    id: "casual", 
    name: "캐주얼", 
    icon: <Shirt className="w-5 h-5" />, 
    description: "편안하고 일상적인 스타일" 
  },
  { 
    id: "minimal", 
    name: "미니멀", 
    icon: <Palette className="w-5 h-5" />, 
    description: "단순하고 세련된 스타일" 
  },
  { 
    id: "romantic", 
    name: "로맨틱", 
    icon: <Coffee className="w-5 h-5" />, 
    description: "여성스럽고 사랑스러운 스타일" 
  },
  { 
    id: "office", 
    name: "오피스", 
    icon: <Briefcase className="w-5 h-5" />, 
    description: "포멀하고 전문적인 스타일" 
  }
]

// 코디 목적 옵션
const purposeOptions: PurposeOption[] = [
  { id: "daily", name: "데일리", icon: <Coffee className="w-5 h-5" /> },
  { id: "date", name: "데이트", icon: <Wine className="w-5 h-5" /> },
  { id: "office", name: "오피스", icon: <Briefcase className="w-5 h-5" /> },
  { id: "event", name: "이벤트", icon: <CalendarDays className="w-5 h-5" /> }
]

// 샘플 코디 결과
const sampleOutfits: OutfitResult[] = [
  {
    id: "outfit1",
    title: "봄날의 데일리 캐주얼 룩",
    description: "편안하면서도 트렌디한 데일리 룩으로, 다양한 장소에 어울리는 스타일링입니다.",
    items: [
      {
        id: "item1",
        name: "오버사이즈 코튼 티셔츠",
        category: "상의",
        image: "/images/aira.png",
        description: "베이직한 디자인의 화이트 오버사이즈 티셔츠",
        price: 29000
      },
      {
        id: "item2",
        name: "하이웨이스트 와이드 데님",
        category: "하의",
        image: "/images/aira.png",
        description: "트렌디한 실루엣의 라이트 블루 와이드 데님",
        price: 59000
      },
      {
        id: "item3",
        name: "캔버스 스니커즈",
        category: "신발",
        image: "/images/aira.png",
        description: "클래식한 디자인의 화이트 캔버스 스니커즈",
        price: 69000
      },
      {
        id: "item4",
        name: "미니 크로스백",
        category: "가방",
        image: "/images/aira.png",
        description: "실용적인 사이즈의 브라운 미니 크로스백",
        price: 48000
      }
    ],
    styleComment: "캐주얼한 베이직 아이템들을 활용하면서도 와이드 데님으로 트렌디함을 더했습니다. 여기에 미니 크로스백으로 포인트를 주어 일상에서 스타일리시하게 연출할 수 있어요.",
    tips: [
      "티셔츠 안쪽으로 프론트 턱을 넣으면 더 세련된 실루엣을 만들 수 있어요.",
      "액세서리를 추가하여 나만의 개성을 더해보세요.",
      "쌀쌀한 날씨에는 데님 자켓이나 오버셔츠를 레이어드하면 좋아요."
    ]
  },
  {
    id: "outfit2",
    title: "봄 데이트룩 스타일링",
    description: "로맨틱한 분위기의 데이트룩으로, 여성스러움을 강조한 스타일링입니다.",
    items: [
      {
        id: "item5",
        name: "플라워 패턴 원피스",
        category: "원피스",
        image: "/images/aira.png",
        description: "화사한 플라워 패턴의 미디 길이 원피스",
        price: 78000
      },
      {
        id: "item6",
        name: "데님 크롭 자켓",
        category: "아우터",
        image: "/images/aira.png",
        description: "클래식한 디자인의 라이트 워싱 데님 자켓",
        price: 69000
      },
      {
        id: "item7",
        name: "스트랩 샌들",
        category: "신발",
        image: "/images/aira.png",
        description: "발목 스트랩 디자인의 미드힐 샌들",
        price: 59000
      },
      {
        id: "item8",
        name: "스트로 토트백",
        category: "가방",
        image: "/images/aira.png",
        description: "내추럴한 느낌의 라탄 소재 토트백",
        price: 48000
      }
    ],
    styleComment: "봄의 분위기를 담은 플라워 패턴 원피스를 메인으로, 데님 자켓을 더해 캐주얼함과 여성스러움의 균형을 맞추었습니다. 스트랩 샌들과 스트로 백으로 시즌감을 더했어요.",
    tips: [
      "원피스에 벨트를 더해 허리라인을 강조하면 더 여성스러운 실루엣을 만들 수 있어요.",
      "귀걸이나 목걸이 등 액세서리로 포인트를 더해보세요.",
      "야외 데이트라면 자외선 차단을 위한 모자나 선글라스도 함께 스타일링하세요."
    ]
  }
]

export default function CoordinatorPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>("casual")
  const [selectedPurpose, setSelectedPurpose] = useState<string>("daily")
  const [preference, setPreference] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [outfitResults, setOutfitResults] = useState<OutfitResult[]>([])
  const [showResults, setShowResults] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
  
  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
  }
  
  const handlePurposeSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId)
  }
  
  const handleAnalyzeOutfit = (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsAnalyzing(true)
    
    // 실제 구현에서는 API 호출을 통해 코디 분석 및 추천을 받아옴
    // 여기서는 샘플 데이터로 시뮬레이션
    setTimeout(() => {
      setOutfitResults(sampleOutfits)
      setShowResults(true)
      setIsAnalyzing(false)
      setActiveTab("result")
    }, 3000)
  }
  
  const resetForm = () => {
    setSelectedImage(null)
    setSelectedStyle("casual")
    setSelectedPurpose("daily")
    setPreference("")
    setOutfitResults([])
    setShowResults(false)
    setActiveTab("upload")
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
              AI 코디네이터
            </h1>
            <p className="text-gray-600">아이라가 당신만을 위한 스타일링을 제안해드립니다</p>
          </div>
          
          {/* 메인 카드 */}
          <Card className="overflow-hidden mb-8 md:mb-12">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
              <CardTitle className="flex items-center text-center justify-center">
                <Shirt className="w-5 h-5 mr-2 text-pink-600" />
                <span>퍼스널 스타일링</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6 md:mb-8">
                  <TabsTrigger value="upload" disabled={isAnalyzing}>정보 입력</TabsTrigger>
                  <TabsTrigger value="analyze" disabled={!selectedImage || isAnalyzing}>스타일 선택</TabsTrigger>
                  <TabsTrigger value="result" disabled={!showResults || isAnalyzing}>추천 결과</TabsTrigger>
                </TabsList>
                
                {/* 정보 입력 탭 */}
                <TabsContent value="upload" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">사진 업로드</h3>
                      <p className="text-sm text-gray-600">
                        체형, 피부톤, 취향을 분석하기 위한 사진을 업로드해주세요. 
                        전신이 나오는 사진이면 더 정확한 추천이 가능합니다.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Label
                            htmlFor="photo-upload"
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md cursor-pointer block text-center"
                          >
                            <Upload className="w-4 h-4 inline-block mr-2" />
                            사진 업로드하기
                          </Label>
                        </div>
                        
                        <div>
                          <Label htmlFor="preference" className="block mb-2">선호 스타일 (선택사항)</Label>
                          <Textarea
                            id="preference"
                            placeholder="예: 밝은 색상을 좋아해요, 오버사이즈 핏을 선호해요..."
                            className="min-h-[100px]"
                            value={preference}
                            onChange={(e) => setPreference(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                      {selectedImage ? (
                        <div className="relative w-full max-w-xs aspect-[3/4]">
                          <Image
                            src={selectedImage}
                            alt="업로드된 이미지"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-100 rounded-lg p-8 text-center w-full max-w-xs aspect-[3/4] flex flex-col items-center justify-center">
                          <Camera className="w-16 h-16 text-gray-300 mb-4" />
                          <p className="text-gray-500">이미지를 업로드해주세요</p>
                          <p className="text-xs text-gray-400 mt-2">JPG, PNG 파일</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500"
                      onClick={() => selectedImage && setActiveTab("analyze")}
                      disabled={!selectedImage}
                    >
                      다음 단계
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 스타일 선택 탭 */}
                <TabsContent value="analyze" className="space-y-6">
                  <div className="space-y-6">
                    {/* 스타일 선택 */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">원하는 스타일</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {styleOptions.map((style) => (
                          <div 
                            key={style.id}
                            className={`
                              border rounded-lg p-4 text-center cursor-pointer transition-all
                              ${selectedStyle === style.id ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' : 'hover:border-gray-300'}
                            `}
                            onClick={() => handleStyleSelect(style.id)}
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              {style.icon}
                            </div>
                            <h4 className="font-medium mb-1">{style.name}</h4>
                            <p className="text-xs text-gray-500">{style.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 목적 선택 */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">코디 목적</h3>
                      <div className="flex flex-wrap gap-3">
                        {purposeOptions.map((purpose) => (
                          <button
                            key={purpose.id}
                            className={`
                              flex items-center space-x-2 px-4 py-2 rounded-full transition-all
                              ${selectedPurpose === purpose.id ? 
                                'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 
                                'bg-white border hover:bg-gray-50'}
                            `}
                            onClick={() => handlePurposeSelect(purpose.id)}
                          >
                            {purpose.icon}
                            <span>{purpose.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("upload")}
                    >
                      이전 단계
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-pink-500 to-purple-500"
                      onClick={handleAnalyzeOutfit}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          분석 중...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          코디 분석하기
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                {/* 결과 탭 */}
                <TabsContent value="result" className="space-y-8">
                  {outfitResults.map((outfit) => (
                    <div key={outfit.id} className="space-y-6">
                      <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                        <div className="flex items-start mb-4">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold">{outfit.title}</h3>
                            <p className="text-sm md:text-base text-gray-600">{outfit.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                          {outfit.items.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-lg p-2 md:p-3 hover:shadow-md transition-shadow">
                              <div className="relative aspect-square mb-2">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <h4 className="font-medium text-xs md:text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                              <p className="text-xs md:text-sm font-medium">{item.price.toLocaleString()}원</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-pink-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <MessageCircle className="w-4 h-4 mr-2 text-pink-500" />
                            스타일링 코멘트
                          </h4>
                          <p className="text-gray-700">{outfit.styleComment}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-2 text-purple-500" />
                            스타일링 팁
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {outfit.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("analyze")}
                      className="w-full sm:w-auto"
                    >
                      이전 단계
                    </Button>
                    <Button 
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500"
                      onClick={resetForm}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      새로운 코디 추천받기
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* 추가 정보 */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 코디네이터란?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  아이라의 AI 코디네이터는 최신 인공지능 기술을 활용하여 개인의 체형, 피부톤, 선호도를 분석하고 
                  최적의 스타일링을 제안해드리는 서비스입니다.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-pink-100 rounded-full p-1 mr-2 mt-0.5">
                      <Sparkles className="w-3 h-3 text-pink-500" />
                    </div>
                    <span className="text-sm">개인 맞춤형 스타일링 제안</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pink-100 rounded-full p-1 mr-2 mt-0.5">
                      <Sparkles className="w-3 h-3 text-pink-500" />
                    </div>
                    <span className="text-sm">TPO에 맞는 코디 추천</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-pink-100 rounded-full p-1 mr-2 mt-0.5">
                      <Sparkles className="w-3 h-3 text-pink-500" />
                    </div>
                    <span className="text-sm">트렌디한 스타일링 팁 제공</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>이용 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>전신이 잘 나온 사진을 업로드해주세요.</li>
                  <li>원하는 스타일과 코디 목적을 선택해주세요.</li>
                  <li>선호하는 스타일에 대한 추가 정보를 입력해주세요.</li>
                  <li>AI가 분석한 맞춤형 코디 추천을 확인하세요.</li>
                  <li>마음에 드는 아이템은 바로 쇼핑도 가능해요!</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <MainFooter />
    </div>
  )
}
