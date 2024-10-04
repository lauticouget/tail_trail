/* eslint-disable no-useless-escape */
export default class Regex {
  static readonly email = new RegExp(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  );
  static readonly nonSpacedName = new RegExp(/^\S+$/);
}
