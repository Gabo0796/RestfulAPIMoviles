const dbconfig = require('./dbconfig')

const Pool = require('pg').Pool

const pool = new Pool(dbconfig.dbconfig)

/////////////////////////////////////////////////  Estudiantes  /////////////////////////////////////////////////
const getEstudiantes = (request, response) => {
    pool.query('SELECT * FROM estudiante', (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontraron estudiantes' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const getEstudianteByID = (request, response) => {

    const idEstudiante = parseInt(request.params.id)

    pool.query('SELECT * FROM estudiante WHERE idestudiante= $1',
    [idEstudiante], (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontró el estudiante' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const createEstudiante = (request, response) => {
    const { nombre, apellidos, fechaNacimiento, telefono, correoElectronico } = request.body
  
    pool.query('INSERT INTO estudiante (nombre, apellidos, fechanacimiento, telefono, correoelectronico ) VALUES ($1, $2, $3, $4, $5)',
     [nombre, apellidos, fechaNacimiento, telefono, correoElectronico],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al crear un estudiante' })
      }
      else{
        response.status(201).send(`Estudiante agregado`)
      }
    })
  }

  const updateEstudiante = (request, response) => {
    const { id, nombre, apellidos, fechaNacimiento, telefono, correoElectronico } = request.body
  
    pool.query(
      'UPDATE estudiante SET nombre = $1, apellidos = $2, fechaNacimiento = $3, telefono = $4, correoElectronico = $5 WHERE idestudiante = $6',
      [ nombre, apellidos, fechaNacimiento, telefono, correoElectronico, parseInt(id)],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al actualizar estudiante' })
      }
      else{
        response.status(200).send(`Estudiante modificado correctamente. EstudianteID: ${id}`)
      }
      }
    )
  }

  const deleteEstudiante = (request, response) => {
    const {id} = request.body
  
    pool.query('DELETE FROM estudiante WHERE idestudiante = $1', 
      [parseInt(id)], 
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al eliminar Estudiante' })
      }
      else{
        response.status(200).send(`Estudiante eliminado. EstudianteID: ${id}`)
      }
    })
  }


  /////////////////////////////////////////////////  Carreras  /////////////////////////////////////////////////
  const getCarrera = (request, response) => {
    pool.query('SELECT * FROM carrera', (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontraron carreras' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const getCarreraByID = (request, response) => {

    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM carrera WHERE idcarrera= $1',
    [id], (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontró la carrera' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const createCarrera = (request, response) => {
    const { carrera } = request.body
  
    pool.query('INSERT INTO carrera (carrera) VALUES ($1)',
     [carrera],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al crear la carrera' })
      }
      else{
        response.status(201).send(`Carrera agregada`)
      }
    })
  }

  const updateCarrera = (request, response) => {
    const { carrera, id } = request.body
  
    pool.query(
      'UPDATE carrera SET carrera = $1 WHERE idcarrera = $2',
      [ carrera, parseInt(id)],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al actualizar carrera' })
      }
      else{
        response.status(200).send(`Carrera modificada correctamente. CarreraID: ${id}`)
      }
      }
    )
  }

  const deleteCarrera = (request, response) => {
    const {id} = request.body
  
    pool.query('DELETE FROM carrera WHERE idcarrera = $1', 
      [parseInt(id)], 
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al eliminar carrera' })
      }
      else{
        response.status(200).send(`Carrera eliminada. CarreraID: ${id}`)
      }
    })
  }


  /////////////////////////////////////////////////  Cita Matricula  /////////////////////////////////////////////////

  const getCitaMatricula = (request, response) => {
    pool.query('SELECT * FROM citamatricula', (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontraron citas de matricula' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const getCitaMatriculaByID = (request, response) => {

    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM citamatricula WHERE idcita= $1',
    [id], (error, results) => {
      if (error) {
         response.json({ info: 'Error: No se encontró la cita de matricula' })
      }
      else{
          response.status(200).json(results.rows)
      }
    })
  }

  const createCitaMatricula = (request, response) => {
    const { idEstudiante, idCarrera, cita, tiemposesion } = request.body
  
    pool.query('INSERT INTO citamatricula (idestudiante, idcarrera, cita, tiemposesion) VALUES ($1,$2,$3,$4)',
     [parseInt(idEstudiante), parseInt(idCarrera), cita, tiemposesion],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al crear la cita de matricula' })
      }
      else{
        response.status(201).send(`Cita de matricula agregada`)
      }
    })
  }

  const updateCitaMatricula = (request, response) => {
    const { idEstudiante, idCarrera, cita, tiemposesion, idCita } = request.body
  
    pool.query(
      'UPDATE citamatricula SET idestudiante = $1, idcarrera = $2, cita = $3, tiemposesion = $4 WHERE idcita = $5',
      [ parseInt(idEstudiante), parseInt(idCarrera), cita, tiemposesion, parseInt(idCita)],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al actualizar cita de matricula' })
      }
      else{
        response.status(200).send(`Cita de matricula modificada correctamente. CitaMatriculaID: ${idCita}`)
      }
      }
    )
  }

  const deleteCitaMatricula = (request, response) => {
    const {idCita} = request.body
  
    pool.query('DELETE FROM citamatricula WHERE idcita = $1', 
      [parseInt(idCita)], 
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al eliminar la cita de matricula' })
      }
      else{
        response.status(200).send(`Cita de matricula eliminada. CitaMatriculaID: ${idCita}`)
      }
    })
  }

  const infoEstudiante = (request, response) => {
  
    pool.query("select est.idEstudiante, est.nombre || ' ' || est.apellidos nombreCompleto, est.correoelectronico, c.carrera, cit.cita, cit.tiemposesion from Estudiante est Inner Join citamatricula cit on cit.idestudiante = est.idestudiante Inner Join carrera c on c.idcarrera = cit.idcarrera", 
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al consultar la información de estudiantes' })
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }


  module.exports = {
    getEstudiantes,
    getEstudianteByID,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,

    getCarrera,
    getCarreraByID,
    createCarrera,
    updateCarrera,
    deleteCarrera,

    getCitaMatricula,
    getCitaMatriculaByID,
    createCitaMatricula,
    updateCitaMatricula,
    deleteCitaMatricula,

    infoEstudiante

  }