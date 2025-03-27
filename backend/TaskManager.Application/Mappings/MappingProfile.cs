using AutoMapper;
using TaskManager.Application.DTOs;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Enums;

namespace TaskManager.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TaskItem, TaskItemResponseDTO>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => new 
            { 
                id = (int)src.Status,
                name = GetStatusName(src.Status)
            }));
            
        CreateMap<CreateTaskItemDTO, TaskItem>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (TaskItemStatus)src.Status))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.DataCriacao, opt => opt.MapFrom(src => DateTime.UtcNow));

        CreateMap<UpdateTaskItemDTO, TaskItem>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (TaskItemStatus)src.Status))
            .ForMember(dest => dest.DataCriacao, opt => opt.Ignore());
    }

    private static string GetStatusName(TaskItemStatus status)
    {
        return status switch
        {
            TaskItemStatus.Pendente => "Pendente",
            TaskItemStatus.EmProgresso => "Em Progresso",
            TaskItemStatus.Concluida => "Concluída",
            _ => status.ToString()
        };
    }
} 