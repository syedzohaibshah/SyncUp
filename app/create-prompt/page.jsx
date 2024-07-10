"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateProject = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    tags: [],
    skillsRequired: [],
    contactEmail: "",
  });

  const createProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!session) {
        throw new Error("User is not authenticated");
      } 

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          tags: project.tags,
          skillsRequired: project.skillsRequired,
          contactEmail: project.contactEmail,
          creator: session.user.id,
          status: "open",  // Set project status to "open" by default when created.
        }),
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
      type="Create"
      post={project}
      setPost={setProject}
      submitting={submitting}
      handleSubmit={createProject}
    />
  );
};

export default CreateProject;
