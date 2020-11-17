import React, {FC, PropsWithChildren, ReactElement, Ref, RefForwardingComponent} from 'react'

type StageRender = () => StageRender | ReactElement
type StageRenderRoot<P> = (props: PropsWithChildren<P>) => StageRender | ReactElement
type StageRenderRootWithRef<P, R> = (props: PropsWithChildren<P>, ref: Ref<R>) => StageRender | ReactElement

function processNext(next: StageRender | ReactElement) {
  if (typeof next === 'function') {
    return (
      <Stage stage={next} />
    )
  } else {
    return next
  }
}

function Stage<P>(props: {
  stage: StageRender
}) {
  const next = props.stage()
  return processNext(next)
}

export function staged<P = {}>(
  stage: StageRenderRoot<P>
): FC<P>
export function staged<P = {}, R = any>(
  stage: StageRenderRootWithRef<P, R>,
): RefForwardingComponent<R, P>
export function staged<P = {},  R = any>(
  stage: StageRenderRootWithRef<P, R>,
) {
  return function Staged(props, ref) {
    const next = stage(props, ref)
    return processNext(next)
  } as FC<P>
}
