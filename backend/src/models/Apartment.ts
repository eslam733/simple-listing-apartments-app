import mongoose, { Document, Schema } from 'mongoose';

export interface IApartment extends Document {
  number: number;
  name: string;
  description: string;
  price: number;
  location: string;
  project: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
}

const ApartmentSchema: Schema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  project: {
    _id: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    name: { type: String, required: false },
  },
});

export default mongoose.model<IApartment>('Apartment', ApartmentSchema);