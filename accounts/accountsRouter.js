const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db.select("*")
    .from("accounts")
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(err => {
        console.log(error);
        res.status(500).json({ message: 'sorry, ran into error'});
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    db('accounts')
    .where({ id })
    .first() // Grabs the first element of the array
    .then(acc => {
        if (acc) {
            res.status(200).json({ data: acc })
        } else {
            res.status(404).json({ message: "account not found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'sorry, ran into a problem'});
    })
})

router.post('/', (req, res) => {
    db('accounts')
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json({results: ids})
    })
    .catch(error => {
        res.status(500).json({message: 'sorry, ran into an error'})
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({message:'Account Updated'})
        } else {
            res.status(404).json({ message: "Account not found" })
        }
    })
    .catch(err => {
        res.status(500).json({message: 'sorry, ran into a problem'})
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    
    db('accounts')
    .where({ id })
    .del() // delete the records
    .then(count => {
        if (count > 0) {
            res.status(200).json({message:'account deleted successfully'})
        } else {
            res.status(404).json({ message: "account not found"})
        }
        
    })
    .catch(error => {
        res.status(500).json({message: 'sorry, ran into an error'})
    });
});

module.exports = router;