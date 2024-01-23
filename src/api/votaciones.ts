import data from "../data/votaciones.json";

export interface FilterParams {
  deparment?: string;
  minucipality?: string;
  votingCenter?: string;
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function find(params: FilterParams = {}) {
  const entries = Object.entries(params) as Entries<FilterParams>;

  if (entries.length === 0) return data;

  return data.filter((item) => {
    let condition = true;

    for (const entry of entries) {
      if (!entry || !entry[1]) continue

      const value = entry[1].toUpperCase()

      switch (entry[0]) {
        case "deparment":
          condition = condition && item.departamento === value;
          break;

        case "minucipality":
          condition = condition && item.municipio === value;
          break;

        default:
          condition = condition && item.centro_de_votacion.includes(value);
          break;
      }
    }

    return condition;
  });
}
