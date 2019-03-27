import {Document} from 'mongoose';

export default interface IDataProducer {
  create(): Promise<Document>
}
