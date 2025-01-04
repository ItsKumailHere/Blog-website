'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { getCurrentUser } from '../../utils/auth'
import { PageProps } from '@/.next/types/app/edit/[id]/page'

const categories = [
  "Technology", "Lifestyle", "Travel", "Food", "Health", "Business", "Entertainment", "Other"
]

export default function EditPage({ params }: { params: { id: string } } & PageProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [author, setAuthor] = useState('')
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    const user = getCurrentUser()
    setCurrentUser(user)
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const post = posts.find((p: { id: number; title: string; content: string; author: string; date: string; readTime: string; image: string; category: string }) => p.id === parseInt(params.id))
    if (post) {
      if (post.author !== user) {
        alert('You can only edit your own posts.')
        router.push('/posts')
        return
      }
      setTitle(post.title)
      setContent(post.content)
      setCategory(post.category)
      setImage(post.image)
      setAuthor(post.author)
    }
  }, [params.id, router])

  if (!isClient) {
    return null // or a loading state
  }

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
    if (author !== currentUser) {
      alert('You can only edit your own posts.')
      return
    }
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const updatedPosts = posts.map((post: { id: number; title: string; content: string; author: string; date: string; readTime: string; image: string; category: string }) => ({
          ...post,
          title,
          content,
          category,
          image: image || post.image,
          readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
        }))
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
    router.push('/posts')
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in to edit your post.</p>
            <Button onClick={() => router.push('/write')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Select onValueChange={setCategory} value={category} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {image && (
                <div className="mt-2">
                  <Image src={image} alt="Post image" width={200} height={200} className="rounded-md" />
                </div>
              )}
            </div>
            <Textarea
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[200px]"
            />
            <Button type="submit">Update Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



