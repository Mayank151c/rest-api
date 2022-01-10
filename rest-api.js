const express = require("express");
const app = express();

const friendsList = [
        {idn: 1, name: "himanshu", place: "itarsi" },
        {idn: 2, name: "aman"    , place: "itarsi" },
        {idn: 3, name: "mohit"   , place: "ranchi" },
        {idn: 4, name: "shubh"   , place: "banaras"},
        {idn: 5, name: "nanu"    , place: "itarsi" },
        {idn: 6, name: "sourabh" , place: "bihar"  },
        {idn: 7, name: "manish"  , place: "bihar"  },
        {idn: 8, name: "mayank"  , place: "itarsi" },
        {idn: 9, name: "mayank"  , place: "bhopal" },
];
var IDN = 10;

app.get('/', (req,res)=> {
    console.log("All is well");
    res.status(200).send('<h1>Program code is perfectly fine.</h1>');
})

app.get('/list/all', (req,res)=> {
    res.send(friendsList);
})


// Determined idn to find
app.get('/list/friends/:idn', (req,res)=> {
    let friend = friendsList.find(f=> f.idn === parseInt(req.params.idn));
    console.log(req.params.idn);
    res.send(friend);
})


// Query string for filtering
app.get('/list/friends', (req,res)=> { 
    if(req.query.name && req.query.place) {
        let friends = friendsList.filter(f=> f.place === req.query.place && f.name === req.query.name ); 
        console.log(req.query.place);
        console.log(req.query.name);
        res.send(friends);
    }
    else if(req.query.name) {
        let friends = friendsList.filter(f=> f.name === req.query.name ); 
        console.log(req.query.name);
        res.send(friends);
    }
    else if(req.query.place) {
        let friends = friendsList.filter(f=> f.place === req.query.place);
        console.log(req.query.place);
        res.send(friends);
    }
})

app.post('/list/friends',(req,res)=> {
    if(req.query.name && req.query.place) { 
        console.log(`{${req.query.idn}, ${req.query.name}, ${req.query.place}}`);
        friendsList.push({
            idn: IDN++,
            name: req.query.name,
            place: req.query.place,
        })
        res.send(friendsList);
    }
})

app.put('/list/friends',(req,res)=> {
    let friend = friendsList.find(f=>f.idn === parseInt(req.query.idn));
    if(req.query.name && req.query.place) {
        friend.name = req.query.name;
        friend.place = req.query.place;
    }
    else if(req.query.name) {
        friend.name = req.query.name;
    }
    else if(req.query.place) {
        friend.place = req.query.place;
    }
    console.log(friend);
    res.send(friendsList);
})

app.delete('/list/friends',(req,res)=> {
    let friend = friendsList.find(f=>f.idn === parseInt(req.query.idn));
    let indx = friendsList.indexOf(friend);
    if(req.query.idn) {
        console.log(`{ idn: ${friendsList[indx].idn}, name: '${friendsList[indx].name}', place: '${friendsList[indx].place}'}`);
        friendsList.splice(indx,1);
    }
    res.send(friendsList);
})

app.listen(3000,()=> {
    console.log(`Live Server on PORT:3000`);
})