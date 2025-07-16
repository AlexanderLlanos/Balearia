const init = () => {
  const mask = (value, limit, separator) => {
    var output = [];
    for (let i = 0; i < value.length; i++) {
      if (i !== 0 && i % limit === 0) {
        output.push(separator);
      }
      output.push(value[i]);
    }
    return output.join('');
  };
  const unmask = (value) => value.replace(/[^\d]/g, '');
  const checkSeparator = (position, interval) => Math.floor(position / (interval + 1));

  document.querySelectorAll('[data-input="payment-card-number"]').forEach((input) => {
    const ccNumberPattern = /^\d{0,16}$/g;
    const ccNumberSeparator = ' ';
    let ccNumberInputOldValue;
    let ccNumberInputOldCursor;

    const ccNumberInputKeyDownHandler = (e) => {
      let el = e.target;
      ccNumberInputOldValue = el.value;
      ccNumberInputOldCursor = el.selectionEnd;
    };
    const ccNumberInputInputHandler = (e) => {
      let el = e.target;
      let newValue = unmask(el.value);
      let newCursorPosition;

      if (newValue.match(ccNumberPattern)) {
        newValue = mask(newValue, 4, ccNumberSeparator);

        newCursorPosition =
          ccNumberInputOldCursor -
          checkSeparator(ccNumberInputOldCursor, 4) +
          checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
          (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

        el.value = newValue !== '' ? newValue : '';
      } else {
        el.value = ccNumberInputOldValue;
        newCursorPosition = ccNumberInputOldCursor;
      }
      el.setSelectionRange(newCursorPosition, newCursorPosition);
    };
    input.addEventListener('keydown', ccNumberInputKeyDownHandler);
    input.addEventListener('input', ccNumberInputInputHandler);
  });

  document.querySelectorAll('[data-input="payment-card-expiry"]').forEach((input) => {
    const ccExpiryPattern = /^\d{0,4}$/g;
    const ccExpirySeparator = '/';
    let ccExpiryInputOldValue;
    let ccExpiryInputOldCursor;

    const ccExpiryInputKeyDownHandler = (e) => {
      let el = e.target;
      ccExpiryInputOldValue = el.value;
      ccExpiryInputOldCursor = el.selectionEnd;
    };
    const ccExpiryInputInputHandler = (e) => {
      let el = e.target;
      let newValue = el.value;
      newValue = unmask(newValue);
      if (newValue.match(ccExpiryPattern)) {
        newValue = mask(newValue, 2, ccExpirySeparator);
        el.value = newValue;
      } else {
        el.value = ccExpiryInputOldValue;
      }
    };

    input.addEventListener('keydown', ccExpiryInputKeyDownHandler);
    input.addEventListener('input', ccExpiryInputInputHandler);
  });

  document.querySelectorAll('[data-input="payment-card-cvc"]').forEach((input) => {
    const ccCVCPattern = /^\d{0,3}$/g;
    let ccCVCinputOldValue;
    let ccCVCinputOldCursor;

    const ccCVCinputKeyDownHandler = (e) => {
      let el = e.target;
      ccCVCinputOldValue = el.value;
      ccCVCinputOldCursor = el.selectionEnd;
    };
    const ccCVCinputInputHandler = (e) => {
      let el = e.target;
      let newValue = el.value;

      newValue = unmask(newValue);
      if (newValue.match(ccCVCPattern)) {
        el.value = newValue;
      } else {
        el.value = ccCVCinputOldValue;
      }
    };

    input.addEventListener('keydown', ccCVCinputKeyDownHandler);
    input.addEventListener('input', ccCVCinputInputHandler);
  });
};
export default init;
