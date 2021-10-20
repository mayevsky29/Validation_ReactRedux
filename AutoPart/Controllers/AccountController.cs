using AutoMapper;
using AutoPart.Constants;
using AutoPart.Mapper;
using AutoPart.Models;
using AutoPart.Services;
using Data.AutoPart;
using Data.AutoPart.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;
       
        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,    
            IJwtTokenService jwtTokenService,
            IMapper mapper,
            AppEFContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = jwtTokenService;
            _mapper = mapper;
            _context = context;
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
        {
            var user = _mapper.Map<AppUser>(model);
            string fileName = String.Empty;
            if (model.Photo != null)
            {
                string randomFilename = Path.GetRandomFileName() +
                    Path.GetExtension(model.Photo.FileName);

                string dirPath = Path.Combine(Directory.GetCurrentDirectory(), "images");
                fileName = Path.Combine(dirPath, randomFilename);
                using (var file = System.IO.File.Create(fileName))
                {
                    model.Photo.CopyTo(file);
                }
                user.Photo = randomFilename;
            }

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (!string.IsNullOrEmpty(fileName))
                    System.IO.File.Delete(fileName);
                return BadRequest(result.Errors);
            }
            result = await _userManager.AddToRoleAsync(user, Roles.User);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new
            {
                token = _jwtTokenService.CreateToken(user)
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm] LoginViewModel model)
        {
            var result = await _signInManager
                .PasswordSignInAsync(model.Email, model.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    invalid = "Не правильно введені дані!"
                });
            }
            var user = await _userManager.FindByEmailAsync(model.Email);

            return Ok(new
            {
                token = _jwtTokenService.CreateToken(user)
            });
        }

        [HttpGet]
        [Route("user")]
        public async Task<IActionResult> GetUsersList()
        {

            var userList = await _context.Users
                .Select(res => _mapper.Map<UserVM>(res))
                .ToListAsync();

            return Ok(userList);
        }
    }
}
