import Link from 'next/link'
import React from 'react'

const Setup = () => {
  return (
    <main className="flex flex-wrap">
      <div className="flex w-full justify-center">
        <div className="max-w-prose">
          <div className="md:hidden border-yellow-500 bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-200 px-3 py-2 mt-2">
            We recommend setting up on a non-mobile device for the best experience.
          </div>
          <div className="py-12 prose dark:prose-invert">
            <h2>Welcome to Eggspress</h2>
            <p>Congratulations! Your site is now deployed. Here are your next steps:</p>
            <ol>
              <li>
                Download the{' '}
                <Link
                  className="text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                  href="/assets/eggspress_starter_workspace.zip"
                >
                  starter workspace
                </Link>
              </li>
              <li>
                On your computer, create a new folder for{' '}
                <span className="font-medium text-indigo-800 dark:text-green-200">your new workspace</span>
              </li>
              <li>
                Extract the contents of{' '}
                <span className="font-mono font-light text-sm px-1">eggspress_starter_workspace.zip</span>
              </li>
              <li>
                Move the folders that start with{' '}
                <span className="font-mono font-bold text-sm px-1 text-fuchsia-800 dark:text-fuchsia-300">my_</span>{' '}
                into <span className="font-medium text-indigo-800 dark:text-green-200">your new workspace</span>
              </li>
              <li>
                Upload the contents of your{' '}
                <span className="font-medium text-indigo-800 dark:text-green-200">your new workspace</span> to Github
              </li>
            </ol>
            <p>
              <span className="font-bold">Need more help?</span> Get in-depth instructions on how to{' '}
              <a
                className="text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                target="_blank"
                href="https://eggspress.vercel.app/blog/create-your-workspace"
              >
                create your workspace
              </a>
            </p>
            <video className="border rounded-lg" playsInline muted autoPlay loop>
              <source src="/assets/workspace_setup.webm" type="video/webm" />
            </video>
          </div>

          <div className="flex cursor-pointer select-none duration-200 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg mb-1 px-6 py-3 rounded border">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Zm-6 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
              />
            </svg>
            <Link href="/assets/eggspress_starter_workspace.zip" className="px-3">
              <div>Download the Eggspress Starter Workspace</div>
              <div className="text-xs font-light font-mono">eggspress_starter_workspace.zip</div>
            </Link>
          </div>

          {/* <div className="py-12 prose dark:prose-invert">
            <p>
              Eggspress uses <a target="_blank" href="https://www.markdownguide.org/getting-started/">Markdown</a> to style content. If you&apos;re new
              to Markdown, try <a target="_blank" href="https://obsidian.md/">Obsidian</a> as your editor. It&apos;s available on Windows, Mac, Linux, Android, and iOS.
            </p>
            <p>
              Lastly, when you&apos;re ready to publish, upload your workspace to the forked repository
              by dragging and dropping from your computer. The short video below will show you how:
            </p>
              Note: If you use Obsidian, you must configure its settings. Click the gear wheel icon to bring up settings. Under the &quot;Files & Links&quot; tab,
              make the following changes:
            <ol>
              <li>Disable &quot;Use Wikilinks&quot;</li>
              <li>Set &quot;Default location for new attachments&quot; to &quot;Same folder as current file&quot;</li>
            </ol>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default Setup
