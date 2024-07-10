


import { connectToDB } from '@utils/database';
import Project from '@model/Project';

const databaseName = 'SyncUp'; // Replace 'test' with the name of the database you want to access



export const GET = async (request) => {
    try {
        await connectToDB(databaseName);

        const projects = await Project.find({}).populate('creator');

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new Response("Failed to fetch all projects", { status: 500 });
    }
};
