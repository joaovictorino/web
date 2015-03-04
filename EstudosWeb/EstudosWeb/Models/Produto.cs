using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EstudosWeb.Models
{
    [Table("Produtos")]
    public class Produto
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
    }
}