using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    [Route("GetAll")]
    public async Task<ActionResult<IEnumerable<TaskItemResponseDTO>>> GetAll()
    {
        var tasks = await _taskService.GetAllAsync();
        return Ok(tasks);
    }

    [HttpGet]
    [Route("GetById/{id}")]
    public async Task<ActionResult<TaskItemResponseDTO>> GetById(int id)
    {
        var task = await _taskService.GetByIdAsync(id);

        if (task == null)
            return NotFound("Tarefa não encontrada");

        return Ok(task);
    }

    [HttpPost]
    [Route("Create")]
    public async Task<ActionResult<TaskItemResponseDTO>> Create(CreateTaskItemDTO taskDTO)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var task = await _taskService.CreateAsync(taskDTO);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Route("Update/{id}")]
    public async Task<ActionResult<TaskItemResponseDTO>> Update(int id, UpdateTaskItemDTO taskDTO)
    {
        if (id != taskDTO.Id)
            return BadRequest("Os IDs não correspondem.");
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var task = await _taskService.UpdateAsync(taskDTO);

            if (task == null)
                return NotFound("Tarefa não encontrada");

            return Ok(task);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("Delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _taskService.DeleteAsync(id);

        if (!result)
            return NotFound("Tarefa não encontrada");

        return NoContent();
    }
} 