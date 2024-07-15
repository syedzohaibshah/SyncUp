"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";


const ProjectCard = ({ project, handleEdit, handleDelete, handleTagClick ,handleStatus}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (project.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${project.creator._id}?name=${project.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(project.description);
    navigator.clipboard.writeText(project.description);
    setTimeout(() => setCopied(false), 3000);
  };
  const onStatusChange = () => {
    if (handleStatus) {
      handleStatus(project);
    }
  };


  const handleContact = () => {
    const recipient = encodeURIComponent(project.contactEmail);
    const subject = encodeURIComponent(`Regarding your project: ${project.title}`);
    const body = encodeURIComponent(`Hello,\n\nI'm interested in your project ${project.title} that you posted on SyncUp...`);
    
    // Construct the Gmail compose URL with recipient, subject, and body
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    
    // Open Gmail in a new tab
    window.open(gmailComposeUrl, '_blank');
  };

  return (
    <div className='prompt_card p-10 rounded-lg  bg-white relative'>
      {/* Status Tag */}
      <div
        className={`absolute top-0 right-0 rounded-lg px-3 mr-2 mt-2 py-1 text-sm font-semibold ${
          project.status === "open" ? "bg-green-500 text-white" : "bg-orange-500 text-white"
        }`}
      >
        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
      </div>

      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={project.creator?.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {project.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {project.creator.email}
            </p>
          </div>
        </div>
{/* 
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === project.description
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === project.description ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>

      {/* <h2 className='my-2 font-satoshi font-semibold text-gray-900'>{project.title}</h2>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{project.description}</p> */}
       {/* Project Title */}
       <h2 className="text-xl font-bold mt-4 text-gray-800 mb-2">{project.title}</h2>

{/* Project Description */}
<p className={`text-gray-600 mb-4 ${isExpanded ? "" : "line-clamp-3"}`}>
  {project.description}
</p>
<button 
  onClick={() => setIsExpanded(!isExpanded)}
  className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mb-4"
>
  {isExpanded ? "Show less" : "Read more"}
</button>



      
    {/* Tags */}
    <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags:</label>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagClick && handleTagClick(tag)}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills Required:</label>
          <div className="flex flex-wrap gap-2">
            {project.skillsRequired.map((skill) => (
              <span
                key={skill}
                className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
       

 
     {session?.user? ( <button 
        className="btn-primary flex flex-row items-center justify-center space-x-2 px-4 py-2" 
        onClick={handleContact}
      >
        <span>Connect</span>
        <Image 
    
          src="/assets/icons/send.png" 
          width={15} 
          height={15}  
          alt="Send icon" 
          className="inline-block "
        />
      </button>):<></>}  
      {session?.user.id === project.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={() => handleEdit(project)}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={() => handleDelete(project)}
          >
            Delete
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={onStatusChange}
          >
            Change Status
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
