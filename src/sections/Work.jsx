import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { playTransitionSound } from '../lib/synth'
import ScrambleText from '../components/ScrambleText'

const SEL = '/projects/selected-20260623T103901Z-3-001/selected'
const WEB = '/projects/Website-20260623T103659Z-3-001/Website'
const POD = '/projects/white bg prdct photo-20260623T103656Z-3-001/white bg prdct photo'
const POST = '/projects/Posters-20260623T103833Z-3-001/Posters'

export const projects = [
  {"id": 101, "title": "SIRA", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/sira-02.jpg_vb4wpu.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 102, "title": "VIOLET DREAMS", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/Violet-Dreams_plvgzf.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 103, "title": "BRANDING 3", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/3_o5cu2h.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 104, "title": "BERRY ROYALE", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392152/Berry-Royale_xo1bq9.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 105, "title": "BERRY ROYALE 2", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392151/Berry-Royale-1_z4vyuw.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 106, "title": "IDUKKI GOLD SPICES", "category": "Branding", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392151/idukki-gold-spices-logo_epne7e.jpg", "year": "2026", "description": "Brand identity design.", "tags": ["Branding", "Identity"]},
  {"id": 107, "title": "DESIGN 1", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392183/ai-9.1_i9b4yo.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"]},
  {"id": 108, "title": "CAKE POST", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392180/cake_post_1_om2t4z.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"]},
  {"id": 109, "title": "POST 33", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392178/post-33_vdzooh.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"]},
  {"id": 110, "title": "POST 1", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392175/post_1_qhybgw.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"]},
  {"id": 111, "title": "POST 1.2", "category": "Designs", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392174/post_1.2_griq2k.jpg", "year": "2026", "description": "Creative design project.", "tags": ["Design", "Art"]},
  {"id": 112, "title": "009", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392170/009_jk7tmz.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"]},
  {"id": 113, "title": "FRENCH OUD", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/french_oud_1_vrgtgo.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"]},
  {"id": 114, "title": "OUD DAHAB", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/oud_dahab_2_zxlihw.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"]},
  {"id": 115, "title": "ROYAL", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392169/ROYAL_ssnggq.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"]},
  {"id": 116, "title": "RANIYA", "category": "Product Photography", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782392168/raniya_2_v7gtih.jpg", "year": "2026", "description": "High-end product photography.", "tags": ["Photography"]},
  {"id": 117, "title": "PERFORMANCE 1", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394169/performance_marketing_fiq9dy.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"]},
  {"id": 118, "title": "PERFORMANCE 2", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394169/performance_marketing2_lomagc.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"]},
  {"id": 119, "title": "PERFORMANCE 3", "category": "Performance Marketing", "image": "https://res.cloudinary.com/dr9iliszi/image/upload/v1782394168/performance_marketing3_nevcuk.png", "year": "2026", "description": "Performance marketing campaign.", "tags": ["Marketing"]},
  {"id": 120, "title": "FELLORA", "category": "Website", "image": "/images/projects/fellora.png", "websiteUrl": "https://fellora.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 121, "title": "GREENVEEL", "category": "Website", "image": "/images/projects/greenveel.png", "websiteUrl": "https://greenveel.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 122, "title": "COMPASS QTR", "category": "Website", "image": "/images/projects/compassqtr.png", "websiteUrl": "https://compassqtr.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 123, "title": "KERA CABS", "category": "Website", "image": "/images/projects/keracabs.png", "websiteUrl": "https://keracabs.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 124, "title": "MARDOK", "category": "Website", "image": "/images/projects/mardok.png", "websiteUrl": "https://mardok.in/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 125, "title": "SWIFT ENGLISH ACADEMY", "category": "Website", "image": "/images/projects/swiftenglish.png", "websiteUrl": "https://swiftenglishacademy.in/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 126, "title": "INDIAN PRAVASI MOVEMENT", "category": "Website", "image": "/images/projects/indianpravasi.png", "websiteUrl": "https://www.indianpravasimovement.org", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 127, "title": "GARDEN VILLE", "category": "Website", "image": "/images/projects/gardenville.png", "websiteUrl": "https://gardenville.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 128, "title": "ZODI", "category": "Website", "image": "/images/projects/zodi.png", "websiteUrl": "https://zodi.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 129, "title": "HDF BUSINESS", "category": "Website", "image": "/images/projects/hdfbusiness.png", "websiteUrl": "https://hdfbusiness.ae/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 130, "title": "LEVOC", "category": "Website", "image": "/images/projects/levoc.png", "websiteUrl": "https://levoc.ae", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 131, "title": "LAVESSIDE DESIGN", "category": "Website", "image": "/images/projects/lavesside.png", "websiteUrl": "https://lavessidesign.com/", "year": "2026", "description": "Website development.", "tags": ["Website", "Development"]},
  {"id": 132, "title": "TRIZONE", "category": "Social Media Management", "image": "/images/projects/trizone_profile.jpg", "websiteUrl": "https://www.instagram.com/trizone_business_solutions/", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"]},
  {"id": 133, "title": "PEDAL", "category": "Social Media Management", "image": "/images/projects/pedal_profile.jpg", "websiteUrl": "https://www.instagram.com/pedal.cc", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"]},
  {"id": 134, "title": "GARDENVILLE UAE", "category": "Social Media Management", "image": "/images/projects/gardenville_profile.jpg", "websiteUrl": "https://www.instagram.com/gardenville_uae", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"]},
  {"id": 135, "title": "HAYA RESTAURANT", "category": "Social Media Management", "image": "/images/projects/haya_profile.jpg", "websiteUrl": "https://www.instagram.com/hayarestaurant__", "year": "2026", "description": "Social Media Management.", "tags": ["SMM", "Instagram"]},
  {"id": 140, "title": "NUX", "category": "Branding", "image": "/images/projects/nux.webp", "year": "2026", "description": "Jewelry studio branding.", "tags": ["Branding", "Jewelry"]},
  {"id": 141, "title": "CLOTHS", "category": "Product Photography", "image": "/images/projects/cloths.webp", "year": "2026", "description": "Outerwear clothing product photography.", "tags": ["Photography", "Fashion"]},
  {"id": 142, "title": "OUD COLLECTION", "category": "Product Photography", "image": "/images/projects/oud2.webp", "year": "2026", "description": "Perfume bottles photography (Zahari, Phantom, Amber).", "tags": ["Photography", "Luxury"]},
  {"id": 143, "title": "LOGO AND MOCKUPS", "category": "Branding", "image": "/images/projects/logo.webp", "year": "2025", "description": "Mostrador branding and mockups.", "tags": ["Branding", "Mockups"]},
  {"id": 144, "title": "POSTERS", "category": "Designs", "image": "/images/projects/posters.webp", "year": "2025", "description": "Digital marketing posters.", "tags": ["Digital Marketing", "Posters"]},
  {"id": 145, "title": "MINTS BRAND REEL", "category": "Video & Motion", "video": "https://res.cloudinary.com/dr9iliszi/video/upload/v1782396482/MINTS_MG_1_1_sd5gm3.mp4", "year": "2026", "description": "An immersive brand experience video designed for Mints Global.", "tags": ["Motion Graphics", "Brand Film", "Video Editing"]},
  {"id": 146, "title": "VIDEO SHOWCASE 1", "category": "Video & Motion", "video": "https://r2.fivemanage.com/a4pdsZOQMmCMFV6BoxOUW/mmim.HQmp4.mp4", "year": "2026", "description": "Video production and motion graphics.", "tags": ["Motion Graphics", "Video"]},
  {"id": 147, "title": "VIDEO SHOWCASE 2", "category": "Video & Motion", "video": "https://r2.fivemanage.com/a4pdsZOQMmCMFV6BoxOUW/reeel_HQ1.mp4", "year": "2026", "description": "Video production and motion graphics.", "tags": ["Motion Graphics", "Video"]}
]

// Group projects
export const clusters = [
  { id: 'designs', title: 'Designs', projects: projects.filter(p => ['Designs', 'Posters & Editorial'].includes(p.category)) },
  { id: 'product-photography', title: 'Product Photography', projects: projects.filter(p => ['Product Photography', 'Interior Photography'].includes(p.category)) },
  { id: 'smm', title: 'Social Media Management', projects: projects.filter(p => ['Social Media Management', 'Social Media Marketing'].includes(p.category)) },
  { id: 'website', title: 'Website', projects: projects.filter(p => ['Website', 'Web Development', 'E-commerce'].includes(p.category)) },
  { id: 'branding', title: 'Branding', projects: projects.filter(p => ['Branding', 'Brand Identity', 'Print'].includes(p.category)) },
  { id: 'performance-marketing', title: 'Performance Marketing', projects: projects.filter(p => ['Performance Marketing', 'Commercial Ads', 'Commercial Ad'].includes(p.category)) },
  { id: 'video-motion', title: 'Video & Motion', projects: projects.filter(p => ['Video & Motion', 'Video Editing'].includes(p.category)) },
]
function DossierCard({ project, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, z: -50 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative cursor-pointer liquid-glass-panel border-glass-border overflow-hidden hover:border-accent-gold/50 transition-colors duration-500 flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-bg-deep/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
        {project.video ? (
          <video
            src={project.video}
            className="w-full h-full object-cover transition-all duration-700"
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 border-t border-white/5 relative z-20 bg-bg-deep/80">
        <div className="flex justify-between items-center">
          <span className="font-display font-bold text-sm tracking-widest text-beige-100 uppercase">{project.title}</span>
          <span className="font-mono text-[9px] text-accent-gold">{project.year}</span>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-wider text-beige-300">{project.category}</span>
      </div>
      {/* HUD corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-gold/40 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-gold/40 z-20 pointer-events-none" />
    </motion.div>
  )
}

export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-bg-deep/90 backdrop-blur-md" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-bg-deep border border-accent-gold/30 rounded flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-black/50">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase">File: {project.id.toString().padStart(3, '0')}</span>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider">{project.title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-accent-gold transition-colors text-white hover:text-accent-gold"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
              <div className="w-full md:w-2/3 bg-black/30 p-6 flex flex-col justify-center items-center relative min-h-[400px]">
                {project.video ? (
                  <video src={project.video} className="w-full h-full object-contain" autoPlay muted loop playsInline controls />
                ) : (
                  <img src={project.image} alt={project.title} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                )}
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col gap-8 bg-bg-deep/80 border-l border-white/5">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase text-beige-300">Category</span>
                  <span className="font-display text-lg text-accent-gold uppercase tracking-wide">{project.category}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase text-beige-300">Description</span>
                  <p className="font-body text-sm text-beige-100 leading-relaxed opacity-80">{project.description}</p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 text-[9px] font-mono border border-white/10 text-white/60 bg-black/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full py-4 bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold text-accent-gold font-mono text-xs uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-2"
                    >
                      Visit Platform
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Work() {
  const containerRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section ref={containerRef} className="relative z-10 w-full min-h-screen py-24 text-beige-100 flex flex-col items-center pointer-events-auto">
      <div className="max-w-[1400px] w-full px-6 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent-gold">Level 01 // Declassified</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
            Case <span className="text-shimmer">Files</span>
          </h2>
        </div>

        {/* Dossier Clusters */}
        <div className="flex flex-col gap-32 w-full">
          {clusters.map((cluster) => (
            <div key={cluster.id} className="flex flex-col gap-8">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display text-2xl tracking-widest uppercase text-beige-300">{cluster.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cluster.projects.map(project => (
                  <DossierCard
                    key={project.id}
                    project={project}
                    onClick={() => {
                      setSelectedProject(project)
                      playTransitionSound()
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
