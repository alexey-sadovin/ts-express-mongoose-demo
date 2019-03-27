import * as _ from 'lodash';

export default class JsonTransformer {
  public static get(fields: string[]): object {
    return {
      transform(doc: any, ret: any): object {
        return {
          ..._.pick(ret, fields),
          id: ret._id.toString()
        };
      }
    };
  }
}
