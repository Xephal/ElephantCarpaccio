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

// Séquences ANSI pour le style
const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";
const ANSI_BLUE = "\x1b[34m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_YELLOW = "\x1b[33m";
const ANSI_RED = "\x1b[31m";
const ANSI_CYAN = "\x1b[36m";
const ANSI_MAGENTA = "\x1b[35m";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();
console.log(`${ANSI_BOLD}${ANSI_BLUE}=== Sprint 5 : CLI Stylisé ===${ANSI_RESET}`);

// Étape 1 : Choisir l'état
function choisirEtat() {
    console.log(`${ANSI_YELLOW}\nÉtats disponibles :${ANSI_RESET}`);
    etats.forEach((etat, index) => {
        console.log(`${ANSI_GREEN}${index + 1}. ${etat.nom} (Taxe: ${etat.taxe}%)${ANSI_RESET}`);
    });

    rl.question(`${ANSI_BLUE}\nChoisissez un état (ID) : ${ANSI_RESET}`, (etatID) => {
        const index = parseInt(etatID, 10) - 1;
        if (isNaN(index) || index < 0 || index >= etats.length) {
            console.log(`${ANSI_RED}\nID invalide, réessayez !${ANSI_RESET}`);
            choisirEtat();
        } else {
            const etat = etats[index];
            console.log(`${ANSI_GREEN}\nÉtat sélectionné : ${etat.nom} (Taxe: ${etat.taxe}%)${ANSI_RESET}`);
            demanderQuantite(etat);
        }
    });
}

// Étape 2 : Demander la quantité avec validation
function demanderQuantite(etat: { nom: string; taxe: number }) {
    const prixUnitaire = 200; // Prix fixe
    console.log(`${ANSI_YELLOW}Prix unitaire : ${prixUnitaire} ${ANSI_RESET}`);
    rl.question(`${ANSI_BLUE}\nEntrez la quantité : ${ANSI_RESET}`, (quantiteInput) => {
        const quantite = parseInt(quantiteInput, 10);
        if (isNaN(quantite) || quantite <= 0) {
            console.log(`${ANSI_RED}\nQuantité invalide, réessayez !${ANSI_RESET}`);
            demanderQuantite(etat);
        } else {
            calculerCommande(prixUnitaire, quantite, etat);
        }
    });
}

// Calcul de la commande
function calculerCommande(prixUnitaire: number, quantite: number, etat: { nom: string; taxe: number }) {
    const totalSansTaxes = prixUnitaire * quantite;

    // Calcul des taxes
    const montantTaxe = totalSansTaxes * (etat.taxe / 100);
    const totalAvecTaxes = totalSansTaxes + montantTaxe;

    // Calcul de la remise
    const tauxRemise = calculerRemise(totalAvecTaxes);
    const montantRemise = totalAvecTaxes * (tauxRemise / 100);
    const totalFinal = totalAvecTaxes - montantRemise;

    // Affichage des résultats
    console.log(`${ANSI_BOLD}\n=== Résumé de la commande ===${ANSI_RESET}`);
    console.log(`${ANSI_YELLOW}Prix unitaire : ${prixUnitaire} ${ANSI_RESET}`);
    console.log(`${ANSI_YELLOW}Quantité : ${quantite}${ANSI_RESET}`);
    console.log(`${ANSI_YELLOW}Total sans taxes : ${totalSansTaxes.toFixed(2)} ${ANSI_RESET}`);
    console.log(`${ANSI_CYAN}Taxe (${etat.taxe}%) : ${montantTaxe.toFixed(2)} ${ANSI_RESET}`);
    console.log(`${ANSI_CYAN}Total avec taxes : ${totalAvecTaxes.toFixed(2)} ${ANSI_RESET}`);
    console.log(`${ANSI_MAGENTA}Remise (${tauxRemise}%) : ${montantRemise.toFixed(2)} ${ANSI_RESET}`);
    console.log(`${ANSI_GREEN}Total final : ${totalFinal.toFixed(2)} ${ANSI_RESET}`);

    rl.close();
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
