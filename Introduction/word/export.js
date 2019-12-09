const fs = require("fs")
const path = require("path")

function run() {
  const wordContent = fs.readFileSync(path.join(__dirname, './README.md'), 'utf-8')
  const wordRE = /\w+/g
  const words = wordContent.match(wordRE).join(" ")
  console.log(words)
}

run()