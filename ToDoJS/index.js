document.addEventListener("DOMContentLoaded", () => {
    let event_list = JSON.parse(localStorage.getItem("event_list")) || [
        { id: 1, nom_tache: "Faire les courses", termine: false },
        { id: 2, nom_tache: "Aller à la salle de sport", termine: false },
        { id: 3, nom_tache: "Lire un livre", termine: false }
    ];

    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("create_element_button");

    function afficherTaches() {
        taskList.innerHTML = ""; // On vide la liste avant de la re-remplir

        event_list.forEach((tache) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("element");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tache.termine;
            checkbox.addEventListener("change", () => {
                tache.termine = checkbox.checked;
                sauvegarderListe();
                afficherTaches();
            });

            const taskName = document.createElement("h2");
            taskName.textContent = tache.nom_tache;
            if (tache.termine) {
                taskName.style.textDecoration = "line-through";
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.className = "delete_button";
            deleteButton.addEventListener("click", () => {
                event_list = event_list.filter((t) => t.id !== tache.id);
                sauvegarderListe();
                afficherTaches();
            });

            taskElement.appendChild(checkbox);
            taskElement.appendChild(taskName);
            taskElement.appendChild(deleteButton);
            taskList.appendChild(taskElement);
        });
    }

    function sauvegarderListe() {
        localStorage.setItem("event_list", JSON.stringify(event_list));
    }

    addButton.addEventListener("click", () => {
        const newTaskName = prompt("Nouvelle tâche :");
        if (newTaskName) {
            const newTask = {
                id: Date.now(),
                nom_tache: newTaskName,
                termine: false
            };
            event_list.push(newTask);
            sauvegarderListe();
            afficherTaches();
        }
    });

    afficherTaches();
});
