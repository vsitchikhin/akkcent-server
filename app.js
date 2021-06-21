const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const app = express();
const validator = require('validator').default;
const cors = require('cors');
const { createToken, verifyToken, createPasswordHash, comparePassword } = require('./auth-service')
const path = require('path')

const port = process.env.PORT || 3000;


const sequelize = new Sequelize('akkcent', 'user', '123123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});


class Taste extends Model {}
class Admin extends Model {}

function stringType() {
    return {
        type: DataTypes.STRING,
        allowNull: false,
    }
}


function boolType() {
    return {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}


Taste.init({
    email:stringType(),
    name: stringType(),
    dataProcessing: boolType(),
    mailing: boolType(),
}, {
    modelName: 'Taste',
    sequelize,
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

    app.post('/api/login', async function  (req, res) {
        const userFormDB = await Admin.findOne({where: {name: req.body.name}});

        if (comparePassword(req.body.password, userFormDB.password)) {
            const token = createToken(userFormDB);
            res.send({
                token,
            })
        } else {
            req.status(403).send({
                message: 'Wrong password'
            })
        }
    })


    app.get('/api/taste', verifyToken, async function(req, res) {
        const orders = await Taste.findAll();
        res.send(orders);
    })

    // app.post('/api/taste', async function (req, res) {
    //     const tasteInfo = req.body;
    //     let validationError = [];
    //     if (!validator.isMobilePhone(tasteInfo.phone.replace(/\D/g, ''), ['ru-RU']))
    //         validationError.push('Wrong phone number')
    //     if (!validator.isLength(tasteInfo.fio, { min: 4, max: 80 }))
    //         validationError.push('Wrong fio')
    //     if (!validator.isIn(tasteInfo.country, ['Turkey', 'Italy', 'Greece']))
    //         validationError.push('Wrong country')
    //     if (!validator.isLength(tasteInfo.info, { min: 0, max: 2000 }))
    //         validationError.push('Wrong info')
    //
    //     if (validationError.length) {
    //         res.status(400).send({ messages: validationError })
    //     } else {
    //         const tasteFromDB = await Taste.create(tasteInfo)
    //         res.send(tasteFromDB)
    //     }
    // })

    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(port, function() {
        console.log('Server started at http://localhost:' + port)
    })
}