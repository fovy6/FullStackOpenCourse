const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fauvewevers_db_user:${password}@cluster0.bxpdxe2.mongodb.net/test?appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 3) {
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
} else {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6],
  })

  blog.save().then(() => {
    console.log('added '+ blog.title + ' by ' + blog.author + ' to the database')
    mongoose.connection.close()
  })
}
