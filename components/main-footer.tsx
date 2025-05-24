"use client"

import { Sparkles, Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link"

export function MainFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-sparkle">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold animate-gradient">AIRA</span>
            </div>
            <p className="text-gray-400">가상 AI 인플루언서 아이라와 함께하는 특별한 디지털 경험</p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors animate-wiggle" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors animate-wiggle" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors animate-wiggle" />
            </div>
          </div>

          {[
            { title: "콘텐츠", links: ["브이로그", "4컷사진", "AI 코디"] },
            { title: "소통", links: ["음성채팅", "Q&A 게시판", "소개"] },
            { title: "쇼핑", links: ["패션", "뷰티", "라이프스타일"] },
          ].map((section, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href="#" className="hover:text-white transition-colors hover-lift">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 animate-fade-in-up stagger-5">
          <p>&copy; 2024 AIRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 