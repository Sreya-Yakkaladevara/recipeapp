const express = require('express');
const route = express.Router();
const {recipemodel} = require("../schema/recipe");
const multer  = require('multer')
const {Auth} = require('../auth/auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/image')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename )
  }
})

const upload = multer({ storage: storage })

/**
 * @swagger
 * tags:
 *     name : recipe
 *     description: All the api routes to recipes
 */

/**
 * @swagger
 * /:
 *      get:
 *           summary: get the all the recipe data 
 *           tags : [recipe]
 *           parameters:
 *             - in : title
 *               name : recipe name
 *               required : true
 *               type : string
 *           responses:
 *               200:
 *                 description: List of the all recipes
 *                 content:
 *                  application/json:
 *                    schema:
 *                      type: string
 *                         
 *               400:
 *                 description: invaild request
*/

route.get('/',async (req,res)=>{
    const recipe = await recipemodel.find()
    res.send({message:recipe});
});

/**
 * @swagger
 * /{id}:
 *    get:
 *      summary: get the all the recipe data 
 *      tags : [recipe]
 *      parameters :
 *         - in : _id
 *           name : _id
 *           required : true
 *           type : string
 *      responses : 
 *        200 :
 *          description :
 *            get the particular data
 *        400 :
 *          description : 
 *             In valid id
 * 
 *  
 */

route.get('/:id',async (req,res)=>{
    const recipe = await recipemodel.findById(req.params.id);
    res.send({message:recipe});
});


/**
 * @swagger
 * /addrecipe:
 *    post:
 *      summary: get the all the recipe data 
 *      tags : [recipe]
 *      requestBody:
 *        required : true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               title:
 *                  type : string
 *                  required : true
 *               instruction:
 *                  type : string
 *                  required : true
 *               ingredients:
 *                  type : string
 *                  required : true
 *               time:
 *                  type : string
 *                  required : true
 *      responses :
 *        200:
 *          description : datstored in DB
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */


route.post('/addrecipe',upload.single('file'),Auth,async(req,res)=>{
    console.log(req.user)
    const {title,ingredients,instructions,time,file} = req.body;

    const recipe =  recipemodel({title,ingredients,instructions,time,file:req.file.filename,createdBy:req.user.id,user:req.user.email})
    await recipe.save()
    res.send({message:recipe})
});


/**
 * @swagger
 * /{id}:
 *     patch:
 *       summary: edit 
 *       tags : [recipe]
 *       parameters:
 *          - name : _id
 *            in : id
 *            required: true
 *            type : string
 *       responses:
 *         200:
 *           description : data edited succesfully
 *         400:
 *           description : Id not foun
 * 
*/


route.patch('/:id',upload.single('file'),async(req,res)=>{
    const {title,ingredients,instructions,time}  = req.body;
    try{
        const recipe = await recipemodel.findById({_id:req.params.id});
        if(recipe){

            const recipe = await recipemodel.findByIdAndUpdate(req.params.id,{...req.body,file:req.file.filename});
            res.send("data edited succesfully")
        }
    }
    catch{
        res.status(404).send({message:"Id is not found"})
    }
});



/**
 * @swagger
 * /{id} :
 *    delete:
 *      summary: delete specific id
 *      tags : [recipe]
 *      parameters:
 *         - name : _id
 *           in : id
 *           required : true
 *           type : string
 *      responses:
 *        200 : 
 *          description : data deleted successfully
 *        400 : 
 *          description : Invalid ID
 */



route.delete('/:id',async(req,res)=>{
    const recipe = await recipemodel.findByIdAndDelete({_id:req.params.id});
    res.send("data delete succesfully")
});

module.exports={
    route
}
