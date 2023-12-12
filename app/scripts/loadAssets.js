const fs = require('fs-extra')
const readline = require('readline')

const setFontFamily = async (path) => {
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


const setSafelist = async (path) => {
  try {
    const fileStream = fs.createReadStream(path)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
      
      let safelist = []
      for await (const line of rl) {
        if (line.startsWith('color')) {
          const value = line.slice(line.indexOf(':') + 1).replaceAll('"', '').replaceAll("'", "").trim().replaceAll(' ', '-')
          
          if (value) {
            if (line.startsWith('colorContent')) {
              if (line.startsWith('colorContentBodyHeadingDark')) {
                safelist.push(`dark:prose-headings:${value}`)
              }
              if (line.startsWith('colorContentBodyHeadingLight')) {
                safelist.push(`prose-headings:${value}`)
              }
              if (line.startsWith('colorContentBodyTextDark')) {
                safelist.push(`dark:prose-p:${value}`)
              }
              if (line.startsWith('colorContentBodyTextLight')) {
                safelist.push(`prose-p:${value}`)
              }
              if (line.startsWith('colorContentLinkTextDark')) {
                safelist.push(`dark:prose-a:${value}`)
              }
              if (line.startsWith('colorContentLinkTextLight')) {
                safelist.push(`prose-a:${value}`)
              }
            }
            else if (line.startsWith('colorTheme')) {
              safelist.push(`bleed-${value}`)
              safelist.push(`bg-${value}`)
            } else {
              safelist.push(`bg-${value}`)
              safelist.push(`text-${value}`)
            }
          }
        }
      }

      fs.writeFileSync(
        'app/safelist.ts',
        `const safelist = [${safelist.map(x => `'${x}'`)}]\nexport default safelist`
      )
    }
  } catch { return } // skip setting custom font if settings are not available, typically during setup

}


setFontFamily('my_settings/appearance.md')
setSafelist('my_settings/appearance.md')


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

