const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const fs = require('fs');
const membersDir='../../Members.json';
const membersFile= require(membersDir);
const members=membersFile["members"];


// Gets all members
router.get('/', (req, res) =>  res.json(members));

// Get single member

router.get('/:id', (req,res) => {
    const found = members.some(member => member.id.toString() === req.params.id.toString());
    if(found){
    res.json(members.filter(member => member.id.toString() === req.params.id.toString()));
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id.toString()} found`})
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
    else{
    membersFile["members"].push(newMember);
    fs.writeFile('Members.json', JSON.stringify(membersFile,null,2), function writeJSON(err) {
        if (err) return console.log(err);

        console.log('writing to ' + membersDir);
      });
    res.json(membersFile);
    }
    //sends back a response of the body from post request
    // res.send(req.body);
});


// Update Member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id.toString() === req.params.id.toString());
    if(found){
    const updMember = req.body;
    members.forEach(member => {
        if(member.id.toString() === req.params.id.toString()) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
            fs.writeFile('Members.json', JSON.stringify(membersFile,null,2), function writeJSON(err) {
                if (err) return console.log(err);
        
                console.log('writing to ' + membersDir);
              });

            res.json({ msg: 'Member updated', member})

        }

    });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    }

});




// Delete Member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id.toString() === req.params.id.toString());
    if(found){
        membersFile["members"]=members.filter(member => member.id.toString() !== req.params.id.toString());
        fs.writeFile('Members.json', JSON.stringify(membersFile,null,2), function writeJSON(err) {
            if (err) return console.log(err);

            console.log('writing to ' + membersDir);
          });
        
        // console.log(membersFile);
    res.json({  msg: `member deleted`,
                 members: members.filter(member => member.id.toString() !== req.params.id.toString()),
                
    });
    } else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found`})
    }

}); 
module.exports=router;
