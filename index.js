const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'leads.txt');
const emailContent = require('./letter.js');


const emails = []



fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  const emails = data.trim().split('\n');
  for (const emailss of emails) {
    //  console.log(emailss);
      //console.log(emailContent(emailss));
       main(emailss);
    }
});


const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const sender = "DoNotReply@swfwinefoodfest.org";
var client = new EmailClient(connectionString);

async function main(emailss) {
    try {
      //send mail
      const emailMessage = {
        sender: sender,
        content: emailContent(emailss),
        importance: 'high',
        recipients: {
          to: [{email: emailss.trim()}],
        },
      };
  //    console.log(emailMessage.recipients.to);

     var sendResult = await client.send(emailMessage);
      if (sendResult && sendResult.messageId) {
        const messageId = sendResult.messageId;
          if (messageId === null || messageId === undefined) {
          console.log("Message Id not found.");
          return;
        }
  
      //  console.log("Send email success, MessageId :", messageId);
  
        let counter = 0;
        const statusInterval = setInterval(async function () {
          counter++;
          try {
              const sendStatusResult = await client.getSendStatus(messageId);
              if (sendStatusResult) {
                  console.log(`Email status for {${messageId}} : [${sendStatusResult.status}]`);
                  if (sendStatusResult.status.toLowerCase() !== "queued" || counter > 12) {
                  clearInterval(statusInterval);
              }
            }
          } catch (e) {
            console.log("Error in checking send mail status: ", e);
          }
        }, 5000);
      } else {
        console.error("Something went wrong when trying to send this email: ", sendResult);
      }
    } catch (e) {
      console.log(e);
    }
  }
  //main();