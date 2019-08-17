export default interface APIResponse<T> {
    data?: T,
    status: number;
}
