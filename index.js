const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 5000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => { 
    response.json({ info: 'Node.js, Express, and Postgres API' }) 
})




app.get('/Estudiantes', db.getEstudiantes)
app.get('/Estudiantes/:id', db.getEstudianteByID)
app.post('/Estudiantes',db.createEstudiante)
app.put('/Estudiantes',db.updateEstudiante,)
app.delete('/Estudiantes',db.deleteEstudiante)


app.get('/Carrera', db.getCarrera)
app.get('/Carrera/:id', db.getCarreraByID)
app.post('/Carrera',db.createCarrera)
app.put('/Carrera',db.updateCarrera,)
app.delete('/Carrera',db.deleteCarrera)


app.get('/CitaMatricula', db.getCitaMatricula)
app.get('/CitaMatricula/:id', db.getCitaMatriculaByID)
app.post('/CitaMatricula',db.createCitaMatricula)
app.put('/CitaMatricula',db.updateCitaMatricula,)
app.delete('/CitaMatricula',db.deleteCitaMatricula)

app.get('/InfoEstudiantes', db.infoEstudiante)



app.listen(port, () => { 
    console.log(`App running on port ${port}.`)
})
