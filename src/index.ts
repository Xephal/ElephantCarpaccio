import * as readline from "readline";

// États et taxes fixes
const etats = [
    { nom: "UT", taxe: 6.85 },
    { nom: "NV", taxe: 8.0 },
    { nom: "TX", taxe: 6.25 },
    { nom: "AL", taxe: 4.0 },
    { nom: "CA", taxe: 8.25 },
];

// Seuils de remises
const remises = [
    { seuil: 50000, taux: 15 },
    { seuil: 10000, taux: 10 },
    { seuil: 7000, taux: 7 },
    { seuil: 5000, taux: 5 },
    { seuil: 1000, taux: 3 },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
console.log("=== Sprint 3 : Menu interactif pour État et Taxes ===");

// Étape 1 : Choisir l'état
function choisirEtat() {
    console.log("\nÉtats disponibles :");
    etats.forEach((etat, index) => {
        console.log(`${index + 1}. ${etat.nom} (Taxe: ${etat.taxe}%)`);
    });

    rl.question("\nChoisissez un état (ID) : ", (etatID) => {
        const index = parseInt(etatID, 10) - 1;
        if (index >= 0 && index < etats.length) {
            const etat = etats[index];
            console.log(`\nÉtat sélectionné : ${etat.nom} (Taxe: ${etat.taxe}%)`);
            demanderQuantite(etat);
        } else {
            console.log("\nID invalide, réessayez !");
            choisirEtat();
        }
    });
}

// Étape 2 : Demander la quantité
function demanderQuantite(etat: { nom: string; taxe: number }) {
    const prixUnitaire = 200; // Prix fixe
    console.log(`\nPrix unitaire : ${prixUnitaire} `);
    rl.question("\nEntrez la quantité : ", (quantiteInput) => {
        const quantite = parseInt(quantiteInput, 10);
        const totalSansTaxes = prixUnitaire * quantite;

        // Calcul des taxes
        const montantTaxe = totalSansTaxes * (etat.taxe / 100);
        const totalAvecTaxes = totalSansTaxes + montantTaxe;

        // Calcul de la remise
        const tauxRemise = calculerRemise(totalAvecTaxes);
        const montantRemise = totalAvecTaxes * (tauxRemise / 100);
        const totalFinal = totalAvecTaxes - montantRemise;

        // Affichage des résultats
        console.log(`\nPrix unitaire : ${prixUnitaire} `);
        console.log(`Quantité : ${quantite}`);
        console.log(`Total sans taxes : ${totalSansTaxes.toFixed(2)} `);
        console.log(`Taxe (${etat.taxe}%) : ${montantTaxe.toFixed(2)} `);
        console.log(`Total avec taxes : ${totalAvecTaxes.toFixed(2)} `);
        console.log(`Remise (${tauxRemise}%) : ${montantRemise.toFixed(2)} `);
        console.log(`Total final : ${totalFinal.toFixed(2)} `);

        rl.close();
    });
}

// Calcul du taux de remise
function calculerRemise(total: number): number {
    for (const remise of remises) {
        if (total >= remise.seuil) {
            return remise.taux;
        }
    }
    return 0; // Pas de remise si le total est en dessous du plus bas seuil
}

// Lancer le programme
choisirEtat();
