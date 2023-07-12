namespace studentMS.Models
{
    public class Allocatesubject
    {
        public int AllocateSubjectID { get; set; }

        public int teacherId { get; set; }

        public Teacher? teacher { get; set; }

        public int subjectId { get; set; }

        public Subject? Subject { get; set; }
    }
}
