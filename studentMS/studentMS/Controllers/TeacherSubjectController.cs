using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherSubjectController : ControllerBase
    {
        private readonly DataContext _context;

        public TeacherSubjectController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult<List<Teachersubjectdetails>> GetTeacherSubject()
        {
            try
            {
                var data = _context.Teachersubjectdetail.FromSqlRaw("SELECT s.SubjectId,t.TeacherId, s.SubjectName, t.FirstName, t.LastName\r\nFROM dbo.Teachers AS t\r\nINNER JOIN dbo.AllocateSubjects AS als\r\nON t.TeacherId=als.TeacherId\r\nINNER JOIN dbo.Subjects AS s\r\nON s.SubjectId=als.SubjectId").ToList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
