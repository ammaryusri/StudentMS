using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateClassroomController : ControllerBase
    {
        private readonly DataContext _context;

        public AllocateClassroomController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Allocateclassroom>>> GetAlloacteClassroom()
        {
            try
            {
                return Ok(await _context.Allocateclassrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving teachers from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Allocateclassroom>>> CreateAlloacteClassroom(Allocateclassroom allocateClassroom)
        {
            try
            {
                _context.Allocateclassrooms.Add(allocateClassroom);
                await _context.SaveChangesAsync();

                return Ok(await _context.Allocateclassrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Allocateclassroom>>> DeleteAlloacteClassroom(int id)
        {
            try
            {
                var MSDBtech = await _context.Allocateclassrooms.FindAsync(id);
                if (MSDBtech == null)
                    return BadRequest("Allocated Classrooms doesn't exist.");

                _context.Allocateclassrooms.Remove(MSDBtech);
                await _context.SaveChangesAsync();

                return Ok(await _context.Allocateclassrooms.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Allocated Classrooms.");
            }
        }
    }
}
