// export type Block = {
//     hash: string,
//     timeStamp: string
// }

export type Block = {
    timeStamp: string,
    hash: string,
    year: string,
    month: string,
    day: string;
    hasOverCharge: boolean;
}

export type eventMap = {
    type: string,
    data: Object;    
}

export type datablock = {
    applicationId: string,
    data: Object;
    hash: string;
    timeStamp:string;
    nonce: number;
    hasOverCharge: boolean;
    previousHash: string;    
}