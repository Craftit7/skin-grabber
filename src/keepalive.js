const app = require('express')();

module.exports.keepAlive = () => {
    app.get('/' , (_, res) => res.send("skin grabber keep alive"))

    app.listen(3000, () =>  console.log(`[EXPRESS] keep alive started`))
}