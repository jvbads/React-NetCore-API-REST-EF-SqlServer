using System.ComponentModel.DataAnnotations;
using TaskManager.Application.Validations;

namespace TaskManager.Application.DTOs;

public class UpdateTaskItemDTO
{
    [Required(ErrorMessage = "O ID é obrigatório")]
    public int Id { get; set; }

    [Required(ErrorMessage = "O título é obrigatório")]
    [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres")]
    public string Titulo { get; set; } = string.Empty;

    public string? Descricao { get; set; }

    [DataConclusaoValidation]
    public DateTime? DataConclusao { get; set; }

    [Required(ErrorMessage = "O status é obrigatório")]
    [Range(0, 2, ErrorMessage = "Status inválido")]
    public int Status { get; set; }
} 