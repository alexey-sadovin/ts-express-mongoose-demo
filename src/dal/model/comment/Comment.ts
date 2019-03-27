import {Schema, model, Types} from 'mongoose';

import IComment from './../../../../core/dal/model/IComment';
import LengthValidator from './../../../../core/helpers/LengthValidator';
import JsonTransformer from './../../../../core/helpers/JsonTransformer';
import Constraints from './Constraints';

const CommentSchema: Schema = new Schema({
  author: {
    type: Types.ObjectId,
    required: true
  },
  post: {
    type: Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    validate: LengthValidator.check(Constraints.text)
  }
});

const AVAILABLE_FIELDS: string[] = [
  'author',
  'post',
  'text'
];

CommentSchema.set('toJSON', JsonTransformer.get(AVAILABLE_FIELDS));

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
