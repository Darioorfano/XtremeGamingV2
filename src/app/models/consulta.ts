import { Respuesta } from "./respuesta";

export interface Consulta {
  texto: string;
  fechaHora: Date;
  respuestas: Respuesta[]
}
