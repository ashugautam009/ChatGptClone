import React from 'react'
import { checkHeading, replaceHeadingStars } from '../helper.js'

const Answer = ({ ans }) => {
  const isHeading = checkHeading(ans)
  const displayText = isHeading ? replaceHeadingStars(ans) : ans

  return (
    <>
      {isHeading ? (
        <p className="text-white font-bold text-lg">{displayText}</p>
      ) : (
        <p className="text-zinc-300 pl-5">{displayText}</p>
      )}
    </>
  )
}

export default Answer
