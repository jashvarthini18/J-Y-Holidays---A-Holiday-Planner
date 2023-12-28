const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/submit-feedback", (req, res) => {
    const { name, email, feedback } = req.body;

    // Send a thank you email
    const transporter = nodemailer.createTransport({
        service: "Gmail", // e.g., Gmail, Outlook
        auth: {
            user: "jashvarthinir.csbs2022@citchennai.net",
            pass: "welcometocit"
        }
    });

    const mailOptions = {
        from: "jashvarthinir.csbs2022@citchennai.net",
        to: email,
        subject: "Thank you for your feedback!",
        text: `Dear ${name},\n\nThank you for your feedback:\n${feedback}\n\nBest regards,\nYour Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.json({ success: false });
        } else {
            console.log("Email sent:", info.response);
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
