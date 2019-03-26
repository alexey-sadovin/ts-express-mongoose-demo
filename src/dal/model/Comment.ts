import {Schema, model, Types} from 'mongoose';
import IComment from '../../../core/dal/model/IComment';

const CommentSchema: Schema = new Schema({
  author: {
    type: Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
});

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
