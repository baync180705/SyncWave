import mongoose, {Schema, Document} from "mongoose";

export interface ITrack extends Document {
    roomID: string,
    tracks: string[]
}

const trackSchema: Schema = new Schema({
    roomID: {type: String, required: true, unique: true},
    tracks: {type: [String], default: []},
});

export const Track = mongoose.model<ITrack>("Track", trackSchema);