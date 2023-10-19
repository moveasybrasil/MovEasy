using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Interface
{
    public interface ICrud
    {
        public static void Create() { }
        public static void Read() { }
        public static void Update() { }
        public static void Delete() { }
    }
}
