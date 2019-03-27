import * as _ from 'lodash';

import IPost from '../../../core/dal/model/IPost';
import IDataModifier from '../../../core/dal/IDataModifier';

import Post from './../model/post/Post';

const POST_PROPERTIES: ReadonlyArray<string> = Object.freeze([
  'title',
  'text'
]);

export default class PostDataModifier implements IDataModifier {
  constructor(
    private readonly postId: string,
    private readonly post: IPost
  ) {
    this.postId = postId;
    this.post = post;
  }

  public async update(): Promise<IPost> {
    const condition: object = {_id: this.postId};

    await Post.update(
      condition, _.pick(this.post, POST_PROPERTIES));

    return Post.findOne(condition);
  }
}
