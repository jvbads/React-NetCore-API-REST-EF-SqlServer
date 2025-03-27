using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskItemResponseDTO>> GetAllAsync();
    Task<TaskItemResponseDTO?> GetByIdAsync(int id);
    Task<TaskItemResponseDTO> CreateAsync(CreateTaskItemDTO taskDTO);
    Task<TaskItemResponseDTO> UpdateAsync(UpdateTaskItemDTO taskDTO);
    Task<bool> DeleteAsync(int id);
} 