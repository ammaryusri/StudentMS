using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateSubjectController : ControllerBase
    {
        private readonly DataContext _context;

        public AllocateSubjectController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Allocatesubject>>> GetAlloacteSubject()
        {
            try
            {
                return Ok(await _context.Allocatesubjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving Allocated Subject from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Allocatesubject>>> CreateAlloacteSubject(Allocatesubject allocatesubject)
        {
            try
            {
                _context.Allocatesubjects.Add(allocatesubject);
                await _context.SaveChangesAsync();

                return Ok(await _context.Allocatesubjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Allocatesubject>>> DeleteAlloacteSubject(int id)
        {
            try
            {
                var MSDBtech = await _context.Allocatesubjects.FindAsync(id);
                if (MSDBtech == null)
                    return BadRequest("Allocated Subject doesn't exist.");

                _context.Allocatesubjects.Remove(MSDBtech);
                await _context.SaveChangesAsync();

                return Ok(await _context.Allocatesubjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Allocated Subject.");
            }
        }
    }
}
