using System.Net.Mail;
using System.Net;

namespace Backend.Infrastructure
{
    public class Email
    {

        public async Task<string> SendEmail(string ReciverMail, string subject, string body)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("noreply.moveasy@gmail.com");
            msg.To.Add(ReciverMail);
            msg.Subject = subject;
            msg.Body = body;
            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new NetworkCredential("noreply.moveasy@gmail.com", "euxa aqud lgqt orsq");
            client.Timeout = 20000;
            try
            {
                client.Send(msg);
                return "Email Enviado!";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                msg.Dispose();
            }

        }

    }
}
