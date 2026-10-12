"use client"

import React, { useState } from "react"
import { Menu, ArrowRight, Sparkles, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export interface NavigationSection {
  title: string
  href: string
  isActive?: boolean
}

interface HeaderProps {
  navigationData: NavigationSection[]
}

export default function Header({ navigationData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleScrollTo = (href: string) => {
    setIsOpen(false)
    if (href === "#" || !href) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (href.startsWith("#") && href.length > 1) {
      try {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } catch (err) {
        console.warn("Invalid selector for navigation:", href, err)
      }
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nexus<span className="text-primary font-normal text-muted-foreground">Studio</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              {navigationData.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        handleScrollTo(item.href)
                      }
                    }}
                    className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                      item.isActive
                        ? "text-primary font-semibold bg-accent/40"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleScrollTo("#contact")
            }}
            className="hidden sm:inline-flex"
          >
            <Button size="sm" className="gap-2 shadow-sm font-medium">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>

          {/* Mobile Sheet Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    Nexus Studio
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-3">
                  {navigationData.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault()
                          handleScrollTo(item.href)
                        } else {
                          setIsOpen(false)
                        }
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-accent ${
                        item.isActive
                          ? "bg-accent/60 text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full justify-center gap-2"
                      onClick={() => handleScrollTo("#contact")}
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
