const cashbox = require('./cashbox.js');
const assert = require('assert');
describe('Проверка cashbox:', function() {
  describe('Проверка Cashbox.open:', function() {
    it('Open открывает кассу', function() {
      cashbox.open();
      assert.equal(cashbox.status, 'open');
    });
    it('Open меняет amount, при правильных параметрах', function() {
      cashbox.amount = 0;
      cashbox.open(10);
      assert.equal(cashbox.amount, 10);
      cashbox.amount = 26;
      cashbox.open(1);
      assert.equal(cashbox.amount, 27);
    });
    it('Open не меняет amount, при не правильных параметрах', function() {
      cashbox.amount = 0;
      cashbox.open();
      assert.equal(cashbox.amount, 0);
      cashbox.open([]);
      assert.equal(cashbox.amount, 0);
      cashbox.open({});
      assert.equal(cashbox.amount, 0);
      cashbox.open('1');
      assert.equal(cashbox.amount, 0);
    });
    it('Open заносится в историю', function() {
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.amount = 0;
      cashbox.open(10);
      assert.deepEqual(cashbox.successOperationsHistory[0], { operation: 'open', payment: 10, operationStatus: true });
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.amount = 0;
      cashbox.open([]);
      assert.deepEqual(cashbox.failOperationsHistory[0], { operation: 'open', payment: [], operationStatus: false });
    });
  });
  describe('Проверка Cashbox.addPayment:', function() {
    it('addPayment не работает, при закрытой кассе', function() {
      cashbox.status = 'close';
      cashbox.failOperationsHistory[0];
      cashbox.amount = 0;
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.failOperationsHistory[0].operationStatus, false);
      assert.equal(cashbox.amount, 0);
    });
    it('addPayment работает, при открытой кассе', function() {
      cashbox.history = [];
      cashbox.amount = 0;
      cashbox.open();
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.successOperationsHistory[0].operationStatus, true);
      assert.equal(cashbox.amount, 10);
    });
    it('addPayment добавляет деньги, при верных параметрах', function() {
      cashbox.open();
      cashbox.amount = 0;
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.amount, 10);
      cashbox.open();
      cashbox.amount = 0;
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.amount, 10);
    });
    it('addPayment не добавляет деньги, при не верных параметрах', function() {
      cashbox.open();
      cashbox.amount = 0;
      cashbox.addPayment([10], '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open();
      cashbox.amount = 0;
      cashbox.addPayment({}, '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open();
      cashbox.amount = 0;
      cashbox.addPayment('{}', '1');
      assert.equal(cashbox.amount, 0);
      cashbox.addPayment(10, 10);
      assert.equal(cashbox.amount, 0);
      cashbox.addPayment(10, {});
      assert.equal(cashbox.amount, 0);
      cashbox.addPayment(10, [{}]);
      assert.equal(cashbox.amount, 0);
    });
    it('addPayment заносится в историю', function() {
      cashbox.amount = 0;
      cashbox.open();
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.addPayment(10, '1');
      assert.deepEqual(cashbox.successOperationsHistory[0], { operation: 'addPayment', info: '1', payment: 10, operationStatus: true });
      cashbox.amount = 0;
      cashbox.open();
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.addPayment(10, [{}]);
      assert.deepEqual(cashbox.failOperationsHistory[0], { operation: 'addPayment', info: [{}], payment: 10, operationStatus: false });
    });
  });
  describe('Проверка Cashbox.refundPayment:', function() {
    it('refundPayment не работает, при закрытой кассе', function() {
      cashbox.status = 'close';
      cashbox.failOperationsHistory[0];
      cashbox.amount = 10;
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.failOperationsHistory[0].operationStatus, false);
      assert.equal(cashbox.amount, 10);
    });
    it('refundPayment работает, при открытой кассе', function() {
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.amount = 10;
      cashbox.open(0);
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.successOperationsHistory[0].operationStatus, true);
      assert.equal(cashbox.amount, 0);
    });
    it('refundPayment убавляет деньги, при верных параметрах', function() {
      cashbox.open(0);
      cashbox.amount = 10;
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open(0);
      cashbox.amount = 10;
      cashbox.refundPayment(0, '1');
      assert.equal(cashbox.amount, 10);
    });
    it('refundPayment не выполняется, если в кассе недостаточно денег', function() {
      cashbox.open(0);
      cashbox.amount = 0;
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.refundPayment(10, '1');
      assert.deepEqual(cashbox.failOperationsHistory[0], { operation: 'refundPayment', info: '1', payment: 10, operationStatus: false });
    });
    it('refundPayment не убавляет деньги, при не верных параметрах', function() {
      cashbox.open(0);
      cashbox.amount = 0;
      cashbox.refundPayment([10], '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open(0);
      cashbox.amount = 0;
      cashbox.refundPayment({}, '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open(0);
      cashbox.amount = 0;
      cashbox.refundPayment('{}', '1');
      assert.equal(cashbox.amount, 0);
      cashbox.refundPayment(10, 10);
      assert.equal(cashbox.amount, 0);
      cashbox.refundPayment(10, {});
      assert.equal(cashbox.amount, 0);
      cashbox.refundPayment(10, [{}]);
      assert.equal(cashbox.amount, 0);
    });
    it('refundPayment заносится в историю', function() {
      cashbox.amount = 10;
      cashbox.open();
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.refundPayment(10, '1');
      assert.deepEqual(cashbox.successOperationsHistory[0], { operation: 'refundPayment', info: '1', payment: 10, operationStatus: true });
      cashbox.amount = 10;
      cashbox.open();
      cashbox.successOperationsHistory = [];
      cashbox.failOperationsHistory = [];
      cashbox.refundPayment(10, [{}]);
      assert.deepEqual(cashbox.failOperationsHistory[0], { operation: 'refundPayment', info: [{}], payment: 10, operationStatus: false });
    });
  });
});