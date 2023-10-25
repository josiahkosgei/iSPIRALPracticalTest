using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace iSPIRALPracticalTest.API.Helpers
{
    public class ComputeFactorialHelper
    {
        public static string ComputeFactorialC(int number)
        {
            BigInteger result = new();
            var syncRoot = new object();
            checked
            {
                Parallel.For(
                    1L,
                    number,
                     //new ParallelOptions(),
                     new ParallelOptions()
                     {
                         MaxDegreeOfParallelism = Environment.ProcessorCount
                     },
                       //() => 1L,
                       () => new BigInteger(),

                    (i, loopState, subTotal) => subTotal * i,
                    localState =>
                    {
                        lock (syncRoot)                        
                            result *= localState;
                        
                    }
                    );
            }
            return result.ToString();
        }

        public static string ComputeFactorial(int x)
        {
            // make as many parallel tasks as our dop
            // and make them operate on separate subsets of data
            var paralleltasks =
                Enumerable.Range(1, Environment.ProcessorCount)
                            .Select(i => Task.Factory.StartNew(() => multiply(x, i),
                                         TaskCreationOptions.LongRunning))
                            .ToArray();

            // after all tasks are done...
            Task.WaitAll(paralleltasks);

            // ... take the partial results and multiply them together
            BigInteger finalresult = 1;

            foreach (var partialresult in paralleltasks.Select(t => t.Result))
            {
                finalresult *= partialresult;
            }

            return finalresult.ToString();
        }
        public static BigInteger multiply(long upperbound, int startfrom)
        {
            BigInteger result = 1;

            for (var i = startfrom; i <= upperbound; i += Environment.ProcessorCount)
                result *= i;

            return result;
        }
    }
}
