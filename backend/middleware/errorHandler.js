const errorHandler = async(err, req, res, next) => {
  console.log("Called")
    const errorCode = res.statusCode ?? 500
    res.status(errorCode)
    res.send({
        message: err.message
      });
}

module.exports = errorHandler