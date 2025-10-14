"use client";

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
import { useGetUser } from "@/hooks/users";
import { EditProfile } from "./editProfile";
import ViewPictures from "./viewPictures";

export function ProfilePagePreview({ me = false }: { me: boolean }) {
  const { user, isLoading, isError } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Error loading user data
      </div>
    );
  }

  const website = user.website && user.website !== "{}" ? user.website : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-gray-200/70 backdrop-blur-md transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
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

      <div className="mx-auto max-w-4xl">

        {/* Cover Image */}
        <ViewPictures user={user} me={me} />

        {/* Profile Header */}
        <div className="px-4 pb-8 pt-12 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Actions */}
            {me ? (
              <div className="flex justify-end">
                <EditProfile data={user} />
              </div>
            ) : (
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
                <p className="max-w-2xl text-pretty leading-relaxed text-gray-700 dark:text-gray-300">
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
                  <span className="font-semibold text-gray-700 dark:text-gray-100">
                    {user?._count.following.toLocaleString()}
                  </span>
                  <span className="text-gray-500">Following</span>
                </div>
                <div className="flex cursor-pointer items-center gap-1 transition-colors hover:text-blue-500">
                  <span className="font-semibold text-gray-700 dark:text-gray-100">
                    {user._count.followers.toLocaleString()}
                  </span>
                  <span className="text-gray-500">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 opacity-50 dark:bg-gray-500" />

        {/* Navigation Tabs */}
        <div className="sticky top-14 z-10 bg-gray-300 px-4 py-4 dark:bg-gray-900 sm:px-6">
          <div className="scrollbar-hide flex gap-6 overflow-x-auto sm:gap-8">
            {["Posts", "Replies", "Media", "Likes"].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`rounded-none px-2 pb-3 text-sm font-semibold transition-colors ${
                  tab === "Posts"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-100"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-800 opacity-50 dark:bg-gray-500" />

        {/* Posts */}
        <div className="space-y-4 px-4 py-6 sm:px-6">
          {/* Pinned post */}
          {user.pinnedPostId &&
            (() => {
              const pinned = user.posts.find((p) => p.id === user.pinnedPostId);
              return pinned ? (
                <PostCard post={pinned} isPinned mockUser={user} />
              ) : null;
            })()}

          {/* All other posts */}
          {user.posts.length > 0 ? (
            user.posts
              .filter((p) => p.id !== user.pinnedPostId)
              .map((post) => (
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
