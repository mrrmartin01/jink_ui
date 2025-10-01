"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  Calendar,
  MapPin,
  LinkIcon,
  Verified,
} from "lucide-react";
import { PostCard } from "./postCard";
import { useGetUser } from "@/hooks/users/useGetUser";

export function ProfilePagePreview({ me = false }: { me: boolean }) {
  const { user, isLoading, isError } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
        Loading...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
        Error loading user data
      </div>
    );
  }

  const website = user.website && user.website !== "{}" ? user.website : null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-extrabold tracking-tight sm:text-xl">
                {user.displayName}
              </h1>
              <p className="text-sm text-gray-500">@{user.userName}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Cover Image */}
        <div
          className={`h-48 sm:h-64 ${user.coverImageUrl ? "bg-cover bg-center" : "bg-gradient-to-r from-blue-600 to-purple-600"} relative`}
          style={
            user.coverImageUrl
              ? { backgroundImage: `url(${user.coverImageUrl})` }
              : {}
          }
        >
          <div className="absolute -bottom-16 left-4 sm:left-6">
            <Avatar className="h-24 w-24 transform rounded-full border-4 border-gray-950 shadow-2xl transition-transform hover:scale-105 sm:h-32 sm:w-32">
              <AvatarImage
                src={user.profileImageUrl || "/placeholder.svg"}
                alt={user.displayName}
              />
              <AvatarFallback className="bg-gray-800 text-2xl font-bold text-gray-100">
                {user.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Profile Header */}

        <div className="px-4 pb-8 pt-16 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Actions */}
            {me ? null : (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-100 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  Message
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-blue-500 px-6 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  Follow
                </Button>
              </div>
            )}

            {/* Profile Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h1 className="text-balance text-xl font-extrabold tracking-tight sm:text-2xl">
                  {user.displayName}
                </h1>
                <Verified className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500">@{user.userName}</p>

              {user.bio && (
                <p className="max-w-2xl text-pretty leading-relaxed text-gray-300">
                  {user.bio}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 sm:gap-6">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <a href={website} className="text-blue-500 hover:underline">
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-blue-500">
                  <span className="font-semibold text-gray-100">
                    {user?._count.following.toLocaleString()}
                  </span>
                  <span className="text-gray-500">Following</span>
                </div>
                <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-blue-500">
                  <span className="font-semibold text-gray-100">
                    {user._count.followers.toLocaleString()}
                  </span>
                  <span className="text-gray-500">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 opacity-50" />

        {/* Navigation Tabs */}
        <div className="sticky top-14 z-10 bg-gray-950 px-4 py-4 sm:px-6">
          <div className="scrollbar-hide flex gap-6 overflow-x-auto sm:gap-8">
            {["Posts", "Replies", "Media", "Likes"].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`rounded-none px-0 pb-3 text-sm font-semibold transition-colors ${
                  tab === "Posts"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-100"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-800 opacity-50" />

        {/* Posts */}
        <div className="space-y-4 px-4 py-6 sm:px-6">
          {user?.pinnedPostId &&
          user.posts.find((post) => post.id === user.pinnedPostId) ? (
            <PostCard
              post={user.posts.find((post) => post.id === user.pinnedPostId)}
              isPinned={true}
              mockUser={user}
            />
          ) : null}
          {user?.posts.length > 0 ? (
            user?.posts.map((post) => (
              <PostCard key={post.id} post={post} mockUser={user} />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No posts yet. Say Some - Thing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
