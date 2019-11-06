import {act} from '@testing-library/react'
import {staged} from '..'
import * as React from 'react'
import {useEffect, useState} from 'react'
import * as testing from '@testing-library/react'

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

test('provider initialize', async function () {
  const App = staged(() => {
    const [waiting, setWaiting] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        act(() => {
          setWaiting(false)
        })
      }, 300)
    }, [])
    if (waiting) return null
    return () => {
      const [count, setCount] = useState(1)
      return (
        <div>
          <p>{count}</p>
          <button onClick={() => {setCount(count + 1)}}>Change</button>
        </div>
      )
    }
  })
  const renderer = testing.render(
    <App/>
  )
  expect(renderer.asFragment()).toMatchSnapshot()
  await sleep(500)
  testing.fireEvent.click(testing.getByText(renderer.container, 'Change'))
  expect(renderer.asFragment()).toMatchSnapshot()
})
