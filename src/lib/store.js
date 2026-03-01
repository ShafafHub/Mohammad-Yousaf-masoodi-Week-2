const { readFileSync } = require("node:fs");
const path = require("node:path");

const DATA_PATH = path.join(__dirname, "..", "..", "data", "products.json");
const raw = readFileSync(DATA_PATH, "utf8");
const products = JSON.parse(raw);

function listProducts({ search, limit, offset } = {}) {
  let result = [...products];

  if (search) {
    if (typeof search === "string" && search.trim()!=="") {
      const term = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }
  }
 
  const parseOffSet=Number(offset);
  const safeOffSet=Number.isFinite(parseOffSet) && parseOffSet >= 0
  ? parseOffSet : 0 ;

   const parseLimit=Number(limit);
  const safeLimit=Number.isFinite(parseLimit) && parseLimit > 0
  ? parseLimit : undefined ;
  const start =safeOffSet;

  const end = safeLimit !== undefined ? safeOffSet + safeLimit 
    : undefined;

  return result.slice(start, end);
}

function findById(id) {
  return products.find((p) => p.id === id) || null;
}

function createProduct(data) {
  const nextId = `p${Date.now()}`;
  const product = { id: nextId, ...data };
  products.push(product);
  return product;
}

function updateProduct(id, data) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated = { ...products[index], ...data, id };
  products[index] = updated;
  return updated;
}

function deleteProduct(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

module.exports = {
  listProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
