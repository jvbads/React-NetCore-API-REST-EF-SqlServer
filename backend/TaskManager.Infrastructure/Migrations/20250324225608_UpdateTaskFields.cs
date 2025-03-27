using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManager.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaskFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tasks",
                newName: "Titulo");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Tasks",
                newName: "Descricao");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Tasks",
                newName: "DataCriacao");

            migrationBuilder.RenameColumn(
                name: "CompletedAt",
                table: "Tasks",
                newName: "DataConclusao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "Tasks",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Tasks",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "DataCriacao",
                table: "Tasks",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "DataConclusao",
                table: "Tasks",
                newName: "CompletedAt");
        }
    }
}
