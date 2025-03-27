namespace TaskManager.Application.DTOs;

public class TaskItemResponseDTO
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime? DataConclusao { get; set; }
    public object Status { get; set; } = null!;
} 