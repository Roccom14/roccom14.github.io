// Fonction pour basculer le thème
function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('theme-toggle');
    const currentTheme = body.getAttribute('data-theme');
  
    if (currentTheme === 'light') {
      body.removeAttribute('data-theme');
      button.textContent = 'Mode Clair';
    } else {
      body.setAttribute('data-theme', 'light');
      button.textContent = 'Mode Sombre';
    }
  }
  
  // Fonction pour générer la commande
  function generateCommand() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let command = "brew install --cask";
    let selectedPrograms = [];
  
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedPrograms.push(checkbox.value);
      }
    });
  
    if (selectedPrograms.length > 0) {
      command += " " + selectedPrograms.join(" ");
    }
  
    document.getElementById("output").textContent = command;
  }
  
  // Fonction pour réinitialiser les cases cochées et la commande
  function resetCommand() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.getElementById("output").textContent = "brew install --cask";
  }
  
  // Fonction pour copier la commande
  function copyCommand() {
    const command = document.getElementById("output").textContent;
    navigator.clipboard
      .writeText(command)
      .then(() => alert("Commande copiée dans le presse-papiers !"))
      .catch((err) => console.error("Erreur lors de la copie : ", err));
  }
  
  // Fonction pour exporter la commande en fichier texte
  function downloadCommand() {
    const command = document.getElementById("output").textContent;
    const blob = new Blob([command], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "brew-command.txt";
    link.click();
  }
  
  // Fonction pour filtrer les programmes
  function filterPrograms() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const programs = document.querySelectorAll(".program");
  
    programs.forEach((program) => {
      const label = program.querySelector("label").textContent.toLowerCase();
      if (label.includes(searchText)) {
        program.style.display = "flex";
      } else {
        program.style.display = "none";
      }
    });
  }
  
  // Fonction pour afficher/masquer une section
  function toggleSection(button) {
    const programsGrid = button.parentElement.parentElement.querySelector(".programs-grid");
    programsGrid.style.display = programsGrid.style.display === "none" ? "grid" : "none";
    button.textContent = programsGrid.style.display === "none" ? "Afficher" : "Masquer";
  }
  
  // Fonction pour toggler les cases à cocher
  function setupProgramToggle() {
    const programs = document.querySelectorAll(".program");
  
    programs.forEach((program) => {
      program.addEventListener("click", () => {
        const checkboxId = program.getAttribute("data-checkbox");
        const checkbox = document.getElementById(checkboxId);
  
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          generateCommand(); // Mettre à jour la commande automatiquement
        }
      });
    });
  }
  
  // Initialisation des événements
  document.addEventListener("DOMContentLoaded", () => {
    // Gestion du thème
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  
    // Réinitialiser
    document.getElementById("reset-btn").addEventListener("click", resetCommand);
  
    // Copier
    document.getElementById("copy-btn").addEventListener("click", copyCommand);
  
    // Exporter
    document.getElementById("export-btn").addEventListener("click", downloadCommand);
  
    // Recherche dynamique
    document.getElementById("search").addEventListener("input", filterPrograms);
  
    // Toggle des cases via leur conteneur
    setupProgramToggle();
  
    // Sections afficher/masquer
    document.querySelectorAll(".section-header button").forEach((button) => {
      button.addEventListener("click", () => toggleSection(button));
    });
  
    // Mettre à jour la commande lors des changements des cases
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", generateCommand);
    });
  });  