using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;
using System.Net.Mail;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly DataContext _context;
        public StudentController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents()
        {
            try
            {
                return Ok(await _context.Student.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving students from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Student>>> CreateStudents(Student std)
        {
            try
            {
                _context.Student.Add(std);
                await _context.SaveChangesAsync();

                return Ok(await _context.Student.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating student.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<Student>>> UpdateStudents(Student std)
        {
            try
            {
                var MSDBstd = await _context.Student.FindAsync(std.StudentId);
                if (MSDBstd == null)
                    return BadRequest("Student doesn't exist.");

                MSDBstd.FirstName = std.FirstName;
                MSDBstd.LastName = std.LastName;
                MSDBstd.ContactPerson = std.ContactPerson;
                MSDBstd.ContactNo = std.ContactNo;
                MSDBstd.EmailAddress = std.EmailAddress;
                MSDBstd.DateOfBirth = std.DateOfBirth;
                MSDBstd.Age = std.Age;
                MSDBstd.ClassroomId = std.ClassroomId;

                await _context.SaveChangesAsync();

                return Ok(await _context.Student.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating student.");
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Student>>> DeleteStudent(int id)
        {
            try
            {
                var MSDBstd = await _context.Student.FindAsync(id);
                if (MSDBstd == null)
                    return BadRequest("Student doesn't exist.");

                _context.Student.Remove(MSDBstd);
                await _context.SaveChangesAsync();

                return Ok(await _context.Student.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting student.");
            }
        }
    }
}
