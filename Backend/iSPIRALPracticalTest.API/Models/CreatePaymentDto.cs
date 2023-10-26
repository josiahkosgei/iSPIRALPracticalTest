namespace iSPIRALPracticalTest.API.Models
{
    public class CreatePaymentDto
    {
        
        public string payment_id { get; set; }
        public int customer_id { get; set; }
        public int order_id { get; set; }
        public float payment_amount { get; set; }
        public string payment_method { get; set; }
        public string currency { get; set; }
    }
}
