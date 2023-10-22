interface Respuesta{
    idUsuario:string,
    name:string,
    content:string,
    fecha:Date,
    photoUrl:string,
    rol:string
}
export interface QuestionDTO{
    idQuestion:string,
    idUsuario: string,
    idProducto: string,
    content:string,
    respuesta:Respuesta,
    name:string,
    photoUrl:string,
    fecha:Date,
    respondido:boolean,
    rol:string
}