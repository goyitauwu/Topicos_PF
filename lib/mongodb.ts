import { MongoClient, Db, Collection } from 'mongodb';

class MongoDB {
  private client: MongoClient;
  private db: Db | null;

  constructor() {
    const uri = 'mongodb+srv://jahir:1234@cluster0.xnab2gr.mongodb.net/proyecto_web'; // URL de conexión a MongoDB
    this.client = new MongoClient(uri);
    this.db = null; // Variable para almacenar la instancia de la base de datos

    // Conectarse a MongoDB al instanciar la clase
    this.connect();
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db('proyecto_web');
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
    }
  }

  async insertUser(user: any, userSchema: any): Promise<void> {
    try {
      if (!this.db) {
        throw new Error('La conexión a la base de datos no ha sido establecida.');
      }

      const usersCollection: Collection = this.db.collection('Users');
      const userJSON = JSON.stringify(userSchema); // Convertir el esquema a JSON
      await usersCollection.insertOne({ ...user, userSchema: JSON.parse(userJSON) });
      console.log('Usuario insertado correctamente en MongoDB');
    } catch (error) {
      console.error('Error al insertar el usuario en MongoDB:', error);
    }
  }

  async findOne(filter: object, collectionName: string): Promise<any> {
    try {
      if (!this.db) {
        throw new Error('La conexión a la base de datos no ha sido establecida.');
      }

      const collection: Collection = this.db.collection(collectionName);
      const result = await collection.findOne(filter);
      return result;
    } catch (error) {
      console.error('Error al buscar el documento en MongoDB:', error);
      throw error;
    }
  }
}

export default MongoDB;

