'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

const featuredPosts = [
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
  }
]

export default function Home() {
  return (
    <div>
      <section className="relative bg-muted py-24 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Write, Share, Connect
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join a community of writers and readers. Share your stories, ideas, and expertise with the world.
        </p>
        <Button size="lg" asChild>
          <Link href="/write">
            Start Writing <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-[400px]"
      >
        <Image
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Writing and blogging"
          fill
          className="object-cover rounded-lg"
        />
      </motion.div>
    </div>
  </div>
</section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/posts/${post.id}`}>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-primary font-medium">{post.category}</span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="mx-2">·</span>
                      <span>{post.date}</span>
                      <span className="mx-2">·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
 
