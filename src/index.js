const http = require("node:http");
const { sendJson, sendError, parseJsonBody } = require("./lib/http");
const {
  listProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./lib/store");
const { validateProduct } = require("./lib/validate");

function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  const method = req.method.toUpperCase();

  // ---- health ----
  if (method === "GET" && pathname === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  // ---- /products ----
  if (pathname === "/products") {
    if (method === "GET") {
      const search = url.searchParams.get("search");
      const limit = url.searchParams.get("limit");
      const offset = url.searchParams.get("offset");
      const items = listProducts({ search, limit, offset });
      return sendJson(res, 200, items);
    }

    if (method === "POST") {
      return parseJsonBody(req)
        .then((body) => {
          const errors = validateProduct(body);
          if (errors.length) return sendJson(res, 400, { errors });

          const product = createProduct(body);
          return sendJson(res, 201, product);
        })
        .catch(() =>
          sendError(
            res,
            400,
            "Invalid JSON. Make sure request body is valid JSON and Content-Type is application/json.",
          ),
        );
    }

    // route exists, but method not allowed
    return sendError(res, 405, `Method ${method} not allowed for ${pathname}.`);
  }

  // ---- /products/:id ----
  if (pathname.startsWith("/products/")) {
    const id = pathname.split("/")[2];

    if (method === "GET") {
      const product = findById(id);
      if (!product)
        return sendError(res, 404, `Product with id "${id}" not found.`);
      return sendJson(res, 200, product);
    }

    if (method === "PUT") {
      return parseJsonBody(req)
        .then((body) => {
          const errors = validateProduct(body);
          if (errors.length) return sendJson(res, 400, { errors });

          const updated = updateProduct(id, body);
          if (!updated)
            return sendError(res, 404, `Product with id "${id}" not found.`);
          return sendJson(res, 200, updated);
        })
        .catch(() =>
          sendError(
            res,
            400,
            "Invalid JSON. Make sure request body is valid JSON and Content-Type is application/json.",
          ),
        );
    }

    if (method === "DELETE") {
      const ok = deleteProduct(id);
      if (!ok) return sendError(res, 404, `Product with id "${id}" not found.`);
      res.writeHead(204);
      return res.end();
    }

    // route exists, but method not allowed
    return sendError(res, 405, `Method ${method} not allowed for ${pathname}.`);
  }

  // ---- fallback: route not found ----
  return sendError(res, 404, `Cannot ${method} ${pathname}.`);
}

function createServer() {
  return http.createServer(handler);
}

function startServer(port = 3000) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`Products service running on http://localhost:${port}`);
  });
  return server;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  startServer(port);
}

module.exports = { createServer, startServer };
