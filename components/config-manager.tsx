'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { TIPOS_TUBO, TIPOS_AULET, TAMANOS_AULET, WeldingConfig } from '@/lib/types'
import { Plus, Trash2, Pencil, X, Check } from 'lucide-react'

interface ConfigManagerProps {
  configs: WeldingConfig[]
  addConfig: (config: Omit<WeldingConfig, 'id'>) => WeldingConfig
  updateConfig: (id: string, updates: Partial<Omit<WeldingConfig, 'id'>>) => void
  deleteConfig: (id: string) => void
  deleteAllConfigs: () => void
}

export function ConfigManager({
  configs,
  addConfig,
  updateConfig,
  deleteConfig,
  deleteAllConfigs,
}: ConfigManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<WeldingConfig, 'id'>>({
    tipoTubo: '',
    tipoAulet: '',
    tamanoAulet: '',
    alambre: 0,
    temperatura: 0,
    tamanoHueco: 0,
    distanciaAntorcha: 0,
    riseFallHueco: 0,
    riseFallSoldadura: 0,
  })

  const resetForm = () => {
    setFormData({
      tipoTubo: '',
      tipoAulet: '',
      tamanoAulet: '',
      alambre: 0,
      temperatura: 0,
      tamanoHueco: 0,
      distanciaAntorcha: 0,
      riseFallHueco: 0,
      riseFallSoldadura: 0,
    })
  }

  const handleAdd = () => {
    if (formData.tipoTubo && formData.tipoAulet && formData.tamanoAulet) {
      addConfig(formData)
      resetForm()
      setShowAddForm(false)
    }
  }

  const handleEdit = (config: WeldingConfig) => {
    setEditingId(config.id)
    setFormData({
      tipoTubo: config.tipoTubo,
      tipoAulet: config.tipoAulet,
      tamanoAulet: config.tamanoAulet,
      alambre: config.alambre,
      temperatura: config.temperatura,
      tamanoHueco: config.tamanoHueco,
      distanciaAntorcha: config.distanciaAntorcha,
      riseFallHueco: config.riseFallHueco,
      riseFallSoldadura: config.riseFallSoldadura,
    })
  }

  const handleSaveEdit = () => {
    if (editingId) {
      updateConfig(editingId, formData)
      setEditingId(null)
      resetForm()
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    resetForm()
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Configuraciones Guardadas</h2>
          <p className="mt-1 text-sm text-muted-foreground">Administra tus parametros de soldadura</p>
        </div>
        <div className="flex w-full gap-3">
          <Button
            onClick={() => {
              resetForm()
              setShowAddForm(!showAddForm)
            }}
            className="h-12 flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/90 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30"
          >
            <Plus className="mr-2 h-5 w-5" />
            Agregar Nueva
          </Button>
          {configs.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-12 flex-1 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:shadow-xl">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Eliminar Todo
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar eliminacion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion eliminara todas las configuraciones guardadas. Esta accion no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllConfigs} className="rounded-xl">Eliminar Todo</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {showAddForm && (
        <Card className="animate-in slide-in-from-top-2 overflow-hidden border-primary/20 bg-gradient-to-b from-card to-card/90 shadow-xl shadow-primary/10 duration-200">
          <CardHeader className="border-b border-border/30 bg-primary/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              Nueva Configuracion
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <ConfigForm
              formData={formData}
              setFormData={setFormData}
              onSave={handleAdd}
              onCancel={() => {
                setShowAddForm(false)
                resetForm()
              }}
            />
          </CardContent>
        </Card>
      )}

      {configs.length === 0 ? (
        <Card className="border-2 border-dashed border-border/50 bg-gradient-to-b from-card/50 to-transparent">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 shadow-inner">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground">No hay configuraciones</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Agrega tu primera configuracion para comenzar a gestionar tus parametros
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {configs.map((config, index) => (
            <Card 
              key={config.id} 
              className="group overflow-hidden border-border/50 bg-gradient-to-r from-card to-card/90 shadow-md transition-all duration-200 hover:border-primary/20 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {editingId === config.id ? (
                <CardContent className="pt-5">
                  <ConfigForm
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                </CardContent>
              ) : (
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                      <span className="inline-flex shrink-0 rounded-md bg-primary/20 px-2.5 py-1 text-xs font-bold text-primary">
                        {config.tipoTubo}"
                      </span>
                      <span className="inline-flex shrink-0 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                        {config.tipoAulet}
                      </span>
                      <span className="inline-flex shrink-0 rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                        {config.tamanoAulet}"
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(config)}
                        className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="mx-4 max-w-sm rounded-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Eliminar configuracion</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta accion no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-row gap-2">
                            <AlertDialogCancel className="mt-0 flex-1 rounded-xl">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteConfig(config.id)} className="flex-1 rounded-xl">
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 rounded-xl bg-secondary/30 p-3">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Alambre</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.alambre}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Temp</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.temperatura}°</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Hueco</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.tamanoHueco}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Dist</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.distanciaAntorcha}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">R&F H</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.riseFallHueco}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">R&F S</span>
                      <span className="text-sm font-bold tabular-nums text-foreground">{config.riseFallSoldadura}</span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

interface ConfigFormProps {
  formData: Omit<WeldingConfig, 'id'>
  setFormData: React.Dispatch<React.SetStateAction<Omit<WeldingConfig, 'id'>>>
  onSave: () => void
  onCancel: () => void
}

function ConfigForm({ formData, setFormData, onSave, onCancel }: ConfigFormProps) {
  return (
    <div className="space-y-5">
      {/* Seccion de seleccion */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground">Tipo de Tubo</Label>
          <Select
            value={formData.tipoTubo}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoTubo: value }))}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium">
              <SelectValue placeholder="Seleccionar tubo" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {TIPOS_TUBO.map((tipo) => (
                <SelectItem key={tipo} value={tipo} className="rounded-lg">
                  {tipo}"
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground">Tipo de Aulet</Label>
          <Select
            value={formData.tipoAulet}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoAulet: value }))}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {TIPOS_AULET.map((tipo) => (
                <SelectItem key={tipo} value={tipo} className="rounded-lg">
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground">Tamano del Aulet</Label>
          <Select
            value={formData.tamanoAulet}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, tamanoAulet: value }))}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium">
              <SelectValue placeholder="Seleccionar tamano" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {TAMANOS_AULET.map((tamano) => (
                <SelectItem key={tamano} value={tamano} className="rounded-lg">
                  {tamano}"
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Parametros de salida */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parametros de Salida</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Alambre</Label>
            <Input
              type="number"
              placeholder="ej: 26"
              value={formData.alambre || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, alambre: parseInt(e.target.value) || 0 }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Temperatura</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="ej: 450.5"
              value={formData.temperatura || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, temperatura: parseFloat(e.target.value) || 0 }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Tamano Hueco</Label>
            <Input
              type="number"
              placeholder="ej: 12"
              value={formData.tamanoHueco || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tamanoHueco: parseInt(e.target.value) || 0 }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Dist. Antorcha</Label>
            <Input
              type="number"
              placeholder="ej: 8"
              value={formData.distanciaAntorcha || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  distanciaAntorcha: parseInt(e.target.value) || 0,
                }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">R&F Hueco</Label>
            <Input
              type="number"
              placeholder="ej: 5"
              value={formData.riseFallHueco || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, riseFallHueco: parseInt(e.target.value) || 0 }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">R&F Soldadura</Label>
            <Input
              type="number"
              placeholder="ej: 3"
              value={formData.riseFallSoldadura || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  riseFallSoldadura: parseInt(e.target.value) || 0,
                }))
              }
              className="h-11 rounded-xl border border-border/50 bg-secondary/50 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onCancel} className="h-12 flex-1 rounded-xl border-border/50 font-semibold">
          Cancelar
        </Button>
        <Button
          onClick={onSave}
          disabled={!formData.tipoTubo || !formData.tipoAulet || !formData.tamanoAulet}
          className="h-12 flex-1 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25"
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
