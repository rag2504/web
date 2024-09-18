const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Hardcoded Email Credentials
const EMAIL_USER = 'ragraichura@gmail.com'; 
const EMAIL_PASS = 'qgdn nzif cfnn vjax'; 

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    },
    debug: true, // Enable debug output
    logger: true, // Log information in console
});

app.post('/apply-discount', (req, res) => {
    console.log('Form Data:', req.body);
    const email = req.body.email;

    if (!email) {
        console.log('Error: Email is undefined');
        return res.status(400).send('Email is required');
    }

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Your Discount Code',
        text: 'Thank you for signing up! Your discount code is: DISCOUNT20'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.redirect('/confirmation.html');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('Email User:', EMAIL_USER);
});
