using AutoPart.Models;
using Data.AutoPart;
using Data.AutoPart.Entities.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Validation
{
    public class AccountVMValidator : AbstractValidator<RegisterViewModel>
    {
        //private readonly UserManager<AppUser> _userManager;
        private readonly AppEFContext _appEFContext;

        public AccountVMValidator(
            AppEFContext appEFContext
            )
        {
            //    _userManager = userManager;
            _appEFContext = appEFContext;

            RuleFor(x => x.Email)
               .NotEmpty()
               .WithMessage("Поле не може бути пустим")
               .MinimumLength(6)
               .EmailAddress()
               .WithMessage("Помилка заповнення поля Email")
               .Must(IsValidEmail)
               .WithName("Email")
               .WithMessage("Такий користувач вже існує");
            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Поле не може бути пустим")
                .MinimumLength(5)
                .WithMessage("Пароль не може бути коротший, ніж 5 символів")
                .Matches(@"\d")
                .WithName("Password")
                .WithMessage("Пароль повинен містити хоча б одну цифру");
            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("Поле не може бути пустим")
                .MinimumLength(10)
                .MaximumLength(11)
                .WithMessage("Має бути не менше 10 і не більше 11 цифр");
            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Поле не може бути пустим")
                .Equal(x => x.Password)
                .WithMessage("Введене підтвердження не співпадає з паролем");
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("Поле не може бути пустим");
            RuleFor(x => x.SecondName)
                .NotEmpty()
                .WithMessage("Поле не може бути пустим");

        }

        private bool IsValidEmail(string email)
        {
            var user = _appEFContext.Users.FirstOrDefault(x => x.Email == email);
            if (user == null)
            {
                return true;
            }
            return false;
        }

        //RuleFor(x => x.Email)
        //        .NotEmpty().WithMessage("Email address is required!")
        //        .EmailAddress().WithMessage("Email is not valid!")
        //        .Must(BeUniqueEmail).WithName("Email").WithMessage("Email is already registered");
        //    RuleFor(x => x.Password)
        //        .NotEmpty().WithName("Password").WithMessage("Password is required")
        //        .MinimumLength(5).WithName("Password").WithMessage("Password minimum length is 5");

        //    RuleFor(x => x.ConfirmPassword)
        //        .NotEmpty().WithName("ConfirmPassword").WithMessage("Confirm your Password")
        //         .Equal(x => x.Password).WithMessage("Password Confirmation do not match");
        //}


        //private bool BeUniqueEmail(string email)
        //{
        //    //var user = _userManager.FindByEmailAsync(email).Result;
        //    //.Users
        //    //.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        //    return user == null;
        //}
    }
}
