using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class MenuEntry
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(31)]
        public string Name { get; set; }

        public float Price { get; set; }

        public int MenuId { get; set; }
        
        [JsonIgnore]
        public Menu Menu { get; set; }
    }
}