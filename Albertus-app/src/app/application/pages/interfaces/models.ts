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
}

export type UpdateBody = {
    applicationID: string,
    nameApplication: string,
    description: string
}