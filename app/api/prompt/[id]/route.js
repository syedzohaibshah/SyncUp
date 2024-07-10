import { connectToDB } from '@utils/database';
import Project from '@model/Project';
const databaseName = 'SyncUp';

// GET request to fetch a single project by ID
export const GET = async (request, { params }) => {
    try {
        await connectToDB(databaseName);
        const project = await Project.findById(params.id).populate('creator');
        
        if (!project) {
            return new Response("Project not found", { status: 404 });
        }

        return new Response(JSON.stringify(project), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch the project", { status: 500 });
    }
};




export const PATCH = async (req, { params }) => {
  try {
    await connectToDB(databaseName);
    const updateData = await req.json();
    const project = await Project.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return new Response("Failed to update project", { status: 500 });
  }
};

  export const DELETE = async (req, { params }) => {
    try {
      await connectToDB(databaseName);
      await Project.findByIdAndDelete(params.id);
      return new Response("Project deleted successfully", { status: 200 });
    } catch (error) {
      console.error('Error deleting project:', error);
      return new Response("Failed to delete project", { status: 500 });
    }
  };