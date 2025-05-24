"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Camera, 
  Download, 
  RefreshCw, 
  Share2, 
  Image as ImageIcon, 
  Smile, 
  Save, 
  Sparkles
} from "lucide-react"
import Image from "next/image"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

// 프레임 옵션 데이터
const frameOptions = [
  { id: "classic", name: "클래식", thumbnailSrc: "/images/aira.png" },
  { id: "cute", name: "큐트", thumbnailSrc: "/images/aira.png" },
  { id: "vintage", name: "빈티지", thumbnailSrc: "/images/aira.png" },
  { id: "modern", name: "모던", thumbnailSrc: "/images/aira.png" },
  { id: "comic", name: "코믹", thumbnailSrc: "/images/aira.png" },
  { id: "love", name: "러브", thumbnailSrc: "/images/aira.png" }
]

// 스티커 옵션 데이터
const stickerOptions = [
  { id: "heart", src: "/images/aira.png" },
  { id: "star", src: "/images/aira.png" },
  { id: "smile", src: "/images/aira.png" },
  { id: "flower", src: "/images/aira.png" },
  { id: "bubble", src: "/images/aira.png" },
  { id: "crown", src: "/images/aira.png" },
  { id: "sparkle", src: "/images/aira.png" },
  { id: "emoji", src: "/images/aira.png" }
]

// 모바일 최적화를 위한 코드 수정
export default function PhotoBoothPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("take")
  const [selectedFrame, setSelectedFrame] = useState("classic")
  const [selectedStickers, setSelectedStickers] = useState<string[]>([])
  const [photosTaken, setPhotosTaken] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [finalPhotoStrip, setFinalPhotoStrip] = useState<string | null>(null)
  
  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  // 프레임 선택
  const handleFrameSelect = (frameId: string) => {
    setSelectedFrame(frameId)
  }
  
  // 스티커 선택/해제
  const toggleSticker = (stickerId: string) => {
    setSelectedStickers(prev => 
      prev.includes(stickerId)
        ? prev.filter(id => id !== stickerId)
        : [...prev, stickerId]
    )
  }
  
  // 사진 촬영 시뮬레이션
  const handleTakePhotos = () => {
    setIsProcessing(true)
    
    // 실제 구현에서는 카메라 API를 통해 사진을 촬영
    // 여기서는 시뮬레이션을 위해 타이머 사용
    setTimeout(() => {
      setPhotosTaken(true)
      setActiveTab("edit")
      setIsProcessing(false)
    }, 3000)
  }
  
  // 최종 사진 생성 시뮬레이션
  const handleCreatePhotoStrip = () => {
    setIsProcessing(true)
    
    // 실제 구현에서는 서버에 이미지를 보내 처리하거나 클라이언트에서 합성
    // 여기서는 시뮬레이션을 위해 타이머 사용
    setTimeout(() => {
      setFinalPhotoStrip("/images/aira.png")
      setActiveTab("download")
      setIsProcessing(false)
    }, 3000)
  }
  
  // 샘플 이미지 배열 (실제 구현에서는 촬영된 이미지 사용)
  const samplePhotos = [
    "/images/aira.png",
    "/images/aira.png",
    "/images/aira.png",
    "/images/aira.png"
  ]
  
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
              4컷 사진 촬영
            </h1>
            <p className="text-gray-600">아이라와 함께하는 특별한 추억을 만들어보세요</p>
          </div>
          
          {/* 메인 카드 */}
          <Card className="overflow-hidden mb-8 md:mb-12">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
              <CardTitle className="flex items-center text-center justify-center">
                <Camera className="w-5 h-5 mr-2 text-pink-600" />
                <span>포토부스</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6 md:mb-8">
                  <TabsTrigger value="take" disabled={isProcessing}>촬영</TabsTrigger>
                  <TabsTrigger value="edit" disabled={!photosTaken || isProcessing}>편집</TabsTrigger>
                  <TabsTrigger value="download" disabled={!finalPhotoStrip || isProcessing}>저장</TabsTrigger>
                </TabsList>
                
                {/* 촬영 탭 */}
                <TabsContent value="take" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">사진 촬영</h3>
                      <p className="text-sm text-gray-600">
                        4장의 사진을 연속으로 촬영합니다. 준비가 되면 촬영 버튼을 눌러주세요.
                        미리 원하는 프레임을 선택할 수 있습니다.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">프레임 선택</h4>
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {frameOptions.map(frame => (
                              <div 
                                key={frame.id}
                                className={`
                                  border rounded-lg p-2 text-center cursor-pointer transition-all
                                  ${selectedFrame === frame.id ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' : 'hover:border-gray-300'}
                                `}
                                onClick={() => handleFrameSelect(frame.id)}
                              >
                                <div className="relative w-12 h-16 mx-auto mb-1">
                                  <Image
                                    src={frame.thumbnailSrc}
                                    alt={frame.name}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                                <p className="text-xs">{frame.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-black rounded-lg p-3 w-full max-w-xs aspect-[3/4] relative flex flex-col items-center justify-center">
                        <Camera className="w-16 h-16 text-gray-600 mb-2" />
                        <p className="text-gray-500 text-center">카메라 미리보기</p>
                        <p className="text-xs text-gray-400 mt-2">실제 구현 시 카메라 피드가 표시됩니다</p>
                      </div>
                      
                      <Button 
                        className="mt-4 w-full max-w-xs bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={handleTakePhotos}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            촬영 중...
                          </>
                        ) : (
                          <>
                            <Camera className="w-4 h-4 mr-2" />
                            사진 촬영하기
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* 편집 탭 */}
                <TabsContent value="edit" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">촬영된 사진</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {samplePhotos.map((photo, index) => (
                          <div key={index} className="relative aspect-[3/4] border rounded-lg overflow-hidden">
                            <Image
                              src={photo}
                              alt={`Photo ${index+1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">스티커 추가</h3>
                      <p className="text-sm text-gray-600">
                        원하는 스티커를 선택하여 사진에 추가할 수 있습니다.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">스티커 선택</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {stickerOptions.map(sticker => (
                              <div 
                                key={sticker.id}
                                className={`
                                  border rounded-lg p-2 text-center cursor-pointer transition-all
                                  ${selectedStickers.includes(sticker.id) ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' : 'hover:border-gray-300'}
                                `}
                                onClick={() => toggleSticker(sticker.id)}
                              >
                                <div className="relative w-10 h-10 mx-auto">
                                  <Image
                                    src={sticker.src}
                                    alt={sticker.id}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500"
                          onClick={handleCreatePhotoStrip}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              생성 중...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              사진 생성하기
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* 다운로드 탭 */}
                <TabsContent value="download" className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                    <div className="relative w-full max-w-xs aspect-[3/4]">
                      {finalPhotoStrip && (
                        <Image
                          src={finalPhotoStrip}
                          alt="Final Photo Strip"
                          fill
                          className="object-contain rounded-lg border shadow-md"
                        />
                      )}
                    </div>
                    
                    <div className="space-y-4 w-full md:w-auto">
                      <h3 className="text-lg font-medium">사진이 완성되었습니다!</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        멋진 사진이 완성되었습니다. 아래 버튼을 눌러 다운로드하거나 공유해보세요.
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        <Button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500">
                          <Download className="w-4 h-4 mr-2" />
                          사진 다운로드
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto">
                          <Share2 className="w-4 h-4 mr-2" />
                          소셜 미디어에 공유
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => {
                            setPhotosTaken(false);
                            setFinalPhotoStrip(null);
                            setSelectedStickers([]);
                            setActiveTab("take");
                          }}
                          className="w-full md:w-auto"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          다시 찍기
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* 추가 정보 */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">이용 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                  <li>원하는 프레임을 선택합니다.</li>
                  <li>촬영 버튼을 눌러 4장의 사진을 찍습니다.</li>
                  <li>스티커를 추가하여 사진을 꾸밉니다.</li>
                  <li>완성된 사진을 다운로드하거나 공유합니다.</li>
                </ol>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">사진 인화 서비스</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  아이라 사진관에서 직접 인화하여 실물 사진으로 간직하세요!
                </p>
                <Button variant="outline" className="text-sm w-full md:w-auto">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  인화 서비스 알아보기
                </Button>
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
