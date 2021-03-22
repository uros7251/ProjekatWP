using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Menu
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(31)]
        public string Name { get; set; }

        public virtual List<MenuEntry> Content { get; set; }
    }
}