const $input = document.querySelector("#phoneNumC");
const NUMBER_ALLOWED_CHARS_REGEXP = /[0-9\/]+/;
$input.addEventListener("keypress", event => {
  if (!NUMBER_ALLOWED_CHARS_REGEXP.test(event.key)) {
    event.preventDefault();
  }
});