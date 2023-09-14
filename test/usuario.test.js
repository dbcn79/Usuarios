const request = require('supertest');
const app = require('../app');
const conexion = require('../database/connection');

beforeAll(async () => {

  //#region Nuevo Usuario
  const newUsuario = {
    nombre: 'Test',
    email: 'test@gmail.com',
    estado: 1
  }
  //#endregion

  //#region Conexión con la base de datos 
   try {
      await conexion.authenticate();
    } catch (error) {
      throw new Error('No se pudo autenticar la conexión a la base de datos');
   }
   //#endregion

   //#region Insertar registro de test en la tabla
   await request(app).post('/api/usuarios').send(newUsuario);
   //#endregion

})

afterAll( async() => {
  conexion.close();
})

//#region Conexión con la base de datos
describe('Conexión Base de datos', () => {

  it('Test de conexión con la base de datos, no tiene que ser nulo', () => {
    expect(conexion).not.toBe(null); 
  });

})
//#endregion

//#region GET lista usuarios
describe('GET lista usuarios', () => {

  let response;
  beforeEach(async() => {
    response = await request(app).get('/api/usuarios').send();
  })

  it('Ruta devuelve un OK', async () => {   
    expect(response.status).toBe(200);
  });

  it('Devuelve una lista de usuarios', async () => {   
    expect(Array.isArray(response.body)).toBe(true);
  });

})
//#endregion

//#region GET usuario
describe('GET usuario', () => {

  let response;
  beforeEach(async() => {
    response = await request(app).get('/api/usuarios/Test').send();
  })

  it('Ruta devuelve un OK', async () => {   
    expect(response.status).toBe(200);
  });

  it('Devuelve el usuario test', async () => {   
    expect(response.body).toBeInstanceOf(Object);
  });

})
//#endregion

//#region PUT usuario
describe('PUT usuario', () => {

  let response;
  beforeEach(async() => {

    //#region Usuario Modificado
    const updUsuario = {
      nombre: 'Test',
      email: 'test79@gmail.com',
      estado: 1
    }
  //#endregion    

    response = await request(app).put('/api/usuarios/Test').send(updUsuario);
  })

  it('Ruta devuelve un OK', async () => {   
    expect(response.status).toBe(200);
  });

  it('Devuelve el usuario modificado', async () => {   
    expect(response.body).toBeInstanceOf(Object);
  });

})
//#endregion

//#region DELETE usuario
describe('DELETE usuario', () => {

  let response;
  beforeEach(async() => {
    response = await request(app).delete('/api/usuarios/Test').send();
  })

  it('Usuario eliminado devuelve un OK', async () => {   
    expect(response.status).toBe(200);
  });

  it('Devuelve el usuario eliminado', async () => {   
    expect(response.body).toBeInstanceOf(Object);
  });

})
//#endregion

