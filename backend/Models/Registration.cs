public class Registration
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string CityStateCommittee { get; set; }
    public string PhoneNumber { get; set; } // Change from 'Phone' to 'PhoneNumber'
    public string Email { get; set; }
    public DateTime SobrietyDate { get; set; }
    public string AccessibilityNeeds { get; set; }
    public bool IsPanelSpeaker { get; set; }
    public bool IsVolunteer { get; set; }
    public string PaymentMethod { get; set; } // Add this field
    public string TransactionId { get; set; } // Add this field for transaction ID
    public DateTime DateRegistered { get; set; }
}