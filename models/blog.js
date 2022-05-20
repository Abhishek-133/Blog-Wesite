const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const blogSchema=new Schema({
    title:{
        type:String,
        reuired:true
    },
    snippet:{
        type:String,
        reuired:true
        
    },
    
        body:{
            type:String,
            reuired:true
        }
      
},{timestamps:true})
const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;