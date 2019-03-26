import {Document, Types} from 'mongoose';

export default interface IComment extends Document {
  author: Types.ObjectId,
  text: string
}
