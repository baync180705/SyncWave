import mongoose, {Schema, Document} from "mongoose";

export interface IRoom extends Document {
    roomID: string,
    users: string[]
}

const roomSchema: Schema = new Schema({
    roomID: {type: String, required: true, unique: true},
    users: {type: [String], default: []},
})

export const Room = mongoose.model<IRoom>("Room", roomSchema)