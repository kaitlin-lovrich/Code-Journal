const $imageInput = document.querySelector('#photo');
const $image = document.querySelector('img');

function setSRC(event) {
  $image.setAttribute('src', event.target.value);
}

$imageInput.addEventListener('input', setSRC);
