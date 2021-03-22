using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuEntries_Menus_MenuID",
                table: "MenuEntries");

            migrationBuilder.RenameColumn(
                name: "MenuID",
                table: "MenuEntries",
                newName: "MenuId");

            migrationBuilder.RenameIndex(
                name: "IX_MenuEntries_MenuID",
                table: "MenuEntries",
                newName: "IX_MenuEntries_MenuId");

            migrationBuilder.AlterColumn<int>(
                name: "MenuId",
                table: "MenuEntries",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuEntries_Menus_MenuId",
                table: "MenuEntries",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuEntries_Menus_MenuId",
                table: "MenuEntries");

            migrationBuilder.RenameColumn(
                name: "MenuId",
                table: "MenuEntries",
                newName: "MenuID");

            migrationBuilder.RenameIndex(
                name: "IX_MenuEntries_MenuId",
                table: "MenuEntries",
                newName: "IX_MenuEntries_MenuID");

            migrationBuilder.AlterColumn<int>(
                name: "MenuID",
                table: "MenuEntries",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuEntries_Menus_MenuID",
                table: "MenuEntries",
                column: "MenuID",
                principalTable: "Menus",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
