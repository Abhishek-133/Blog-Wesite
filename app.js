const express=require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');

const { render } = require('express/lib/response');
const blogRoutes=require('./routes/blogRoutes');
//express app
const app=express();

//connection to mongodb
const dbURI='mongodb+srv://netninja:test1234@nodetuts.zs497.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));



//register engine
app.set('view engine','ejs');



//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/add-blog',(req,res)=>{
const blog=new Blog({
    title:'new blog2',
    snippet:'about my new blog',
    body:'more about my new blog'
});
blog.save()
.then((result)=>{
    res.send(result)
})
.catch((err)=>{
    console.log(err);
})
})

//now retrieve all the data from the database
// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('62808fdc7b2a8d7701737db9')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });


// app.get('/',(req,res)=>{
//     //res.send('<p>Home page</p>');
// const blogs=[
//     {title:'Yoshi finds eggs',snippet:'Lorem ipsum dolor sit amet consectetur'},
//     {title:'Yoshi finds eggs',snippet:'Lorem ipsum dolor sit amet consectetur'},
//     {title:'Yoshi finds eggs',snippet:'Lorem ipsum dolor sit amet consectetur'}
// ];
// res.render('index',{title:'Home',blogs});
//     res.render('index',{title:'Home'});
// });

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    //res.send('<p>About page</p>');
    res.render('about',{title:'About'});
});

//blog routes
app.use(blogRoutes);


//404 page
app.use((req,res)=>{
    res.render('404',{title:'404'});
})