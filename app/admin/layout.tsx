"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Video,
  MessageCircle,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  BarChart3,
  FileText,
  Calendar,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { icon: LayoutDashboard, label: "대시보드", href: "/admin", badge: null },
  { icon: Video, label: "브이로그 관리", href: "/admin/vlog", badge: "3" },
  { icon: MessageCircle, label: "Q&A 관리", href: "/admin/qna", badge: "12" },
  { icon: ShoppingBag, label: "쇼핑몰 관리", href: "/admin/shop", badge: null },
  { icon: Users, label: "사용자 관리", href: "/admin/users", badge: null },
  { icon: BarChart3, label: "분석", href: "/admin/analytics", badge: null },
  { icon: FileText, label: "리포트", href: "/admin/reports", badge: null },
  { icon: Calendar, label: "스케줄", href: "/admin/schedule", badge: null },
  { icon: Settings, label: "설정", href: "/admin/settings", badge: null },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              AIRA Admin
            </span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      className={`${isActive ? "bg-white/20 text-white" : "bg-red-100 text-red-700"} text-xs px-2 py-1`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Admin Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Admin</p>
              <p className="text-sm text-gray-500">관리자</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Bell className="w-4 h-4 mr-2" />
              알림
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                AIRA Admin
              </span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
