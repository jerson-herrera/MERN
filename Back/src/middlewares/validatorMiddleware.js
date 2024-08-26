export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); //Lo compara con el req.body
        next();
    } catch (error) {
        return res.status(400).json({error: error.errors.map((error) => error.message)}); //Permite devolver los menssages de error solamente
    }
};
