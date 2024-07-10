import ProjectCard from "./ProjectCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleStatus }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className="mt-16 prompt_layout">
        {data && Array.isArray(data) ? (
          data.map((project) => (
            <div key={project._id} className="relative">
              <ProjectCard
                project={project}
                handleEdit={() => handleEdit && handleEdit(project)}
                handleDelete={() => handleDelete && handleDelete(project)}
                handleStatus={() => handleStatus && handleStatus(project)}
              />
           
                 
              
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
