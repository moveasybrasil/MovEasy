namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                switch(Menu.MostrarMenuCrud("Usuario"))
                {
                    case 0:
                        UsuarioModel.Create();
                        break;
                    case 1: 
                        UsuarioModel.Read(); 
                        break;
                    case 2:
                        UsuarioModel.Update();
                        break;
                    case 3:
                        UsuarioModel.Delete();
                        break;
                    case -1:
                        return;
                }
            }
        }
    }
}