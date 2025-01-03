'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { authenticateUser, registerUser, setCurrentUser, getCurrentUser } from '../utils/auth' 

const categories = [
  "Technology", "Lifestyle", "Travel", "Food", "Health", "Business", "Entertainment", "Other"
]

export default function WritePage() {
  const [title, setTitle] = useState('') 
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentUser = getCurrentUser()
    if (!currentUser) {
      alert('Please log in or register to create a post.')
      return
    }
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: currentUser,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      image: image || 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      category
    }

    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const updatedPosts = [newPost, ...existingPosts]
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
    router.push('/posts')
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegistering) {
      registerUser(email, password)
      setCurrentUser(email)
    } else {
      if (authenticateUser(email, password)) {
        setCurrentUser(email)
      } else {
        alert('Invalid credentials')
        return
      }
    }
    setEmail('')
    setPassword('')
  }

  const currentUser = getCurrentUser()

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{currentUser ? 'Write a New Post' : (isRegistering ? 'Register' : 'Login')}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentUser ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Select onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && (
                <div className="mt-2">
                  <Image src={image} alt="Uploaded image" width={200} height={200} className="rounded-md" />
                </div>
              )}
              <Textarea
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[200px]"
              />
              <Button type="submit">Publish Post</Button>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
              <Button type="button" variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

