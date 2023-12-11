const fs = require('fs-extra')
const readline = require('readline')

const processByLine = async (path) => {
  try {
    const fileStream = fs.createReadStream(path)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
    
      for await (const line of rl) {
        if (line.startsWith('fontFamily:')) {
          const fontFamily = line.slice(line.indexOf(':') + 1).replaceAll('"', '').replaceAll("'", "").trim().replaceAll(' ', '_')
          if ( fontFamily ) {
            fs.writeFileSync(
              'app/_components/UserFont.tsx',
              `import {${fontFamily}} from 'next/font/google'\nconst font = ${fontFamily}({ subsets: ['latin'], })\nexport default font`
            )
          }
          break
        }
      }
    }
  } catch { return } // skip setting custom font if settings are not available, typically during setup

}

processByLine('my_settings/appearance.md')


assetsMap = {
  'icon.png': 'app/',
  'logo.png': 'public/assets/',
  'og_logo.png': 'public/assets/',
}

sourceDir = 'my_settings/brand/'

Object.keys(assetsMap).map((file) => {
  const sourceFile = `./${sourceDir}${file}`
  const destinationFile = `./${assetsMap[file]}${file}`

  if (fs.existsSync(sourceFile)) {
    fs.copySync(sourceFile, destinationFile)
  }
})

