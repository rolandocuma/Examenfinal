module.exports = (sequelize, Sequelize) => {
    const Huesped = sequelize.define("huespedes", {
        id_huesped: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dpi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        habitacion: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Huesped;
};

