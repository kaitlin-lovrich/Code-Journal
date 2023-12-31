const $inputPhotoURL = document.querySelector('#photo');
const $image = document.querySelector('img');
const $form = document.querySelector('form');
const $ulEntries = document.querySelector('#ul-entries');
const $toggleNoEntries = document.querySelector('#toggle-no-entries');
const $entryForm = document.querySelector('[data-view=entry-form]');
const $entries = document.querySelector('[data-view=entries]');
const $entriesAnchor = document.querySelector('#entries-anchor');
const $newEntriesButton = document.querySelector('#new-entries-button');
const $inputTitle = document.querySelector('#title');
const $textareaNotes = document.querySelector('#notes');
const $formHeading = document.querySelector('#form-heading');
const $deleteEntry = document.querySelector('#delete-entry');
const $modalBox = document.querySelector('.modal-box');
const $cancel = document.querySelector('#cancel');
const $confirm = document.querySelector('#confirm');

function setSRC(event) {
  $image.setAttribute('src', event.target.value);
}
$inputPhotoURL.addEventListener('input', setSRC);

function submitForm(event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: $form.elements.title.value,
    photoURL: $form.elements.photo.value,
    notes: $form.elements.notes.value,
  };
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $image.setAttribute('src', './images/placeholder-image-square.jpg');
    const $domTree = renderEntry(entry);
    $ulEntries.prepend($domTree);
  }
  // Assigns the entry id value from data.editing to the new object with the updated form values.
  else if (data.editing !== null) {
    entry.entryId = data.editing.entryId;
    // Replaces the original object in the data.entries array for the edited entry with the new object with the edited data.
    for (let index = 0; index < data.entries.length; index++) {
      if (data.entries[index].entryId === entry.entryId) {
        data.entries[index] = entry;
        $formHeading.textContent = 'New Entry';
        data.editing = null;
        $image.setAttribute('src', './images/placeholder-image-square.jpg');
        const $domTree = renderEntry(entry);
        const $liElements = document.querySelectorAll('li');
        if (
          $liElements[index].getAttribute('data-entry-id') ===
          entry.entryId.toString()
        ) {
          $liElements[index].replaceWith($domTree);
        }
      }
    }
  }
  toggleNoEntries();
  viewSwap('entries');
  $form.reset();
}
$form.addEventListener('submit', submitForm);

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $div1 = document.createElement('div');
  $div1.setAttribute('class', 'column-half');

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoURL);
  $img.setAttribute('alt', 'image');

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half row');

  const $div3 = document.createElement('div');
  $div3.setAttribute('class', 'column-half-strict row column');

  const $div4 = document.createElement('div');
  $div4.setAttribute('class', 'column-half-strict row column');

  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;

  const $p = document.createElement('p');
  $p.textContent = entry.notes;

  const $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pencil text-align-end');

  $li.appendChild($div1);
  $div1.appendChild($img);
  $li.appendChild($div2);
  $div2.appendChild($div3);
  $div3.appendChild($h2);
  $div3.appendChild($p);
  $div2.appendChild($div4);
  $div4.appendChild($i);

  return $li;
}

function generateDOMTree(event) {
  for (const entry of data.entries) {
    $ulEntries.appendChild(renderEntry(entry));
  }
  viewSwap(data.view);
  toggleNoEntries();
}
document.addEventListener('DOMContentLoaded', generateDOMTree);

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $toggleNoEntries.className = 'hidden';
  } else {
    $toggleNoEntries.className = '';
  }
}

function viewSwap(view) {
  if (view === 'entry-form') {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = view;
  } else if (view === 'entries') {
    $entries.className = '';
    $entryForm.className = 'hidden';
    data.view = view;
  }
}

function showProperView(event) {
  if (event.target === $entriesAnchor) {
    viewSwap('entries');
  } else if (event.target === $newEntriesButton) {
    viewSwap('entry-form');
  }
}
$entriesAnchor.addEventListener('click', showProperView);
$newEntriesButton.addEventListener('click', showProperView);

function editEntries(event) {
  const $srcElement = event.target.nodeName;
  if ($srcElement !== 'I') {
    return;
  }
  viewSwap('entry-form');
  const entryObj = event.target.closest('li').getAttribute('data-entry-id');

  for (const entry of data.entries) {
    if (entry.entryId.toString() === entryObj) {
      data.editing = entry;
      $inputTitle.value = entry.title;
      $inputPhotoURL.value = entry.photoURL;
      $image.setAttribute('src', entry.photoURL);
      $textareaNotes.value = entry.notes;
    }
  }
  $formHeading.textContent = 'Edit Entry';
  $deleteEntry.className = '';
}
$ulEntries.addEventListener('click', editEntries);

function showModal(event) {
  $modalBox.className = 'modal-box overlay';
}
$deleteEntry.addEventListener('click', showModal);

function hideModal(event) {
  $modalBox.className = 'hidden modal-box overlay';
}
$cancel.addEventListener('click', hideModal);

function confirmCancel(event) {
  const entryObj = data.editing.entryId;
  for (const entry of data.entries) {
    if (entry.entryId === entryObj) {
      const delIndex = data.entries.indexOf(entry);
      data.entries.splice(delIndex, 1);
      const $domTree = renderEntry(entry);
      const $liElements = document.querySelectorAll('li');
      for (let index = 0; index < $liElements.length; index++)
        if (
          $liElements[index].getAttribute('data-entry-id') ===
          entry.entryId.toString()
        ) {
          $liElements[index].remove($domTree);
        }
    }
  }
  data.editing = null;
  $modalBox.className = 'hidden modal-box overlay';
  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  toggleNoEntries();
  viewSwap('entries');
  $form.reset();
}
$confirm.addEventListener('click', confirmCancel);
