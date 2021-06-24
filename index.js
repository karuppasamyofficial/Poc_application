const Hapi = require('@hapi/hapi');
const sequelize = require('./utils/database');
const user = require('./models/user.js');
const email = require('./models/email.js');
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



    
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: async (request, h) => {
                try {
                    const userlist = await user.findAll();

                    return { data: userlist }
                }
                catch (error) {


                }

            }
        },

        {
            method: 'GET',
            path: '/hello/{id}&{name}',
            handler: function (request, h) {
                console.log("query parameter", request.params.id, request.params.name);
                return h.response(request.params.name).code(401);
            },
            //     options: {
            //         validate: {
            //             params: {
            //              name:   Joi.string()
            // .alphanum()
            // .min(3)
            // .max(30)
            // .required()
            //             }
            //         }
            //     }
        },
        {
            method: 'POST',
            path: '/userRegistration',
            handler:async (request, h) => {
                console.log("registerUser", request.payload);

                try{
                    const userCreation = await user.create({ first_name:"karuppasamy",
                    last_name:"bala",
                    dob:"1996-04-15",
                    gender:"male" });
                 const emaildsk= await  email.create({email_id:"karupu@gmail.com",userId:userCreation.id});
               return "success"
               
                }
                catch(error){}
               



            //     user.create({

            //         first_name:"karuppasamy",
            //         last_name:"bala",
            //         dob:"1996-04-15",
            //         gender:"male"
            // }).then((userresu)=>{
            //         console.log("userresu",userresu.id);
            //         // userresu.createemail()
            //         email.create({email_id:"karupu@gmail.com",userId:userresu.id})
                    
            //     }).catch((err)=>{
            //         console.log("resuts",err);
            
            //     });
               
            },

        }



    ]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection....................", err);
    process.exit(1);
});
init();