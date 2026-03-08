'use client'

import { useState } from 'react'
import { useWeldingStorage } from '@/hooks/use-welding-storage'
import { Settings, Flame, Search, ChevronRight, Thermometer, Zap, Circle, Ruler } from 'lucide-react'
import { WeldingCalculator } from '@/components/welding-calculator'
import { ConfigManager } from '@/components/config-manager'
import Image from 'next/image'

type View = 'home' | 'consultar' | 'gestionar'

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home')
  const {
    configs,
    isLoaded,
    addConfig,
    updateConfig,
    deleteConfig,
    deleteAllConfigs,
    findConfig,
  } = useWeldingStorage()

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Cargando...</p>
        </div>
      </main>
    )
  }

  // Vista de Consultar
  if (currentView === 'consultar') {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-20 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground">Consultar Parametros</h1>
              <p className="text-xs text-muted-foreground">Selecciona tubo y aulet</p>
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
          <WeldingCalculator findConfig={findConfig} />
        </div>
      </main>
    )
  }

  // Vista de Gestionar
  if (currentView === 'gestionar') {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-20 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground">Gestionar Parametros</h1>
              <p className="text-xs text-muted-foreground">{configs.length} configuraciones</p>
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
          <ConfigManager
            configs={configs}
            addConfig={addConfig}
            updateConfig={updateConfig}
            deleteConfig={deleteConfig}
            deleteAllConfigs={deleteAllConfigs}
          />
        </div>
      </main>
    )
  }

  // Vista Home / Dashboard
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">WeldManager</h1>
              <p className="text-xs text-muted-foreground">Parametros de Soldadura</p>
            </div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-5">
        {/* Hero con imagen */}
        <div className="relative mb-5 overflow-hidden rounded-2xl">
          <Image
            src="/welding-hero.jpg"
            alt="Maquina de soldar en accion"
            width={400}
            height={180}
            className="h-44 w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              Prototipo v1.0
            </p>
            <h2 className="text-xl font-bold leading-tight text-white">
              Consulta rapida<br />de parametros
            </h2>
            <p className="mt-1 text-xs text-white/70">
              Tubo - Tipo - Aulet → Configuracion
            </p>
          </div>
        </div>

        {/* Botones de navegacion principales */}
        <div className="mb-5 space-y-3">
          <button
            onClick={() => setCurrentView('consultar')}
            className="flex w-full items-center justify-between rounded-xl bg-primary p-4 text-left shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Consultar Parametros</p>
                <p className="text-xs text-primary-foreground/70">Selecciona tubo y aulet</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-primary-foreground" />
          </button>

          <button
            onClick={() => setCurrentView('gestionar')}
            className="flex w-full items-center justify-between rounded-xl bg-card border border-border/50 p-4 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Gestionar Parametros</p>
                <p className="text-xs text-muted-foreground">{configs.length} combinacion{configs.length !== 1 ? 'es' : ''} guardada{configs.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Grid de estadisticas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
              <Thermometer className="h-5 w-5 text-orange-500" />
            </div>
            <p className="font-semibold text-foreground">Temperatura</p>
            <p className="text-xs text-muted-foreground">Rango optimo por combinacion</p>
          </div>

          <div className="rounded-xl bg-card border border-border/50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Alambre</p>
            <p className="text-xs text-muted-foreground">Valor numerico recomendado</p>
          </div>

          <div className="rounded-xl bg-card border border-border/50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/20">
              <Circle className="h-5 w-5 text-rose-500" />
            </div>
            <p className="font-semibold text-foreground">Hueco</p>
            <p className="text-xs text-muted-foreground">Tamano exacto a abrir</p>
          </div>

          <div className="rounded-xl bg-card border border-border/50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Ruler className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Antorcha</p>
            <p className="text-xs text-muted-foreground">Distancia de la boquilla</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-3">
        <p className="text-center text-xs text-muted-foreground">
          WeldManager - Parametros de Soldadura para Aulets
        </p>
      </footer>
    </main>
  )
}
