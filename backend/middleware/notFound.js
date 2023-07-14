const notFound = (req, res, next) => {
    res.status(404)
    throw new Error(`${req.originalUrl} not found`)
}

module.exports = notFound