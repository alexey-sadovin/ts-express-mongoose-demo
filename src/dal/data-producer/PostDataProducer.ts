import IPost from '../../../core/dal/model/IPost';
import IDataProducer from '../../../core/dal/IDataProducer';

import Post from '../model/Post';

export default class PostDataProducer implements IDataProducer {
  constructor(
    private readonly userId: string,
    private readonly post: IPost
  ) {
    this.userId = userId;
    this.post = post;
  }

  public create(): Promise<IPost> {
    return new Post(this.composePostData()).save();
  }

  private composePostData(): object {
    return {
      owner: this.userId,
      ...this.post
    };
  }
}
