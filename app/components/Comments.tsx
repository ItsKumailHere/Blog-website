'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface Comment {
  id: number
  content: string 
  author: string
  date: string
}

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => { 
    const storedComments = localStorage.getItem(`comments-${postId}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [postId])

  useEffect(() => {
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments))
  }, [comments, postId])

  const addComment = () => {
    if (newComment.trim() && username.trim()) {
      const comment: Comment = {
        id: Date.now(),
        content: newComment.trim(),
        author: username.trim(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  const deleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id))
  }

  const editComment = (id: number, newContent: string) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, content: newContent } : comment
    ))
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Discussion</h2>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add to the discussion"
            className="min-h-[100px]"
          />
          <Button 
            onClick={addComment}
            disabled={!newComment.trim() || !username.trim()}
          >
            Comment
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {comments.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newContent = prompt('Edit your comment:', comment.content)
                        if (newContent) editComment(comment.id, newContent)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteComment(comment.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

