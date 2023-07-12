using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentMS.Data;
using studentMS.Models;

namespace studentMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly DataContext _context;
        public SubjectController(DataContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Subject>>> GetSubject()
        {
            try
            {
                return Ok(await _context.Subjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving subjects from the database.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<Subject>>> CreateSubject(Subject subj)
        {
            try
            {
                _context.Subjects.Add(subj);
                await _context.SaveChangesAsync();

                return Ok(await _context.Subjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating subject.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<Subject>>> UpdateSubject(Subject subj)
        {
            try
            {
                var MSDBsubj = await _context.Subjects.FindAsync(subj.SubjectId);
                if (MSDBsubj == null)
                    return BadRequest("Subject doesn't exist.");

                MSDBsubj.SubjectName = subj.SubjectName;

                await _context.SaveChangesAsync();

                return Ok(await _context.Subjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating subject.");
            }
        }

        [HttpDelete("(id)")]
        public async Task<ActionResult<List<Subject>>> DeleteSubject(int id)
        {
            try
            {
                var MSDBsubj = await _context.Subjects.FindAsync(id);
                if (MSDBsubj == null)
                    return BadRequest("Subject doesn't exist.");

                _context.Subjects.Remove(MSDBsubj);
                await _context.SaveChangesAsync();

                return Ok(await _context.Subjects.ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting subject.");
            }
        }
    }
}
