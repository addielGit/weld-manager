'use client'

import { useState, useEffect, useCallback } from 'react'
import { WeldingConfig, SAMPLE_CONFIGS } from '@/lib/types'

const STORAGE_KEY = 'welding-configs'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export function useWeldingStorage() {
  const [configs, setConfigs] = useState<WeldingConfig[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load configs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setConfigs(parsed)
      } else {
        // Initialize with sample configs if no data exists
        const initialConfigs = SAMPLE_CONFIGS.map((config) => ({
          ...config,
          id: generateId(),
        }))
        setConfigs(initialConfigs)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialConfigs))
      }
    } catch (error) {
      console.error('Error loading configs:', error)
      const initialConfigs = SAMPLE_CONFIGS.map((config) => ({
        ...config,
        id: generateId(),
      }))
      setConfigs(initialConfigs)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever configs change
  const saveConfigs = useCallback((newConfigs: WeldingConfig[]) => {
    setConfigs(newConfigs)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfigs))
    } catch (error) {
      console.error('Error saving configs:', error)
    }
  }, [])

  const addConfig = useCallback(
    (config: Omit<WeldingConfig, 'id'>) => {
      const newConfig: WeldingConfig = {
        ...config,
        id: generateId(),
      }
      saveConfigs([...configs, newConfig])
      return newConfig
    },
    [configs, saveConfigs]
  )

  const updateConfig = useCallback(
    (id: string, updates: Partial<Omit<WeldingConfig, 'id'>>) => {
      const updated = configs.map((config) =>
        config.id === id ? { ...config, ...updates } : config
      )
      saveConfigs(updated)
    },
    [configs, saveConfigs]
  )

  const deleteConfig = useCallback(
    (id: string) => {
      const filtered = configs.filter((config) => config.id !== id)
      saveConfigs(filtered)
    },
    [configs, saveConfigs]
  )

  const deleteAllConfigs = useCallback(() => {
    saveConfigs([])
  }, [saveConfigs])

  const findConfig = useCallback(
    (tipoTubo: string, tipoAulet: string, tamanoAulet: string) => {
      return configs.find(
        (config) =>
          config.tipoTubo === tipoTubo &&
          config.tipoAulet === tipoAulet &&
          config.tamanoAulet === tamanoAulet
      )
    },
    [configs]
  )

  return {
    configs,
    isLoaded,
    addConfig,
    updateConfig,
    deleteConfig,
    deleteAllConfigs,
    findConfig,
  }
}
