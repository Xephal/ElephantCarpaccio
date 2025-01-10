import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Données fixes
const prixUnitaire = 200; // Prix unitaire fixe
const taxe = 6.85; // Taxe fixe en pourcentage
const remise = 3; // Remise fixe en pourcentage

console.clear();
console.log("=== Sprint 2 : Prix × Quantité avec Taxes et Remise ===");
console.log(`Prix unitaire : ${prixUnitaire} `);

rl.question("Entrez la quantité : ", (quantiteInput) => {
    const quantite = parseInt(quantiteInput, 10);
    const totalSansTaxes = prixUnitaire * quantite;

    // Calcul des taxes
    const montantTaxe = totalSansTaxes * (taxe / 100);
    const totalAvecTaxes = totalSansTaxes + montantTaxe;

    // Calcul de la remise
    const montantRemise = totalAvecTaxes * (remise / 100);
    const totalFinal = totalAvecTaxes - montantRemise;

    // Affichage des résultats
    console.log(`\nQuantité : ${quantite}`);
    console.log(`Total sans taxes : ${totalSansTaxes.toFixed(2)} `);
    console.log(`Taxe (${taxe}%) : ${montantTaxe.toFixed(2)} `);
    console.log(`Total avec taxes : ${totalAvecTaxes.toFixed(2)} `);
    console.log(`Remise (${remise}%) : ${montantRemise.toFixed(2)} `);
    console.log(`Total final : ${totalFinal.toFixed(2)} `);

    rl.close();
});
