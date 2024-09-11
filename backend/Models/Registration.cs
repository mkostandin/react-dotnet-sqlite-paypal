using System;

public class Registration
{
    public int Id { get; set; }
    public string Name { get; set; } // Name (first and last)
    public string CityStateCommittee { get; set; } // City/State/Committee
    public string PhoneNumber { get; set; } // Phone Number
    public string Email { get; set; } // Email
    public DateTime SobrietyDate { get; set; } // Sobriety Date
    public string AccessibilityNeeds { get; set; } // Accessibility needs
    public bool IsPanelSpeaker { get; set; } // Checkbox: Panel Speaker
    public bool IsVolunteer { get; set; } // Checkbox: Volunteer
    public bool IsNoService { get; set; } // Checkbox: No thank you
    public string PaymentMethod { get; set; } // Payment method
    public DateTime DateRegistered { get; set; } // Date of registration
}
