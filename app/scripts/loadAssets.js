const fs = require('fs-extra')

assetsMap = {
  'icon.png': 'app/',
  'logo.png': 'public/assets/',
  'og_logo.png': 'public/assets/',
}

sourceDir = 'my_settings/'

Object.keys(assetsMap).map((file) => {
  console.log(file)
  const sourceFile = `./${sourceDir}${file}`
  const destinationFile = `./${assetsMap[file]}${file}`

  if (fs.existsSync(sourceFile)) {
    console.log(sourceFile, destinationFile)
    fs.copySync(sourceFile, destinationFile)
  }
})