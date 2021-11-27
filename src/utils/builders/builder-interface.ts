export interface Builder<T, Q, K = null>{
    build(createDto: T, aux : K) : Q;
}