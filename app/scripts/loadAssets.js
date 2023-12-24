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
  } catch (e) { 
    console.warn(`Prebuild error encountered while adding custom font. Applying default font "Roboto Flex."`)
  
    fs.writeFileSync(
      'app/_components/UserFont.tsx',
      `import { Roboto_Flex } from 'next/font/google'\nconst font = Roboto_Flex({ subsets: ['latin'], })\nexport default font`
    )
  } // should only run into this error during setup when file is not found, in which case we manually set a font

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
              if (line.startsWith('colorContentCodeBackgroundDark')) {
                contentClasses.push(`dark:prose-pre:bg-${value}`)
                contentClasses.push(`dark:prose-code:bg-${value}`)
              }
              if (line.startsWith('colorContentCodeBackgroundLight')) {
                contentClasses.push(`prose-pre:bg-${value}`)
                contentClasses.push(`prose-code:bg-${value}`)
              }
              if (line.startsWith('colorContentCodeTextDark')) {
                contentClasses.push(`dark:prose-pre:text-${value}`)
              }
              if (line.startsWith('colorContentCodeTextLight')) {
                contentClasses.push(`prose-pre:text-${value}`)
              }
              if (line.startsWith('colorContentBlockquoteBorderDark')) {
                contentClasses.push(`dark:prose-blockquote:border-${value}`)
              }
              if (line.startsWith('colorContentBlockquoteBorderLight')) {
                contentClasses.push(`prose-blockquote:border-${value}`)
              }
              if (line.startsWith('colorContentTableBorderDark')) {
                contentClasses.push(`dark:prose-tr:border-${value}`)
                contentClasses.push(`dark:prose-thead:border-${value}`)
              }
              if (line.startsWith('colorContentTableBorderLight')) {
                contentClasses.push(`prose-tr:border-${value}`)
                contentClasses.push(`prose-thead:border-${value}`)
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
                } else if (key.includes('Background')) {
                  safelist.push(`dark:bg-${value}`)
                } else if (key.includes('Border')) {
                  safelist.push(`dark:border-${value}`)
                } else {
                  safelist.push(`dark:text-${value}`)
                }
              } else {
                if (key.includes('Hover')) {
                  safelist.push(`hover:text-${value}`)
                } else if (key.includes('Background')) {
                  safelist.push(`bg-${value}`)
                } else if (key.includes('Border')) {
                  safelist.push(`border-${value}`)
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


      if (contentClasses.join(' ').trim()) {
        fs.appendFileSync(
          'app/globals.css', 
          `.eggspress-content-extended {\n@apply ${contentClasses.join(' ')};\n}`)
      }
    }
  } catch (e) {
    console.warn(`Prebuild error encountered while adding custom colors. Applying minimal set of colors for Setup mode.`)

    const safelist = [
      'dark:bg-slate-900',
      'dark:bg-slate-800',
      'dark:bleed-slate-800',
      'dark:bg-slate-800',
      'dark:text-gray-200',
      'dark:text-white',
      'bg-gray-100',
      'bg-white',
      'bleed-white',
      'text-gray-800',
    ]

    fs.writeFileSync(
      'app/safelist.ts',
      `const safelist = [${safelist.map(x => `'${x}'`)}]\nexport default safelist`
    )
  } // should only run into this error during setup when file is not found, in which case we set a minimum set of colors in safelist

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

