import { useId } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

import { Intro, IntroFooter } from '@/components/Intro'

function Timeline() {
  let id = useId()

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-0 lg:min-w-[32rem] lg:overflow-visible">
      <svg
        className="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 0H6M0 8H6"
              className="stroke-sky-900/10 dark:stroke-white/10 xl:stroke-white/10"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

function Glow() {
  let id = useId()

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950 lg:right-0 lg:min-w-[32rem]">
      <svg
        className="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:-right-40 lg:bottom-auto lg:left-auto lg:top-[-40%] lg:h-[180%] lg:w-[80rem]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-desktop`} cx="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-desktop)`}
          className="hidden lg:block"
        />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-mobile)`}
          className="lg:hidden"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay lg:left-auto lg:top-0 lg:h-auto lg:w-px" />
    </div>
  )
}

function FixedSidebar({ main, footer }) {
  return (
    <div className="relative overflow-hidden px-6 lg:pointer-events-none lg:z-40 lg:flex lg:w-1/2 lg:px-0">
      <Glow />
      <div className="relative flex w-full lg:pointer-events-auto lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:justify-end lg:pr-32">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
            <div className="relative">
              {main}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
        </div>
      </div>
      <Timeline />
    </div>
  )
}

export default function Home() {
  const { data: session } = useSession()
  console.log(`email`, session.user.email)

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row flex-1 w-full">
          <FixedSidebar main={<Intro />} footer={<IntroFooter />} />
          <div className="relative flex-1">
            <main className="space-y-20 py-20 sm:space-y-32 sm:py-32 lg:pl-32">
              Testing
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
