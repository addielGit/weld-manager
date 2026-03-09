"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TIPOS_TUBO,
  TIPOS_AULET,
  TAMANOS_AULET,
  WeldingConfig,
} from "@/lib/types";
import {
  Flame,
  Zap,
  Circle,
  ArrowUpDown,
  Ruler,
  Thermometer,
  Search,
} from "lucide-react";

interface WeldingCalculatorProps {
  findConfig: (
    tipoTubo: string,
    tipoAulet: string,
    tamanoAulet: string,
  ) => WeldingConfig | undefined;
}

export function WeldingCalculator({ findConfig }: WeldingCalculatorProps) {
  const [tipoTubo, setTipoTubo] = useState<string>("");
  const [tipoAulet, setTipoAulet] = useState<string>("");
  const [tamanoAulet, setTamanoAulet] = useState<string>("");
  const [result, setResult] = useState<WeldingConfig | null>(null);

  useEffect(() => {
    if (tipoTubo && tipoAulet && tamanoAulet) {
      const config = findConfig(tipoTubo, tipoAulet, tamanoAulet);
      setResult(config || null);
    } else {
      setResult(null);
    }
  }, [tipoTubo, tipoAulet, tamanoAulet, findConfig]);

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden border-border/50 bg-card shadow-lg">
        <CardHeader className="border-b border-border/30 pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Search className="h-5 w-5 text-primary" />
            </div>
            Seleccionar Parametros Iniciales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div className="space-y-2">
            <Label
              htmlFor="tipoTubo"
              className="text-xs font-semibold text-muted-foreground"
            >
              Tipo de Tubo
            </Label>
            <Select value={tipoTubo} onValueChange={setTipoTubo}>
              <SelectTrigger
                id="tipoTubo"
                className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium"
              >
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
            <Label
              htmlFor="tipoAulet"
              className="text-xs font-semibold text-muted-foreground"
            >
              Tipo de Aulet
            </Label>
            <Select value={tipoAulet} onValueChange={setTipoAulet}>
              <SelectTrigger
                id="tipoAulet"
                className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium"
              >
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
            <Label
              htmlFor="tamanoAulet"
              className="text-xs font-semibold text-muted-foreground"
            >
              Tamano del Aulet
            </Label>
            <Select value={tamanoAulet} onValueChange={setTamanoAulet}>
              <SelectTrigger
                id="tamanoAulet"
                className="h-12 w-full rounded-xl border border-border/50 bg-secondary/50 text-sm font-medium"
              >
                <SelectValue placeholder="Seleccionar tamano" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {TAMANOS_AULET.map((tamano) => (
                  <SelectItem
                    key={tamano}
                    value={tamano}
                    className="rounded-lg"
                  >
                    {tamano}"
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {tipoTubo && tipoAulet && tamanoAulet && (
        <Card className="animate-in fade-in-50 overflow-hidden border-border/50 bg-card shadow-lg duration-200">
          <CardHeader className="border-b border-border/30 bg-primary/10 pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {result ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Temperatura
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.temperatura}°
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Alambre
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.alambre}
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Circle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Hueco
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.tamanoHueco}
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Ruler className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Antorcha
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.distanciaAntorcha}
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <ArrowUpDown className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    R&F Hueco
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.riseFallHueco}
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-secondary/40 p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Flame className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    R&F Soldadura
                  </p>
                  <p className="mt-1 text-xl font-black tabular-nums text-foreground">
                    {result.riseFallSoldadura}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-xl border border-dashed border-border/50 bg-secondary/20 p-8 text-center">
                <Search className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-semibold text-foreground">No encontrado</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Agrega esta configuracion en Gestionar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
