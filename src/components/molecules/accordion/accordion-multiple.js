const init = () => {
  document.querySelectorAll('.collapse--group').forEach((accodionMultiple) => {
    let elementsCheck = accodionMultiple.querySelectorAll('.collapse--group__header input[type="radio"]');
    elementsCheck.forEach((check, i) => {
      check.addEventListener('change', (e) => {
        if (e.target.checked) {
          accodionMultiple.querySelectorAll('.collapse--group__body').forEach((content, j) => {
            i === j ? content.classList.add('active') : content.classList.remove('active');
          });
        }
      });
    });
  });
};
export default init;
