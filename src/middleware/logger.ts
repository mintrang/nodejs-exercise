const logger = (req, res, next) => {
  req.test = 'trang2'
  next()
}

export default logger