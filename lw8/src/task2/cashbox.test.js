const cashbox = require('./cashbox.js');
const assert = require('assert');
describe('Проверка cashbox:', function() {
  describe('Проверка Cashbox.open:', function() {
    it('Open открывает кассу', function() {
      cashbox.open();
      assert.equal(cashbox.status, 'open');
    });
    it('Open меняет amount, при правельных параметрах', function() {
      cashbox.amount = 0;
      cashbox.open(10);
      assert.equal(cashbox.amount, 10);
      cashbox.amount = 26;
      cashbox.open(1);
      assert.equal(cashbox.amount, 27);
    });
    it('Open не меняет amount, при правельных параметрах', function() {
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
      cashbox.history = [];
      cashbox.amount = 0;
      cashbox.open(10);
      assert.deepEqual(cashbox.history[0], { operation: 'open', payment: 10, status: true });
      cashbox.history = [];
      cashbox.amount = 0;
      cashbox.open([]);
      assert.deepEqual(cashbox.history[0], { operation: 'open', payment: 0, status: false });
    });
  });
  describe('Проверка Cashbox.addPayment:', function() {
    it('addPayment не работает, при закрытой кассе', function() {
      cashbox.status = 'close';
      cashbox.history[0];
      cashbox.amount = 0;
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.history[0].status, false);
      assert.equal(cashbox.amount, 0);
    });
    it('addPayment работает, при открытой кассе', function() {
      cashbox.history = [];
      cashbox.amount = 0;
      cashbox.open();
      cashbox.addPayment(10, '1');
      assert.equal(cashbox.history[0].status, true);
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
      cashbox.history = [];
      cashbox.addPayment(10, '1');
      assert.deepEqual(cashbox.history[0], { operation: 'addPayment', info: '1', payment: 10, status: true });
      cashbox.amount = 0;
      cashbox.open();
      cashbox.history = [];
      cashbox.addPayment(10, [{}]);
      assert.deepEqual(cashbox.history[0], { operation: 'addPayment', info: 'Операция не прошла', payment: 0, status: false });
    });
  });
  describe('Проверка Cashbox.refundPayment:', function() {
    it('refundPayment не работает, при закрытой кассе', function() {
      cashbox.status = 'close';
      cashbox.history[0];
      cashbox.amount = 10;
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.history[0].status, false);
      assert.equal(cashbox.amount, 10);
    });
    it('refundPayment работает, при открытой кассе', function() {
      cashbox.history = [];
      cashbox.amount = 10;
      cashbox.open();
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.history[0].status, true);
      assert.equal(cashbox.amount, 0);
    });
    it('refundPayment убавляет деньги, при верных параметрах', function() {
      cashbox.open();
      cashbox.amount = 10;
      cashbox.refundPayment(10, '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open();
      cashbox.amount = 10;
      cashbox.refundPayment(0, '1');
      assert.equal(cashbox.amount, 10);
    });
    it('refundPayment не убавляет деньги, при не верных параметрах', function() {
      cashbox.open();
      cashbox.amount = 0;
      cashbox.refundPayment([10], '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open();
      cashbox.amount = 0;
      cashbox.refundPayment({}, '1');
      assert.equal(cashbox.amount, 0);
      cashbox.open();
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
      cashbox.history = [];
      cashbox.refundPayment(10, '1');
      assert.deepEqual(cashbox.history[0], { operation: 'refundPayment', info: '1', payment: 10, status: true });
      cashbox.amount = 10;
      cashbox.open();
      cashbox.history = [];
      cashbox.refundPayment(10, [{}]);
      assert.deepEqual(cashbox.history[0], { operation: 'refundPayment', info: 'Операция не прошла', payment: 0, status: false });
    });
  });
});