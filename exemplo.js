//  http://localhost:3000/users


const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

// app.get('/users', (request, response) =>{
//     // const name = request.query.name
//     // const age = request.query.age
//     // console.log(name, age)

//     const {name, age, profission} = request.query //Destructuring assignment
//     return response.json({name, age, profission})

//     // return response.send('Hello Express')
// } )
//===========================================================================================================================================
// app.get('/users/:id', (request, response) =>{    
//     const {id} = request.params
//     console.log(id)
//     //return response.send('Hello Express')

//     return response.json({id})
// } )
//===========================================================================================================================================
/*
        - Query params => meusite.com/users?name=edgar&age=41  //FILTROS
        - Route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO 
        - Request Body =>  {"name":"Edgar", "age":41}  
        
        - GET        => Buscar informação no back-end
        - POST       => Criar informação no back-end
        - PUT /PATCH => Atualizar /Alterar  informação no back-end
        - DELETE     => Deletar informação no back-end

        - Middleware => INTECEPTADOR => Tem o poder de parar ou alterar dados da requisição
        

*/

//===========================================================================================================================================

// const users = []
// app.get('/users', (request, response) => {

//     return response.json({ users })
// })

// app.post('/users', (request, response) => {
//     const { name, age } = request.body

//     //console.log(uuid.v4())

//     const user = { id: uuid.v4(), name, age }

//     users.push(user)

//     return response.status(201).json(user)

// })

// app.put('/users/:id', (request, response) => {
//     const { id } = request.params
//     const { name, age } = request.body
//     const updatedUser = { id, name, age }
//     const index = users.findIndex(user => user.id === id)
//     if (index < 0) {
//         return response.status(404).json({ message: "User Not Found" })
//     }
//     users[index] = updatedUser
//     return response.json(updatedUser)
// })

// app.delete('/users/:id', (request, response) => {
//     const { id } = request.params
//     const index = users.findIndex(user => user.id === id)
//     if (index < 0) {
//         return response.status(404).json({ message: "User Not Found" })
//     }
//     users.splice(index, 1)
//     return response.status(204).json()

// })

// app.listen(port, () => {
//     console.log(`😎 Server Started om Port ${port} 😎`)
// })

//===========================================================================================================================================

// CODIGO ENCURTADO MIDDLEWARE

const users = []

const checkUserId = (request, response, next)  => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ Error: "User Not Found" })    
    }
    request.userIndex = index 
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

    return response.json({ users })
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    //console.log(uuid.v4())

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {    
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId 
    const updatedUser = { id, name, age }
   
    users[index] = updatedUser
    return response.json(updatedUser)
})

app.delete('/users/:id',checkUserId, (request, response) => {    
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()

})

app.listen(port, () => {
    console.log(`😎 Server Started om Port ${port} 😎`)
})

