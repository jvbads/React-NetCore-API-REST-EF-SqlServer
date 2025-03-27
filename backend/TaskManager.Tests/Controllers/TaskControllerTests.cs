using Microsoft.AspNetCore.Mvc;
using Moq;
using TaskManager.API.Controllers;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using Xunit;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TaskManager.Tests.Controllers
{
    public class TaskControllerTests
    {
        private readonly Mock<ITaskService> _mockService;
        private readonly TaskController _controller;

        public TaskControllerTests()
        {
            _mockService = new Mock<ITaskService>();
            _controller = new TaskController(_mockService.Object);
        }

        [Fact]
        public async Task GetAll_ShouldReturnOkResult()
        {
            // Arrange
            var tasks = new List<TaskItemResponseDTO>
            {
                new TaskItemResponseDTO { Id = 1, Titulo = "Task 1" }
            };
            _mockService.Setup(s => s.GetAllAsync()).ReturnsAsync(tasks);

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetById_ShouldReturnOkResult()
        {
            // Arrange
            var task = new TaskItemResponseDTO { Id = 1, Titulo = "Task 1" };
            _mockService.Setup(s => s.GetByIdAsync(1)).ReturnsAsync(task);

            // Act
            var result = await _controller.GetById(1);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task Create_ShouldReturnCreatedResult()
        {
            // Arrange
            var taskDto = new CreateTaskItemDTO { Titulo = "Test Task" };
            var createdTask = new TaskItemResponseDTO { Id = 1, Titulo = "Test Task" };
            _mockService.Setup(s => s.CreateAsync(It.IsAny<CreateTaskItemDTO>())).ReturnsAsync(createdTask);

            // Act
            var result = await _controller.Create(taskDto);

            // Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
        }

        [Fact]
        public async Task Update_ShouldReturnOkResult()
        {
            // Arrange
            var taskDto = new UpdateTaskItemDTO { Id = 1, Titulo = "Updated Task" };
            var updatedTask = new TaskItemResponseDTO { Id = 1, Titulo = "Updated Task" };
            _mockService.Setup(s => s.UpdateAsync(It.IsAny<UpdateTaskItemDTO>())).ReturnsAsync(updatedTask);

            // Act
            var result = await _controller.Update(1, taskDto);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task Delete_ShouldReturnNoContentResult()
        {
            // Arrange
            _mockService.Setup(s => s.DeleteAsync(1)).ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
    }
} 