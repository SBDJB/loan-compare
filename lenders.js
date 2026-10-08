// Lender data for compare.html. Every figure is copied from the lender's own public
// website on the date in LENDERS_CHECKED. Lenders change their terms: re-check each
// entry against its url and update the date whenever you edit this file.
//
// Loan Compare is not affiliated with any of these lenders, and the urls are plain
// links with no tracking. Do not add a lender whose top APR is 36% or more.
//
// Fields: minAmount/maxAmount in dollars (null = not published on the page we checked);
// terms is either {min, max} in months or a list of the specific terms offered.
window.LENDERS_CHECKED = "October 8, 2026";

window.LENDERS = [
  {
    name: "Happen Bank",
    url: "https://www.happen.com/personal-loan",
    minApr: 5.96, maxApr: 35.99,
    minAmount: 1000, maxAmount: 75000,
    terms: { min: 24, max: 84 },
    fee: "Origination fee 0% to 8%",
    note: "Lowest rate requires excellent credit."
  },
  {
    name: "Upstart",
    url: "https://www.upstart.com/personal-loans",
    minApr: 6.3, maxApr: 35.99,
    minAmount: 1000, maxAmount: 75000,
    terms: [36, 60],
    fee: "An origination fee may apply",
    note: "Rates vary by state. Higher minimum amounts in GA, HI and MA."
  },
  {
    name: "Best Egg",
    url: "https://www.bestegg.com/personal-loans/",
    minApr: 6.99, maxApr: 35.99,
    minAmount: 2000, maxAmount: 50000,
    terms: { min: 36, max: 60 },
    fee: "Origination fee 0.99% to 9.99%",
    note: "Higher minimum amounts in MA, OH and GA."
  },
  {
    name: "Discover",
    url: "https://www.discover.com/personal-loans/",
    minApr: 6.99, maxApr: 24.99,
    minAmount: 2500, maxAmount: 40000,
    terms: { min: 36, max: 84 },
    fee: "No fees",
    note: "Minimum annual income $25,000."
  },
  {
    name: "SoFi",
    url: "https://www.sofi.com/personal-loans/",
    minApr: 6.99, maxApr: 35.49,
    minAmount: null, maxAmount: null,
    terms: { min: 24, max: 84 },
    fee: "No required origination fee",
    note: "Rates shown include 0.25% autopay and 0.25% member discounts."
  },
  {
    name: "Upgrade",
    url: "https://www.upgrade.com/personal-loans/",
    minApr: 7.74, maxApr: 35.99,
    minAmount: 1000, maxAmount: 50000,
    terms: { min: 24, max: 84 },
    fee: "Origination fee 1.85% to 9.99%",
    note: "Lowest rates require autopay and paying off some existing debt directly."
  }
];
