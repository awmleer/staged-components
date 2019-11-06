import React, {FC, PropsWithChildren, ReactElement} from 'react'

type StageRender<P> = (props: PropsWithChildren<P>) => StageRender<P> | ReactElement

function Stage<P>(props: {stage: StageRender<P>, parentProps: PropsWithChildren<P>}) {
  const next = props.stage(props.parentProps)
  if (typeof next === 'function') {
    return (
      <Stage stage={next} parentProps={props.parentProps}/>
    )
  } else {
    return next
  }
}

export function staged<P = {}>(
  stage: StageRender<P>
) {
  return function Staged(props) {
    return (
      <Stage stage={stage} parentProps={props}/>
    )
  } as FC<P>
}
