import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our engagement timelines vary based on scope, but a typical ground-up product design and development sprint takes between 8 to 12 weeks. We emphasize rapid prototyping, delivering testable builds within the first 3 weeks."
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Yes. We frequently partner with seed and Series A startups to establish their initial product architecture, brand identity, and scalable frontend systems before they build out large internal teams."
  },
  {
    question: "What is your tech stack of choice?",
    answer: "We specialize in modern web technologies: React, Next.js, and Vite for the frontend; Node.js and Go for the backend. For immersive experiences, we rely on Three.js, React Three Fiber, Framer Motion, and GSAP."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We prefer value-based flat-fee pricing for clearly scoped phases, or a dedicated weekly team retainer for ongoing product iteration. This ensures aligned incentives and transparent budgeting."
  },
  {
    question: "Can you integrate with our existing engineering team?",
    answer: "Absolutely. We often operate as an embedded strike team, working alongside your internal engineers. We adapt to your sprint cycles, CI/CD pipelines, and code review processes."
  }
]

function AccordionItem({ item, isOpen, onClick }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="faq-item border-b border-glass-border">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group outline-none focus-visible:bg-white/5 px-2 -mx-2 rounded"
        data-cursor="link"
      >
        <h3 className={`font-display text-xl md:text-2xl transition-colors duration-300 pr-8 ${isOpen ? 'text-accent-gold' : 'text-beige-100 group-hover:text-beige-200'}`}>
          {item.question}
        </h3>
        <div className={`w-8 h-8 rounded-full liquid-glass-panel flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-beige-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-8 md:pr-16 px-2 text-beige-300 font-body text-base leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0) // First item open by default
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return

    gsap.from(".faq-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      }
    })

    gsap.from(".faq-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      }
    })
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] })

  return (
    <section id="faq" ref={sectionRef} className="relative z-10 py-24 px-6 md:px-16 lg:px-24 bg-bg-deep pointer-events-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 faq-header">
          <p className="font-mono text-accent-gold uppercase tracking-widest text-sm mb-4">Questions?</p>
          <h2 className="font-display text-4xl md:text-5xl text-beige-100">Frequently Asked</h2>
        </div>

        <div className="border-t border-glass-border">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              item={faq} 
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
