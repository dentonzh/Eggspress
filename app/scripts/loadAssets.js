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
  } catch (e) { console.warn(`Prebuild error encountered while adding custom font: ${e}`) } // skip setting custom font if settings are not available, typically during setup

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
      let contentClasses = []
      for await (const line of rl) {
        if (line.startsWith('color')) {
          const value = line.slice(line.indexOf(':') + 1).replaceAll('"', '').replaceAll("'", "").trim().replaceAll(' ', '-')
          const key = line.slice(0, line.indexOf(':')).trim()

          if (value) {
            if (line.startsWith('colorContent')) {
              if (line.startsWith('colorContentBodyHeadingDark')) {
                contentClasses.push(`dark:prose-headings:text-${value}`)
              }
              if (line.startsWith('colorContentBodyHeadingLight')) {
                contentClasses.push(`prose-headings:text-${value}`)
              }
              if (line.startsWith('colorContentBodyTextDark')) {
                contentClasses.push(`dark:prose-p:text-${value}`)
                contentClasses.push(`dark:prose-table:text-${value}`)
                contentClasses.push(`dark:prose-ul:text-${value}`)
                contentClasses.push(`dark:prose-ol:text-${value}`)
              }
              if (line.startsWith('colorContentBodyTextLight')) {
                contentClasses.push(`prose-p:text-${value}`)
                contentClasses.push(`prose-table:text-${value}`)
                contentClasses.push(`prose-ul:text-${value}`)
                contentClasses.push(`prose-ol:text-${value}`)
              }
              if (line.startsWith('colorContentLinkTextDark')) {
                contentClasses.push(`dark:prose-a:text-${value}`)
              }
              if (line.startsWith('colorContentLinkTextLight')) {
                contentClasses.push(`prose-a:text-${value}`)
              }
            }
            else if (line.startsWith('colorTheme')) {
              if (key.endsWith('Dark')) {
                safelist.push(`dark:bleed-${value}`)
                safelist.push(`dark:bg-${value}`)
              } else {
                safelist.push(`bleed-${value}`)
                safelist.push(`bg-${value}`)
              }
            } else {
              if (key.endsWith('Dark')) {
                if (key.includes('Hover')) {
                  safelist.push(`dark:hover:text-${value}`)
                } else {
                  safelist.push(`dark:text-${value}`)
                }
              } else {
                if (key.includes('Hover')) {
                  safelist.push(`hover:text-${value}`)
                } else {
                  safelist.push(`text-${value}`)
                }
              }
            }
          }
        }
      }

      fs.writeFileSync(
        'app/safelist.ts',
        `const safelist = [${safelist.map(x => `'${x}'`)}]\nexport default safelist`
      )


      if (contentClasses) {
        fs.appendFileSync(
          'app/globals.css', 
          `.eggspress-content-extended {\n@apply ${contentClasses.join(' ')};\n}`)
      }
    }
  } catch (e) { console.warn(`Prebuild error encountered while adding custom colors: ${e}`) } // skip setting custom font if settings are not available, typically during setup

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

