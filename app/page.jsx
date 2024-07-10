

import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className =" head_text text-center ">
    SyncUp:
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-center"> Where Ideas Meet Collaborators</span>
    </h1>
    <p className="desc text-center">
    Unlock the power of collaboration with SyncUp. Our user-friendly
     platform allows you to showcase your skills, discover exciting 
     projects, and connect with potential partners from around the globe.
     With SyncUp, your next big breakthrough is just a connection away.</p>

{/* Feed */}
<Feed/>
    </section>
  )
}
export default Home;