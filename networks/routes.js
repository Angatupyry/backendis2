const app = require('express').Router()
const auth = require('../controllers/Auth')
const crudCommon = require('../networks/crud_common')
const controlUsuario = require('../controllers/Usuario')
const controlItem = require('../controllers/Item')
const controlProject = require('../controllers/Project')
const controlGeneric = require('../controllers/GenericList')
const {
    usuario,
    rol,
    permiso,
    prioridad_item,
    fase,
    proyecto,
    item
} = require('../models')

const {
    mwToken
} = require('../middelwares')

app.post('/login', auth.login)
//Comentar hasta que el front consuma el token
//app.use(mwToken)

//#####################################################
//################     USUARIO      ###################
//#####################################################

app.use('/createUser', crudCommon(usuario))
app.get('/listUsers', controlUsuario.list)
app.use('/deleteUser', crudCommon(usuario))
app.use('/updateUser', crudCommon(usuario))

//#####################################################
//##################     ROL      #####################
//#####################################################

app.use('/createRol', crudCommon(rol))
app.use('/listRoles', crudCommon(rol))
app.use('/deleteRol', crudCommon(rol))
app.use('/updateRol', crudCommon(rol))

//#####################################################
//##################    ITEM      #####################
//#####################################################

app.get('/listItems', controlItem.list)
app.use('/createItem', crudCommon(item))
app.use('/deleteItem', crudCommon(item))
app.use('/updateItem', crudCommon(item))

//#####################################################
//##################    PROYECTO      #################
//#####################################################

app.get('/listProjects', controlProject.list)
app.use('/createProject', crudCommon(proyecto))
app.use('/deleteProject', crudCommon(proyecto))
app.use('/updateProject', crudCommon(proyecto))

//#####################################################
//##################    Genéricos      ################
//#####################################################

app.get('/listEstados/:table_name', controlGeneric.listEstados)
app.use('/listPermisos', crudCommon(permiso))
app.use('/listPrioridad', crudCommon(prioridad_item))

app.use('/listFases', crudCommon(fase))

module.exports = app