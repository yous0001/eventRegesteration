export const verifyEmailTemplate = (username, verificationLink) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                background: #f3f4f6;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                max-width: 480px;
                margin: 40px auto;
                background: linear-gradient(135deg, #007bff, #6610f2);
                color: #ffffff;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
            }
            h2 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                font-size: 16px;
                font-weight: bold;
                color: #fff;
                background: #ff9800;
                text-decoration: none;
                border-radius: 50px;
                transition: all 0.3s ease-in-out;
                box-shadow: 0 5px 15px rgba(255, 152, 0, 0.4);
            }
            .button:hover {
                background: #e68900;
                box-shadow: 0 5px 20px rgba(255, 152, 0, 0.6);
            }
            .link-container {
                background: rgba(255, 255, 255, 0.15);
                padding: 10px;
                border-radius: 8px;
                word-wrap: break-word;
            }
            .link-container a {
                color: #ffcc80;
                text-decoration: none;
                font-size: 14px;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                opacity: 0.8;
            }
            @media (max-width: 600px) {
                .container {
                    width: 90%;
                    padding: 20px;
                }
                .button {
                    width: 100%;
                    padding: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome, ${username}! 🎉</h2>
            <p>You're almost there! Click the button below to verify your email and activate your account.</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
            <p>If the button doesn't work, use the link below:</p>
            <div class="link-container">
                <a href="${verificationLink}">${verificationLink}</a>
            </div>
            <div class="footer">
                <p>If you didn't sign up, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  