using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Payment
    {
        [Key]
        public int ID { get; set; }

        public float Amount { get; set; }

        public DateTime Time { get; set; }
    }
}