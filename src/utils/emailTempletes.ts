export const verificationTemplates = (user: any, token: any) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Message</title>
  <style>
    body {
      padding: 0;
      margin: 0;
      background: #ffffff;
      font-family: courier, sans-serif;
    }

    .container {
      width: 100%;
      height: 50vh;
      max-width: 600px;
      margin: 0 auto;
      background-color: bisque;
      margin-top: 8em;
      border-radius: 5px;
      box-sizing: border-box;
      border: 1px solid black;
    }
        .container footer{
          text-align: center;
          padding: 5px;
         
        }
    .header {
      max-width: 550px;
      height: 42vh;
      margin: 0 auto;
      background: #ffffff;

    }
    .header h3 {
      text-align: center;
      padding-top: 1em;
    }
    .greeting span {
      padding-top: 16px;
      float: left;
      margin-left: 2em;
    }
    .message p{
      clear: both;
      padding-top: 10px;
      margin-left: 2em;
    }
    a{
      cursor: pointer;
      color: #ffffff;
      margin-left: 2em;
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 2px;
    background-color: #4ca;
    text-decoration:none
     
    }
    a:hover{
      color: #fffff1;
      background-color: #4cb;
    }
    .messagee p{
      margin-left: 2em;
      margin-bottom: -0.7em;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h3>Welcome to Edge reach tech</h3>
      <div class="greeting"><span>hello, ${user.firstName}</span></div>
      <div class="message">
        <p>Thank you for joining our website. Click the button bellow to verify your Account.</p>
      </div>
      <div>
       <a  href='${process.env.FRONT_END_URI as string}/user/verify/${token}'>verify account</a>
      </div>
      <div class="messagee">
        <p>Best regards,</p>
        <p>Edge Reach Tech.</p>
      </div>
    </div>
    <footer>&copy; 2024 Edge Reach Tech. All right reserved.</footer>
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
