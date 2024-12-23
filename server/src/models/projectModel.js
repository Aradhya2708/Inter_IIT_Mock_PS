import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    issueId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: { // problem
        type: Number,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    freelancers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    smartContractAddress: {
        type: String
    },
    amountInWei: {
        type: Number,
        required: true
    },
    prURLs: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['resolved', 'unresolved', 'not_started'],
        default: 'not_started'
    }
}, { timestamps: true });

// This will automatically add `createdAt` and `updatedAt` fields
projectSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Optional, but if you're using timestamps, this is handled automatically.
    next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
