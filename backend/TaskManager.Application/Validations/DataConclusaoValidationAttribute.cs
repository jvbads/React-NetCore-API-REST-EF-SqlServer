using System.ComponentModel.DataAnnotations;

namespace TaskManager.Application.Validations;

public class DataConclusaoValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null)
            return ValidationResult.Success;

        var dataConclusao = (DateTime)value;

        if (dataConclusao.Kind != DateTimeKind.Utc)
            dataConclusao = dataConclusao.ToUniversalTime();

        if (dataConclusao <= DateTime.UtcNow)
            return new ValidationResult("A data de conclusão deve ser uma data futura.");

        return ValidationResult.Success;
    }

    public override string FormatErrorMessage(string name)
    {
        return "A data de conclusão deve ser maior que a data atual";
    }
} 