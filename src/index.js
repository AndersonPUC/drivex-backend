const PORT = process.env.PORT || 1010
const createDatabase = require('./sequelize/createDatabase.js')
const createApp = require('./createApp')

async function init() {
	try {
		const database = await createDatabase()

		if (!database) return

		console.log(`Inicializando API - PORTA: ${PORT}.`)
		const app = createApp({ database })

		app.listen(PORT, () => {
            console.log(`API inicializada - PORTA: ${PORT}.`)
        })
	} catch (error) {
		console.error(error)
	}
}

init()