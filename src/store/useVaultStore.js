import { create } from 'zustand'

export const useVaultStore = create((set) => ({
  level: 'AUTH', // 'AUTH', 'CASE_FILES', 'LIVE_OPS', 'SIGNAL_LOG', 'UPLINK'
  depth: 0,
  sectorId: 'SEC-00',
  accessGranted: false,
  cameraProgress: 0,
  scrollVelocity: 0,
  activeBay: null, // Track focused console bay in Level 02
  setLevel: (level) => set({ level }),
  setDepth: (depth) => set({ depth }),
  setSectorId: (sectorId) => set({ sectorId }),
  grantAccess: () => set({ accessGranted: true }),
  setCameraProgress: (progress) => set({ cameraProgress: progress }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
  setActiveBay: (bayId) => set({ activeBay: bayId }),
}))
