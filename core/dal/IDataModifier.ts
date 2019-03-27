import {Document} from 'mongoose';

export default interface IDataModifier {
  update(): Promise<Document>
}
