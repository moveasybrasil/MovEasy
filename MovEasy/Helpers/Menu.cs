using Google.Protobuf.WellKnownTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovEasy.Helpers
{
    internal class Menu
    {
        public static int MostrarMenuCrud(string menuName, int i = 0)
        {
            Console.Clear();
            Console.WriteLine($" Menu: {menuName}");
            Menu.DivisoriaMenu();
            string[] options = { "Criar", "Ler", "Atualizar", "Deletar" };
            for (int k = 0; k < options.Length; k++)
            {
                if (k == i) Console.Write("----> ");
                else Console.Write("      ");

                Console.WriteLine(options[k]);

            }
            Menu.DivisoriaMenu();
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

        public static void DivisoriaMenu()
        {
            Console.WriteLine("--------------------------------------------------------------");
        }
        public static string GetInput(string msg = "")
        {
            Console.WriteLine(msg);
            return Console.ReadLine();
        }
        
        public static string GetPasswordInput(string msg = "")
        {
            Console.WriteLine(msg);
            return GetPassword();
        }
        public static string GetPassword(string password = "")
        {
            string character = "\b*";

            ConsoleKeyInfo key = Console.ReadKey();
            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZÇ".Contains(key.Key.ToString()))
            {
                Console.Write(character);
                if ((key.Modifiers & ConsoleModifiers.Shift) != 0)
                {
                    password += key.Key.ToString().ToUpper();
                } else
                {
                    password += key.Key.ToString().ToLower();
                }
            } else if ("D0D1D2D3D4D5D6D7D8D9".Contains(key.Key.ToString().ToUpper()))
            {
                Console.Write(character);
                password += key.Key.ToString()[1];
            } else if ("NUMPAD0NUMPAD1NUMPAD2NUMPAD3NUMPAD4NUMPAD5NUMPAD6NUMPAD7NUMPAD8NUMPAD9".Contains(key.Key.ToString().ToUpper()))
            {
                Console.Write(character);
                password += key.Key.ToString()[6];
            } else if (key.Key == ConsoleKey.Spacebar)
            {
                Console.Write(character);
                password += " ";
            } else if (key.Key == ConsoleKey.Backspace)
            {
                Console.Write(" \b");
                if (password.Length > 0)
                {
                    password = password.Remove(password.Length - 1);
                }
            } else if (key.Key == ConsoleKey.Enter)
            {
                Console.WriteLine("");
                return password;
            } else
            {
                Console.Write("\b \b");
            }

            return GetPassword(password);
        }

    }
}
