namespace studentMS.Models
{
    public class Allocateclassroom
    {
        public int AllocateClassroomID { get; set; }

        public int TeacherId { get; set; }

        public Teacher? teacher { get; set; }

        public int ClassroomId { get; set; }

        public Classroom? classroom { get; set; }
    }
}
