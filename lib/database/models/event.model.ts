import { model, models, Schema, Document } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  CreatedAt?: Date;
  isFree?: boolean;
  location?: string;
  url?: string;
  startTime?: Date;
  endTime?: Date;
  image: string;
  Category?: Schema.Types.ObjectId | { _id: string; name: string };
  price?: string;
  organizer?: Schema.Types.ObjectId | { _id: string; firstname: string; lastname: string };
}

const Eventschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
  },
  url: {
    type: String,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: String,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Events = models.Events || model<IEvent>("Events", Eventschema);

export default Events;
