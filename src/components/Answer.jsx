import React from 'react'
import { checkHeading, replaceHeadingStars } from '../helper.js'

const Answer = ({ ans }) => {
  const isHeading = checkHeading(ans)
  const displayText = isHeading ? replaceHeadingStars(ans) : ans

  return (
    <>
      {isHeading ? (
        <p className="text-blue-400 font-semibold text-lg">{displayText}</p>
      ) : (
        <p className="text-base text-zinc-200 pl-5">{displayText}</p>
      )}
    </>
  )
}

export default Answer
