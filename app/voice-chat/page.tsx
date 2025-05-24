"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mic, MicOff, Send, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VoiceChatPage() {
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; content: string }[]>([
    { type: 'ai', content: '안녕하세요! 저는 아이라입니다. 무엇을 도와드릴까요?' }
  ])
  
  const toggleListening = () => {
    setIsListening(!isListening)
  }
  
  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // 사용자 메시지 추가
    setChatHistory([...chatHistory, { type: 'user', content: message }])
    
    // 메시지 입력창 초기화
    setMessage("")
    
    // AI 응답 추가 (실제 구현에서는 API 호출 등으로 대체)
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        content: '죄송해요, 현재 음성 인식 기능은 준비 중입니다. 곧 업데이트 될 예정이니 조금만 기다려주세요!' 
      }])
    }, 1000)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>홈으로</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-gradient">아이라와 음성채팅</h1>
          
          <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 채팅 내역 */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {chat.type === 'ai' && (
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex-shrink-0 mr-3 overflow-hidden">
                      <Image 
                        src="/images/aira.png" 
                        alt="아이라 프로필" 
                        width={32} 
                        height={32} 
                      />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      chat.type === 'user' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{chat.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 입력 영역 */}
            <div className="border-t p-4 bg-gray-50">
              <div className="flex space-x-3">
                <Button 
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  className={`rounded-full ${isListening ? 'animate-pulse' : ''}`}
                  onClick={toggleListening}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <input 
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 py-2 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  size="icon"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                <Sparkles className="w-4 h-4 text-pink-400 mr-1" />
                <span>현재 음성 인식 기능은 베타 버전입니다</span>
              </div>
            </div>
          </Card>
          
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">음성으로 아이라와 대화하는 방법</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>마이크 버튼을 클릭하여 음성 인식을 시작하세요</li>
              <li>아이라에게 질문하고 싶은 내용을 말씀해주세요</li>
              <li>음성 인식이 완료되면 아이라가 답변해드립니다</li>
              <li>채팅으로도 대화할 수 있어요</li>
            </ol>
          </div>
        </div>
      </main>
      
      {/* 푸터 */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2024 AIRA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
