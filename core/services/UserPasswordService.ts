import * as bcrypt from 'bcrypt';

export default class UserPasswordService {
  constructor(private readonly saltLength: number) {
    this.saltLength = saltLength;
  }

  public async encodePassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltLength);
    return bcrypt.hash(password, salt);
  }

  public comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
