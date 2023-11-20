import Link from 'next/link'
import React from 'react'

const Setup = () => {
  return (
    <main className="flex flex-wrap">
      <div className="flex w-full justify-center">
        <div className='max-w-prose'>
          <div className="py-12 prose dark:prose-invert">
            <h2>Welcome to Eggspress</h2>
            <p>
              To add content to your site, download
              the <Link href="/assets/eggspress_starter_workspace.zip">starter workspace</Link>. Then extract the contents
              of <span className="font-mono font-light text-sm px-1">eggspress_starter_workspace.zip</span> to
              a folder on your computer for all things Eggspress.
            </p>
          </div>

          <div className="flex cursor-pointer select-none duration-200 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg mb-1 px-6 py-3 rounded border">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg>  
            <Link href="/assets/eggspress_starter_workspace.zip" className="px-3">
              <div>
                Download the Eggspress Starter Workspace
              </div>
              <div className="text-xs font-light font-mono">
                eggspress_starter_workspace.zip
              </div>
            </Link>
          </div>

          <div className="py-12 prose dark:prose-invert">
            <p>
              We recommend storing your workspace on a synced drive like <a target="_blank" href="https://www.dropbox.com/">Dropbox</a>.
            </p>
            <p>
              Eggspress uses <a target="_blank" href="https://www.markdownguide.org/getting-started/">Markdown</a> to style your content. We recommend using <a target="_blank" href="https://obsidian.md/">Obsidian</a> as
              your desktop editor. It's available on Windows, Mac, Linux, Android, and iOS.
            </p>
              Note: If you use Obsidian, you must go into its settings. Under the "Files & Links" tab:
            <ol>
              <li>Disable "Use Wikilinks"</li>
              <li>Set "Default location for new attachments" to "Same folder as current file"</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Setup