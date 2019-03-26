import {Schema, Model, model, Types} from 'mongoose';
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

export const Comment: Model<IComment> = model<IComment>('Comment', CommentSchema);
