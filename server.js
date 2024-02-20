const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware to parse incoming requests with JSON payloads
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// POST route to handle form submission and send email
app.post('/send-email', (req, res) => {

    console.log(process.env)
    const { name, email, companyName, message } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.email, // your Gmail email
            pass:  process.env.pass // your Gmail password
        }
    });

    // Email options
    const mailOptions = {
        from: `${name} <${email}>`,
        to: process.env.email, // recipient email
        subject: `New Message from ${name}`,
        text: "Hi, We are from" + companyName + " " + message,
        replyTo: `${name} <${email}>`
    };


    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email');
        } else {
    console.log("mailOptions",email);
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
