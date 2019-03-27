import {Document} from 'mongoose';

export default interface IDataProvider {
  update(): Promise<Document[]>
}
