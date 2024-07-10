  "use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!params?.id) return;

      try {
        const response = await fetch(`/api/users/${params.id}/posts`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchPosts();
  }, [params]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default function ProfileWithSuspense({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile params={params} />
    </Suspense>
  );
}
