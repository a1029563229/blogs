function renderPerson(person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join('\n');
}

function photoDiv(photo) {
  return ['<div>', emitPhotoData(photo), '</div>'].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>title: ${aPhoto.title}</p>`);
  result.push(`<p>location: ${aPhoto.location}</p>`);
  result.push(`<p>date: ${aPhoto.date}</p>`);
  return result.join('\n');
}

module.exports = {
  renderPerson,
  photoDiv
}