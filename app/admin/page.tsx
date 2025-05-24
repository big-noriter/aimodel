"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  Video,
  MessageCircle,
  ShoppingBag,
  TrendingUp,
  Eye,
  DollarSign,
  Package,
  Settings,
  Bell,
  Download,
} from "lucide-react"
import Link from "next/link"

const statsData = [
  { name: "1월", views: 4000, likes: 2400, comments: 800 },
  { name: "2월", views: 3000, likes: 1398, comments: 600 },
  { name: "3월", views: 2000, likes: 9800, comments: 1200 },
  { name: "4월", views: 2780, likes: 3908, comments: 900 },
  { name: "5월", views: 1890, likes: 4800, comments: 700 },
  { name: "6월", views: 2390, likes: 3800, comments: 1100 },
]

const salesData = [
  { name: "패션", value: 400, color: "#ec4899" },
  { name: "뷰티", value: 300, color: "#8b5cf6" },
  { name: "액세서리", value: 200, color: "#06b6d4" },
  { name: "라이프스타일", value: 100, color: "#10b981" },
]

const recentActivities = [
  { type: "vlog", title: "새로운 브이로그 업로드", time: "2시간 전", status: "published" },
  { type: "question", title: "Q&A 답변 완료", time: "4시간 전", status: "answered" },
  { type: "order", title: "새로운 주문 접수", time: "6시간 전", status: "pending" },
  { type: "user", title: "신규 팔로워 100명 달성", time: "1일 전", status: "milestone" },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-gray-600">아이라 플랫폼 관리</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                리포트 다운로드
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                알림
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                설정
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900">2.4M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 팔로워</p>
                  <p className="text-2xl font-bold text-gray-900">1.2M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2%
                  </p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">월 매출</p>
                  <p className="text-2xl font-bold text-gray-900">₩45.2M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.3%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">활성 상품</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Package className="w-3 h-3 mr-1" />
                    +5개
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/vlog">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">브이로그 관리</h3>
                    <p className="text-sm text-gray-600">콘텐츠 업로드 및 편집</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/qna">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Q&A 관리</h3>
                    <p className="text-sm text-gray-600">질문 답변 및 관리</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/shop">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">쇼핑몰 관리</h3>
                    <p className="text-sm text-gray-600">상품 및 주문 관리</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Analytics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" />
                  <Bar dataKey="likes" fill="#ec4899" />
                  <Bar dataKey="comments" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>매출 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === "vlog" && <Video className="w-5 h-5 text-blue-600" />}
                      {activity.type === "question" && <MessageCircle className="w-5 h-5 text-green-600" />}
                      {activity.type === "order" && <ShoppingBag className="w-5 h-5 text-purple-600" />}
                      {activity.type === "user" && <Users className="w-5 h-5 text-pink-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "published"
                          ? "default"
                          : activity.status === "answered"
                            ? "secondary"
                            : activity.status === "pending"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>오늘의 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">새 팔로워</span>
                  <span className="font-semibold">+234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">브이로그 조회</span>
                  <span className="font-semibold">12.4K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">새 질문</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">주문 건수</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">매출</span>
                  <span className="font-semibold">₩2.1M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
