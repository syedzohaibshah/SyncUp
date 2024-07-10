import { connectToDB } from '@utils/database';
import Project from '@model/Project'; // Ensure the correct import path
const databaseName = 'SyncUp'; 

export const GET = async (request, { params }) => {
    try {
        await connectToDB(databaseName);
        const projects = await Project.find({ creator: params.id }).populate('creator');

        if (!projects || projects.length === 0) {
            return new Response("No projects found for this user", { status: 404 });
        }

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new Response("Failed to fetch projects", { status: 500 });
    }
};
