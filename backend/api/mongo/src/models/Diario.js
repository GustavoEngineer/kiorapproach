const mongoose = require('mongoose');

const diarioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    titulo: {
        type: String,
        default: ""
    },
    numPagina: {
        type: Number,
        default: 1
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    metadatos: {
        palabras: {
            type: Number,
            default: 0
        },
        lineas: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'diario'
});

// Middleware para contar métricas antes de guardar
diarioSchema.pre('save', function () {
    if (this.contenido) {
        // Solo recalculamos palabras siempre, las líneas las respetamos si vienen del frontend (visuales)
        this.metadatos.palabras = this.contenido.trim() ? this.contenido.trim().split(/\s+/).length : 0;
        
        // Si no se proporcionaron líneas (o son 0), usamos el conteo básico por \n como fallback
        if (!this.metadatos.lineas || this.metadatos.lineas === 0) {
            this.metadatos.lineas = this.contenido.split('\n').length;
        }
    }
});

const Diario = mongoose.model('Diario', diarioSchema);

module.exports = Diario;
