export default class Regex {
  static readonly email = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}
