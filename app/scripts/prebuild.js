const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { execSync } = require('child_process')

function getFiles(dir, recursive=false) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (recursive) {
        results = results.concat(getFiles(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

const consoleLogFile = async (filepath) => {
  try {
    const fileStream = fs.createReadStream(filepath)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        console.log(line)
      }
    }
  } catch (e) {
    console.log(`Could not read file ${filepath}: ${e}`)
  }
}

const dumpMarkdownAsString = async (filepath) => {
  if ( !(filepath.endsWith('md') || filepath.endsWith('mdx'))) {
    return ''
  }

  let fileData = []

  try {
    const fileStream = fs.createReadStream(filepath)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        fileData.push(line)
      }
      
      return fileData.join(' \n')
    }
  } catch (e) {
    console.log(`Could not read file ${filepath}: ${e}`)
  }
}

const getValueFromFileWithKey = async (filepath, key) => {
  try {
    const fileStream = fs.createReadStream(filepath)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
    
      for await (const line of rl) {
        if (line.startsWith(key)) {
          const value = line.slice(line.indexOf(':') + 1).replaceAll('"', '').replaceAll("'", "").trim().replaceAll(' ', '_')
          return value
        }
      }
      return null
    }
  } catch (e) { 
    return null
  }
}

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
    console.log(`    Info: Custom font not specified. Applying default font "Roboto Flex."`)
  
    fs.writeFileSync(
      'app/_components/UserFont.tsx',
      `import { Roboto_Flex } from 'next/font/google'\nconst font = Roboto_Flex({ subsets: ['latin'], })\nexport default font`
    )
  } // should only run into this error during setup when file is not found, in which case we manually set a font
}


const setColors = async (path) => {

  const colorScheme = await getValueFromFileWithKey('my_settings/appearance.md', 'colorScheme')
  let fileToRead = path

  if (colorScheme) {
    fileToRead = `my_settings/colors/${colorScheme}.md`
  }
  
  try {
    const fileStream = fs.createReadStream(fileToRead)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })
      
      let safelist = []
      let contentClasses = []
      let contentCodeClasses = []
      let scrollbarVariables = []

      for await (const line of rl) {
        if (line.startsWith('color')) {
          const value = line.slice(line.indexOf(':') + 1).replaceAll('"', '').replaceAll("'", "").trim().replaceAll(' ', '-')
          const key = line.slice(0, line.indexOf(':')).trim()

          if (value) {
            if (line.startsWith('colorScrollbar')) {
              if (line.startsWith('colorScrollbarThumbDark')) {
                scrollbarVariables.push(`--dark-scroll-bar-color: ${value.replace('[', '').replace(']', '')}`)
              }
              if (line.startsWith('colorScrollbarThumbLight')) {
                scrollbarVariables.push(`--scroll-bar-color: ${value.replace('[', '').replace(']', '')}`)
              }
              if (line.startsWith('colorScrollbarTrackDark')) {
                scrollbarVariables.push(`--dark-scroll-bar-bg-color: ${value.replace('[', '').replace(']', '')}`)
              }
              if (line.startsWith('colorScrollbarTrackLight')) {
                scrollbarVariables.push(`--scroll-bar-bg-color: ${value.replace('[', '').replace(']', '')}`)
              }
            }

            if (line.startsWith('colorContent')) {
              if (line.startsWith('colorContentBodyHeadingDark')) {
                contentClasses.push(`dark:prose-headings:text-${value}`)
              }
              if (line.startsWith('colorContentBodyHeadingLight')) {
                contentClasses.push(`prose-headings:text-${value}`)
              }
              if (line.startsWith('colorContentBodyTextDark')) {
                contentClasses.push(`dark:prose-p:text-${value}`)
                contentClasses.push(`dark:prose-strong:text-${value}`)
                contentClasses.push(`dark:prose-em:text-${value}`)
                contentClasses.push(`dark:prose-table:text-${value}`)
                contentClasses.push(`dark:prose-ul:text-${value}`)
                contentClasses.push(`dark:prose-ol:text-${value}`)
              }
              if (line.startsWith('colorContentBodyTextLight')) {
                contentClasses.push(`prose-p:text-${value}`)
                contentClasses.push(`prose-strong:text-${value}`)
                contentClasses.push(`prose-em:text-${value}`)
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
              if (line.startsWith('colorContentListMarkerDark')) {
                contentClasses.push(`dark:marker:text-${value}`)
              }
              if (line.startsWith('colorContentListMarkerLight')) {
                contentClasses.push(`marker:text-${value}`)
              }
              if (line.startsWith('colorContentCodeBackgroundDark')) {
                contentCodeClasses.push(`dark:bg-${value}`)
                contentCodeClasses.push(`dark:bg-${value}`)
                contentCodeClasses.push(`dark:border-${value}`)
              }
              if (line.startsWith('colorContentCodeBackgroundLight')) {
                contentCodeClasses.push(`bg-${value}`)
                contentCodeClasses.push(`bg-${value}`)
                contentCodeClasses.push(`border-${value}`)
              }
              if (line.startsWith('colorContentCodeTextDark')) {
                contentCodeClasses.push(`dark:text-${value}`)
                contentCodeClasses.push(`dark:text-${value}`)
              }
              if (line.startsWith('colorContentCodeTextLight')) {
                contentCodeClasses.push(`text-${value}`)
                contentCodeClasses.push(`text-${value}`)
              }
              if (line.startsWith('colorContentCodeBlockBackgroundDark')) {
                if ( value ) {
                  fs.appendFileSync(
                    'app/github-dark.css', 
                    `.dark pre:has(.hljs), .dark .hljs { background: ${value.replace('[', '').replace(']', '')} }`
                  )
                }
              }
              if (line.startsWith('colorContentCodeBlockBackgroundLight')) {
                if ( value ) {
                  fs.appendFileSync(
                    'app/stackoverflow-light.css', 
                    `pre:has(.hljs), .hljs { background: ${value.replace('[', '').replace(']', '')} }`
                  )
                }
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
          `.eggspress-content-extended {\n@apply ${contentClasses.join(' ')};\n}`
        )
      }


      if (contentCodeClasses.join(' ').trim()) {
        fs.appendFileSync(
          'app/globals.css', 
          `p > code {\n@apply ${contentCodeClasses.join(' ')};\n}\n\nli > code {\n@apply ${contentCodeClasses.join(' ')};\n}`
        )
      }

      if (scrollbarVariables.join(' ').trim()) {
        fs.appendFileSync(
          'app/globals.css', 
          `:root {\n  ${scrollbarVariables.join('; ').trim()};\n}\n\n.dark{\n  --scroll-bar-color: var(--dark-scroll-bar-color);\n  --scroll-bar-bg-color: var(--dark-scroll-bar-bg-color); }`
        )
      }
    }
  } catch (e) {
    console.log(`    Info: Color scheme not specified or there was an error. Applying minimum default color scheme.`)

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
setColors('my_settings/appearance.md')


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
    fs.copyFileSync(sourceFile, destinationFile)
  }
})

// Check if Eggspress is in Setup Mode- if so, create eggspress_starter_workspace.zip
new Promise((resolve, reject) => {
  if (!fs.existsSync('my_settings/metadata.md')) {
    console.log('   > Eggspress is in Setup Mode')
    console.log('   > To exit Setup Mode:')
    console.log('     1. Download eggspress_starter_workspace.zip and unzip its contents')
    console.log('     2. Upload workspace contents (folders starting with "my_") to the root of your repository')
    console.log('')
    execSync(`npm install archiver`)

    const archiver = require('archiver')
    const output = fs.createWriteStream('public/assets/eggspress_starter_workspace.zip')
    const archive = archiver('zip', { zlib: { level: 0 } })
  
    archive
      .directory('app/_workspace/', false)
      .on('warning', (e) => {console.log(e)})
      .pipe(output)
    
    output.on('close', () => {
      console.log(`    Info: Created eggspress_starter_workspace.zip (${archive.pointer()} bytes)`)
      fs.rmSync('app/_workspace', {recursive: true, force: true})
      resolve()
    })

    archive.finalize()
  } else {
    console.log('    > Configuring Eggspress')
    fs.rmSync('app/_workspace', {recursive: true, force: true})
    resolve()
  }
})

// Load custom components from my_components user folder


const getFirstLine = async (filepath) => {
  try {
    const fileStream = fs.createReadStream(filepath)
    if (fileStream) {
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      })

      for await (const line of rl) {
        return line
      }
    }
  } catch (e) {
    console.log(`Could not read file ${filepath}: ${e}`)
  }
}

let dummyComponentNames = []

const createDummyComponents = async () => {
  const destinationPath = `app/_components/UserComponents`
  fs.mkdirSync(destinationPath, {recursive: true}) 

  let filesInPostFolder = []
  const tagsSet = new Set()
  
  try {
    filesInPostFolder = [...getFiles('my_posts', true), ...getFiles('my_pages', true)]
  } catch { return }

  let markdownData = []
  try {
    await Promise.all(filesInPostFolder.map(async (file) => {
      markdownData.push(await dumpMarkdownAsString(file))
    }))
  } catch { return }

  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi;
  
  const markdownDataAsString = markdownData.join('\n\n')

  for (const match of markdownDataAsString.matchAll(tagRegex)) {
    const tagName = match[1];
    tagsSet.add(tagName)
  }

  tagsSet.forEach(tagName => {
    if (tagName[0] === tagName[0].toUpperCase()) {
      dummyComponentNames.push(tagName)
      fs.writeFileSync(
        `app/_components/UserComponents/${tagName}.tsx`,
        `\nconst ${tagName} = () => {return <></>}\n\nexport { ${tagName }}`
      )
    }
  })
}


const importUserComponents = async () => {
  try {
    fs.writeFileSync('app/_components/UserComponents.tsx', '')

    let filesInComponentFolder = []
    
    try {
      filesInComponentFolder = getFiles('my_components')
    } catch (e) {

      const dummyComponents = [...dummyComponentNames, 'Dummy']
      dummyComponents.forEach((dummyName) => {
        fs.appendFileSync(
          'app/_components/UserComponents.tsx',
          `const ${dummyName} = () => {return <></>}\n`
        )
      })
      fs.appendFileSync(
        'app/_components/UserComponents.tsx',
        `\n\nexport { ${dummyComponents.join(', ')} }`
      )

      throw new Error('The directory my_components does not exist. No components were imported.')
    }

    const destinationPath = `app/_components/UserComponents`

    fs.mkdirSync(destinationPath, {recursive: true})
  
    const componentFiles = filesInComponentFolder.filter(
      x => (x[x.lastIndexOf('/') + 1] === x[x.lastIndexOf('/') + 1].toUpperCase() || x[x.lastIndexOf('/') + 1] === '#')
    ).filter(
      x => x.indexOf('.') > 0
    ).filter(
      x => (x.endsWith('ts') || x.endsWith('tsx')) || x.endsWith('js') || x.endsWith('jsx')
    ).map(
      (file) => {
        const isEnabled = file.slice(file.lastIndexOf('/') + 1)[0] === '#' ? false : true
        return {
          filename: file.slice(file.lastIndexOf('/') + (isEnabled ? 1 : 2)),
          name: file.slice(file.lastIndexOf('/') + (isEnabled ? 1 : 2), file.lastIndexOf('.')),
          source: file,
          destination: `${destinationPath}/${file.slice(file.lastIndexOf('/') + (isEnabled ? 1 : 2))}`,
          isEnabled: isEnabled
        }
      }
    )
  
    let componentNames = []

    if ( componentFiles ) {
      console.log('    Found custom components in workspace folder my_components')
      componentFiles.forEach(file => {
        if (file.isEnabled) {
          console.warn(`      Copy ${file.source} to ${file.destination}`)
        } else {
          console.warn(`      Skip ${file.source} (not enabled)`)
        }
      })
    }

    const packagesToInstall = new Set([])

    Promise.all(componentFiles.map(async (file) => {
      componentNames.push(file.name)

      if (file.isEnabled) {
        const firstLine = await getFirstLine(file.source)
        if ( firstLine.startsWith('//') ) {
          const packages = firstLine.slice(2).split(',').map(x => x.trim()).filter(x => x.length)
          if ( packages ) {
            packages.forEach((packageToInstall) => {
              packagesToInstall.add(packageToInstall)
            })
          }
        }

        fs.copyFileSync(file.source, file.destination)

        if (fs.existsSync(`my_components/${file.name}`)) {
          fs.mkdirSync(`app/_components/UserComponents/${file.name}`)
          try {
            const filesInComponentSubfolder = getFiles(`my_components/${file.name}`, true)
            componentModules = filesInComponentSubfolder.map(module => {
              return {
                filename: module.slice(module.lastIndexOf('/') + 1),
                name: module.slice(module.lastIndexOf('/') + 1, module.lastIndexOf('.')),
                source: module,
                destination: `${destinationPath}/${file.name}/${module.slice(module.lastIndexOf('/') + 1)}`,
              }
            })
            
            componentModules.forEach(module => {
              try {
                fs.copyFileSync(module.source, module.destination)
              } catch (e) { console.log(`Error encountered while copying ${module.source} to ${module.destination}: ${e}`)}
            })
          } catch (e) { console.log(`Error encountered while preparing to copy modules for file ${file.source}: ${e}`)}
        }
      } else {
        fs.writeFileSync(
          `${destinationPath}/${file.filename}`,
          `const ${file.name} = () => {return <></>}\n\nexport default ${file.name}`
        )
      }
    })).then(() => {
      Array.from(packagesToInstall).forEach((packageToInstall) => {
        try {
          console.log(`    Running "npx add-dependencies ${packageToInstall}"`)
          execSync(`npx add-dependencies ${packageToInstall}`)
        } catch (e) {`    Ran into an error installing ${packageToInstall}: ${e}`}
      })
        
      if (componentNames) {
        [...componentFiles, ...dummyComponentNames].forEach((file) => {
          fs.appendFileSync(
            'app/_components/UserComponents.tsx',
            `\nimport { default as ${file.name} } from './UserComponents/${file.name}'`
          )
        })
        fs.appendFileSync(
          'app/_components/UserComponents.tsx',
          `\n\nexport { ${componentNames.join(', ')} }`
        )
      }
      fs.rmSync('my_components', {recursive: true, force: true})
    })
  
  } catch (e) {
    console.log(`Error encountered while importing custom components: ${e}`)
    console.log('    > You must resolve this error in order for custom components to function properly')
    console.log('    > Some or all custom components may not work properly until error(s) are resolved')
  }
}

const loadUserComponents = async () => {
  await createDummyComponents()
  await importUserComponents()
}


loadUserComponents()
