import {Schema, model, Types} from 'mongoose';

import IComment from './../../../../core/dal/model/IComment';
import LengthValidator from './../../../../core/helpers/LengthValidator';
import Constraints from './Constraints';

const CommentSchema: Schema = new Schema({
  author: {
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

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
