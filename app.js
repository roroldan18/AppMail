const express = require('express');
const handlebars = require('express-handlebars');
const nodemailer = require('nodemailer'); // PASO 1: Paquete para el envio de mail

const app = express();



app.use(express.urlencoded()); //ESTO LO USO EN VEZ DEL JSON PARA RECIBIR DATOS DE UN FORMULARIO


//Estas dos lineas son para usar el Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//CREO UNA CARPETA QUE EL SERVIDOR VA A ACCEDER DESDE UN GET - ENTONCES PUEDO ACCEDER A LOS ARCHIVOS QUE PONGA AHI
app.use(express.static('public'))

const port = process.env.PORT ? process.env.PORT : 3000;


app.post('/contacto', async (req, res)=>{

//PASO 2 : Creo el transporte
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tucorreo@gmail.com',
            pass: 'tuclave'
        }
    });

    //Paso 3: Agrego el mensaje a incorporar al ciuertpo del mail
    const mensaje = "Tenes un contacto nuevo";
    const mailOptions = {
        from: 'tucorreo@gmail.com',
        to: 'mi-amigo@yahoo.com.ar',
        subject: 'Asunto del correo',
        text: mensaje
    };

//Paso 4: Enviamos el mail
    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.render('respuestaError', {})
        }
        else {
            console.log('Email enviado: '+ info.response);
            res.render('respuestaContacto', {nombre: req.body.nombre, email: req.body.email, mensaje: req.body.mensaje});
        }
    });
});

const productos =[
    {
        nombre: 'manzana',
        precio: 15
    },
    {
        nombre: 'peras',
        precio: 20
    },
    {
        nombre: 'kiwi',
        precio: 12
    },
    {
        nombre: 'palta',
        precio: 200
    },
]

app.get('/productos', (req, res) => {

    res.render('listaProductos', {productos: productos});
});

app.get('/compra', (req, res) => {

    res.render('formCompra');
});


app.post('/compraEnviada', async (req, res)=>{

    

    //PASO 2 : Creo el transporte
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tucorreo@gmail.com',
                pass: 'tuclave'
            }
        });
    
        //Paso 3: Agrego el mensaje a incorporar al ciuertpo del maoñ
    
        const mensaje = "Compra Exitosa";
        const mailOptions = {
            from: 'tucorreo@gmail.com',
            to: 'mi-amigo@yahoo.com.ar',
            subject: 'Asunto del correo',
            text: mensaje
        };
    
    //Paso 4: Enviamos el mail
        await transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.render('respuestaError', {})
            }
            else {
                console.log('Email enviado: '+ info.response);
                res.render('respuestaCompra', {nombre: req.body.nombre, cantidad: req.body.cantidad});
            }
        });
    });






app.listen(port, () =>{
    console.log('Servidor escuchando en el puerto '+ port)
});
