using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly DataContext _context;
        public ClassroomController(DataContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Classroom>>> GetClassroom()
        {
            try
            {
                return Ok(await _context.Classrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving classrooms from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Classroom>>> CreateClassroom(Classroom cls)
        {
            try
            {
                _context.Classrooms.Add(cls);
                await _context.SaveChangesAsync();

                return Ok(await _context.Classrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating classroom.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<Classroom>>> UpdateClassroom(Classroom cls)
        {
            try
            {
                var MSDBcls = await _context.Classrooms.FindAsync(cls.ClassroomId);
                if (MSDBcls == null)
                    return BadRequest("Classroom doesn't exist.");

                MSDBcls.ClassroomName = cls.ClassroomName;

                await _context.SaveChangesAsync();

                return Ok(await _context.Classrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating classroom.");
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Classroom>>> DeleteClassroom(int id)
        {
            try
            {
                var MSDBcls = await _context.Classrooms.FindAsync(id);
                if (MSDBcls == null)
                    return BadRequest("Classroom doesn't exist.");

                _context.Classrooms.Remove(MSDBcls);
                await _context.SaveChangesAsync();

                return Ok(await _context.Classrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting classroom.");
            }
        }
    }
}
