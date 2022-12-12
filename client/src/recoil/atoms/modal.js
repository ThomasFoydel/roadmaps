import { atom } from 'recoil'

export const modalState = atom({
  key: 'modal',
  default: { type: null, sagaId: null, roadmapId: null }
})
