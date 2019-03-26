import {Document, Types} from 'mongoose';

export default interface IPost extends Document {
  owner: Types.ObjectId,
  title: string,
  text: string
};
