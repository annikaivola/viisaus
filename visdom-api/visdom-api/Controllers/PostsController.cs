﻿using NeoSmart.Unicode;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using visdom_api.Models;

namespace visdom_api.Controllers
{
    public class PostsController : ApiController
    {
        private visdomdbEntities db = new visdomdbEntities();

        // GET: api/Posts
        public IQueryable<Post> GetPosts()
        {
            return db.Posts.OrderByDescending(p => p.Time);
        }

        // GET: api/Posts/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(string id)
        {
            Dictionary<string, SingleEmoji> emojionary = new Dictionary<string, SingleEmoji>()
            {
                { "unicorn", Emoji.UnicornFace},
                { "rofl", Emoji.RollingOnTheFloorLaughing},
                { "beer", Emoji.ClinkingBeerMugs},
                { "cool", Emoji.SmilingFaceWithSunglasses},
                { "poop", Emoji.PileOfPoo},
                { "mindblown", Emoji.ExplodingHead},
                { "praise", Emoji.RaisingHands},
                { "hearteyes", Emoji.SmilingFaceWithHeartEyes},
            };

            SingleEmoji emoji = emojionary[id];

            IQueryable<Post> posts = db.Posts;

            List<Post> returnPosts = new List<Post>();

            foreach (Post post in posts)
            {
                if (post.Emoijtag == emoji.ToString())
                {
                    returnPosts.Add(post);
                }
            }

            if (returnPosts.AsQueryable() == null)
            {
                return NotFound();
            }

            return Ok(returnPosts.OrderByDescending(p => p.Vote).AsQueryable());
        }

        // PUT: api/Posts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPost(int id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Console.WriteLine($"Property: {validationError.PropertyName} Error: {validationError.ErrorMessage}");
                    }
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Posts
        [ResponseType(typeof(Post))]
        public IHttpActionResult PostPost(Post post)
        {

            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }

            post.Time = DateTime.Now;
            db.Posts.Add(post);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PostExists(post.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Console.WriteLine($"Property: {validationError.PropertyName} Error: {validationError.ErrorMessage}");
                    }
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }
    }
}