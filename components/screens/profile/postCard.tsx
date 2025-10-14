import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBookmark, IconHeart, IconRepeat } from "@tabler/icons-react";
import { MessageCircle, Verified } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    createdAt: string;
    likes: number;
    reposts: number;
    replies: number;
    images: string[];
  };
  isPinned?: boolean;
  mockUser?: {
    id: string;
    userName: string;
    profileImageUrl?: string;
    displayName?: string;
  };
}

export function PostCard({ post, isPinned = false, mockUser }: PostCardProps) {
  return (
    <Card className="border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-900/70 sm:p-6">
      {isPinned && (
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-950" />
          </div>
          Pinned Post
        </div>
      )}

      <div className="flex gap-3">
        <Avatar className="h-10 w-10 transition-opacity hover:opacity-90 sm:h-12 sm:w-12">
          <AvatarImage
            src={mockUser?.profileImageUrl}
            alt={mockUser?.displayName}
          />
          <AvatarFallback className="bg-gray-800 text-gray-100">
            {mockUser?.displayName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="cursor-pointer font-semibold text-gray-100 hover:underline">
              {mockUser?.displayName}
            </span>
            <Verified className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-500">@{mockUser?.userName}</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <p className="mb-3 text-pretty leading-relaxed text-gray-200">
            {post.content}
          </p>

          {post.images?.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-2xl border border-gray-800">
              <img
                src={post.images[0] || "/placeholder.svg"}
                alt="Post image"
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-64"
              />
            </div>
          )}

          <div className="flex max-w-md items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500"
            >
              <MessageCircle className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="text-sm">{post.replies}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 transition-colors hover:bg-green-500/10 hover:text-green-500"
            >
              <IconRepeat className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="text-sm">{post.reposts}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
            >
              <IconHeart className="mr-1 h-4 w-4 sm:mr-2" />
              <span className="text-sm">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500"
            >
              <IconBookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
