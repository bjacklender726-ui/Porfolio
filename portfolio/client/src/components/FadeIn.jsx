import useScrollAnimation from '../hooks/useScrollAnimation.js'

export default function FadeIn({ children }) {
  const ref = useScrollAnimation()
  return <div ref={ref} className="fade-in">{children}</div>
}
