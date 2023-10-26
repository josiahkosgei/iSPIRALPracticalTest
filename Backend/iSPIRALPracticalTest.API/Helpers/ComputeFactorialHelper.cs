using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace iSPIRALPracticalTest.API.Helpers
{
    /// <summary>
    /// Helper class for Factorial Computations
    /// </summary>
    public class ComputeFactorialHelper
    {
        /// <summary>
        /// Helper function for factorial computation
        /// </summary>
        /// <param name="x"></param>
        /// <returns></returns>
        public static string ComputeFactorial(int x)
        {
            // invoke as many parallel tasks as possible
            var paralleltasks =
                Enumerable.Range(1, Environment.ProcessorCount)
                            .Select(i => Task.Factory.StartNew(() => productOfNumbers(x, i),
                                         TaskCreationOptions.LongRunning))
                            .ToArray();

            // merge when all the tasks
            Task.WaitAll(paralleltasks);

            // while tasks are executing take the partial results and multiply them together
            BigInteger finalresult = 1;

            foreach (var partialresult in paralleltasks.Select(t => t.Result))
            {
                finalresult *= partialresult;
            }

            return finalresult.ToString();
        }

        /// <summary>
        /// Multiply the two numbers
        /// </summary>
        /// <param name="endingPoint"></param>
        /// <param name="startingPoint"></param>
        /// <returns></returns>
        public static BigInteger productOfNumbers(long endingPoint, int startingPoint)
        {
            BigInteger result = 1;

            for (var i = startingPoint; i <= endingPoint; i += Environment.ProcessorCount)
                result *= i;

            return result;
        }
    }
}
