import jTPS_Transaction from './jTPS_Transaction';

class AddToStr_Transaction extends jTPS_Transaction {
  /**
   * Constructor for this transaction, it initializes this
   * object with all the data needed to both do and undo
   * the transaction.
   *
   * @param initStr
   * @param initCharToAdd
   */
  constructor(initStr, initNewStr) {
    super();
    this.str = initStr;
    this.strToSwap = initNewStr; // will swap b/w new & old vals
    this.flag = 0;
  }

  /**
   * This transaction simply adds the char to the str.
   */
  doTransaction() {
    if (this.flag !== 0) {
      this.swapStrings(this.str, this.strToSwap);
    } else {
      this.flag = 1;
    }
  }

  /**
   * As the reverse of do, this method removes the char from num.
   */
  undoTransaction() {
    this.swapStrings(this.str, this.strToSwap);
  }

  swapStrings(str1, str2) {
    const tStr = str1.getStr();
    str1.setStr(str2.getStr());
    str2.setStr(tStr);
  }
}

export default AddToStr_Transaction;
