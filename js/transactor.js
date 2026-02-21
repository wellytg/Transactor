/**
 * TRANSACTOR | Charges Calculator v1
 * Modernized ES6+ Refactor (Extracted from index.html)
 */

$(document).ready(() => {
  const calcAmt = () => {
    const inputVal = $('#amount').val();
    if (!inputVal) return;

    const val = Big(inputVal);
    const numVal = Number(val);
    const imt2 = numVal * 0.02;
    const banktcharge = numVal * 0.01;
    const swipe = numVal * 0.04499;
    const pos = numVal * 0.02499;

    const imt2html = imt2.toFixed(2);
    const poshtml = pos.toFixed(2);

    if (numVal > 19.99) {
      $('#imt2tax').html(`$${imt2html}`);
    } else {
      $('#imt2tax').html(' - ');
    }

    let calc_error = "";
    let transferBank = 0;
    let ImtPos = 0;
    let posChg = 0;
    let transferChg = 0;
    let minBalTransfer = 0;
    let minImtPos = 0;

    if (numVal === 0) {
      // All remain 0
    } else if (numVal > 0.99 && numVal < 399.99) {
      transferBank = 30 + imt2;
      ImtPos = 10 + imt2;
      posChg = 10;
      minBalTransfer = numVal + transferBank;
      minImtPos = numVal + ImtPos;
    } else if (numVal >= 400 && numVal < 19999.99) {
      transferBank = banktcharge + imt2;
      ImtPos = swipe;
      posChg = Number(poshtml);
      transferChg = banktcharge + imt2;
      minBalTransfer = numVal + transferBank;
      minImtPos = numVal + ImtPos;
    } else if (numVal > 20000) {
      calc_error = 'Zipit maximum amount per transaction is $20,000, per day $100,000';
    }

    $('#calc-error').html(calc_error);
    $('#transferBank').html(`$${transferBank.toFixed(2)}`);
    $('#min-Balreq').html(`Minimum Balance $${minBalTransfer.toFixed(2)}`);
    $('#min-ImtPos').html(`Minimum Balance $${minImtPos.toFixed(2)}`);
    $('#ImtPos').html(`$${ImtPos.toFixed(2)}`);
    $('#posChg').html(posChg);
    $('#transferChg').html(transferChg.toFixed(2));
  };

  $('#amount').on('input', calcAmt);
  $('#btn-calc').on('click', calcAmt);
});
