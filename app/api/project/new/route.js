// pages/api/projects/index.js
import Project from '@model/Project';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';
const databaseName = 'SyncUp';
export const POST = async (request) => {
    const { creator, title, description, tags, skillsRequired, contactEmail } = await request.json();

    // Log received data
    console.log('Received data:', { creator, title, description, tags, skillsRequired, contactEmail });

    // Validate required fields
    if (!creator) {
        console.error('Error: Missing creator');
        return NextResponse.json({ error: 'Missing creator' }, { status: 400 });
    }

    if (!title) {
        console.error('Error: Missing title');
        return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    if (!description) {
        console.error('Error: Missing description');
        return NextResponse.json({ error: 'Missing description' }, { status: 400 });
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        console.error('Error: Missing or invalid tags');
        return NextResponse.json({ error: 'Missing or invalid tags' }, { status: 400 });
    }

    if (!skillsRequired || !Array.isArray(skillsRequired) || skillsRequired.length === 0) {
        console.error('Error: Missing or invalid skills required');
        return NextResponse.json({ error: 'Missing or invalid skills required' }, { status: 400 });
    }

    if (!contactEmail) {
        console.error('Error: Missing contact email');
        return NextResponse.json({ error: 'Missing contact email' }, { status: 400 });
    }

    try {
        await connectToDB(databaseName);
        const newProject = new Project({ creator, title, description, tags, skillsRequired, contactEmail });

        await newProject.save();
        return new Response(JSON.stringify(newProject), { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return new Response('Failed to create a new project', { status: 500 });
    }
};
