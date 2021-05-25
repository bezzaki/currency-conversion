var objectId = require('mongodb').ObjectID;
const Curren = require('../model/Currency');
const axios = require('axios');
const { db } = require('../model/Currency');
// ------------------------------------------------------------------------------------------
//ADD ALL 170 CURRENCY FROM FIXER.IO TO MONGO DB 
const currency_post = async (req,res) => {
    const ACCESS_KEY = '5447a510952be701f869359fb4a75f38';
    axios.get(`http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}`).then(response => {
    let data = response.data;
    let objet = data.rates;
    let base = data.base
    let to =[];
    let ObjTab = []
    for (const property in objet) {
        to.push(property);
        ObjTab.push(objet[property]);
    }
    for(i=0;i<to.length;i++){
        const currency = new Curren ({
            from: base,
            to: to[i],
            val: ObjTab[i]
        })
        const result = currency.save();
        console.log(currency);
    }
});  
} 
//-------------------------------------------------------------------------------------------
// ADD CURRENCY WITH MODAL ADD TO MONGO DB 
const currency_postAdd = async (req,res) => {
    // let id = result[0]._id;
    let to = req.body.addTo;
    let val = req.body.addValue;
    const currenc = await Curren.find({to: to});
    if(currenc == true){
        res.status(404).send("This Currency is Already Exist");
    } else {
        const currency = new Curren({
            from: "EUR",
            to: to,
            val: val
        })
        const result = await currency.save()
        res.send(currency);
    }  
}
//-------------------------------------------------------------------------------------------
// Modify CURRENCY WITH MODAL Modify TO MONGO DB 
const currency_modify = async (req,res) => {
    let item = {};
    item.from = "EUR";
    item.to = req.body.modTo;
    item.val = req.body.modValue;
    let id = req.body.id
    console.log(id);
    const results = await db.collection('currencies').updateOne({"_id": objectId(id)},{$set: item});
    res.send(results);
}
//-------------------------------------------------------------------------------------------
// Delete CURRENCY WITH MODAL Delete TO MONGO DB 
const currency_delete = async (req,res) => {
    let id = req.body.id
    console.log(id);
    const results = await db.collection('currencies').deleteOne({"_id": objectId(id)}).then(()=>{
        res.send("1 item Deleted")
    }).catch((err) => {
        res.send(err);
    });
}
//-------------------------------------------------------------------------------------------
// UPDATE CURRENCY IN MONGO DB 
const currency_put = async (req,res) => {
    const ACCESS_KEY = '5447a510952be701f869359fb4a75f38';
    axios.get(`http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}`).then(async response => {
    let data = response.data;
    let objet = data.rates;
    let base = data.base;
    let to =[];
    let ObjTab = []
    for (const property in objet) {
        to.push(property);
        ObjTab.push(objet[property]);
    }
    for(i=0;i<to.length;i++){
        const currency = await Curren.find({to:to[i]});
        let item = {
            from: base,
            to: to[i],
            val: ObjTab[i]
        }
        if(currency[0] === undefined) {
            const currenc = new Curren(item);
            await currenc.save();
        } else {
            let id = currency[0]['_id'];
            await db.collection('currencies').updateOne({"_id": objectId(id)},{$set: item})
            .then((respond)=>{
                res.send(respond.data)
            }).catch((err)=>{
                res.send(err);
            })
            
        }
    }
}).catch((err) => {
    console.log(err);
}); 
}
//-------------------------------------------------------------------------------------------
//GET CURRENCY FROM MONGO DB WITH SOM PARAMS LIKE FROM AND TO AND DONNE VALUE 
const currency_get = async (req,res)=>{
    let from = req.query.from;
    let value = req.query.value;
    let to = req.query.to;
    // const resultFrom = await Curren.find();
    const EtoFrom = await Curren.find({to: from});
    const EtoTo = await Curren.find({to: to});
    let To = EtoTo[0].val
    let From = EtoFrom[0].val
    let results = value * To / From;
    let item = {
        from: from,
        to: to,
        value: results
    }
    res.send(item);
};
//-------------------------------------------------------------------------------------------------
//GET ALL DATA FROM OUR DATABASE 
const currency_getAll = async (req,res)=>{
    currenc = await Curren.find();
    res.send(currenc)
};
//---------------------------------------------
module.exports = {
    currency_post,
    currency_put,
    currency_get,
    currency_getAll,
    currency_postAdd,
    currency_modify,
    currency_delete
    
}
