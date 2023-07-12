using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailsController : ControllerBase
    {
        private readonly DataContext _context;

        public StudentDetailsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Studentdetails>> GetStudentDetails()
        {
            try
            {
                var data = _context.Studentdetail.FromSqlRaw("SELECT t.StudentId, t.FirstName, t.LastName, t.ContactPerson, t.ContactNo, t.EmailAddress, t.DateOfBirth, t.Age,\r\nti.ClassroomName\r\nFROM dbo.Student AS t\r\nJOIN dbo.Classrooms AS ti\r\nON t.ClassroomId=ti.ClassroomId;").ToList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,  ex.Message);
            }
        }
    }
}
