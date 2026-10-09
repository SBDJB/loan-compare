// Renders the lender comparison from lenders.js. Runs entirely in the browser.
(function () {
  var amountInput = document.getElementById('cmp-amount');
  var termSelect = document.getElementById('cmp-term');
  var errorBox = document.getElementById('cmp-error');
  var summary = document.getElementById('cmp-summary');
  var list = document.getElementById('cmp-list');
  var otherHeading = document.getElementById('cmp-other-heading');
  var otherList = document.getElementById('cmp-other');

  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  var dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  document.querySelectorAll('.cmp-checked').forEach(function (el) {
    el.textContent = window.LENDERS_CHECKED;
  });

  function monthlyPayment(principal, aprPercent, months) {
    var rate = aprPercent / 100 / 12;
    return rate === 0 ? principal / months : principal * rate / (1 - Math.pow(1 + rate, -months));
  }

  function offersTerm(lender, months) {
    if (Array.isArray(lender.terms)) return lender.terms.indexOf(months) !== -1;
    return months >= lender.terms.min && months <= lender.terms.max;
  }

  function termsText(lender) {
    if (Array.isArray(lender.terms)) return lender.terms.join(' or ') + ' months';
    return lender.terms.min + ' to ' + lender.terms.max + ' months';
  }

  function amountsText(lender) {
    if (lender.minAmount === null) return 'see lender';
    return dollars.format(lender.minAmount) + ' to ' + dollars.format(lender.maxAmount);
  }

  // Returns '' when the lender fits, otherwise the reason it does not.
  function misfit(lender, amount, months) {
    if (lender.minAmount !== null && amount < lender.minAmount) {
      return 'Minimum loan is ' + dollars.format(lender.minAmount) + '.';
    }
    if (lender.maxAmount !== null && amount > lender.maxAmount) {
      return 'Maximum loan is ' + dollars.format(lender.maxAmount) + '.';
    }
    if (!offersTerm(lender, months)) {
      return 'Does not offer ' + months + '-month terms (' + termsText(lender) + ').';
    }
    return '';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function card(lender, amount, months, reason) {
    var node = el('li', 'lender' + (reason ? ' lender-muted' : ''));
    // Name on a coloured label. Colour follows the lender's position in lenders.js,
    // so it stays put as the list re-sorts.
    var head = el('div', 'lender-head');
    head.appendChild(el('h3', 'lender-name badge-' + (window.LENDERS.indexOf(lender) % 6), lender.name));
    node.appendChild(head);
    node.appendChild(el('p', 'lender-apr',
      lender.minApr.toFixed(2) + '% to ' + lender.maxApr.toFixed(2) + '% APR'));

    if (reason) {
      node.appendChild(el('p', 'lender-reason', reason));
    } else {
      node.appendChild(el('p', 'lender-estimate',
        'About ' + money.format(monthlyPayment(amount, lender.minApr, months)) + ' to ' +
        money.format(monthlyPayment(amount, lender.maxApr, months)) + ' a month over ' + months + ' months'));
    }

    var facts = el('ul', 'lender-facts');
    facts.appendChild(el('li', '', 'Loan amounts: ' + amountsText(lender)));
    facts.appendChild(el('li', '', 'Terms: ' + termsText(lender)));
    facts.appendChild(el('li', '', lender.fee));
    if (lender.note) facts.appendChild(el('li', '', lender.note));
    node.appendChild(facts);

    var link = el('a', 'button secondary', 'Visit ' + lender.name);
    link.href = lender.url;
    link.target = '_blank';
    link.rel = 'noopener nofollow';
    node.appendChild(link);
    return node;
  }

  function update() {
    var amount = parseFloat(amountInput.value);
    var months = parseInt(termSelect.value, 10);
    var valid = amount >= 500 && amount <= 200000;

    errorBox.hidden = valid;
    errorBox.textContent = valid ? '' : 'Enter a loan amount between $500 and $200,000.';
    list.textContent = '';
    otherList.textContent = '';
    if (!valid) {
      summary.textContent = '';
      otherHeading.hidden = true;
      return;
    }

    var fits = [];
    var others = [];
    window.LENDERS.slice().sort(function (a, b) {
      return a.minApr - b.minApr || a.name.localeCompare(b.name);
    }).forEach(function (lender) {
      var reason = misfit(lender, amount, months);
      (reason ? others : fits).push(card(lender, amount, months, reason));
    });

    fits.forEach(function (node) { list.appendChild(node); });
    others.forEach(function (node) { otherList.appendChild(node); });
    otherHeading.hidden = others.length === 0;
    summary.textContent = fits.length === 0
      ? 'No lenders listed here offer ' + dollars.format(amount) + ' over ' + months + ' months.'
      : fits.length + (fits.length === 1 ? ' lender offers ' : ' lenders offer ') +
        dollars.format(amount) + ' over ' + months + ' months, lowest starting APR first.';
  }

  amountInput.addEventListener('input', update);
  termSelect.addEventListener('change', update);
  document.getElementById('cmp-form').addEventListener('submit', function (e) { e.preventDefault(); });
  update();
})();
