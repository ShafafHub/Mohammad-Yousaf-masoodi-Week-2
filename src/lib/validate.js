function validateProduct(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return ["Request body must be a JSON object."];
  }

  if (typeof data.name !== "string" || data.name.trim().length<2) {
    errors.push("name is required and must be a non-empty string and should have more than one charecters .");
  }

  if (typeof data.price !== "number" || Number.isNaN(data.price) || !Number.isFinite(data.price)) {
    errors.push("price is required and must be a valid number.");
  } else if (data.price < 0) {
    errors.push("price must be greater than or equal to 0.");
  }

  return errors;
}

module.exports = { validateProduct };
