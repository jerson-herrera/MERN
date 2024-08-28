export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); //Lo compara con el req.body
    next();
  } catch (error) {
    console.log(error.errors)
    return res
        .status(400)
        .json(error.errors.map((error) => error.message)); //Permite devolver los menssages de error solamente
  }
};
