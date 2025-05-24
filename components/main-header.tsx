"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"

interface MainHeaderProps {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

export function MainHeader({ isMobileMenuOpen, toggleMobileMenu }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-slide-in-left">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-sparkle">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold animate-gradient">AIRA</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {["소개", "브이로그", "음성채팅", "AI 코디", "4컷사진", "Q&A", "쇼핑"].map((item, index) => (
              <Link
                key={item}
                href={`/${item === "소개" ? "about" : item === "브이로그" ? "vlog" : item === "음성채팅" ? "voice-chat" : item === "AI 코디" ? "coordinator" : item === "4컷사진" ? "photo-booth" : item === "Q&A" ? "qna" : "shop"}`}
                className={`text-gray-600 hover:text-pink-600 transition-colors animate-fade-in-up stagger-${index + 1}`}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 animate-slide-in-right hover-lift animate-glow">
              팔로우
            </Button>
            
            {/* 모바일 메뉴 토글 버튼 */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center text-gray-600 hover:text-pink-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* 모바일 메뉴 드롭다운 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              {["소개", "브이로그", "음성채팅", "AI 코디", "4컷사진", "Q&A", "쇼핑"].map((item, index) => (
                <Link
                  key={item}
                  href={`/${item === "소개" ? "about" : item === "브이로그" ? "vlog" : item === "음성채팅" ? "voice-chat" : item === "AI 코디" ? "coordinator" : item === "4컷사진" ? "photo-booth" : item === "Q&A" ? "qna" : "shop"}`}
                  className={`text-gray-600 hover:text-pink-600 transition-colors py-2 px-4 rounded-md hover:bg-pink-50 animate-fade-in-up stagger-${index + 1}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 