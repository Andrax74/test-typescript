export interface IClienti {
    codfid : string
    nome : string
    bollini : number
    data? : string
    deleteCli : () => void
}