{
    "_id": ObjectId(),
        "fecha": {
        "type": Date,
            "default": Date.now
    },
    "contenido": {
        "type": String,
            "required": true
    },
    "metadatos": {
        "palabras": Number
    }
}