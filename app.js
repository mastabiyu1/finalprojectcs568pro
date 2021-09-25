import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import { mongoConnect } from "./mongodb/mongoClient.js";
import signUpRouter from "./routes/signUp.js";
import signInRouter from "./routes/signIn.js";
import usersRouter from "./routes/users.js";
import farmersRouter from "./routes/products.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import swaggerJSdOC  from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
// require('dotenv').config();

// import bodyParser from 'body-Parser'
import exphbs from "express-handlebars";
// import path from 'path';

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));



app.use(
  morgan("combined", {
    stream: fs.createWriteStream("./logs.txt"),
  })
);

app.use(cors());
app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);
app.use("/users", usersRouter);
app.use("/farmers", farmersRouter);

const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'm12345678abiyu@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || 'Mypassword@1' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'm12345678abiyu@gmail.com', // TODO: email sender
    to: 'mastabiyu@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('hhhhhhhhh')
        return log('Error occurs');
    }
    return log('Email sent!!!');
})

const options={

  definition :{
    openapi:'3.0.0',
    info:{
      title:'farmers market project',
       version:'1.0.0'
  },
  servers:[

    {
      url:'http://localhost:4000/'
    }
  ]

},
apis:['./app.js']

}

const swaggerspec =swaggerJSdOC(options)
app.use('/api-doc',swaggerui.serve,swaggerui.setup(swaggerspec))

/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /users/:
 *  get:
 *      summary: To get all users  both farmers  and customer from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */


//2

/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /users/farmers/:
 *  get:
 *      summary: To get all farmer from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */

//3
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /users/customers/:
 *  get:
 *      summary: To get all customer from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */


//4  
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /users/farmer/{id}:
 *  get:
 *      summary: To get farmer using id from mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */

//5
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /users/farmers/{id}:
 *  get:
 *      summary: To get farmer Reputation point  using id from mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */

//6
/**
 * @swagger
 * /users/farmer/{id}:
 *  patch:
 *      summary: used to update data to mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */

//7
/**
 * @swagger
 * /users/customer/{id}:
 *  patch:
 *      summary: used to update data to mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */
//8

/**
 * @swagger
 * /users/farmers/{id}:
 *  patch:
 *      summary: used to update Reputation points mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */
//9
/**
 * @swagger
 * /signup/farmer:
 *  post:
 *      summary: used to signupto mongodb
 *      description: this api is used to fetch data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Added Successfully
 */

//10
/**
 * @swagger
 * /signup/customer:
 *  post:
 *      summary: used to signup to mongodb
 *      description: this api is used to fetch data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Added Successfully
 */
//11

/**
 * @swagger
 * /signin/:
 *  post:
 *      summary: used to signin  to mongodb
 *      description: this api is used to fetch data from mongodb
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Added Successfully
 */

//12
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * farmers/:
 *  get:
 *      summary: To get all u farmers   from mongodb
 *      description: this api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */
//13
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * farmers/{id}:
 *  get:
 *      summary: To get  farmer by id   from mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */
//14
/**
 * @swagger
 *  components:
 *      schemas:
 *         user:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * farmers/{id}:
 *  post:
 *      summary: To Add a product   to mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: this api is used to fetch data from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */
//15

/**
 * @swagger
 * /farmers/{id}:
 *  delete:
 *      summary: this api is use to delete  product record from mongodb database
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: data is deleted
 */

/**
 * @swagger
 * /farmers/{id}:
 *  put:
 *      summary: used to update data to mongodb
 *      description: this api is used to fetch data from mongodb
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          200:
 *              description: Updated Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/users'
 */






