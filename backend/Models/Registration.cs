public class Registration
{
    public int Id { get; set; }

    public required string Name { get; set; }
    public required string CityStateCommittee { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public DateTime SobrietyDate { get; set; }

    public string? AccessibilityNeeds { get; set; } // Nullable, if optional
    public bool IsPanelSpeaker { get; set; }
    public bool IsVolunteer { get; set; }

    public required string PaymentMethod { get; set; }
    public required string TransactionId { get; set; }

    public DateTime DateRegistered { get; set; }
}