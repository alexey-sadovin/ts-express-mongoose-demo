import {Schema, model} from 'mongoose';
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

const User = model<IUser>('User', UserSchema);
export default User;
