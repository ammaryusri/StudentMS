using Microsoft.EntityFrameworkCore;

namespace studentMS.Models
{
    [Keyless]
    public class Teachersubjectdetails
    {
        public int SubjectId { get; set; }
        public int TeacherId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
