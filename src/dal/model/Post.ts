import {Schema, Model, model, Types} from 'mongoose';
import IPost from '../../../core/dal/model/IPost';

const PostSchema: Schema = new Schema({
  owner: {
    type: Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
});

export const Post: Model<IPost> = model<IPost>('Post', PostSchema);
