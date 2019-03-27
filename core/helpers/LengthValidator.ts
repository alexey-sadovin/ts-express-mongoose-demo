interface IConstraints {
  minLength: number,
  maxLength: number
}

export default class LengthValidator {
  public static check(constraints: IConstraints): (value: string) => boolean {
    return (value: string) => {
      const length: number = value.length;

      return constraints.minLength <= length &&
        length <= constraints.maxLength;
    };
  }
}
