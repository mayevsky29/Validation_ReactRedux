using AutoMapper;
using AutoPart.Models;
using Data.AutoPart.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<AppUser, UserVM>()
               .ForMember(dest => dest.Photo, opt => opt.MapFrom(dest => "images/" + dest.Photo));
            //CreateMap<RegisterViewModel, AppUser>()
            //    .ForMember(x => x.Photo, opt => opt.Ignore())
            //    .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
            //.ForMember(x => x.Image, opt => opt.MapFrom(x => "images/"
            //    + (string.IsNullOrEmpty(x.Photo) ? "noimage.jpg" : x.Photo)));
        }
    }
}
