export interface WeldingConfig {
  id: string;
  tipoTubo: string;
  tipoAulet: string;
  tamanoAulet: string;
  alambre: number;
  temperatura: number;
  tamanoHueco: number;
  distanciaAntorcha: number;
  riseFallHueco: number;
  riseFallSoldadura: number;
}

export const TIPOS_TUBO = [
  "1/4",
  "1/2",
  "2",
  "2.5",
  "3",
  "4",
  "6",
  "8",
] as const;
export const TIPOS_AULET = ["POL", "GRV"] as const;
export const TAMANOS_AULET = ["1/2", "3/4", "1"] as const;

export type TipoTubo = (typeof TIPOS_TUBO)[number];
export type TipoAulet = (typeof TIPOS_AULET)[number];
export type TamanoAulet = (typeof TAMANOS_AULET)[number];

// Sample configurations for prototype
export const SAMPLE_CONFIGS: Omit<WeldingConfig, "id">[] = [
  {
    tipoTubo: "1/2",
    tipoAulet: "POL",
    tamanoAulet: "1/2",
    alambre: 26,
    temperatura: 450.5,
    tamanoHueco: 8,
    distanciaAntorcha: 15,
    riseFallHueco: 3,
    riseFallSoldadura: 5,
  },
  {
    tipoTubo: "2",
    tipoAulet: "GRV",
    tamanoAulet: "3/4",
    alambre: 28,
    temperatura: 475.0,
    tamanoHueco: 10,
    distanciaAntorcha: 18,
    riseFallHueco: 4,
    riseFallSoldadura: 6,
  },
  {
    tipoTubo: "4",
    tipoAulet: "POL",
    tamanoAulet: "1",
    alambre: 30,
    temperatura: 500.5,
    tamanoHueco: 12,
    distanciaAntorcha: 20,
    riseFallHueco: 5,
    riseFallSoldadura: 7,
  },
];
