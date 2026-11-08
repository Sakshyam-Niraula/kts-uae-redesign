import { Suspense, lazy } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { PageHero, SEO } from './components/ui'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
const DivisionBlue = lazy(() => import('./pages/Divisions').then((m) => ({ default: m.DivisionBlue })))
const DivisionRed = lazy(() => import('./pages/Divisions').then((m) => ({ default: m.DivisionRed })))

function NotFound() {
  return (
    <>
      <SEO path="/404" title="Page not found" description="The page you are looking for could not be found." />
      <PageHero eyebrow="404" title="Page not found." text="The page you’re looking for doesn’t exist or has moved." />
      <section className="section"><div className="container-x"><Link to="/" className="btn btn-primary">Back to home</Link></div></section>
    </>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="division-blue" element={<DivisionBlue />} />
          <Route path="division-red" element={<DivisionRed />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
