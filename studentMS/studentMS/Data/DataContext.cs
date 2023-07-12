using Microsoft.EntityFrameworkCore;
using studentMS.Models;

namespace studentMS.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Student> Student => Set<Student>();

        public DbSet<Teacher> Teachers => Set<Teacher>();

        public DbSet<Classroom> Classrooms => Set<Classroom>();

        public DbSet<Subject> Subjects => Set<Subject>();

        public DbSet<Allocatesubject> Allocatesubjects => Set<Allocatesubject>();

        public DbSet<Allocateclassroom> Allocateclassrooms => Set<Allocateclassroom>();

        public DbSet<Studentdetails> Studentdetail => Set<Studentdetails>();

        public DbSet<Teachersubjectdetails> Teachersubjectdetail => Set<Teachersubjectdetails>();
    }
}
