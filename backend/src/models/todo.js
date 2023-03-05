module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        text: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });

    return Todo;
}