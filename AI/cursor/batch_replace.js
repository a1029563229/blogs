class Size {
    constructor(name) {
        this.name = name;
        this.width = 0;
        this.height = 0;
    }
}



const small = new Size('small');
small.width = 100;
small.height = 100;


const medium = new Size('medium');
medium.width = 200;
medium.height = 200;


const large = new Size('large');
large.width = 300;
large.height = 300;


// is it can be replaced by a function?
function checkSize(size) {
  if (size.width === 100) {
    console.log('small');
  } else if (size.width === 200) {
    console.log('medium'); 
  } else if (size.width === 300) {
    console.log('large');
  }
}

checkSize(small);

// Codebase how to implement a datetime convert program? It can convert the datetime str to the UTC+0 time zone.

function convertToUTC0(datetimeStr) {
  const date = new Date(datetimeStr);
  const utc0Date = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return utc0Date.toISOString();
}



export { Size, convertToUTC0 };