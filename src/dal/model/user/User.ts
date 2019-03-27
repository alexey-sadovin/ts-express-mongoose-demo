import {Schema, model} from 'mongoose';

import IUser from './../../../../core/dal/model/IUser';
import LengthValidator from './../../../../core/helpers/LengthValidator';
import JsonTransformer from './../../../../core/helpers/JsonTransformer';
import Constraints from './Constraints';

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
    trim: true,
    validate: LengthValidator.check(Constraints.firstName)
  },
  lastName: {
    type: String,
    trim: true,
    validate: LengthValidator.check(Constraints.lastName)
  }
});

const AVAILABLE_FIELDS: string[] = [
  'email',
  'firstName',
  'lastName'
];

UserSchema.set('toJSON', JsonTransformer.get(AVAILABLE_FIELDS));

const User = model<IUser>('User', UserSchema);
export default User;
