const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// POST route to handle form submission and send email
app.post('/send-email', (req, res) => {
    const { name, email, companyName, message } = req.body;

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rmemdanib@gmail.com', // your Gmail email
            pass: 'pkaz uoxi tdnt lbcc' // your Gmail password
        }
    });

    // Email options
    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'rmemdanib@gmail.com', // recipient email
        subject: `New Message from ${name}`,
        text: message,
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
