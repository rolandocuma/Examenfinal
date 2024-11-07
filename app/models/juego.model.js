module.exports = (sequelize, Sequelize) => {
	const Juego = sequelize.define('juego', {
	  id_juego: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  nombre_juego: {
		type: Sequelize.STRING
	  },
	  genero: {
		type: Sequelize.STRING
	  },
	  plataforma: {
		type: Sequelize.STRING
	  },
	  fecha_lanzamiento: {
		type: Sequelize.DATE
	  },
	  precio_alquiler: {
		type: Sequelize.DECIMAL(10, 2)
	  },
	  disponibilidad: {
		type: Sequelize.ENUM('disponible', 'no_disponible'),
	  },
	  fecha_alquiler: {
		type: Sequelize.DATE
	  },
	  nombre_cliente: {
		type: Sequelize.STRING
	  },
	  comentarios: {
		type: Sequelize.TEXT
	  }
	});
  
	return Juego;
  }
  

