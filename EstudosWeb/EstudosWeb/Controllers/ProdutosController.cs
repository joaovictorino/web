using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.ModelBinding;
using System.Web.OData;
using System.Web.OData.Routing;
using EstudosWeb.Models;

namespace EstudosWeb.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using EstudosWeb.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Produto>("Produtos");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ProdutosController : ODataController
    {
        private ProdutosServicosContexto db = new ProdutosServicosContexto();

        // GET: odata/Produtos
        [EnableQuery]
        public IQueryable<Produto> GetProdutos()
        {
            return db.Produtos;
        }

        // GET: odata/Produtos(5)
        [EnableQuery]
        public SingleResult<Produto> GetProduto([FromODataUri] int key)
        {
            return SingleResult.Create(db.Produtos.Where(produto => produto.ID == key));
        }

        // PUT: odata/Produtos(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<Produto> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Produto produto = await db.Produtos.FindAsync(key);
            if (produto == null)
            {
                return NotFound();
            }

            patch.Put(produto);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(produto);
        }

        // POST: odata/Produtos
        public async Task<IHttpActionResult> Post(Produto produto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Produtos.Add(produto);
            await db.SaveChangesAsync();

            return Created(produto);
        }

        // PATCH: odata/Produtos(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Produto> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Produto produto = await db.Produtos.FindAsync(key);
            if (produto == null)
            {
                return NotFound();
            }

            patch.Patch(produto);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(produto);
        }

        // DELETE: odata/Produtos(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            Produto produto = await db.Produtos.FindAsync(key);
            if (produto == null)
            {
                return NotFound();
            }

            db.Produtos.Remove(produto);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProdutoExists(int key)
        {
            return db.Produtos.Count(e => e.ID == key) > 0;
        }
    }
}
