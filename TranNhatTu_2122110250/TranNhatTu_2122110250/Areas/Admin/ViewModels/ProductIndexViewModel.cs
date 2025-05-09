﻿namespace TranNhatTu_2122110250.Areas.Admin.ViewModels
{
    using Microsoft.AspNetCore.Mvc.Rendering;
    using TranNhatTu_2122110250.Model;

    public class ProductIndexViewModel
    {
        public List<Product> Products { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }

        public string SearchTerm { get; set; }
    }
}
