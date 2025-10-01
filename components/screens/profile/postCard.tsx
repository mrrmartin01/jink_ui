import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IconBookmark, IconHeart, IconRepeat } from "@tabler/icons-react"
import { MessageCircle, Verified } from "lucide-react"

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: string
    likes: number
    reposts: number
    replies: number
    images: string[]
  }
  isPinned?: boolean
  mockUser?: {
    id: string
    userName: string
    profileImageUrl?: string
    displayName?: string
  }
}

export function PostCard({ post, isPinned = false, mockUser }: PostCardProps) {
  return (
    <Card className="p-4 sm:p-6 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-200">
      {isPinned && (
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-950 rounded-full" />
          </div>
          Pinned Post
        </div>
      )}

      <div className="flex gap-3">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 hover:opacity-90 transition-opacity">
          <AvatarImage src={mockUser?.profileImageUrl || "/placeholder.svg"} alt={mockUser?.displayName} />
          <AvatarFallback className="bg-gray-800 text-gray-100">
            {mockUser?.displayName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-gray-100 hover:underline cursor-pointer">
              {mockUser?.displayName}
            </span>
            <Verified className="w-4 h-4 text-blue-500" />
            <span className="text-gray-500 text-sm">@{mockUser?.userName}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <p className="text-gray-200 leading-relaxed mb-3 text-pretty">{post.content}</p>

          {post.images?.length > 0 && (
            <div className="mb-4 rounded-2xl overflow-hidden border border-gray-800">
              <img
                src={post.images[0] || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex items-center justify-between max-w-md gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">{post.replies}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-green-500 hover:bg-green-500/10 transition-colors"
            >
              <IconRepeat className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">{post.reposts}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <IconHeart className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <IconBookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}