using Microsoft.EntityFrameworkCore;

namespace studentMS.Models
{
    [Keyless]
    public class Studentdetails
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string ClassroomName { get; set; } = string.Empty;
    }
}
