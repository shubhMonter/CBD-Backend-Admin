const SEO = require("./seo.schema");


const Add =async (req,res) =>{
try {
    console.log(req.body);
        const {title,titleContent,keywords,description} = req.body;
        const newSeo = new SEO({
            title,
            titleContent,
            keywords,
            description
        });

        await newSeo.save( err=>{
            if(err){
                console.log(err);
                return res.status(403).send({status:false,messgae:"Something went wrong!!",erorr:err});

            }
            res.send({
                status:true,
                message:"SEO Added",
                data:newSeo
            });  
        })


} catch (err) {
    console.log(err);
    return res.status(403).send({
        status:false,
        messgae:"Something went wrong!!",
        erorr:err});
}
}

const get = async (req,res) =>{
    try {
        const seo = await SEO.find();
        return res.send({status:true,data:seo,message:"Seo data Fetched!"});
    } catch (err) {
        console.log(err);
        return res.status(403).send({
            status:false,
            messgae:"Something went wrong!!",
            erorr:err});
    }
}
const getByTitle = async (req,res) =>{
    try {
        console.log(req.params);
        const seo = await SEO.findOne({title:req.params.title});
        return res.send({status:true,data:seo});
    } catch (err) {
        console.log(err);
        return res.status(403).send({
            status:false,
            messgae:"Something went wrong!!",
            erorr:err});
    }
}

const getById = async (req,res) =>{
    try {
        console.log(req.params);
        const seo = await SEO.findById(req.params.id);
        return res.send({status:true,data:seo});
    } catch (err) {
        console.log(err);
        return res.status(403).send({
            status:false,
            messgae:"Something went wrong!!",
            erorr:err});
    }
}

const edit =  async (req,res) =>{
    try {
        const {id} = req.body;

        const editSeo  = await SEO.findByIdAndUpdate(id,{
            $set :req.body
        },{new:true});
        
        res.send({status:true,message:`updated ${editSeo.title} SEO`,data:editSeo});
        

    } catch (err) {
        console.log(err);
        return res.status(403).send({
            status:false,
            messgae:"Something went wrong!!",
            erorr:err});
    }
}

const deleted = async(req,res) =>{
    
    try {
        const seo = await SEO.findByIdAndDelete(req.params.id);
        res.send({status:true,message:"deleted SEO"});
    } catch (err) {
        console.log(err);
        return res.status(403).send({
            status:false,
            messgae:"Something went wrong!!",
            error:err});
    }
}

module.exports = {
    Add,
    get,
    getById,
    getByTitle,
    edit,
    deleted
}