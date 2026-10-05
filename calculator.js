// Fixed-rate loan payment calculator. Runs entirely in the browser; nothing is sent anywhere.
(function () {
  var amount = document.getElementById('amount');
  var apr = document.getElementById('apr');
  var term = document.getElementById('term');
  var error = document.getElementById('calc-error');
  var out = {
    monthly: document.getElementById('monthly'),
    interest: document.getElementById('interest'),
    total: document.getElementById('total')
  };
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  function monthlyPayment(principal, aprPercent, months) {
    var rate = aprPercent / 100 / 12;
    if (rate === 0) {
      return principal / months;
    }
    return principal * rate / (1 - Math.pow(1 + rate, -months));
  }

  function validate(p, a, n) {
    if (!(p >= 100 && p <= 1000000)) return 'Enter a loan amount between $100 and $1,000,000.';
    if (!(a >= 0 && a <= 99)) return 'Enter an APR between 0 and 99.';
    if (!(Number.isInteger(n) && n >= 1 && n <= 360)) return 'Enter a term between 1 and 360 whole months.';
    return '';
  }

  function update() {
    var p = parseFloat(amount.value);
    var a = parseFloat(apr.value);
    var n = Number(term.value);
    var message = validate(p, a, n);

    error.hidden = !message;
    error.textContent = message;
    if (message) {
      out.monthly.textContent = out.interest.textContent = out.total.textContent = '–';
      return;
    }

    var payment = monthlyPayment(p, a, n);
    out.monthly.textContent = money.format(payment);
    out.interest.textContent = money.format(payment * n - p);
    out.total.textContent = money.format(payment * n);
  }

  [amount, apr, term].forEach(function (input) {
    input.addEventListener('input', update);
  });
  document.getElementById('calc-form').addEventListener('submit', function (e) {
    e.preventDefault();
  });
  update();
})();
