const Diario = require('../models/Diario');

/**
 * Servicio para manejar la lógica de negocio de Diario
 */
class DiarioService {
    /**
     * Crear un nuevo registro
     */
    async createDiario(data) {
        const diario = new Diario(data);
        return await diario.save();
    }

    /**
     * Obtener todos los registros
     */
    async getAllDiarios() {
        return await Diario.find().sort({ fecha: -1 });
    }

    /**
     * Obtener un registro por ID
     */
    async getDiarioById(id) {
        return await Diario.findById(id);
    }

    /**
     * Actualizar un registro
     */
    async updateDiario(id, data) {
        // Usamos findOneAndUpdate para que se ejecuten los hooks/middlewares si fuera necesario
        // o simplemente actualizamos y guardamos
        const diario = await Diario.findById(id);
        if (!diario) return null;

        if (data.contenido) diario.contenido = data.contenido;
        if (data.titulo) diario.titulo = data.titulo;
        if (data.fecha) diario.fecha = data.fecha;
        
        return await diario.save();
    }

    /**
     * Eliminar un registro
     */
    async deleteDiario(id) {
        return await Diario.findByIdAndDelete(id);
    }
}

module.exports = new DiarioService();
