const express = require('express');
const router = express.Router();
const members= require('../../Members');
const uuid = require('uuid');
// Gets all members
router.get('/', (req, res) =>  res.json(members));

// Get single member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    }

});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg: 'Please include both a name and an email'});
    }

    members.push(newMember);
    res.json(members);

    //sends back a response of the body from post request
    // res.send(req.body);
});

// Update Member
// Get single member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
    const updMember = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;

            res.json({ msg: 'Member updated', member})
        }

    });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }

});


// Delete Member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
    res.json({  msg: `member deleted`,
                members: members.filter(member => member.id !== parseInt(req.params.id)),
                
    });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    }

});
module.exports=router;
