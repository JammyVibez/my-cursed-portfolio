"use client"

import React from "react"

type Props = {
  fallback: React.ReactNode
  children: React.ReactNode
}

export class CanvasBoundary extends React.Component<Props> {
  state = { errored: false }

  static getDerivedStateFromError() {
    return { errored: true }
  }

  componentDidCatch() {
    // no-op: we just switch to fallback
  }

  render() {
    if (this.state.errored) return this.props.fallback
    return this.props.children
  }
}
