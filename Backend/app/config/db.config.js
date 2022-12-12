module.exports = {
    url: "mongodb+srv://"+
    process.env.USERNAME+
    ":"
    +process.env.PASSWORD+
    "@"
    +process.env.HOST+
    "/"
    +process.env.DATABASE
  };
