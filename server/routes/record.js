const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Record = require('../models/Record');

router.get('/', async (req, res) => {
	res.json(await Record.find());
});

router.get('/:id', async (req, res) => {
    res.json(await Record.findById(req.params.id));
});

router.post('/', async (req, res) => {
    const record = new Record(req.body);
    await record.save();

    const output = `
    <p>You have a new message from vue_database_app:</p>
    <ul>
      <li>name: ${req.body.name}</li>
      <li>email: ${req.body.email}</li>
      <li>address: ${req.body.address}</li>
      <li>gender: ${req.body.gender}</li>
    `;

    let transporter = nodemailer.createTransport({
    	host: 'smtp.gmail.com',
    	port: 587,
    	secure: false,
    	auth: {
    		user: 'service.modestov@gmail.com',
    		pass: 'darktower1'
    	}
    });

    let mailOptions = {
    	from: 'service.modestov@gmail.com',
    	to: 'modestovib@gmail.com',
    	subject: `vue_database_app | New message`,
    	text: req.body.name,
    	html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
    	if (error) {
    		return console.log(error);
    	}
    	console.log('Message sent: %s', info.messageId);
    	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.json({state: 'success'});
});

router.put('/:id', async (req, res) => {
	await Record.findByIdAndUpdate(req.params.id, req.body);
	res.json({state: 'updated'});
});

router.delete('/:id', async (req, res) => {
	await Record.findByIdAndRemove (req.params.id);
	res.json({state: 'deleted'});
});

module.exports = router;

