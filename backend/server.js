const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importa el middleware CORS

const app = express();
const PORT = 3000;

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Ruta para guardar datos en un archivo JSON dentro de la carpeta del servidor
app.post('/guardar-datos', (req, res) => {
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

app.post('/guardar-impuestos', (req, res) => {
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

app.post('/agregar-datos', (req, res) => {
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

app.get('/obtener-datos', (req, res) => {
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

  app.get('/obtener-gastos', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
