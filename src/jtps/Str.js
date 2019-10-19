class Str {
  // THE STRING THIS CLASS MANAGES
  constructor() {
    this.str = '';
  }

  /**
   * Mutator method for the Str instance variable.
   *
   * @param initStr The value to set Str to.
   */
  setStr(initStr) {
    this.str = initStr;
  }

  /**
   * Accessor method for Str.
   *
   * @return The Str instance variable value.
   */
  getStr() {
    return this.str;
  }
}

export default Str;
