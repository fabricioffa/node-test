exports.putVerifier = (body) => {
  const schema = Joi.object({
      name: Joi.string().min(3).max(50),
      price: Joi.string().min(5).max(20),
  });

  return schema.validate(body);
}
