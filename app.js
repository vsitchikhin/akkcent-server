// @ts-check
const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const app = express();
const cors = require('cors');
const path = require('path')

const port = process.env.PORT || 3000;


const sequelize = new Sequelize('m45vh03qro21e6rc', 'drj8ke4c303wdzba', 'f8t0dn8iwrof5ufk', {
    host: 'lmc8ixkebgaq22lo.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306 || 3307
});


class Taste extends Model {}

function stringType() {
    return {
        type: DataTypes.STRING,
        allowNull: false
    }
}


function boolType() {
    return {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}


Taste.init({
    email:stringType(),
    name: stringType(),
    dataProcessing: boolType(),
    mailing: boolType()
}, {
    modelName: 'Taste',
    sequelize
});


start();


async function start() {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Success!');
        startApp();
    } catch (error) {
        console.error(error);
    }
}


function startApp() {
    app.use(cors());
    app.use(express.json());


    app.get('/api/taste', async function(req, res) {
        const orders = await Taste.findAll();
        res.send(orders);
    })

    app.post('/api/taste', async function (req, res) {
        const tasteInfo = req.body;
        const tasteFromDB = await Taste.create(tasteInfo);
        res.send(tasteFromDB);

    })

    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(port, function() {
        console.log('Server started at http://localhost:' + port)
    })
}