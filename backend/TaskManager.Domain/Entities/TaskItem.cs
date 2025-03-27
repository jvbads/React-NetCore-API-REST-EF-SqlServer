using System.ComponentModel.DataAnnotations;
using TaskManager.Domain.Enums;

namespace TaskManager.Domain.Entities;

public class TaskItem
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O título é obrigatório")]
    [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres")]
    public string Titulo { get; set; } = string.Empty;

    public string? Descricao { get; set; }

    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

    public DateTime? DataConclusao { get; set; }

    public TaskItemStatus Status { get; set; } = TaskItemStatus.Pendente;
} 