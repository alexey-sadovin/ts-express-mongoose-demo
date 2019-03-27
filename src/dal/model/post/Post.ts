import {Schema, model, Types} from 'mongoose';

import IPost from './../../../../core/dal/model/IPost';
import LengthValidator from './../../../../core/helpers/LengthValidator';
import Constraints from './Constraints';

const PostSchema: Schema = new Schema({
  owner: {
    type: Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    validate: LengthValidator.check(Constraints.title)
  },
  text: {
    type: String,
    required: true,
    trim: true,
    validate: LengthValidator.check(Constraints.text)
  }
});

const Post = model<IPost>('Post', PostSchema);
export default Post;
