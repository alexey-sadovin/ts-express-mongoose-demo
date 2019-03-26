import {Schema, Model, model} from 'mongoose';
import IUser from '../../../core/dal/model/IUser';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  }
});

UserSchema.methods.fullName = function(): string {
  return `${this.firstName} ${this.lastName}`;
};

export const User: Model<IUser> = model<IUser>('User', UserSchema);
