using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class RegistrationsController : ControllerBase
{
    private readonly DataContext _context;
    private readonly string sendGridApiKey;
    private readonly string fromEmail;

    public RegistrationsController(DataContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));

        var ssmClient = new AmazonSimpleSystemsManagementClient();
        sendGridApiKey = GetParameterValueAsync(ssmClient, "/necypaa/SendGrid/ApiKey").Result
                         ?? throw new ArgumentNullException(nameof(sendGridApiKey));
        fromEmail = GetParameterValueAsync(ssmClient, "/necypaa/SendGrid/Email").Result
                    ?? throw new ArgumentNullException(nameof(fromEmail));
    }

    // GET: api/registrations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Registration>>> GetRegistrations()
    {
        return await _context.Registrations.ToListAsync();
    }

    // POST: api/registrations
    [HttpPost]
    public async Task<ActionResult<Registration>> PostRegistration(Registration registration)
    {
        if (ModelState.IsValid)
        {
            registration.DateRegistered = DateTime.UtcNow;

            // Save registration in the database
            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();

            // Send confirmation email using SendGrid
            await SendEmailWithSendGrid(registration);

            return CreatedAtAction(nameof(GetRegistrations), new { id = registration.Id }, registration);
        }
        return BadRequest(ModelState);
    }

    // SendGrid Email Functionality
    private async Task SendEmailWithSendGrid(Registration registration)
    {
        var client = new SendGridClient(sendGridApiKey);
        var from = new EmailAddress(fromEmail, "Your Organization Name");
        var to = new EmailAddress(registration.Email, registration.Name);
        var subject = "Thank you for your registration!";
        var plainTextContent = $"Dear {registration.Name},\n\n" +
                               "Thank you for registering. Here are the details of your registration:\n" +
                               $"City/State/Committee: {registration.CityStateCommittee}\n" +
                               $"Phone Number: {registration.PhoneNumber}\n" +
                               $"Sobriety Date: {registration.SobrietyDate}\n" +  // Fixed here
                               $"Accessibility Needs: {registration.AccessibilityNeeds}\n" +
                               $"Panel Speaker: {registration.IsPanelSpeaker}\n" +
                               $"Volunteer: {registration.IsVolunteer}\n" +
                               $"Payment Method: {registration.PaymentMethod}\n\n" +
                               "Best regards,\nYour Organization";
        var htmlContent = $"<strong>Dear {registration.Name},</strong><br><br>" +
                          "<p>Thank you for registering. Here are the details of your registration:</p>" +
                          $"<ul><li>City/State/Committee: {registration.CityStateCommittee}</li>" +
                          $"<li>Phone Number: {registration.PhoneNumber}</li>" +
                          $"<li>Sobriety Date: {registration.SobrietyDate}</li>" +  // Fixed here
                          $"<li>Accessibility Needs: {registration.AccessibilityNeeds}</li>" +
                          $"<li>Panel Speaker: {registration.IsPanelSpeaker}</li>" +
                          $"<li>Volunteer: {registration.IsVolunteer}</li>" +
                          $"<li>Payment Method: {registration.PaymentMethod}</li></ul>" +
                          "<p>Best regards,<br>Your Organization</p>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);
    }

    // Helper method to get the parameter value from Parameter Store
    private async Task<string> GetParameterValueAsync(IAmazonSimpleSystemsManagement ssmClient, string parameterName)
    {
        var request = new GetParameterRequest
        {
            Name = parameterName,
            WithDecryption = true // Set this to true to retrieve encrypted values like the password
        };

        var response = await ssmClient.GetParameterAsync(request);
        return response.Parameter.Value;
    }
}