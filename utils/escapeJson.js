const escapeJson = (json) =>
    JSON.stringify(json).replace(/\\/g, '\\\\').replace(/'/g, "''");
export default escapeJson