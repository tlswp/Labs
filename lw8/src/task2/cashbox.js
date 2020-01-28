var cashbox = {
  amount: 0,
  status: 'close',
  successOperationsHistory: [],
  failOperationsHistory: [],
  open: function(incomingCash = 0) {
    if (typeof(incomingCash) === 'number' && incomingCash >= 0) {
      this.status = 'open';
      this.amount += incomingCash;
      this.successOperationsHistory.push({ operation: 'open', payment: incomingCash, operationStatus: true });
    } else { this.failOperationsHistory.push({ operation: 'open', payment: incomingCash, operationStatus: false }) }
  },
  addPayment: function(payment = 0, info = []) {
    if (typeof(payment) !== 'number' || typeof(info) !== 'string') {
      this.failOperationsHistory.push({ operation: 'addPayment', info: info, payment: payment, operationStatus: false });
      return false;
    }
    if (payment > 0 && this.status === 'open' && 'number' === typeof(payment)) {
      this.amount += payment;
      this.successOperationsHistory.push({ operation: 'addPayment', info: info, payment: payment, operationStatus: true });
      return 'amount = ' + this.amount;
    }
  },
  refundPayment: function(refund = 0, info = []) {
    if (typeof(refund) !== 'number' || typeof(info) !== 'string' || this.amount < refund) {
      this.failOperationsHistory.push({ operation: 'refundPayment', info: info, payment: refund, operationStatus: false })
      return false;
    }
    if (refund > 0 && this.amount >= refund && this.status === 'open' && 'number' === typeof(refund)) {
      this.amount -= refund;
      this.successOperationsHistory.push({ operation: 'refundPayment', info: info, payment: refund, operationStatus: true });
      return 'amount = ' + this.amount;
    }
  }
};
module.exports = cashbox;