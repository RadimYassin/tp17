const fs = require('fs');
const protobuf = require('protobufjs');

// 1. Charger la définition
const root = protobuf.loadSync('employee.proto');
const EmployeeList = root.lookupType('Employees');

// 2. Lire le fichier binaire
try {
    const buffer = fs.readFileSync('data.proto');

    // 3. Décoder le buffer
    const message = EmployeeList.decode(buffer);

    // 4. Convertir en objet JS standard
    const object = EmployeeList.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
    });

    console.log("✅ Succès ! Données décodées depuis 'data.proto':");
    console.log(JSON.stringify(object, null, 2));

} catch (err) {
    console.error("❌ Erreur lors du décodage :", err);
}
