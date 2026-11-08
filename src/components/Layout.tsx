import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import { Logo } from './ui'

function Intro() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('kts-intro') } catch { return false }
  })
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => { setShow(false); try { sessionStorage.setItem('kts-intro', '1') } catch { /* noop */ } }, 1100)
    return () => clearTimeout(t)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="hero-bg" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center' }} aria-hidden>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}><Logo light /></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  // Every page begins with a dark hero, so the nav uses its light variant at the top.
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only" style={{ position: 'fixed', zIndex: 200 }}>Skip to content</a>
      <Intro />
      <Navbar heroDark />
      <motion.main key={pathname} id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
        <Outlet />
      </motion.main>
      <Footer />
      <FloatingContact />
    </MotionConfig>
  )
}
