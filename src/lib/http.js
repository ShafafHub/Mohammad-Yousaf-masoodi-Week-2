function sendJson(res, statusCode, data) {
  const json = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(json)
  });
  res.end(json);
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) return resolve(null);
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

module.exports = { sendJson, sendError, parseJsonBody };
