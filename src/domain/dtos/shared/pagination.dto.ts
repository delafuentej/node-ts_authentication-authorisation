

export class PaginationDto {
    private constructor (
        public readonly page: number,
        public readonly limit: number,
     ){};

    static create (page: number = 1, limit:number = 5): [string?, PaginationDto?] {
       if(isNaN(page) || isNaN(limit)) return ['Page & Limit must be numbers'];
       if(page <=0) return [ 'Page should be greater than 0'];
       if(limit <=0) return ['Limit should be greater than 0'];
       

        return [undefined , new PaginationDto(page, limit)];

    }
}