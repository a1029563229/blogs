import download from "./download";

console.log("initial page");

async function handlerUploadClick() {
  // 动态加载 upload 模块，该模块的 default 属性就是 upload 方法
  const { default: upload } = await import("./upload");
  // 调用 upload 方法
  upload();
}

async function handlerDownloadClick() {
  download();
}

// 点击 upload 按钮时，调用上传方法
document.querySelector("#upload").addEventListener("click", handlerUploadClick, false)

// 点击 download 按钮时，调用下载方法
document.querySelector("#download").addEventListener("click", handlerDownloadClick, false)