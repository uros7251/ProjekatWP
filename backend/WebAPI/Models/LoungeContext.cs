using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{    
    public class LoungeContext : DbContext
    {
        public DbSet<Menu> Menus {get; set;}

        public DbSet<MenuEntry> MenuEntries { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public LoungeContext(DbContextOptions options) : base(options)
        {
            
        }

    }
}