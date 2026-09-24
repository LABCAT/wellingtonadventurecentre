type EnquiryEmailData = {
  message: string
  name: string
  email: string
  phoneNumber: string
  tourType: string
  date: string
  numberOfPeople: string
  additionalInfo: string
}

export function buildEnquirySubmissionEmail(data: EnquiryEmailData): string {
  const row = (label: string, value: string, whiteSpacePre = false) => `
          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
            <th
              class="content-block"
              style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;"
              valign="top">
              ${label}
            </th>
            <td
              class="content-block"
              style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;${whiteSpacePre ? ' white-space: pre;' : ''}"
              valign="top">
              ${value}
            </td>
          </tr>`

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Open Sans', sans-serif !important;  box-sizing: border-box; font-size: 14px; margin: 0;" lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="x-apple-disable-message-reformatting">
<title>Wellington Rafting Email</title>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"> 
<style type="text/css">
img {
max-width: 100%;
}
body {
-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
}
body {
background-color: #f6f6f6;
}
@media only screen and (max-width: 640px) {
  body {
    padding: 0 !important;
  }
  h1 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h2 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h3 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h4 {
    font-weight: 800 !important; margin: 20px 0 5px !important;
  }
  h1 {
    font-size: 22px !important;
  }
  h2 {
    font-size: 18px !important;
  }
  h3 {
    font-size: 16px !important;
  }
  h1,h2,h3,h4,h5 { 
    font-family: 'Rokkitt', serif;
  } 
  .container {
    padding: 0 !important; width: 100% !important;
  }
  .content {
    padding: 0 !important;
  }
  .content-wrap {
    padding: 10px !important;
  }
  .invoice {
    width: 100% !important;
  }
}
</style>
</head>
<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
    <table class="body-wrap" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
        <tr style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
            <td style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top">
            </td>
            <td class="container" width="600" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                <div class="content" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff">
                        <tr style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                            <td style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #000; margin: 0; padding: 20px;" align="center" bgcolor="#000" valign="top">
                                <img id="logo" src="https://wellingtonrafting.nz/favicon.png" alt="Wellington Rafting Logo" width="128" height="128" border="0" style="-ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; display:block; width:128px; margin: 0 auto; object-fit:contain;">
                                <h1 style="vertical-align: top; color: #fff; font-weight: 700; text-align: center; background-color: #000;" valign="top">Wellington Rafting</h1>
                            </td>
                        </tr>
                        <tr style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                            <td class="content-wrap" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                                    <tr style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                                        <td class="content-block" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top">
                                            <table
                                              class="main"
                                              width="100%"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;"
                                              bgcolor="#fff">
                                              <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                <td
                                                  class="alert alert-warning"
                                                  style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #27aae1; margin: 0; padding: 20px;"
                                                  align="center"
                                                  bgcolor="#27aae1"
                                                  valign="top">
                                                  ${data.message}
                                                </td>
                                              </tr>
                                              <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; text-align: left;">
                                                <td
                                                  class="content-wrap"
                                                  style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;"
                                                  valign="top">
                                                  <table
                                                    width="100%"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                    ${row('Name', data.name)}
                                                    ${row('Email', data.email)}
                                                    ${row('Phone Number', data.phoneNumber)}
                                                    ${row('Tour Type', data.tourType)}
                                                    ${row('Date', data.date)}
                                                    ${row('Number of People', data.numberOfPeople)}
                                                    ${row('Additional Info', data.additionalInfo, true)}
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                        <table width="100%" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                            <tr style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; margin: 0;">
                                <td class="aligncenter content-block" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">
                                    Sent by the team at Wellington Rafting. For information or support please contact <a href="mailto:info@wellingtonrafting.nz" style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">
                                        info@wellingtonrafting.nz
                                    </a>.
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </td>
            <td style="font-family: 'Open Sans', sans-serif !important; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top">
            </td>
        </tr>
    </table>
</body>
</html>`
}
