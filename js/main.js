const $imageInput = document.querySelector('#photo');
const $image = document.querySelector('img');
const $form = document.querySelector('form');
const $ulEntries = document.querySelector('#ul-entries');
const $toggleNoEntries = document.querySelector('#toggle-no-entries');

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

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $div1 = document.createElement('div');
  $div1.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half row column');

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;

  const $p = document.createElement('p');
  $p.textContent = entry.notes;

  $li.appendChild($div1);
  $div1.appendChild($img);
  $li.appendChild($div2);
  $div2.appendChild($h2);
  $div2.appendChild($p);

  return $li;
}

function generateDOMTree(event) {
  for (const entry of data.entries) {
    $ulEntries.appendChild(renderEntry(entry));
  }
}
document.addEventListener('DOMContentLoaded', generateDOMTree);

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $toggleNoEntries.className = '';
  } else {
    $toggleNoEntries.className = 'hidden';
  }
}

toggleNoEntries();
