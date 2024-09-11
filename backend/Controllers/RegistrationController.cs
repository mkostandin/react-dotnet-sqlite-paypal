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
        _context = context;
        sendGridApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY"); // Load from .env
        fromEmail = Environment.GetEnvironmentVariable("FROM_EMAIL"); // Load from .env
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
            registration.DateRegistered = DateTime.Now;

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
                               $"Sobriety Date: {registration.SobrietyDate.ToShortDateString()}\n" +
                               $"Accessibility Needs: {registration.AccessibilityNeeds}\n" +
                               $"Panel Speaker: {registration.IsPanelSpeaker}\n" +
                               $"Volunteer: {registration.IsVolunteer}\n" +
                               $"Payment Method: {registration.PaymentMethod}\n\n" +
                               "Best regards,\nYour Organization";
        var htmlContent = $"<strong>Dear {registration.Name},</strong><br><br>" +
                          "<p>Thank you for registering. Here are the details of your registration:</p>" +
                          $"<ul><li>City/State/Committee: {registration.CityStateCommittee}</li>" +
                          $"<li>Phone Number: {registration.PhoneNumber}</li>" +
                          $"<li>Sobriety Date: {registration.SobrietyDate.ToShortDateString()}</li>" +
                          $"<li>Accessibility Needs: {registration.AccessibilityNeeds}</li>" +
                          $"<li>Panel Speaker: {registration.IsPanelSpeaker}</li>" +
                          $"<li>Volunteer: {registration.IsVolunteer}</li>" +
                          $"<li>Payment Method: {registration.PaymentMethod}</li></ul>" +
                          "<p>Best regards,<br>Your Organization</p>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg);

        // Optionally check the response for logging or error handling
    }
}