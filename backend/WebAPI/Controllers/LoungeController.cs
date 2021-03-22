using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoungeController : ControllerBase
    {
        public LoungeContext Context { get; set; }

        public LoungeController(LoungeContext context) {
            Context = context;
        }

        [Route("GetMenus")]
        [HttpGet]
        public async Task<List<Menu>> GetMenus() {
            return await Context.Menus.Include(p => p.Content).ToListAsync();
        }

        [Route("CreateMenu/{name}")]
        [HttpPost]
        public async Task<IActionResult> CreateMenu(string name) {
            if (await Context.Menus.AnyAsync(menu => menu.Name.Equals(name)))
                return BadRequest(new { error = "Invalid name" });
            else {
                Menu menu = new Menu {
                    Name = name
                };
                Context.Menus.Add(menu);
                await Context.SaveChangesAsync();
                return Ok(new { ID = menu.ID });
            }
        }

        [Route("EditMenu")]
        [HttpPut]

        public async Task<IActionResult> EditMenu([FromBody] Menu menu) {
            if (await Context.Menus.AnyAsync(m => m.Name.Equals(menu.Name)))
                return BadRequest(new { error = "There's already a menu with this name!"});
            else {
                Context.Update<Menu>(menu);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [Route("DeleteMenu/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMenu(int id) {
            var menu = await Context.Menus.FindAsync(id);
            if (menu == null) {
                return BadRequest(new { error = "Invalid ID" });
            }
            Context.Menus.Remove(menu);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("GetMenuEntries")]
        [HttpGet]
        public async Task<List<MenuEntry>> GetMenuEntries() {
            return await Context.MenuEntries.ToListAsync();
        }

        [Route("CreateMenuEntry/{menuID}")]
        [HttpPost]
        public async Task<IActionResult> CreateMenuEntry(int menuID, [FromBody] MenuEntry entry) {
            var menu = await Context.Menus.FindAsync(menuID);
            if (menu == null) {
                return BadRequest(new { error = "Invalid Menu ID" });
            }
            entry.Menu = menu;
            Context.MenuEntries.Add(entry);
            await Context.SaveChangesAsync();
            return Ok(new { entryID = entry.ID });
        }

        [Route("DeleteMenuEntry/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMenuEntry(int id) {
            var entry = await Context.MenuEntries.FindAsync(id);
            if (entry == null) {
                return BadRequest(new { error = "Invalid MenuEntry ID"});
            }
            Context.MenuEntries.Remove(entry);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("RegisterPayment/{amount}")]
        [HttpPost]
        public async Task<IActionResult> RegisterPayment(float amount) {
            Context.Payments.Add(new Payment {
                Amount = amount,
                Time = DateTime.Now
            });
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
