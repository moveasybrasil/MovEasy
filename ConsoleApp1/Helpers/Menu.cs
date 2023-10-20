using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Helpers
{
    internal class Menu
    {
        public static int MostrarMenuCrud(string menuName, int i = 0)
        {
            Console.Clear();
            Console.WriteLine($" Menu: {menuName}");
            Console.WriteLine("-----------------------------------------------");
            string[] options = { "Criar", "Ler", "Atualizar", "Deletar" };
            for (int k = 0; k < options.Length; k++)
            {
                if (k == i) Console.Write("----> ");
                else Console.Write("      ");

                Console.WriteLine(options[k]);

            }
            Console.WriteLine("-----------------------------------------------");
            Console.WriteLine($"\t[!] Use as SETAS para mover, e ENTER para selecionar");
            Console.WriteLine($"\t[!] Use as ESC para sair");

            ConsoleKeyInfo key = Console.ReadKey();
            switch (key.Key)
            {
                case ConsoleKey.UpArrow:
                case ConsoleKey.LeftArrow:
                    i--;
                    if (i < 0) i = options.Length - 1;
                    return MostrarMenuCrud(menuName, i);
                case ConsoleKey.DownArrow:
                case ConsoleKey.RightArrow:
                    i++;
                    if (i >= options.Length) i = 0;
                    return MostrarMenuCrud(menuName, i);
                case ConsoleKey.Enter:
                case ConsoleKey.Spacebar:
                    return i;
                case ConsoleKey.Escape:
                    return -1;
                default:
                    return MostrarMenuCrud(menuName, i);
            }
        }

        public static string GetInput(string msg = "")
        {
            Console.WriteLine(msg);
            return Console.ReadLine();
        }

    }
}
