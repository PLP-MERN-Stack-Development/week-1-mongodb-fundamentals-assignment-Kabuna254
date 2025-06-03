// Use the database
//use plp_bookstore;

// Find all books in a specific genre (e.g., "Programming")
db.books.find({ genre: "Programming" });

// Find books published after a certain year (e.g., after 2010)
db.books.find({ published_year: { $gt: 2010 } });

// Find books by a specific author (e.g., "Harper Lee")
db.books.find({ author: "Harper Lee" });

// Update the price of a specific book (e.g., change "1984" to 11.99)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 11.99 } }
);

// Delete a book by its title (e.g., "The Great Gatsby")
db.books.deleteOne({ title: "The Great Gatsby" });



// ADVANCED QUERIES
// Find books that are both in stock and published after 2010
db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
  });
  
// Use projection to return only title, author, and price fields
db.books.find(
    {},                         // empty filter = all documents
    { title: 1, author: 1, price: 1, _id: 0 } // 1 = include, 0 = exclude _id
);
  
// Sorting by price (ascending)
db.books.find().sort({ price: 1 });
  
// Sorting by price (descending)
db.books.find().sort({ price: -1 });
  
// Pagination — Page 1 (first 5 books)
db.books.find().limit(5);
  
// Pagination — Page 2 (skip first 5 books, then limit next 5)
db.books.find().skip(5).limit(5);



// Average price of books by genre
db.books.aggregate([
    {
      $group: {
        _id: "$genre",               // Group by genre
        averagePrice: { $avg: "$price" }  // Calculate average price
      }
    },
    {
      $sort: { averagePrice: -1 }   // sort by avg price descending
    }
]);


// Find the author with the most books
db.books.aggregate([
    {
      $group: {
        _id: "$author",        // Group by author
        bookCount: { $sum: 1 } // Count number of books per author
      }
    },
    {
      $sort: { bookCount: -1 } // Sort descending by count
    },
    {
      $limit: 1               // Get top author only
    }
]);

  
// Group books by publication decade and count them
db.books.aggregate([
    {
      $project: {
        decade: {
          $concat: [
            { $substr: [ { $divide: ["$published_year", 10] }, 0, 3 ] }, // Extract first 3 chars of year/10
            "0s"
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
]);



// Create an index on the title field
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Use explain() to compare query performance
// Without index (before index creation):
db.books.find({ title: "1984" }).explain("executionStats");

// With index (after index creation):
db.books.createIndex({ title: 1 }); 
db.books.find({ title: "1984" }).explain("executionStats");