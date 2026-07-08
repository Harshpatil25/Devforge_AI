import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { routes } from './routes'
import { routeGuards } from './routes/routes.config'

function App() {
  return (
    <>
      <Routes>
      {routes.map(({ path, element: Element, layout: Layout, guard }) => {
        const Guard = guard ? routeGuards[guard] : null
        const content = Layout ? (
          <Layout>
            {Guard ? (
              <Guard>
                <Element />
              </Guard>
            ) : (
              <Element />
            )}
          </Layout>
        ) : Guard ? (
          <Guard>
            <Element />
          </Guard>
        ) : (
          <Element />
        )

        return <Route key={path} path={path} element={content} />
      })}
      </Routes>
      <Toaster position="top-right" toastOptions={{ className: 'bg-slate-900 text-slate-100', duration: 4000 }} />
    </>
  )
}

export default App
