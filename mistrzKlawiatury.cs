using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing.Text;


namespace klawiatura
{
    class native
    {

        static void Main(string[] args)
        {
            
            
            while (true)
            {
                DateTime start = DateTime.Now;
                Console.Clear();
                StringBuilder sb = new StringBuilder();
                StringBuilder test = new StringBuilder();

                string napisy = "mama baba";
                StringBuilder wielkiesb = new StringBuilder(napisy);
                List<char> lista = new List<char>();
                Console.WriteLine("                          " + napisy);
                for (int i = 0; i < napisy.Length; i++)
                {
                    
                    char x = Console.ReadKey().KeyChar;
                    
                    // zla litera
                    if (x != napisy[i])
                    {
                        
                        Console.Clear();
                        //Console.WriteLine("Wpisz: " + napisy);
                        i--;
                        //Console.Write(sb);
                        Console.WriteLine("                          " + wielkiesb);
                    } //dobra litera
                    else {
                        Console.Clear();
                        lista.Add(x);
                        sb.Append(lista[i]);
                        //List<char> wielkie= new List<char>(lista);
                        //wielkie.Add(Char.ToUpper(napisy[i]));
                        wielkiesb[i]=(Char.ToUpper(napisy[i]));
                        Console.WriteLine("                          " + wielkiesb);

                        



                        //Console.WriteLine("Wpisz: " + napisy);
                        //Console.Write(sb);
                    }
                    

                }
                DateTime stop = DateTime.Now;
                TimeSpan czas = stop-start;
                Console.WriteLine("Zajelo: {0} sekund", czas.TotalSeconds);
                Console.WriteLine("Enter to continue");
                Console.ReadKey();
                //foreach (var item in lista)
                //{
                //    test.Append(item);
                //}
                //Console.WriteLine("");
                //Console.WriteLine(test);

                //if (napisy.Equals(test.ToString()))
                //{
                //    Console.WriteLine("Gratulacje wypisales: " + napisy);
                //}
                //else
                //{
                //    Console.WriteLine("zle wpisales");
                //}

                //Console.ReadKey();
            }
        }
    }
}
