const express = require('express');
const router = express.Router();
const Email = require('email-templates');
const transporter = require('./../utils/nodemailer');

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
	const orders = ["pedido 1 - Jesus Guerrero", "pedido 2 - Otro Ejemplo"]
	const message = enviarPedidos(orders);
	return res.json(message);
})

router.post('/llego', (req, res) => {
	return res.send("@canal Muchachone vamo a come xD");
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
						"text":`gracias por hacer tu pedido @${data.user_name}`
				}
		]
	}
}

function listarPedidos(data) {
	const orders = ["pedido 1", "pedido2"];
	const response = {
		"text": `Orden \`${data.nombre_comida}\` agregada a la lista con exito`,
		"attachments": []
	};

	orders.forEach((order) => {
		response.attachments.push({text: `${index + 1} - ${order}`})
	})
	response.attachments.push({text: ``})
	response.attachments.push({text: `---fin de la lista---`})

	return response;
}

function enviarPedidos(orders) {
	sendOrderEmail('jesusant@mctekk.com', orders,'pedidos');
	const response = {
		"text": `Orden enviada`,
		"attachments": []
	}

	orders.forEach((order) => {
		response.attachments.push({text: `${index + 1} - ${order}`})
	})
	
	response.attachments.push({text: ``})
	response.attachments.push({text: `---gracias por hacer tu pedido.---`})
	return response;
}

function sendOrderEmail(email, orders,template = 'welcome') {
	
	const emailer = new Email({
		message: {
			from: 'jesusant@mctekk.com'
		},
		send: true,
		transport: transporter
	});

	emailer
	.send({
		template: template,
		message: {
			to: email
		},
		locals: {
			name: email,
			link,
			orders
		}
	})
	.then((email) => console.log('message sent'))
	.catch((err) => console.error(err.data));
}

module.exports = router;