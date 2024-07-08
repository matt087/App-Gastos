const { Router } = require('express');
const router = Router();

const user = require('../models/user');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) =>  res.send('Hello'))

router.post('/register', async (req, res) => {
    const { nombre, cedula, email, password, ingreso, egreso } = req.body;
    const newUser = new user ({nombre, cedula, email, password, ingreso, egreso});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'thisIsAsecretKey');
    res.status(200).json({_id: newUser._id});
})

router.post('/login', async(req, res) =>{
    const {email, password}= req.body;
    const userFind = await user.findOne({email});
    if(!userFind) return res.status(401).send("El correo no existe")
    if(userFind.password !== password) return res.status(401).send("incorrecta")
    const token = jwt.sign({ id: user._id}, 'thisIsAsecretKey');
    return res.status(200).json({token});
})

router.put('/update', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const userFind = await user.findOne({ email });
        if (!userFind) return res.status(404).send("Usuario no encontrado");
        console.log(userFind.password);
        userFind.password = newPassword;
        console.log(userFind.password);
        await userFind.save();
        res.status(200).send("Contraseña actualizada correctamente");
    } catch (error) {
        res.status(500).send("Error al actualizar la contraseña");
    }
})

router.delete('/delete', async (req, res) =>{
    const {email, password} = req.body;
    try
    {
        const userFind = await user.findOne({ email });
        if (!userFind) return res.status(401).send("El correo no existe");
        if (userFind.password !== password) return res.status(401).send("Contraseña incorrecta");

        
        await userFind.deleteOne({_id: user._id});
        res.status(200).send("El usuario ha sido eliminado");
    }
    catch(error)
    {
        res.status(500).send("La eliminación ha sido incorrecta");
    }
    
})

//respuesta al servidor con arreglo de tareas
router.get('/task',(req, res) =>{
    res.json([
        {
            cedula:"1750568188",
            nombre: 'Brenda Simbana',
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula:"1725578775",
            nombre: 'Mateo Montenegro',
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula:"1709973588",
            nombre: 'Juan Donoso',
            date:"2024-11-17T20:39:05.211Z"
        }
    ])
})

//Se ejecuta primero la ruta a continuación se ejecuta la funcion 
router.get('/private-task', verifyToken,(req, res) =>{
    res.json([
        {
            cedula:"1750568188",
            nombre: 'Brenda Simbana',
            email: "bsimbana@gmail.com",
            ingreso: 40000,
            egreso: 10000,
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula:"1725578775",
            nombre: "Mateo Montenegro",
            email: "emontenegroc@gmail.com",
            ingreso: 42000,
            egreso: 12000,
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            cedula:"1709973588",
            nombre: "Juan Donoso",
            email: "jdonosoo@gmail.com",
            ingreso: 32000,
            egreso: 10000,
            date:"2024-11-17T20:39:05.211Z"
        }
    ])
})

router.post('/guardar-datos', (req, res) => {
    const data = req.body;
    const jsonData = JSON.stringify(data);
  
    // Ruta donde se guardará el archivo JSON dentro de la carpeta del servidor
    const filePath = path.join(__dirname, 'data', 'datos.json');
  
    // Escribir los datos en el archivo JSON
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        res.status(500).send('Error al guardar los datos');
      } else {
        console.log('Datos guardados correctamente en el archivo:', filePath);
        // Enviar respuesta JSON indicando éxito
        res.json({ message: 'Datos guardados correctamente' });
      }
    });
  });
  
  router.post('/guardar-impuestos', (req, res) => {
    const data = req.body;
    const jsonData = JSON.stringify(data);
  
    const filePath = path.join(__dirname, 'data', 'impuestos.json');
  
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err);
        res.status(500).send('Error al guardar los datos');
      } else {
        console.log('Datos guardados correctamente en el archivo:', filePath);
        // Enviar respuesta JSON indicando éxito
        res.json({ message: 'Datos guardados correctamente' });
      }
    });
  });
  
  router.post('/agregar-datos', (req, res) => {
    const data = req.body;
    const jsonData = JSON.stringify(data, null, 2);
  
    // Ruta donde se guardará el archivo JSON dentro de la carpeta del servidor
    const filePath = path.join(__dirname, 'data', 'gastos.json');
  
    // Leer datos actuales del archivo
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        res.status(500).send('Error al guardar los datos');
        return;
      }
  
      let currentData = [];
  
      try {
        currentData = JSON.parse(fileData);
      } catch (parseError) {
        console.error('Error al parsear JSON existente:', parseError);
      }
  
      if (!Array.isArray(currentData)) {
        console.error('Los datos existentes no son un arreglo válido:', currentData);
        res.status(500).send('Error al procesar los datos existentes');
        return;
      }
  
      currentData.push(data);
  
      // Escribir los datos actualizados en el archivo JSON
      fs.writeFile(filePath, JSON.stringify(currentData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error al escribir en el archivo:', writeErr);
          res.status(500).send('Error al guardar los datos');
        } else {
          console.log('Datos agregados correctamente en el archivo:', filePath);
          res.json({ message: 'Datos agregados correctamente' });
        }
      });
    });
  });
  
  router.get('/obtener-datos', (req, res) => {
      const filePath = path.join(__dirname, 'data', 'datos.json');
    
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          res.status(500).send('Error al leer los datos');
        } else {
          try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Enviar datos como respuesta JSON
          } catch (error) {
            console.error('Error al parsear JSON:', error);
            res.status(500).send('Error al procesar los datos');
          }
        }
      });
    });
  
router.get('/obtener-gastos', (req, res) => {
      const filePath = path.join(__dirname, 'data', 'gastos.json');
    
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          res.status(500).send('Error al leer los datos');
        } else {
          try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Enviar datos como respuesta JSON
          } catch (error) {
            console.error('Error al parsear JSON:', error);
            res.status(500).send('Error al procesar los datos');
          }
        }
      });
    });

module.exports = router;

//En la funcion la cabecera se la debe definir en el postman dando un valor, en este caso se debe dar el token 
function verifyToken(req, res, next){
    if(!req.headers.authorizacion){
        console.log("1");
        return res.status(401).send('Unathorize Request 1');
    }
    //se coloca por defecto la palabra bearer espacio y el token obtenido
    //dividir el string recibido 
    const token = req.headers.authorizacion.split(' ')[1]// crea un arreglo ['Bearer', 'token']
     if (token == 'null'){
        console.log("2");
        return res.status(401).send('Unathorize Request');
     }

     const payload = jwt.verify(token, 'thisIsAsecretKey') //Contenido del token
     //console.log(payload)// muestra los datos contenidos en el payload deberia ser el id del usuario
     req.userId = payload._id ;
     next();
}