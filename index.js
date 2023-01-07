
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const orders = []

const checkOrderId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(people => people.id === id)
    if (index < 0) {
        return response.status(404).json({ Error: "People Not Found" })    
    }
    request.peopleIndex = index
    request.peopleId = id

    next()
}

const allRequests = (request, response, next) => {
    const methods =  request.method
    const urls = request.url
    console.log(`${methods} ${urls}`)
    next()
}

app.get('/orders',allRequests, (request, response) => {   
    return response.json({orders})
})

app.post('/orders',allRequests, (request, response) => {
    const status = "Em Preparação"
    const {order, clientName, price} = request.body
    const people = { id: uuid.v4(), order, clientName, price, status}
    orders.push(people)
    return response.status(201).json(people)
})

app.get("/orders/:id",allRequests, checkOrderId, (request, response) => {
    const index = request.peopleIndex

    const people = orders[index]

    return response.json(people)
});

app.put('/orders/:id', allRequests, checkOrderId, (request, response) => {
    const {order, clientName, price} = request.body
    const index = request.peopleIndex
    const id = request.peopleId
    const status = "Em Preparação"
    const updatedOrder = { id, order, clientName, price, status}

    orders[index] = updatedOrder
    return response.json(updatedOrder)
})

app.patch('/orders/:id', allRequests, checkOrderId, (request, response) => {
    const {order, clientName, price} = request.body
    const id = request.peopleId
    const index = request.peopleIndex
    const status = "Pronto"
    const updatedOrder = {id, order, clientName, price, status}  

    orders[index] = updatedOrder
    return response.json(updatedOrder)

})

app.delete('/orders/:id',allRequests, checkOrderId, (request, response) => {
    const index = request.peopleIndex
    orders.splice(index, 1)
    return response.status(204).json()
})







app.listen(port, () => {
    console.log(`😎 Server Started om Port ${port} 😎`)
})


// [
//     {
//       id: "ac3ebf68-e0ad-4c1d-9822-ff1b849589a8",
//       order: "X- Salada, 2 batatas grandes, 1 coca-cola",
//       clienteName:"José", 
//       price: 44.50,
//       status:"Em preparação"
//     }
//   ];

