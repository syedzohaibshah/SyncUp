import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Project</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your project with the community. Let others know what you're working on and find the perfect partners.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Project Title
          </span>
          <input 
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder='Enter your project title'
            required
            className="form_input"
          />
        </label>
        
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Project Description
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder='Describe your project'
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tags <span className='font-normal'>(#webdevelopment #AI #startup)</span>
          </span>
          <input 
            value={post.tags.join(', ')}
            onChange={(e) => setPost({ ...post, tags: e.target.value.split(', ') })}
            placeholder='#tags'
            required
            className="form_input"
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Skills Required <span className='font-normal'>(#javascript #react #nodejs)</span>
          </span>
          <input 
            value={post.skillsRequired.join(', ')}
            onChange={(e) => setPost({ ...post, skillsRequired: e.target.value.split(', ') })}
            placeholder='#skillsRequired'
            required
            className="form_input"
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Contact Email
          </span>
          <input 
            type="email"
            value={post.contactEmail}
            onChange={(e) => setPost({ ...post, contactEmail: e.target.value })}
            placeholder='Your contact email'
            required
            className="form_input"
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Project Status
          </span>
          <select
            value={post.status}
            onChange={(e) => setPost({ ...post, status: e.target.value })}
            required
            className="form_select"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
