const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    // case "ValidationError":
    //   res.status(400).json({ message: err.message });
    //   break;
    case "UniqueConstraintError":
      res.status(400).json({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "invalidEmailPassword":
      res.status(401).json({ message: err.message });
      break;
    // case "Unauthorized":
    //   res.status(403).json({ message: err.message });
    //   break;
    case "badRequest":
      res.status(400).json({ message: err.message });
      break;
    case "notFound":
      res.status(404).json({ message: err.message });
      break;
    case "BadRequest":
      res.status(400).json({ message: err.message });
      break;
    case "BSONTypeError":
      res.status(404).json({ message: "Invalid Id" });
      break;
    case "required":
      res.status(400).json({ message: "data must be filled" });
      break;
    // default:
    // res.status(500).json({ message: err.message || "Internal server error" });
  }
};

module.exports = errorHandler;
