using AutoMapper;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Interfaces;

namespace TaskManager.Application.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IMapper _mapper;

    public TaskService(ITaskRepository taskRepository, IMapper mapper)
    {
        _taskRepository = taskRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TaskItemResponseDTO>> GetAllAsync()
    {
        var tasks = await _taskRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<TaskItemResponseDTO>>(tasks);
    }

    public async Task<TaskItemResponseDTO?> GetByIdAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);

        return task != null ? _mapper.Map<TaskItemResponseDTO>(task) : null;
    }

    public async Task<TaskItemResponseDTO> CreateAsync(CreateTaskItemDTO taskDTO)
    {
        if (string.IsNullOrWhiteSpace(taskDTO.Titulo))
            throw new InvalidOperationException("Título não pode ser vazio");

        var task = _mapper.Map<TaskItem>(taskDTO);

        var createdTask = await _taskRepository.CreateAsync(task);

        return _mapper.Map<TaskItemResponseDTO>(createdTask);
    }

    public async Task<TaskItemResponseDTO> UpdateAsync(UpdateTaskItemDTO taskDTO)
    {
        if (string.IsNullOrWhiteSpace(taskDTO.Titulo))
            throw new InvalidOperationException("Título não pode ser vazio");

        var existingTask = await _taskRepository.GetByIdAsync(taskDTO.Id);

        if (existingTask == null)
            throw new InvalidOperationException("Tarefa não encontrada");

        _mapper.Map(taskDTO, existingTask);

        var updatedTask = await _taskRepository.UpdateAsync(existingTask);

        return _mapper.Map<TaskItemResponseDTO>(updatedTask);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _taskRepository.DeleteAsync(id);
    }
} 