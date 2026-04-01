const diarioService = require('../services/diarioService');

/**
 * Controlador para manejar las peticiones HTTP de Diario
 */
const diarioController = {
    /**
     * @route   POST /api/diario
     * @desc    Crear un nuevo registro en el diario
     */
    create: async (req, res) => {
        try {
            const nuevoDiario = await diarioService.createDiario(req.body);
            res.status(201).json({
                success: true,
                data: nuevoDiario
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    /**
     * @route   GET /api/diario
     * @desc    Obtener todos los registros
     */
    getAll: async (req, res) => {
        try {
            const registros = await diarioService.getAllDiarios();
            res.status(200).json({
                success: true,
                count: registros.length,
                data: registros
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    /**
     * @route   GET /api/diario/:id
     * @desc    Obtener un registro por ID
     */
    getById: async (req, res) => {
        try {
            const registro = await diarioService.getDiarioById(req.params.id);
            if (!registro) {
                return res.status(404).json({
                    success: false,
                    message: 'Registro no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                data: registro
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    /**
     * @route   PUT /api/diario/:id
     * @desc    Actualizar un registro
     */
    update: async (req, res) => {
        try {
            const actualizado = await diarioService.updateDiario(req.params.id, req.body);
            if (!actualizado) {
                return res.status(404).json({
                    success: false,
                    message: 'Registro no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                data: actualizado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    /**
     * @route   DELETE /api/diario/:id
     * @desc    Eliminar un registro
     */
    delete: async (req, res) => {
        try {
            const borrado = await diarioService.deleteDiario(req.params.id);
            if (!borrado) {
                return res.status(404).json({
                    success: false,
                    message: 'Registro no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Registro eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = diarioController;
