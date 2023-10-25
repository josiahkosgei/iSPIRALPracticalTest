using System.ComponentModel;

namespace iSPIRALPracticalTest.API.Models
{
    public enum ResponseEnum
    {
        [Description("00:Successful")]
        Successful,

        [Description("01:Unsuccessful service call")]
        UnSuccessful,

    }


    public static class EnumExtensions
    {
        public static (string code, string desc) EnumFormat(this ResponseEnum val)
        {
            DescriptionAttribute[] attributes = (DescriptionAttribute[])val
               .GetType()
               .GetField(val.ToString())
               .GetCustomAttributes(typeof(DescriptionAttribute), false);

            var description = attributes.Length > 0 ? attributes[0].Description : string.Empty;

            var dscSPlit = description.Split(':');
            if (dscSPlit.Count() > 1)
                return (dscSPlit[0], dscSPlit[1]);

            return ("777", "Error description not properly formatted");

        }
    }
}
