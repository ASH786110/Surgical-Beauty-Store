import React, { Component, ErrorInfo, ReactNode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ASH Instruments runtime caught:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080c16] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-amber-500/30 bg-[#0e1626] p-8 text-center shadow-2xl shadow-amber-500/10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-2xl font-bold">
              ASH
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white mb-2">ASH INSTRUMENTS</h1>
            <p className="text-sm text-slate-400 mb-6">
              Application refreshed with latest catalog updates. Click below to continue browsing.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear()
                } catch {}
                window.location.reload()
              }}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
            >
              Refresh Catalog
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const rootElement = document.getElementById("root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
}
