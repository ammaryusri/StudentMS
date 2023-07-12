using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly DataContext _context;
        public TeacherController(DataContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Teacher>>> GetTeachers()
        {
            try
            {
                return Ok(await _context.Teachers.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving teachers from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Teacher>>> CreateTeachers(Teacher tech)
        {
            try
            {
                _context.Teachers.Add(tech);
                await _context.SaveChangesAsync();

                return Ok(await _context.Teachers.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating teacher.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<Teacher>>> UpdateTeachers(Teacher tech)
        {
            try
            {
                var MSDBtech = await _context.Teachers.FindAsync(tech.TeacherId);
                if (MSDBtech == null)
                    return BadRequest("Teacher doesn't exist.");

                MSDBtech.FirstName = tech.FirstName;
                MSDBtech.LastName = tech.LastName;
                MSDBtech.ContactNo = tech.ContactNo;
                MSDBtech.EmailAddress = tech.EmailAddress;

                await _context.SaveChangesAsync();

                return Ok(await _context.Teachers.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating teacher.");
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Teacher>>> DeleteTeacher(int id)
        {
            try
            {
                var MSDBtech = await _context.Teachers.FindAsync(id);
                if (MSDBtech == null)
                    return BadRequest("Teacher doesn't exist.");

                _context.Teachers.Remove(MSDBtech);
                await _context.SaveChangesAsync();

                return Ok(await _context.Teachers.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting teacher.");
            }
        }
    }
}
