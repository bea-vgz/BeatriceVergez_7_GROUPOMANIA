const { body, validationResult } = require('express-validator');

const passwordRules = () => {
    return [
        body('password')
            .exists() .withMessage("Le mot de passe est obligatoire")
            .isLength({ min: 8 }) .withMessage('Le mot de passe doit contenir au moins 8 caractères !')
            .matches('[0-9]') .withMessage('Le mot de passe doit contenir au moins un chiffre')
            .matches('[A-Z]') .withMessage('Le mot de passe doit contenir au moins une majuscules'),
    ]
}
const validatePassword = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    next();
};

module.exports = {
    passwordRules,
    validatePassword
}