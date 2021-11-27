export interface Filter<T, K = null>{
    filter(ent: T, aux : K);
}