import {Schema, model} from 'mongoose';

import IUser from '../../../../core/dal/model/IUser';
import Constraints from './Constraints';

interface IConstraints {
  minLength: number,
  maxLength: number
}

function checkLength(constraints: IConstraints): (value: string) => boolean {
  return (value: string) => {
    const length: number = value.length;

    return constraints.minLength <= length &&
      length <= constraints.maxLength;
  };
}

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
    validate: checkLength(Constraints.firstName)
  },
  lastName: {
    type: String,
    trim: true,
    validate: checkLength(Constraints.lastName)
  }
});

const User = model<IUser>('User', UserSchema);
export default User;
