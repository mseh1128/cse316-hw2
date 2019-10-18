import jTPS_Transaction from './jTPS_Transaction'

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
  }

  /**
   * This transaction simply adds the char to the str.
   */
  doTransaction() {
    this.swapStrings(this.str, this.strToSwap);
  }

  /**
   * As the reverse of do, this method removes the char from num.
   */
  undoTransaction() {
    this.swapStrings(this.str, this.strToSwap);
  }

  swapStrings(str1, str2) {
    const tStr = str1;
    str1 = str2;
    str2 = tStr;
  }
}

export default AddToStr_Transaction;

