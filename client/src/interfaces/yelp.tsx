export interface YelpQuery {
    location?: string,
    term: string,
    longitude?: number,
    latitude?: number,
    limit?: number,
    offset?: number,
}