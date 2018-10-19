const express = require('express');
const router = express.Router();


router.post('/order',(req, res) => {
	const data = req.body;
	const { nombre_comida } = data;
	let message;
	console.log(data);

	if (nombre_comida) {
		message = agregarComida(data)
	} else {
		message = listarPedidos(data)
	}

	res.json(message)
})

router.post('/test', (req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

router.get('/order',(req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})

router.get('/test', (req, res) => {
	console.log(req.params);
	res.json({message : 'ok'})
})


function agregarComida(data) {

	return {
		"text": `Orden \`${data.nombre_comida}\` agregada a la lista con exito`,
		"attachments": [
				{
						"text":`gracias por hacer tu pedido @${user_name}`
				}
		]
	}
}

function listarPedidos() {
	const pedidos = ["pedido 1", "pedido2"];
	const response = {
		"text": `Orden \`${data.nombre_comida}\` agregada a la lista con exito`,
		"attachments": []
	};

	pedidos.forEach((pedido) => {
		response.attachments.push({text: `${index + 1} - ${order}`})
	})
	response.attachments.push({text: ``})
	response.attachments.push({text: `---fin de la lista---`})

	return response;
}

function enviarPedidos() {

}

module.exports = router;