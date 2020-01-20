var cashbox = {
  amount: 0,
  status: 'close',
  history: [],
  open: function(incomingCash = 0) {
    this.status = 'open';
    if (typeof(incomingCash) === 'number' && incomingCash >= 0) {
      this.amount += incomingCash;
      this.history.push({ operation: 'open', payment: incomingCash, status: true });
    } else { this.history.push({ operation: 'open', payment: 0, status: false }) }
  },
  addPayment: function(payment = 0, info = []) {
    if (typeof(payment) !== 'number' || typeof(info) !== 'string') {
      this.history.push({ operation: 'addPayment', info: 'Операция не прошла', payment: 0, status: false });
      return false;
    }
    if (payment > 0 && this.status === 'open' && 'number' === typeof(payment)) {
      this.amount += payment;
      this.history.push({ operation: 'addPayment', info: info, payment: payment, status: true });
      return 'amount = ' + this.amount;
    }
  },
  refundPayment: function(refund = 0, info = []) {
    if (typeof(refund) !== 'number' || typeof(info) !== 'string') {
      this.history.push({ operation: 'refundPayment', info: 'Операция не прошла', payment: 0, status: false })
      return false;
    }
    if (refund > 0 && this.amount >= refund && this.status === 'open' && 'number' === typeof(refund)) {
      this.amount -= refund;
      this.history.push({ operation: 'refundPayment', info: info, payment: refund, status: true });
      return 'amount = ' + this.amount;
    }
  }
};
module.exports = cashbox;