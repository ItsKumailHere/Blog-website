'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '../utils/auth'

const hardcodedPosts = [
  {
    id: 1,
    title: 'The Art of Mindful Living',
    excerpt: 'Discover how mindfulness can transform your daily life and bring peace to your routine.',
    author: 'Sarah Chen',
    date: 'Jan 2, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    category: 'Lifestyle'
  },
  { 
    id: 2,
    title: 'Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: 'Alex Thompson',
    date: 'Jan 1, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80',
    category: 'Technology'
  },
  {
    id: 3,
    title: 'Sustainable Living Guide',
    excerpt: 'Simple steps to reduce your carbon footprint and live more sustainably.',
    author: 'Emma Wilson',
    date: 'Dec 31, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    category: 'Environment'
  },
  {
    id: 4,
    title: 'The Rise of AI in Healthcare',
    excerpt: 'How artificial intelligence is revolutionizing medical diagnosis and treatment.',
    author: 'Dr. Michael Lee',
    date: 'Dec 30, 2023',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    category: 'Health'
  },
  {
    id: 5,
    title: 'Mastering the Art of Remote Work',
    excerpt: 'Tips and strategies for staying productive and maintaining work-life balance in a remote setting.',
    author: 'Lisa Johnson',
    date: 'Dec 29, 2023',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    category: 'Work'
  },
]

//const posts = [ ... ] //removed

export default function BlogPosts() {
  const [posts, setPosts] = useState(hardcodedPosts)
  const router = useRouter()
  const currentUser = getCurrentUser()

  useEffect(() => {
    const userPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    setPosts([...userPosts, ...hardcodedPosts])
  }, [])

  const handleDelete = (id: number) => {
    const postToDelete = posts.find(post => post.id === id)
    if (postToDelete && postToDelete.author === currentUser) {
      const updatedPosts = posts.filter(post => post.id !== id)
      setPosts(updatedPosts)
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts.filter(post => !hardcodedPosts.some(hp => hp.id === post.id))))
    } else {
      alert('You can only delete your own posts.')
    }
  }

  const handleEdit = (id: number) => {
    const postToEdit = posts.find(post => post.id === id)
    if (postToEdit && postToEdit.author === currentUser) {
      router.push(`/edit/${id}`)
    } else {
      alert('You can only edit your own posts.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles
        </motion.h1>
        <div className="space-y-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group grid md:grid-cols-[2fr,3fr] gap-8 items-start"
            >
              <Link href={`/posts/${post.id}`} className="block">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="space-y-4">
                <div>
                  <Link href={`/category/${post.category.toLowerCase()}`}>
                    <span className="text-sm text-primary font-medium">{post.category}</span>
                  </Link>
                  <Link href={`/posts/${post.id}`}>
                    <h2 className="text-2xl font-bold mt-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                </div>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="mx-2">·</span>
                  <span>{post.date}</span>
                  <span className="mx-2">·</span>
                  <span>{post.readTime}</span>
                </div>
                {post.author === currentUser && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

