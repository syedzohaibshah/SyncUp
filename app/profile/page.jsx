'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProjects = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            throw new Error('Failed to fetch projects');
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      }
    };
    fetchProjects();
  }, [session?.user.id]);

  const handleEdit = (project) => {
    router.push(`/update-project?id=${project._id}`);
  };

  const handleDelete = async (project) => {
    const hasConfirmed = confirm("Are you sure you want to delete this project?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/project/${project._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredProjects = projects.filter((p) => p._id !== project._id);
        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };
  const handleStatus = async (project) => {
    const updatedStatus = project.status === "open" ? "closed" : "open";
    try {
      const response = await fetch(`/api/project/${project._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: updatedStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update project status');
      }
  
      // Refresh the page after successful status update
      window.location.reload();
    } catch (error) {
      console.error('Error updating project status:', error);
      // Optionally, you can show an error message to the user here
    }
  };
  return (
    <Profile
      name='My'
      desc="Welcome to your personalized profile page."
      data={projects}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleStatus={handleStatus}
      session={session}
    />
  );
};

export default MyProjects;
