import { Sequelize, DataTypes } from "sequelize";
import { env, platform, stdin, stdout } from 'node:process';
import * as readline from "readline";
import { config } from "dotenv";
config();

const dbName = env.SUBD_DB_NAME || 'db';
const dbUser = env.SUBD_DB_USER || 'pguser';
const dbPass = env.SUBD_DB_PASS || 'pgPass';
const dbHost = env.SUBD_DB_HOST || 'localhost';
const dbDialect = env.SUBD_DB_DIALECT || 'postgres';
const syncDatabase = (env.SUBD_DB_SYNC || 'no') === 'yes';

const sequelizeOptions = {
    timestamps: false
};

class DatabaseService {

    sequelize = new Sequelize(
        dbName,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect
        }
    );

    User = this.sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        }
    }, {...sequelizeOptions, tableName: 'users'});

    Customer = this.sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {...sequelizeOptions, tableName: 'customers'});

    Order = this.sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers', // !!! <----
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {...sequelizeOptions, tableName: 'orders'});

    Product = this.sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {...sequelizeOptions, tableName: 'products'});

    OrderProduct = this.sequelize.define('OrderProduct', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'orders', // !!! <----
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'products', // !!! <----
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {...sequelizeOptions, tableName: 'order_product'});

    constructor(){

        if(platform === "win32") {
            const rl = readline.createInterface({
                input: stdin,
                output: stdout
            });

            rl.on("SIGINT", () => {
                process.emit("SIGINT");
            });
        }

        process.on("SIGINT", async () => {
            try {
                await this.sequelize.close();
                console.log('Disconnected From DB Success');
                process.exit(0);
            } catch (error) {
                console.error('Disconnected From DB Error:', error);
                process.exit(1);
            }
        });

        this.sequelize.authenticate().then(() => {
            console.log('Connection With Database Established Successfully.');
            if(syncDatabase) {
                // this.sequelize.sync();
                this.sequelize.sync({force: true});
            }
        }).catch((error) => {
            console.error('Sequelize Connection Error:', error);
        });
    }
}

const db = new DatabaseService();

export default db;