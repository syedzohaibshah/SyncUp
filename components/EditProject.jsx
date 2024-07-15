"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    tags: [],
    skillsRequired: [],
    contactEmail: "",
    status: "open",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setPost({
        title: data.title,
        description: data.description,
        tags: data.tags,
        skillsRequired: data.skillsRequired,
        contactEmail: data.contactEmail,
        status: data.status,
      });
    };
    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!projectId) return alert('Project ID not found');

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

const EditProjectWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProject />
    </Suspense>
  );
};

export default EditProjectWrapper;