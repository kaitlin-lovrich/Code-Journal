const $imageInput = document.querySelector('#photo');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

function setSRC(event) {
  $image.setAttribute('src', event.target.value);
}
$imageInput.addEventListener('input', setSRC);

function submitForm(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: $form.elements.title.value,
    photoURL: $form.elements.photo.value,
    notes: $form.elements.notes.value,
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
}
$form.addEventListener('submit', submitForm);
