using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iSPIRALPracticalTest.Data.Entities
{
    public class Payment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int payment_id { get; set; }
        public int customer_id { get; set; }
        public int order_id { get; set; }
        public string payment_date { get; set; }
        public float payment_amount { get; set; }
        public string payment_method { get; set; }
        public string payment_status { get; set; }
        public string currency { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
