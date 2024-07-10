import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
    },
    skillsRequired: {
        type: [String],
        required: [true, 'Skills required are needed'],
    },
    contactEmail: {
        type: String,
        required: [true, 'Contact email is required'],
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
