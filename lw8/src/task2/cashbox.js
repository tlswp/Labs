class Cashbox {
  amount = 0;
  status = 'close';
  OperationsHistory = [];
  open(incomingCash = 0) {
    if (typeof(incomingCash) === 'number' && incomingCash >= 0) {
      this.status = 'open';
      this.amount += incomingCash;
      this.OperationsHistory.push({ operation: 'open', payment: incomingCash, operationStatus: true });
    } else { this.OperationsHistory.push({ operation: 'open', payment: incomingCash, operationStatus: false }) }
  };
  addPayment(payment = 0, info = []) {
    if (typeof(payment) !== 'number' || typeof(info) !== 'string' || this.status !== 'open') {
      this.OperationsHistory.push({ operation: 'addPayment', info: info, payment: payment, operationStatus: false });
      return false;
    }
    if (payment > 0 && this.status === 'open' && 'number' === typeof(payment)) {
      this.amount += payment;
      this.OperationsHistory.push({ operation: 'addPayment', info: info, payment: payment, operationStatus: true });
      return 'amount = ' + this.amount;
    }
  };
  refundPayment(refund = 0, info = []) {
    if (typeof(refund) !== 'number' || typeof(info) !== 'string' || this.amount < refund || this.status !== 'open') {
      this.OperationsHistory.push({ operation: 'refundPayment', info: info, payment: refund, operationStatus: false })
      return false;
    }
    if (refund > 0 && this.amount >= refund && this.status === 'open' && 'number' === typeof(refund)) {
      this.amount -= refund;
      this.OperationsHistory.push({ operation: 'refundPayment', info: info, payment: refund, operationStatus: true });
      return 'amount = ' + this.amount;
    }
  }
};
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createGuest() {
    return new User("Гость", "Сайта");
  }
};

module.exports = Cashbox;