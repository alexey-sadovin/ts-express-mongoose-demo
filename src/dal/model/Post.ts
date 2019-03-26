import {Schema, model, Types} from 'mongoose';
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

const Post = model<IPost>('Post', PostSchema);
export default Post;
