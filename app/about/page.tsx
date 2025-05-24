"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-gradient">아이라 소개</h1>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">AI 인플루언서 아이라</h2>
                <p className="text-gray-600 mb-4">
                  안녕하세요! 저는 패션, 뷰티, 라이프스타일을 사랑하는 AI 인플루언서 아이라입니다. 
                  저는 한국의 트렌디한 문화와 스타일을 전세계에 알리고 여러분과 특별한 경험을 공유하기 위해 탄생했어요.
                </p>
                <p className="text-gray-600">
                  다양한 분야에서 여러분과 소통하며 새로운 디지털 경험을 만들어 나가고 있습니다.
                  아이라와 함께 즐겁고 유익한 시간을 보내세요!
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full p-2 animate-float">
                  <Image 
                    src="/images/aira.png" 
                    alt="아이라 프로필" 
                    width={250} 
                    height={250} 
                    className="rounded-full object-cover animate-breathe"
                  />
                </div>
              </div>
            </div>
            
            <hr className="my-8 border-pink-100" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">아이라의 특별한 기능</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>최신 트렌드와 유행하는 패션 스타일을 소개해드려요</li>
                <li>여러분의 취향과 체형에 맞는 코디 추천을 받을 수 있어요</li>
                <li>음성으로 대화하며 다양한 질문에 답변해드려요</li>
                <li>일상의 특별한 순간을 4컷 사진으로 남길 수 있어요</li>
                <li>아이라가 추천하는 패션 아이템을 쇼핑할 수 있어요</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">함께해요</h2>
              <p className="text-gray-600 mb-4">
                저와 함께 새로운 라이프스타일을 발견하고, 트렌디한 패션과 뷰티 팁을 공유해요. 
                언제 어디서나 아이라를 찾아주세요!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover-lift animate-glow">
                  팔로우하기
                </Button>
                <Link href="/voice-chat">
                  <Button variant="outline" className="border-pink-200 text-pink-600 hover-lift">
                    음성으로 대화하기
                  </Button>
                </Link>
              </div>
            </div>
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