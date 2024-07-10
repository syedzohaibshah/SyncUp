'use client';

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const ProjectCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16  prompt_layout">
      {data.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const ProjectFeed = () => {
  // States
  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tagClick, setTagClick] = useState('');

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        
        setProjects(data);
        setFilteredProjects(data); // Set initial filtered projects to all projects
        console.log('Fetched projects:', data); // Log fetched projects
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects based on search text
  useEffect(() => {
    const filterProjects = () => {
      if (!searchText) {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(project =>
          project.title.toLowerCase().includes(searchText.toLowerCase()) ||
          project.description.toLowerCase().includes(searchText.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())) ||
          project.skillsRequired.some(skill => skill.toLowerCase().includes(searchText.toLowerCase())) ||
          project.creator.username.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProjects(filtered);
      }
    };
    filterProjects();
  }, [searchText, projects]);

  // Handle tag click
  const handleTagClick = (tag) => {
    setTagClick(tag);
  };

  // Filter projects based on tag click
  useEffect(() => {
    const filterTagProjects = () => {
      if (tagClick) {
        const filteredTag = projects.filter(project =>
          project.tags.some(projectTag => projectTag.toLowerCase() === tagClick.toLowerCase())
        );
        setFilteredProjects(filteredTag);
      }
    };
    filterTagProjects();
  }, [tagClick, projects]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for project title, description, tags, skills, or creator"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <ProjectCardList
        data={filteredProjects}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default ProjectFeed;
