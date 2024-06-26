export const verificationTemplates = (user: any, token: any) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                border: 1px solid #ccc;
            }
            .email-header, .email-footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
            }
            a{
                background-color:#0000cc;
                color:#FFFF;
                padding:12px;
                margin:0 auto;
                text-decoration:none
            }
            a:hover{
             background-color:#3358FF 
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Welcome to Our Service</h1>
            </div>
            <div class="email-body">
                <p>Hello, ${user.firstName}</p>
                <p> Thank you for joining our service. Click this button to verify your account</p>
               <a href="${
                 process.env.FRONT_END_URI as string
               }/user/verify/${token}"> Verify your Account</a>
                <p>Best Regards,<br> Edge Reach Tech Team</p>
            </div>
            <div class="email-footer">
                <p>&copy; 2024 Edge Reach Tech. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
export const resetTemplates = (user: any, token: any) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                border: 1px solid #ccc;
            }
            .email-header, .email-footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
            }
            a{
                background-color:#0000cc;
                color:#FFFF;
                padding:12px;
                margin:0 auto;
                text-decoration:none
            }
            a:hover{
             background-color:#3358FF 
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Welcome to Our Service</h1>
            </div>
            <div class="email-body">
                <p>Hello, ${user}</p>
                <p> it seems like you are trying to reset your password click libk below to reset password </p>
               <a href="${
                 process.env.FRONT_END_URI as string
               }/user/resetPassword/${token}"> Reset password</a>

                <p> if it is not you ignore this email</p>
                <p>Best Regards,<br> Edge Reach Tech Team</p>
            </div>
            <div class="email-footer">
                <p>&copy; 2024 Edge Reach Tech. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
