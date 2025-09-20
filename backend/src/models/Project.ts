import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
