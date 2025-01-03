

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Comments from '../../components/Comments'
import { PageProps } from '@/.next/types/app/posts/[id]/page'

const posts = [
  {
    id: 1,
    title: 'The Art of Mindful Living',
    content: `
      In our fast-paced world, finding moments of peace can seem impossible. Yet, the practice of mindfulness offers a path to tranquility amidst chaos. This guide explores practical ways to incorporate mindfulness into your daily routine.

      ## What is Mindfulness?

      Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment — free from distraction or judgment, and aware of our thoughts and feelings without getting caught up in them.

      ## Benefits of Mindful Living

      - Reduced stress and anxiety
      - Improved focus and concentration
      - Better emotional regulation
      - Enhanced self-awareness
      - Improved sleep quality

      ## Getting Started

      Begin with simple practices like mindful breathing, walking meditation, or conscious eating. The key is consistency rather than perfection.
    `,
    author: 'Sarah Chen',
    date: 'Jan 2, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    category: 'Lifestyle'
  },
  // Add more posts with Unsplash images...
]

// Get user-created posts from localStorage
const userPosts = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('blogPosts') || '[]')
  : []

// Combine hardcoded and user-created posts
const allPosts = [...userPosts, ...posts]

export default function BlogPost({ params }: { params: { id: string } }& PageProps) {
  const post = allPosts.find(p => p.id === parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-sm text-primary font-medium">{post.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span className="mx-2">·</span>
              <span>{post.date}</span>
              <span className="mx-2">·</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={post.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'}
              alt={post.title}
              width={800}
              height={400}
              className="w-full aspect-[2/1] object-cover rounded-lg mb-8"
            />
            <div className="space-y-6 text-lg">
              {typeof post.content === 'string' && post.content.split('\n').map((paragraph: string, index: number) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-3xl font-semibold mb-6 font-serif">{paragraph.replace('## ', '')}</h2>
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>
                }
                return paragraph.trim() && <p key={index} className="leading-relaxed">{paragraph}</p>
              })}
            </div>
          </motion.div>

          <hr className="my-12" />
          <Comments postId={post.id} />
        </div>
      </div>
    </article>
  )
}

