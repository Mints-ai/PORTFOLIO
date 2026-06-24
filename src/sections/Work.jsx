import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ScrambleText from '../components/ScrambleText'

const SEL = '/projects/selected-20260623T103901Z-3-001/selected'
const WEB = '/projects/Website-20260623T103659Z-3-001/Website'
const POD = '/projects/white bg prdct photo-20260623T103656Z-3-001/white bg prdct photo'
const POST = '/projects/Posters-20260623T103833Z-3-001/Posters'

const projects = [
  {
    id: 1,
    title: 'NUX',
    category: 'Branding',
    image: '/images/projects/nux.webp',
    year: '2026',
    description: 'A bold, modern brand identity crafted for NUX. We developed a complete visual language — from logo design and typography to brand guidelines and collateral that communicate confidence and innovation.',
    tags: ['Brand Identity', 'Logo Design', 'Typography', 'Collateral']
  },
  {
    id: 2,
    title: 'IDUKKI GOLD',
    category: 'Branding',
    image: '/images/projects/idukki-gold.webp',
    year: '2026',
    description: 'Luxury branding for Idukki Gold, a premium tea brand from the hills of Kerala. The identity draws from rich golden tones and deep greens, evoking the natural origin of the product with a world-class premium feel.',
    tags: ['Brand Identity', 'Packaging Design', 'Luxury', 'Print']
  },
  {
    id: 3,
    title: 'CLOTHS',
    category: 'Product Photography',
    image: '/images/projects/cloths.webp',
    year: '2026',
    description: 'A high-fashion product photography project for a premium clothing label. Each shot was crafted with cinematic studio lighting to emphasize fabric texture, drape, and the refined quality of the garments.',
    tags: ['Product Photography', 'Fashion', 'Studio Lighting', 'Retouching']
  },
  {
    id: 4,
    title: 'OUD',
    category: 'Product Photography',
    image: '/images/projects/oud.webp',
    year: '2026',
    description: 'An evocative product photography campaign for a luxury Arabian oud perfume brand. The moody, atmospheric shots capture the mystique of the Middle Eastern fragrance tradition with gold accents and smoky composition.',
    tags: ['Product Photography', 'Luxury', 'Arabian Fragrance', 'Dark Mood']
  },
  {
    id: 5,
    title: 'INDIAN PRAVASI MOVEMENT',
    category: 'Web Development',
    image: '/images/projects/pravasi.webp',
    year: '2025',
    description: 'A full-scale website built for the Indian Pravasi Movement, a community and advocacy organization. The platform features news, events, community resources, and a multilingual interface serving the global Indian diaspora.',
    tags: ['Web Development', 'React', 'Multilingual', 'Community Platform']
  },
  {
    id: 6,
    title: 'GARDEN VILLE PORTFOLIO',
    category: 'Web Development',
    image: '/images/projects/gardenville-portfolio.png',
    year: '2025',
    description: 'Mints Global portfolio showcase for Garden Ville — a luxury residential real estate project in the UAE.',
    tags: ['Web Development', 'Real Estate', 'Portfolio']
  },
  {
    id: 7,
    title: 'OUD 2',
    category: 'Product Photography',
    image: '/images/projects/oud2.webp',
    year: '2025',
    description: 'A follow-up campaign for the oud fragrance collection, showcasing a wider range of bottles and compositions. Each image is designed to sit equally at home in editorial, e-commerce, and luxury print contexts.',
    tags: ['Product Photography', 'Luxury', 'Arabian Fragrance', 'Collection']
  },
  {
    id: 8,
    title: 'LOGO AND MOCKUPS',
    category: 'Branding',
    image: '/images/projects/logo.webp',
    year: '2025',
    description: 'A comprehensive brand identity project featuring logo design, brand guidelines, and complete stationery mockups. Executed with obsessive attention to detail to deliver a brand system that is both versatile and distinctive.',
    tags: ['Logo Design', 'Brand Identity', 'Stationery', 'Mockups']
  },
  {
    id: 9,
    title: 'POSTERS',
    category: 'Digital Marketing',
    image: '/images/projects/posters.webp',
    year: '2025',
    description: 'A series of high-impact digital marketing posters designed for social media campaigns. The work combines strong typographic hierarchies with bold visual composition to maximise scroll-stopping impact.',
    tags: ['Digital Marketing', 'Social Media', 'Poster Design', 'Typography']
  },
  {
    id: 10,
    title: 'FELLORA',
    category: 'Web Development',
    image: '/images/projects/fellora.png',
    year: '2025',
    description: 'A polished, modern website for Fellora — a UAE-based brand. We designed and developed the full digital experience from UX strategy to production-ready code.',
    tags: ['Web Development', 'UI/UX Design', 'UAE', 'Brand']
  },
  {
    id: 11,
    title: 'GREENVEEL',
    category: 'Web Development',
    image: '/images/projects/greenveel.png',
    year: '2025',
    description: 'Full website design and development for Greenveel. A clean, conversion-optimized site built to establish brand authority and drive qualified leads.',
    tags: ['Web Development', 'UI/UX', 'Lead Generation']
  },
  {
    id: 12,
    title: 'COMPASS QTR',
    category: 'Web Development',
    image: '/images/projects/compassqtr.png',
    year: '2025',
    description: 'Website design and development for Compass QTR. A high-performance platform built with a focus on clarity, speed, and professional presentation.',
    tags: ['Web Development', 'UI/UX', 'Performance']
  },
  {
    id: 13,
    title: 'KERA CABS',
    category: 'Web Development',
    image: '/images/projects/keracabs.png',
    year: '2025',
    description: 'End-to-end web development for Kera Cabs, a ride-hailing and cab booking platform. Features real-time booking interface, route display, and a seamless driver/passenger experience.',
    tags: ['Web Development', 'Booking Platform', 'Transport', 'UI/UX']
  },
  {
    id: 14,
    title: 'MARDOK',
    category: 'Web Development',
    image: '/images/projects/mardok.png',
    year: '2025',
    description: 'Complete digital presence built for Mardok. A professionally designed website that communicates brand authority and drives business enquiries.',
    tags: ['Web Development', 'Brand', 'UI/UX']
  },
  {
    id: 15,
    title: 'SWIFT ENGLISH ACADEMY',
    category: 'Web Development',
    image: '/images/projects/swiftenglish.png',
    year: '2025',
    description: 'Website design and development for Swift English Academy, an English language training institution. Features course listings, online enquiry flows, and a clean, trustworthy aesthetic.',
    tags: ['Web Development', 'Education', 'UI/UX', 'Course Platform']
  },
  {
    id: 16,
    title: 'INDIAN PRAVASI ORG',
    category: 'Web Development',
    image: '/images/projects/indianpravasi.png',
    year: '2025',
    description: 'The main organizational website for Indian Pravasi Movement — a platform connecting the global Indian diaspora with news, events, and community resources.',
    tags: ['Web Development', 'Community', 'Multilingual', 'NGO']
  },
  {
    id: 17,
    title: 'GARDEN VILLE',
    category: 'Web Development',
    image: '/images/projects/gardenville.webp',
    year: '2025',
    description: 'The official website for Garden Ville — a luxury residential development in the UAE. Immersive visuals, interactive property showcase, and a premium digital presence.',
    tags: ['Web Development', 'Real Estate', 'Luxury', 'UAE']
  },
  {
    id: 18,
    title: 'ZODI',
    category: 'Web Development',
    image: '/images/projects/zodi.png',
    year: '2025',
    description: 'Full website design and build for Zodi — a UAE-based brand with a bold, contemporary identity and a focus on digital-first customer experiences.',
    tags: ['Web Development', 'UI/UX', 'UAE', 'Brand']
  },
  {
    id: 19,
    title: 'HDF BUSINESS',
    category: 'Web Development',
    image: '/images/projects/hdfbusiness.png',
    year: '2025',
    description: 'Website development for HDF Business, a UAE-based enterprise. A professional platform built to project credibility and drive business relationships.',
    tags: ['Web Development', 'Business', 'UAE', 'Corporate']
  },
  {
    id: 20,
    title: 'LEVOC',
    category: 'Web Development',
    image: '/images/projects/levoc.png',
    year: '2025',
    description: 'Design and development for Levoc — a sharp, modern digital presence for a UAE-based firm, crafted to stand out in a competitive market.',
    tags: ['Web Development', 'UI/UX', 'UAE', 'Brand']
  },
  {
    id: 21,
    title: 'LAVESSIDE DESIGN',
    category: 'Web Development',
    image: '/images/projects/lavesside.png',
    year: '2025',
    description: 'A premium portfolio website for Lavesside Design — a design studio showcasing architectural and interior projects with an editorial aesthetic and refined user experience.',
    tags: ['Web Development', 'Design Studio', 'Portfolio', 'Interior Design']
  },
  {
    id: 22,
    title: 'DUBAI MAGAZINE COVER',
    category: 'Posters & Editorial',
    image: `${POST}/DUBAI magazine cover.jpg`,
    year: '2026',
    description: "An editorial magazine cover design showcasing high-end typography, modern grid layouts, and curated photography fit for Dubai's luxury publication standards.",
    tags: ['Editorial', 'Magazine Cover', 'Typography', 'Grid Layout']
  },
  {
    id: 23,
    title: 'FRENCH OUD',
    category: 'Product Photography',
    image: `${WEB}/Product shoot/Copy of french oud  (1).jpg`,
    year: '2026',
    description: 'A premium product shoot for French Oud perfume, styled with natural lighting, textured stones, and gold accents to capture the luxurious scent profile.',
    tags: ['Perfume Shoot', 'Luxury Branding', 'Product Styling', 'Natural Lighting']
  },
  {
    id: 24,
    title: 'ZABABI FRAGRANCE',
    category: 'Product Photography',
    image: `${WEB}/Product shoot/zababi (1).jpg`,
    year: '2026',
    description: 'Exquisite commercial photography for Zababi fragrance, utilising dramatic shadows and dynamic composition to isolate the golden bottle and emphasize its fine details.',
    tags: ['Commercial Photography', 'Lighting Design', 'Perfume', 'Composition']
  },
  {
    id: 25,
    title: 'AIR FRYER CAMPAIGN',
    category: 'Commercial Ads',
    image: `${SEL}/Air fryer.jpg`,
    year: '2026',
    description: 'A dynamic social media advertisement layout for a premium smart air fryer. Features high-contrast visuals, modern font pairings, and engaging call-to-actions.',
    tags: ['Ad Design', 'Social Media', 'Copywriting', 'Product Placement']
  },
  {
    id: 26,
    title: 'MINTS BRAND REEL',
    category: 'Video & Motion',
    image: `${SEL}/post-43.png`,
    video: '/projects/videos-20260623T103749Z-3-001/videos/MINTS_MG_1.mp4',
    year: '2026',
    description: 'An immersive brand experience video designed for Mints Global. Seamlessly blending energetic motion design, typographic layouts, and sleek product reveals.',
    tags: ['Motion Graphics', 'Brand Film', 'Video Editing', 'Typographic Animation']
  },
  {
    id: 27,
    title: 'RRR GYM PROMO',
    category: 'Video & Motion',
    image: `${SEL}/001.jpg`,
    video: '/projects/videos-20260623T103749Z-3-001/videos/Rrr Gym.mp4',
    year: '2026',
    description: 'High-octane commercial promo video shot and edited for RRR GYM. Focuses on cinematic lighting, fast-paced transitions, and high-intensity workout choreography.',
    tags: ['Cinematography', 'Video Editing', 'Fitness Promo', 'Sound Design']
  },
  {
    id: 28,
    title: 'JACKET WINTER COLLECTION',
    category: 'Video & Motion',
    image: `${SEL}/story 3.jpg`,
    video: '/projects/videos-20260623T103749Z-3-001/videos/Jacket N 1.mp4',
    year: '2026',
    description: 'A modern video reel showcasing a winter fashion line. Focusing on high-contrast street style, textile detail, and smooth slow-motion sequences.',
    tags: ['Fashion Film', 'Color Grading', 'Cinematography', 'Textile Details']
  },
  {
    id: 29,
    title: 'OMBRIA PERFUME',
    category: 'Product Photography',
    image: `${POD}/OMBRIA  (3).jpg`,
    year: '2026',
    description: 'Studio catalog product photography of the Ombria fragrance bottle, highlighting clean shapes, clean highlights, and true-to-life glass transparency.',
    tags: ['Studio Lighting', 'Catalog Photography', 'Glass Detail', 'Retouching']
  },
  // SMM Clients
  {
    id: 30,
    title: 'TRIZONE CORPORATE SERVICES',
    category: 'Social Media Marketing',
    image: `${SEL}/post-40.jpg`,
    year: '2025',
    instagramUrl: 'https://www.instagram.com/trizone_business_solutions/',
    instagramHandle: '@trizone_business_solutions',
    followers: '2.2K',
    posts: '171',
    description: 'Full-scale social media management for Trizone Corporate Services — a UAE-based business solutions firm. We crafted a consistent, professional content strategy highlighting their corporate offerings, visa services, and business setup expertise to grow their brand authority on Instagram.',
    tags: ['Social Media Management', 'Content Strategy', 'Corporate Branding', 'Instagram Growth', 'UAE Business']
  },
  {
    id: 31,
    title: 'PEDAL',
    category: 'Social Media Marketing',
    image: `${SEL}/story 4.1.jpg`,
    year: '2025',
    instagramUrl: 'https://www.instagram.com/pedal.cc',
    instagramHandle: '@pedal.cc',
    followers: '10K',
    posts: '1,105',
    description: 'Social media management and content creation for Pedal — a premium cycling brand with 10K+ followers. We developed an energetic, community-driven Instagram presence that speaks to cycling enthusiasts, featuring product showcases, ride culture content, and high-engagement campaign posts.',
    tags: ['Social Media Management', 'Sports & Lifestyle', 'Content Creation', 'Community Building', 'Instagram']
  },
  {
    id: 32,
    title: 'GARDEN VILLE FLOWERS',
    category: 'Social Media Marketing',
    image: `${SEL}/eid-1.jpg`,
    year: '2025',
    instagramUrl: 'https://www.instagram.com/gardenville_uae',
    instagramHandle: '@gardenville_uae',
    followers: '3.8K',
    posts: '397',
    description: 'Ongoing social media management for Garden Ville Flowers in the UAE. We designed and executed a visually stunning content calendar — showcasing floral arrangements, seasonal collections, and bespoke gifting — to grow their audience and drive enquiries on Instagram.',
    tags: ['Social Media Management', 'Floral Brand', 'Visual Content', 'UAE Lifestyle', 'Instagram Growth']
  },
  {
    id: 33,
    title: 'HAYA RESTAURANT',
    category: 'Social Media Marketing',
    image: `${SEL}/cake post 1.jpg`,
    year: '2025',
    instagramUrl: 'https://www.instagram.com/hayarestaurant__',
    instagramHandle: '@hayarestaurant__',
    followers: '11K',
    posts: '98',
    description: 'Social media strategy and content production for Haya Restaurant (مطعم هية) — a popular F&B destination with 11K followers. Our work focused on premium food photography direction, curated reels, and Arabic-English bilingual content that resonated with their diverse UAE audience.',
    tags: ['Social Media Management', 'Food & Beverage', 'Arabic Content', 'Reels Strategy', 'Restaurant Marketing']
  },
]

/* ── Category color map ── */

const categoryColors = {
  'Branding':                '#C9A84C',
  'Product Photography':     '#89B4A0',
  'Web Development':         '#7BAADB',
  'Digital Marketing':       '#D4876B',
  'Posters & Editorial':     '#B784A7',
  'Commercial Ads':          '#E8C46A',
  'Video & Motion':          '#FF7070',
  'Social Media Marketing':  '#E0558A',
  'All':                     '#C9A84C',
}

function TiltCard({ project, onClick, index }) {
  const cardRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const catColor = categoryColors[project.category] || '#C9A84C'
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
    }
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 })
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e) => {
    if (isTouch || prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    if (isTouch || prefersReducedMotion) return
    x.set(0); y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      data-cursor="link"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isTouch || prefersReducedMotion ? 0 : rotateX,
        rotateY: isTouch || prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="work-card relative group w-full aspect-[4/5] overflow-hidden rounded-xl cursor-pointer text-left"
    >
      {/* Image or Video */}
      {project.video ? (
        <div className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-110">
          <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url("${project.image}")` }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: prefersReducedMotion ? 'none' : `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${catColor}18 0%, transparent 55%)`,
        }}
      />

      {/* Scan sweep on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/60 to-transparent group-hover:animate-scan" />
      </div>

      {/* Top-left corner bracket (visible on hover) */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ borderColor: catColor + '80' }} />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ borderColor: catColor + '60' }} />

      {/* Project number */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-beige-300/40 tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Year badge */}
      <div
        className="absolute top-4 right-4 px-2.5 py-1 rounded border font-mono text-[8px] tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-400"
        style={{
          borderColor: catColor + '40',
          color: catColor,
          background: catColor + '0D',
          backdropFilter: 'blur(8px)',
        }}
      >
        {project.year}
      </div>

      {/* Arrow icon */}
      <motion.div
        className="absolute top-14 right-4 w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
        style={{
          borderColor: catColor + '50',
          background: 'rgba(5,13,8,0.7)',
          backdropFilter: 'blur(8px)',
          transform: 'translateZ(40px)',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M6 1l5 5-5 5" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end" style={{ transform: 'translateZ(20px)' }}>
        <div className="translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 mb-2">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-sm border font-mono text-[7px] uppercase tracking-widest"
            style={{
              borderColor: catColor + '40',
              color: catColor,
              background: catColor + '10',
            }}
          >
            {project.category}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl md:text-2xl text-beige-100 leading-tight tracking-tight">
          {project.title}
        </h3>

        {/* SMM Instagram stats strip */}
        {project.instagramUrl && (
          <div className="mt-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              data-cursor="link"
              className="flex items-center gap-1.5 px-2 py-1 rounded border font-mono text-[7px] tracking-wider transition-all duration-300"
              style={{ borderColor: catColor + '40', color: catColor, background: catColor + '08' }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              {project.instagramHandle}
            </a>
            <span className="font-mono text-[7px] text-beige-300/50">{project.followers} followers</span>
          </div>
        )}

        <p className="font-mono text-[8px] text-beige-300/50 tracking-widest uppercase mt-1.5">
          {project.year}
        </p>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const catColor = project ? (categoryColors[project.category] || '#C9A84C') : '#C9A84C'

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(5,13,8,0.95)', backdropFilter: 'blur(28px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-t-3xl md:rounded-2xl"
            style={{
              background: 'rgba(8,20,12,0.92)',
              border: `1px solid ${catColor}25`,
              boxShadow: `0 0 0 1px ${catColor}10, 0 60px 120px -20px rgba(0,0,0,0.9)`,
            }}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 240, damping: 32 }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${catColor}60, transparent)` }}
            />

            {/* Hero image */}
            <div className="relative w-full aspect-[16/8] overflow-hidden rounded-t-2xl">
              {project.video ? (
                <video src={project.video} autoPlay loop muted controls playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-transparent to-transparent pointer-events-none" />

              {/* Close */}
              <button
                onClick={onClose}
                data-cursor="link"
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/15 bg-bg-deep/70 backdrop-blur-sm flex items-center justify-center text-beige-300 hover:text-accent-gold hover:border-accent-gold/40 transition-all font-mono text-sm z-20"
              >
                ✕
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-4 md:bottom-6 left-5 md:left-8 z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-sm border font-mono text-[7px] uppercase tracking-widest"
                    style={{ borderColor: catColor + '40', color: catColor, background: catColor + '12' }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest">{project.year}</span>
                </div>
                <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight drop-shadow-lg">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-10">
              <p className="font-body text-beige-300 text-base leading-loose mb-8 max-w-3xl">
                {project.description}
              </p>

              {/* SMM Stats Panel — shown only for Social Media Marketing projects */}
              {project.instagramUrl && (
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 p-5 rounded-xl"
                  style={{
                    background: catColor + '08',
                    border: `1px solid ${catColor}25`,
                  }}
                >
                  {/* Platform badge */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: catColor + '15', border: `1px solid ${catColor}30` }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={catColor}>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-mono text-[8px] uppercase tracking-widest text-beige-300/50">Instagram</div>
                      <div className="font-mono text-[10px] tracking-wide" style={{ color: catColor }}>{project.instagramHandle}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 sm:ml-4">
                    <div className="text-center">
                      <div className="font-number text-xl font-bold leading-none mb-0.5" style={{ color: catColor }}>{project.followers}</div>
                      <div className="font-mono text-[7px] uppercase tracking-widest text-beige-300/40">Followers</div>
                    </div>
                    <div className="w-px h-8 bg-beige-300/10" />
                    <div className="text-center">
                      <div className="font-number text-xl font-bold leading-none mb-0.5" style={{ color: catColor }}>{project.posts}</div>
                      <div className="font-mono text-[7px] uppercase tracking-widest text-beige-300/40">Posts</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="sm:ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[8px] uppercase tracking-widest transition-all duration-300"
                    style={{
                      border: `1px solid ${catColor}40`,
                      color: catColor,
                      background: catColor + '0D',
                    }}
                  >
                    View Profile ↗
                  </a>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
              <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, ${catColor}50, transparent)` }} />
              <p className="font-mono text-[8px] text-beige-300/30 tracking-widest uppercase text-center">
                Mints Global · Digital Agency, Dubai UAE
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


export default function Work() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSelectedProject(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <section ref={sectionRef} id="work" className="relative z-10 py-28 px-6 md:px-16 lg:px-24 pointer-events-auto overflow-hidden">
        <div className="grid-overlay opacity-30" />

        {/* Background accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="section-label mb-5">Case Studies</div>
              <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-beige-100 leading-[0.92] tracking-tight">
                <div className="overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? {} : { y: '100%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ScrambleText text="Selected" delay={200} duration={900} />
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? {} : { y: '100%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-shimmer"
                  >
                    <ScrambleText text="Works." delay={350} duration={800} />
                  </motion.div>
                </div>
              </h2>
            </div>

            {/* Animated counter badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="stat-card px-6 py-4 flex items-center gap-4 self-start"
            >
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-gold/40" />
              <span className="font-number text-4xl font-bold text-accent-gold leading-none">{filtered.length}</span>
              <div>
                <div className="font-mono text-[8px] text-beige-300/60 uppercase tracking-widest">Projects</div>
                <div className="font-mono text-[7px] text-beige-300/30 uppercase tracking-widest mt-0.5">Shown</div>
              </div>
            </motion.div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-14">
            {categories.map((cat, i) => {
              const col = categoryColors[cat] || '#C9A84C'
              const isActive = activeFilter === cat
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  data-cursor="link"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={isActive
                    ? { background: col, color: '#050D08', borderColor: col, boxShadow: `0 0 20px ${col}40` }
                    : { color: col + 'CC', borderColor: col + '25', background: col + '08' }
                  }
                  className={`px-4 py-2 rounded-sm border font-mono text-[8px] uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm ${
                    isActive ? '' : 'hover:border-opacity-60'
                  }`}
                >
                  {cat}
                </motion.button>
              )
            })}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <TiltCard key={project.id} project={project} onClick={setSelectedProject} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom decoration */}
          <div className="mt-16 flex items-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
            <span className="font-mono text-[8px] text-beige-300/30 tracking-widest uppercase">End of Works</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent-gold/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
