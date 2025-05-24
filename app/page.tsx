"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Mic,
  Sparkles,
  ImageIcon,
  MessageCircle,
  ShoppingBag,
  Play,
  Heart,
  Star,
  Instagram,
  Youtube,
  Twitter,
  ArrowRight,
  Quote,
  MapPin,
  Coffee,
  Music,
  Palette,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-4 h-4 bg-pink-300 rounded-full animate-float opacity-60"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
          }}
        />
        <div
          className="absolute w-6 h-6 bg-purple-300 rounded-full animate-float opacity-40"
          style={{
            left: `${mousePosition.x * 0.02 + 100}px`,
            top: `${mousePosition.y * 0.02 + 50}px`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-3 h-3 bg-blue-300 rounded-full animate-float opacity-50"
          style={{
            left: `${mousePosition.x * 0.015 + 200}px`,
            top: `${mousePosition.y * 0.015 + 100}px`,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Header */}
      <MainHeader isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 animate-wiggle">✨ AI 인플루언서</Badge>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="animate-typewriter inline-block">안녕하세요!</span>
                  <br />
                  <span className="animate-gradient animate-breathe">아이라</span>
                  <span className="animate-fade-in-up stagger-3">입니다</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up stagger-4">
                  패션, 뷰티, 라이프스타일을 사랑하는 가상 인플루언서입니다.
                  <br />
                  함께 트렌디한 일상을 공유해요! 💕
                </p>
              </div>

              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-5">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover-lift animate-glow"
                >
                  <Play className="w-4 h-4 mr-2 animate-sparkle" />
                  최신 브이로그 보기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 hover-lift"
                >
                  <Mic className="w-4 h-4 mr-2 animate-wiggle" />
                  음성채팅 시작
                </Button>
              </div>

              <div className="flex items-center space-x-8 animate-fade-in-up stagger-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500 animate-heartbeat" />
                  <span className="font-semibold">1.2M</span>
                  <span className="text-gray-600">팔로워</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 animate-sparkle" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-600">평점</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-blue-500 animate-wiggle" />
                  <span className="font-semibold">2.8M</span>
                  <span className="text-gray-600">조회수</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="character-container relative w-full max-w-lg mx-auto">
                {/* Main Character Image */}
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl character-main hover-tilt">
                  <Image
                    src="/images/aira.png" alt="AIRA AI Influencer"
                    width={400}
                    height={600}
                    className="rounded-2xl shadow-lg animate-breathe"
                  />

                  {/* Character Eyes - Blinking Effect */}
                  <div className="absolute top-32 left-32 w-2 h-2 bg-black rounded-full animate-blink"></div>
                  <div
                    className="absolute top-32 left-40 w-2 h-2 bg-black rounded-full animate-blink"
                    style={{ animationDelay: "0.1s" }}
                  ></div>

                  {/* Floating Elements around Character */}
                  <div className="floating-element -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-sparkle">
                    <Sparkles className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="floating-element -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-heartbeat">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="floating-element top-1/4 -left-6 bg-white rounded-full p-2 shadow-lg animate-wiggle">
                    <Camera className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="floating-element top-3/4 -right-6 bg-white rounded-full p-2 shadow-lg animate-float">
                    <Music className="w-4 h-4 text-purple-500" />
                  </div>

                  {/* Glowing Aura */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20 animate-glow -z-10"></div>
                </div>

                {/* Additional Floating Elements */}
                <div className="absolute top-10 right-10 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center animate-sparkle">
                    <span className="text-sm">💖</span>
                  </div>
                </div>
                <div className="absolute bottom-20 left-10 animate-float" style={{ animationDelay: "2s" }}>
                  <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center animate-wiggle">
                    <span className="text-xs">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 animate-gradient">아이라의 다양한 모습들</h2>
            <p className="text-xl text-gray-600">매일매일 새로운 매력을 발견해보세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "데일리 룩", subtitle: "편안한 일상 스타일", badge: "Daily", color: "pink", delay: "0.1s" },
              { title: "패션 룩", subtitle: "트렌디한 스타일링", badge: "Fashion", color: "purple", delay: "0.2s" },
              { title: "뷰티 룩", subtitle: "메이크업 & 헤어", badge: "Beauty", color: "rose", delay: "0.3s" },
              { title: "라이프스타일", subtitle: "일상의 특별한 순간", badge: "Life", color: "green", delay: "0.4s" },
            ].map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="relative">
                  <Image
                    src="/images/aira.png"
                    alt={item.title}
                    width={250}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 animate-breathe"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white animate-slide-in-left">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                  <Badge className={`absolute top-3 left-3 bg-${item.color}-500 animate-wiggle`}>{item.badge}</Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in-up stagger-5">
            <Button variant="outline" size="lg" className="border-pink-200 text-pink-600 hover:bg-pink-50 hover-lift">
              더 많은 사진 보기
              <ArrowRight className="w-4 h-4 ml-2 animate-wiggle" />
            </Button>
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 animate-gradient">아이라의 인기 영상</h2>
            <p className="text-xl text-gray-600">가장 사랑받는 브이로그 모음</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured Video */}
            <Card className="md:col-span-2 overflow-hidden hover:shadow-xl transition-shadow group hover-lift animate-slide-in-left">
              <div className="relative">
                <Image
                  src="/images/aira.png"
                  alt="Featured Video"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover animate-breathe"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="lg"
                    className="bg-white/90 text-black hover:bg-white rounded-full w-16 h-16 p-0 animate-heartbeat"
                  >
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-wiggle">
                  <Play className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm animate-fade-in-up">
                  15:32
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 animate-typewriter">봄 패션 하울 & 스타일링 팁 🌸</h3>
                <p className="text-gray-600 mb-4 animate-fade-in-up stagger-2">
                  새로운 봄 옷들과 함께하는 스타일링 가이드! 트렌디한 룩부터 데일리 룩까지 모두 공개해요.
                </p>
                <div className="flex items-center justify-between animate-fade-in-up stagger-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500 animate-heartbeat" />
                      <span className="text-sm">1.2K</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-blue-500 animate-wiggle" />
                      <span className="text-sm">89</span>
                    </div>
                    <span className="text-sm text-gray-500">2시간 전</span>
                  </div>
                  <Button size="sm" variant="outline" className="hover-lift">
                    시청하기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video List */}
            <div className="space-y-4 animate-slide-in-right">
              {[
                { title: "데일리 메이크업 루틴", views: "856K", time: "8:45", likes: "892", delay: "0.1s" },
                { title: "카페 브이로그 ☕", views: "1.2M", time: "12:20", likes: "2.1K", delay: "0.2s" },
                { title: "Q&A 시간 💭", views: "945K", time: "6:33", likes: "1.5K", delay: "0.3s" },
              ].map((video, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer hover-lift animate-fade-in-up"
                  style={{ animationDelay: video.delay }}
                >
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src="/images/aira.png"
                        alt="Video Thumbnail"
                        width={120}
                        height={100}
                        className="w-full h-full object-cover animate-breathe"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-white animate-sparkle" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 text-xs rounded">
                        {video.time}
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {video.views} 조회수 • {index + 1}일 전
                      </p>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-3 h-3 text-red-500 animate-heartbeat" />
                        <span className="text-xs">{video.likes}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Character Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h2 className="text-4xl font-bold mb-6 animate-gradient">아이라를 더 알아보세요</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Quote,
                      title: "나만의 철학",
                      content:
                        "매일매일이 새로운 스타일을 발견하는 여행이에요. 완벽하지 않아도 괜찮아요, 나다운 것이 가장 아름다우니까요!",
                      color: "pink",
                      delay: "0.1s",
                    },
                    {
                      icon: Heart,
                      title: "좋아하는 것들",
                      content: null,
                      color: "purple",
                      delay: "0.2s",
                    },
                    {
                      icon: MapPin,
                      title: "꿈과 목표",
                      content:
                        "전 세계 사람들과 패션과 뷰티를 통해 소통하며, 모든 사람이 자신만의 아름다움을 발견할 수 있도록 도움을 주고 싶어요.",
                      color: "blue",
                      delay: "0.3s",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 animate-fade-in-up"
                      style={{ animationDelay: item.delay }}
                    >
                      <div
                        className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center flex-shrink-0 animate-sparkle`}
                      >
                        <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        {item.content ? (
                          <p className="text-gray-600">{item.content}</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {[
                              { icon: Coffee, text: "카페 투어", color: "pink" },
                              { icon: Music, text: "K-POP", color: "purple" },
                              { icon: Palette, text: "아트", color: "blue" },
                              { icon: Camera, text: "사진", color: "green" },
                            ].map((badge, badgeIndex) => (
                              <Badge
                                key={badgeIndex}
                                variant="outline"
                                className={`border-${badge.color}-200 text-${badge.color}-600 animate-wiggle hover-lift`}
                                style={{ animationDelay: `${badgeIndex * 0.1}s` }}
                              >
                                <badge.icon className="w-3 h-3 mr-1" />
                                {badge.text}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 animate-fade-in-up stagger-4">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover-lift animate-glow">
                  더 알아보기
                </Button>
                <Button variant="outline" className="border-pink-200 text-pink-600 hover-lift">
                  팔로우하기
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {[1, 2].map((item, index) => (
                    <Card
                      key={item}
                      className="overflow-hidden hover-tilt animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Image
                        src="/images/aira.png"
                        alt={`Aira moment ${item}`}
                        width={200}
                        height={200}
                        className={`w-full ${item === 1 ? "h-32" : "h-40"} object-cover animate-breathe`}
                      />
                    </Card>
                  ))}
                </div>
                <div className="space-y-4 mt-8">
                  {[3, 4].map((item, index) => (
                    <Card
                      key={item}
                      className="overflow-hidden hover-tilt animate-fade-in-up"
                      style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                    >
                      <Image
                        src="/images/aira.png"
                        alt={`Aira moment ${item}`}
                        width={200}
                        height={250}
                        className={`w-full ${item === 3 ? "h-40" : "h-32"} object-cover animate-breathe`}
                      />
                    </Card>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <div className="floating-element -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-sparkle">
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
              <div className="floating-element bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-heartbeat">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced with animations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 animate-gradient">아이라와 함께하는 특별한 경험</h2>
            <p className="text-xl text-gray-600">다양한 기능으로 더욱 가까워져요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "브이로그",
                desc: "일상, 패션, 뷰티 콘텐츠를 영상과 사진으로 만나보세요",
                color: "pink",
                link: "더 보기",
              },
              {
                icon: Mic,
                title: "음성채팅",
                desc: "실시간으로 아이라와 대화하며 소통해보세요",
                color: "purple",
                link: "채팅 시작",
              },
              {
                icon: Sparkles,
                title: "AI 코디네이터",
                desc: "개인 맞춤 스타일링 추천을 받아보세요",
                color: "indigo",
                link: "스타일링 받기",
              },
              {
                icon: ImageIcon,
                title: "4컷 사진",
                desc: "아이라와 함께하는 특별한 추억을 4컷으로 남겨보세요",
                color: "emerald",
                link: "사진 찍기",
              },
              {
                icon: MessageCircle,
                title: "질문 게시판",
                desc: "궁금한 것들을 자유롭게 물어보세요",
                color: "orange",
                link: "질문하기",
              },
              {
                icon: ShoppingBag,
                title: "쇼핑",
                desc: "아이라가 추천하는 패션 아이템들을 만나보세요",
                color: "rose",
                link: "쇼핑하기",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 hover-lift animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 bg-${feature.color}-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-sparkle`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.desc}</p>
                  <Button
                    variant="ghost"
                    className={`text-${feature.color}-600 hover:text-${feature.color}-700 p-0 animate-wiggle`}
                  >
                    {feature.link} →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 animate-gradient">최신 콘텐츠</h2>
            <p className="text-xl text-gray-600">아이라의 새로운 소식을 확인해보세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "봄 패션 하울 🌸",
                desc: "새로운 봄 옷들을 소개해드려요!",
                time: "2시간 전",
                likes: "1.2K",
                isNew: true,
              },
              {
                title: "데일리 메이크업 튜토리얼",
                desc: "자연스러운 일상 메이크업 방법",
                time: "1일 전",
                likes: "856",
                isNew: false,
              },
              {
                title: "팔로워 Q&A 시간",
                desc: "여러분의 질문에 답해드려요",
                time: "3일 전",
                likes: "2.1K",
                isNew: false,
              },
            ].map((content, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow group hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48">
                  <Image
                    src="/images/aira.png"
                    alt={content.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 animate-breathe"
                  />
                  {content.isNew && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white animate-wiggle">NEW</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white/90 text-black rounded-full animate-heartbeat">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{content.title}</h3>
                  <p className="text-gray-600 mb-4">{content.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{content.time}</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500 animate-heartbeat" />
                      <span className="text-sm">{content.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <MainFooter />
    </div>
  )
}
