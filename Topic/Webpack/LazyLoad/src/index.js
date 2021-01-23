import download from "./download";

function init() {
  console.log("initial page");
}

async function handlerUploadClick() {
  const upload = await import("./upload");
  upload();
}

async function handlerDownloadClick() {
  download();
}

document.querySelector("#upload").addEventListener("click", handlerUploadClick, false)

document.querySelector("#download").addEventListener("click", handlerDownloadClick, false)