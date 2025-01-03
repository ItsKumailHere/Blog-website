'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-serif font-bold">
            Blogcom 
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-sm hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/write" className="text-sm hover:text-primary transition-colors">
              Write
            </Link>
            <Button asChild>
              <Link href="/posts">Start Writing</Link>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Articles
                </Link>
                <Link
                  href="/write"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Write
                </Link>
                <Button asChild>
                  <Link href="/posts" onClick={() => setIsOpen(false)}>
                    Start Writing
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

