// import { fetchData } from "../utils/apiUtils.js";

// carico dati 

/*

document.addEventListener('DOMContentLoaded', () => {
    let jsonNewProjectData = localStorage.getItem('newProjectData');
    let newProjectData = JSON.parse(jsonNewProjectData);
    document.getElementById('project-name').innerText = newProjectData.name;

    document.getElementById('edit-project-btn').addEventListener('click', function() {

    });
});

*/

// Funzione di copia link
function copyLink() {
    const link = document.getElementById("project-link");
    link.select();
    link.setSelectionRange(0, 99999); // Per dispositivi mobili
    navigator.clipboard.writeText(link.value);
    alert("Link copied to clipboard!");
}

function toggleLinkVisibility() {
    const sharedOption = document.getElementById('shared-project');
    const linkSection = document.getElementById('link-section');
    const projectLinkInput = document.getElementById('project-link');

    if (sharedOption.checked) {
        // Mostra il link e genera un codice univoco
        const uniqueCode = generateUniqueCode(); // Funzione per generare un codice univoco
        projectLinkInput.value = `https://myproject.app/project-link/${uniqueCode}`;
        linkSection.style.display = 'block';
    } else {
        // Nascondi il link
        linkSection.style.display = 'none';
        projectLinkInput.value = ''; // Pulisce il campo
    }
}

function generateUniqueCode() {
    // Genera un codice univoco casuale (può essere adattato alle esigenze)
    return Math.random().toString(36).substr(2, 8);
}
// Variabili per memorizzare i valori iniziali
let initialProjectName = "";
let initialVisibility = "";

// Funzione per aprire il pop-up
function openPopup() {
    const projectNameInput = document.getElementById("projectNameInput");
    const visibilityRadios = document.querySelectorAll('input[name="visibility"]');

    // Memorizza i valori iniziali
    initialProjectName = projectNameInput.value.trim();
    initialVisibility = [...visibilityRadios].find(radio => radio.checked)?.value;

    document.getElementById('popup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Funzione per chiudere il pop-up
function closePopup() {
    document.getElementById('popup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Funzione per annullare le modifiche
function cancelChanges() {
    const projectNameInput = document.getElementById("projectNameInput");
    const visibilityRadios = document.querySelectorAll('input[name="visibility"]');
    const linkContainer = document.querySelector('.copy-link');
    const linkInput = document.getElementById("project-link");

    // Ripristina i valori iniziali
    projectNameInput.value = initialProjectName;
    visibilityRadios.forEach((radio) => {
        radio.checked = radio.value === initialVisibility;
    });

    // Ripristina la visibilità del link
    if (initialVisibility === "shared") {
        linkContainer.style.visibility = "visible";
    } else {
        linkContainer.style.visibility = "hidden";
        linkInput.value = ""; // Svuota il link
    }
    // Chiudi il popup
    closePopup();
}

// Funzione per salvare il nuovo nome del progetto
function saveProjectName() {
    const newName = document.getElementById("projectNameInput").value.trim();
    const newVisibility = document.querySelector('input[name="visibility"]:checked').value;
    const linkContainer = document.querySelector('.copy-link');
    const linkInput = document.getElementById("project-link");

    if (newName === "") {
        alert("Please enter a valid project name.");
        return;
    }

    // Mostra o nasconde il link in base alla visibilità selezionata
    if (newVisibility === "shared") {
        linkContainer.style.visibility = "visible"; // Rendi visibile il campo link
        const uniqueCode = generateUniqueCode();
        linkInput.value = `https://build&play.app/${uniqueCode}`; // Genera il link con il nuovo prefisso
    } else {
        linkContainer.style.visibility = "hidden"; // Nascondi il campo link
        linkInput.value = ""; // Svuota il valore del link
    }

    // Aggiorna il nome del progetto nella barra
    document.querySelector(".project-name").textContent = newName;

    // Salva i dati aggiornati nel localStorage (opzionale)
    const updatedProjectData = {
        name: newName,
        visibility: newVisibility,
        link: newVisibility === "shared" ? linkInput.value : "",
    };
    localStorage.setItem("updatedProjectData", JSON.stringify(updatedProjectData));

    // Chiudi il popup
    closePopup();
}

// Gestione del caricamento iniziale
document.addEventListener("DOMContentLoaded", () => {
    const projectData = JSON.parse(localStorage.getItem("newProjectData"));

    if (projectData) {
        // Imposta il nome del progetto nella barra
        document.querySelector(".project-name").textContent = projectData.name;

        // Imposta le informazioni nel popup
        const nameInput = document.getElementById("projectNameInput");
        const visibilityRadios = document.querySelectorAll('input[name="visibility"]');
        const linkContainer = document.querySelector('.copy-link');
        const linkInput = document.getElementById("project-link");

        if (nameInput) nameInput.value = projectData.name;

        visibilityRadios.forEach((radio) => {
            if (radio.value === projectData.visibility) {
                radio.checked = true;
            }
        });

        if (projectData.visibility === "shared") {
            linkContainer.style.visibility = "visible"; // Rendi visibile il link
            linkInput.value = projectData.link; // Imposta il link salvato
        } else {
            linkContainer.style.visibility = "hidden"; // Nascondi il link
            linkInput.value = ""; // Svuota il link
        }

        // Rimuovi i dati dal localStorage per evitare conflitti
        localStorage.removeItem("newProjectData");
    }

    // Aggiungi listener per il cambio dinamico di visibilità
    const visibilityRadios = document.querySelectorAll('input[name="visibility"]');
    const linkContainer = document.querySelector('.copy-link');
    const linkInput = document.getElementById("project-link");

    visibilityRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.value === "shared") {
                linkContainer.style.visibility = "visible"; // Rendi visibile il campo link
                const uniqueCode = generateUniqueCode();
                linkInput.value = `https://build&play.app/${uniqueCode}`; // Genera il link con il nuovo prefisso
            } else {
                linkContainer.style.visibility = "hidden"; // Nascondi il campo link
                linkInput.value = ""; // Svuota il link
            }
        });
    });

    // Aggiungi listener per il pulsante "cancel"
    // document.getElementById("cancelButton").addEventListener("click", cancelChanges);

    let saveProjectToDBButton = document.getElementById('save-project-to-db');
    /*
    saveProjectToDBButton.addEventListener('click', function() {
        let jsonNewProjectData = localStorage.getItem('newProjectData');
        let newProjectData = JSON.parse(jsonNewProjectData);
        console.log("newProjectData -> "+newProjectData);
        let newProjectName = newProjectData.name;
        let newProjectVisibility = newProjectData.visibility;
        let newProjectLink = newProjectData.link;

        // Decodifica del token JWT (senza verifica della firma, perché lato client)
        const token = sessionStorage.getItem('authToken'); // Sostituisci con il token JWT che ricevi
        // Decodifica il JWT
        const user = decodeJWT(token);
        // Log dei dati utente
        console.log("Dati utente decodificati dal JWT:", user);

        const url = "http://localhost:8080/new-project";
        let formData = new FormData();
        formData.append('name', newProjectName);
        formData.append('userId', user.user.id);
        formData.append('content', socketsContent);
        formData.append('visibility', newProjectVisibility);
        formData.append('link', newProjectLink);

        // let result = fetchData(url, 'POST', formData);
        console.log("RESULT: " + result);
    });
    */
});

function loadProject(sockets) {

    /* 
    if (projectData) {
        const { name, visibility, content, link } = JSON.parse(projectData);
        // Aggiorna il nome del progetto sulla barra
        const projectNameElement = document.getElementById("project-name");
        if (projectNameElement) {
            projectNameElement.textContent = name;
        }
        // Gestisce il contenuto del progetto (se esiste)
        if (content) {
            console.log("Project content:", content);
            // Carica il progetto e salva il primo stato per il Memento
            loadProjectState(sockets, content);
        }
        // Se necessario, aggiorna altre informazioni come la visibilità o il link
        if (visibility === "shared" && link) {
            console.log("Project is shared. Link:", link);
        } else {
            console.log("Project visibility:", visibility);
        }
    } else {
        console.warn("No project data found in localStorage.");
    }
    */

    // Salvo il primo stato, vuoto o equivalente al progetto caricato

    saveState(sockets);

}


// CODICE PER LA GENERAZIONE DEI RIQUADRI PER INSERIRE I BLOCCHI - INIZIO

function populateWorkArea(element) {

    // Dimensioni: 40 larghezza, 30 altezza.

    let i = 0
    while (i < 1200) {
        element.innerHTML += `<div class="socket ${i}socket"></div>`
        i++
    }

}

populateWorkArea(document.querySelector(".workarea"))

// CODICE PER LA GENERAZIONE DEI RIQUADRI IN CUI INCASTONARE I BLOCCHI - FINE

// CODICE PER IL DESIGN PATTERN MEMENTO - INIZIO

// Originator: gestisce lo stato e crea i memento

class Originator {

    #state

    constructor(loadedState) {
        this.#state = loadedState;
    }
    
    setState(state) {
        this.#state = state;
    }

    getState() {
        return this.#state;
    }

    // Crea un memento che rappresenta lo stato corrente
    save() {
        return new Memento(this.#state);
    }

    // Ripristina lo stato da un memento
    restore(memento) {
        this.#state = memento.getMemento();
    }
}

// Memento: salva lo stato in modo immutabile
class Memento {

    #_memento

    constructor(memento) {
        this.#_memento = memento;
    }

    getMemento() {
        return this.#_memento;
    }
}

// Caretaker: gestisce la cronologia dei memento
class Caretaker {

    #history
    #currentIndex

    constructor() {
        this.#history = [];
        this.#currentIndex = -1;
    }

    save(memento) {
        // Se facciamo una modifica dopo un undo, eliminiamo gli stati successivi
        this.#history = this.#history.slice(0, this.#currentIndex + 1);
        this.#history.push(memento);
        this.#currentIndex++;
    }

    undo() {
        if (this.#currentIndex > 0) {
            this.#currentIndex--;
            return this.#history[this.#currentIndex];
        }
        console.log('Nessun stato precedente per undo');
        return null;
    }

    redo() {
        if (this.#currentIndex < this.#history.length - 1) {
            this.#currentIndex++;
            console.log('Redo eseguito');
            return this.#history[this.#currentIndex];
        }
        console.log('Nessun stato successivo per redo');
        return null;
    }
}

// La workarea, che cominci da vuota o provenga da altro progetto, viene salvata come stato iniziale

function retrieveProjectState(sockets) {
    const socketsContent = []
    sockets.forEach((socket) => {
        const index = socket.classList[1]
        // Devo salvare delle copie dei nodi, non dei riferimenti ai nodi!!
        const socketContent = socket.firstElementChild ? socket.firstElementChild.outerHTML : null
        socketsContent.push([index, socketContent])
    })

    return socketsContent
}

// Da usare anche per caricare un progetto caricato da database / altro utente

function loadProjectState(sockets, state) {

    if (Array.isArray(state[0])) {
        state.forEach((stateSocket) => {
            const index = parseInt(stateSocket[0])
            // Anche qui inserire le copie, non i riferimenti!!
            if (sockets[index].firstElementChild && !stateSocket[1]) {
                sockets[index].firstElementChild.remove()
            } else if (!sockets[index].firstElementChild && stateSocket[1]) {
                sockets[index].innerHTML = stateSocket[1]
            } else if (sockets[index].firstElementChild && stateSocket[1]) {
                sockets[index].firstElementChild.remove()
                sockets[index].innerHTML = stateSocket[1]
            }
        })
    } else {
        sockets.forEach((socket) => {
            if (socket.firstElementChild && !state[socket.classList[1]]) {
                socket.firstElementChild.remove()
            } else if (!socket.firstElementChild && state[socket.classList[1]]) {
                socket.innerHTML = state[socket.classList[1]]
            } else if (socket.firstElementChild && state[socket.classList[1]]) {
                socket.firstElementChild.remove()
                socket.innerHTML = state[socket.classList[1]]
            }
        })
    }
    
}

// Shorthand per il salvataggio dei dati

function saveState(sockets) {
    originator.setState(retrieveProjectState(sockets))
    caretaker.save(originator.save())
}

const originator = new Originator([]);
const caretaker = new Caretaker();

// CODICE PER IL DESIGN PATTERN MEMENTO - FINE

// CODICE PER IL GESTIONE DEI BLOCCHI - INIZIO

function manageLego(element) {

    // CODICE PER LE CLASSI DEI PEZZI E FACTORY METHOD - INIZIO

    class Block {

        #width 
        #height
    
        constructor(width, height) {
            if (this.constructor === Block) {
                throw new Error(`Classe astratta, non si può instanziare`);
            }
            this.#width = width
            this.#height = height
        }
        
        abstractBlockError() {
            throw new Error(`Impossibile chiamare metodi di una funzione astratta`);
        }
    
        setDraggedBlock() {
            this.abstractBlockError()
        }

        searchAttachablePiece(socketIndex) {
            if ((socketIndex % changeRow) === 0 || (socketIndex % changeRow) === 1) return false
            else if (sockets[socketIndex].hasChildNodes()) {
                let radixPiece = findBlockRadix(socketIndex)
                if (sockets[radixPiece].firstElementChild.classList.contains("block_03") ||
                    sockets[radixPiece].firstElementChild.classList.contains("block_01") &&
                    (sockets[radixPiece].firstElementChild.classList.contains("90degree") ||
                    sockets[radixPiece].firstElementChild.classList.contains("270degree"))) {
                        return true;
                }   else return false
            } else return false
        }

        checkCollisions(positionsToCheck, socketIndex) {
            let flag = false
            positionsToCheck.forEach((offset) => {
                if (sockets[socketIndex + offset].hasChildNodes()) flag = true
            })
            return flag
        }
    
        validAttachPosition() {
            this.abstractBlockError()
        }
    
        orientBlock() {
            this.abstractBlockError()
        }
    
        getWidth() {
            return this.#width
        }
    
        getHeight() {
            return this.#height
        }
    
    }
    
    class Block1 extends Block {
    
        #orientation
    
        constructor(orientation) {
            super(1,2)
            this.#orientation = orientation
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            switch(this.#orientation) {
                case "90degree":
                case "270degree":
                    // La trasformazione che viene applicata per la rotazione viene applicata sull'asse centrale.
                    offsetX = parseFloat(clone.style.width)
                    offsetY = parseFloat(clone.style.height) / super.getHeight()
                    break;
                default:
                    offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (super.getHeight() * 2)
                    offsetX = parseFloat(clone.style.width) - reticleSide / 2

            }
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }

        searchSideAttachment(socketIndex) {
            if (this.#orientation === "90degree" || this.#orientation === "270degree") return false
            else return (super.searchAttachablePiece(socketIndex +1) || super.searchAttachablePiece (socketIndex -1) ||
            super.searchAttachablePiece(socketIndex -changeRow + 1) || super.searchAttachablePiece(socketIndex -changeRow -1))
        }
    
        validAttachPosition(socketIndex) {
            switch (this.#orientation) {
                case "0degree":
                case "180degree":
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true)) {
                            if (sockets[socketIndex-changeRow].hasChildNodes()) return false
                            return this.searchSideAttachment(socketIndex)
                        }
                    break;
                case "90degree":
                case "270degree":
                    // Se non sono nell'ultima riga e non hanno blocchi sotto che non siano contrassegnati con no_stack, allora non sono impilabili
                    // Attenzione al fatto che posso controllare i nodi sottostanti solo dopo aver verificato che non siano già nell'ultima riga.
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+(changeRow - 1)].hasChildNodes() ? sockets[socketIndex+(changeRow - 1)].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+1].hasChildNodes() ? sockets[socketIndex+1].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex-2].hasChildNodes() ? sockets[socketIndex-2].firstElementChild.classList.contains("no_stack") : true) ||
                        sockets[socketIndex-1].hasChildNodes() || ((socketIndex % changeRow) === 0)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                default:
                    console.log("block_01 qualcosa è andato storto")
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            switch (this.#orientation) {
                // Se il blocco non è ruotato
                case "0degree":
                case "180degree":
                    // DEVO usare sempre marginTop e left per i margini!!
                    newChild.style.marginTop = "-100%"
                    // Aggiungo un child che indica in che direzione bisogna andare per trovare il nodo con l'immagine del pezzo
                    sockets[socketIndex-changeRow].appendChild(downClone)
                    break;
                case "90degree":
                case "270degree":
                    newChild.style.marginTop = "-50%"
                    newChild.style.marginLeft = "-50%"
                    sockets[socketIndex-1].appendChild(rightClone)
                    break;
                default:
                    console.log("block_01")
            }
        }
    
    }

    class Block2 extends Block {
    
        #orientation
    
        constructor(orientation) {
            super(2,3)
            this.#orientation = orientation
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            switch (this.#orientation) {
                case "90degree":
                case "270degree":
                    // La trasformazione che viene applicata per la rotazione viene applicata sull'asse centrale.
                    offsetX = parseFloat(clone.style.width)
                    offsetY = parseFloat(clone.style.height) - reticleSide
                    break;
                default:
                    offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (super.getHeight() * 2)
                    offsetX = parseFloat(clone.style.width) - reticleSide / 2 
            }
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }

        searchSideAttachment(socketIndex) {
            if (this.#orientation === "90degree" || this.#orientation === "270degree") {
                return (super.searchAttachablePiece(socketIndex +1) || super.searchAttachablePiece (socketIndex -3) ||
                    super.searchAttachablePiece(socketIndex - changeRow +1) || super.searchAttachablePiece (socketIndex - changeRow -3))
            } else {
                return (super.searchAttachablePiece(socketIndex+1) || super.searchAttachablePiece(socketIndex-2) ||
                        super.searchAttachablePiece(socketIndex - changeRow +1) || super.searchAttachablePiece(socketIndex - changeRow -2) ||
                        super.searchAttachablePiece(socketIndex - (changeRow * 2) +1) || super.searchAttachablePiece(socketIndex - (changeRow * 2) -2))
            }
        }
    
        validAttachPosition(socketIndex) {
            switch (this.#orientation) {
                case "0degree":
                case "180degree":
                    // Serve per impedire che il pezzo si possa posizionare fuori dai bordi del piano di lavoro. Da controllare per tutti i pezzi più larghi di 1
                    if (socketIndex % changeRow === 0) return false
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-1, -changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                case "90degree":
                case "270degree":
                    if (socketIndex % changeRow === 0 || socketIndex % changeRow === 1) return false
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-2].hasChildNodes() ? sockets[socketIndex+changeRow-2].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-1, -2, -changeRow, -(changeRow + 1), -(changeRow + 2)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                default:
                    console.log("block_02 qualcosa è andato storto")
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            let positionsToFill;
            switch (this.#orientation) {
                case "0degree":
                case "180degree":
                    newChild.style.marginTop = "-200%"
                    newChild.style.marginLeft = "-100%"
                    sockets[socketIndex-1].appendChild(rightClone)
                    positionsToFill = [-changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)]
                    positionsToFill.forEach((offset) => {
                        // I blocchi creati vengono inseriti in una variabile per riferimento. Se ne devo fare più di uno, devo usare clone.
                        sockets[socketIndex + offset].appendChild(downClone.cloneNode(false))
                    })
                    break;
                case "90degree":
                case "270degree":
                    newChild.style.marginTop = "-150%"
                    newChild.style.marginLeft = "-150%"
                    sockets[socketIndex-1].appendChild(rightClone.cloneNode(false))
                    sockets[socketIndex-2].appendChild(rightClone.cloneNode(false))
                    positionsToFill = [-changeRow, -(changeRow + 1), -(changeRow + 2)]
                    positionsToFill.forEach((offset) => {
                        sockets[socketIndex + offset].appendChild(downClone.cloneNode(false))
                    })
                    break;
                default:
                    console.log("block_02")
            }
        }
    
    }

    class Block3 extends Block {
    
        constructor() {
            super(1,1)
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (super.getHeight() * 2)
            offsetX = parseFloat(clone.style.width) - reticleSide / 2
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }
    
        validAttachPosition(socketIndex) {
            if (socketIndex < lastRow &&
                (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                sockets[socketIndex-changeRow].hasChildNodes() ? sockets[socketIndex-changeRow].firstElementChild.classList.contains("no_stack") : true &&
                sockets[socketIndex+1].hasChildNodes() ? sockets[socketIndex+1].firstElementChild.classList.contains("no_stack") : true &&
                sockets[socketIndex-1].hasChildNodes() ? sockets[socketIndex-1].firstElementChild.classList.contains("no_stack") : true)) return false
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            // Non fa nulla per questo blocco la funzione
        }

    
    }

    class Block4 extends Block {
    
        constructor() {
            super(2,2)
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (super.getHeight() * 2)
            offsetX = parseFloat(clone.style.width) - reticleSide / 2
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }
    
        validAttachPosition(socketIndex) {
            if (socketIndex % changeRow === 0) return false
            if (socketIndex < lastRow &&
                ((sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true) &&
                (sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true)) ||
                super.checkCollisions([-1, -changeRow, -(changeRow + 1)], socketIndex)) {
                    return false
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            newChild.style.marginTop = "-100%"
            newChild.style.marginLeft = "-100%"
            sockets[socketIndex-1].appendChild(rightClone)
            const positionsToFill = [-changeRow, -(changeRow + 1)]
            positionsToFill.forEach((offset) => {
                sockets[socketIndex + offset].appendChild(downClone.cloneNode(false))
                sockets[socketIndex + offset].firstElementChild.classList.add("no_stack")
            })
        }
    
    }

    class Block5 extends Block {

        #orientation
    
        constructor(orientation) {
            super(3,2)
            this.#orientation = orientation
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * this.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * this.getWidth() * zoom}px`
            switch(this.#orientation) {
                case "90degree":
                    offsetX = reticleSide
                    offsetY = parseFloat(clone.style.height)
                    break;
                case "180degree":
                    offsetX = parseFloat(clone.style.width) / 2
                    offsetY = parseFloat(clone.style.height) - reticleSide / 2
                    break;
                case "270degree":
                    offsetX = reticleSide * 2
                    offsetY = parseFloat(clone.style.height) 
                    break;
                default:
                    offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (this.getHeight() * 2)
                    offsetX = parseFloat(clone.style.width) - reticleSide / 2
            }
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }

        searchSideAttachment(socketIndex) {
            switch (this.#orientation) {
                case "0degree":
                    return (super.searchAttachablePiece(socketIndex -3) || super.searchAttachablePiece(socketIndex - changeRow - 2) ||
                            super.searchAttachablePiece(socketIndex - changeRow) || super.searchAttachablePiece(socketIndex + 1));
                case "90degree":
                    // Il primo caso è inutile controllarlo ma lo lascio comunque per chiarezza
                    return (super.searchAttachablePiece(socketIndex + 1) || super.searchAttachablePiece(socketIndex - changeRow + 2) ||
                            super.searchAttachablePiece(socketIndex - (changeRow * 2) + 1) || super.searchAttachablePiece(socketIndex - 1) ||
                            super.searchAttachablePiece(socketIndex - changeRow - 1) || super.searchAttachablePiece(socketIndex - (changeRow * 2) - 1))
                case "180degree":
                    return (super.searchAttachablePiece(socketIndex + 1) || super.searchAttachablePiece(socketIndex - 1) ||
                            super.searchAttachablePiece(socketIndex - changeRow + 2) || super.searchAttachablePiece(socketIndex - changeRow - 2))
                case "270degree":
                    return (super.searchAttachablePiece(socketIndex + 1) || super.searchAttachablePiece(socketIndex - changeRow + 1) ||
                            super.searchAttachablePiece(socketIndex - (changeRow * 2) + 1) || super.searchAttachablePiece(socketIndex - 1) ||
                            super.searchAttachablePiece(socketIndex - changeRow - 2) || super.searchAttachablePiece(socketIndex - (changeRow * 2) - 1))
            }
        }
    
        validAttachPosition(socketIndex) {
            switch (this.#orientation) {
                case "0degree":
                    if (socketIndex % changeRow === 0 || socketIndex % changeRow === 1) return false
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-2].hasChildNodes() ? sockets[socketIndex+changeRow-2].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-1, -2, -(changeRow + 1)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                    // Per 90 e 270 degree permetto l'aggancio ad "uncino"
                case "90degree":
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+1].hasChildNodes() ? sockets[socketIndex+1].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-changeRow, -(changeRow - 1), -(changeRow * 2)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                case "180degree":
                    if (socketIndex % changeRow === 0) return false
                    if (socketIndex < lastRow) {
                        console.log(
                            sockets[socketIndex+changeRow].hasChildNodes(),
                            sockets[socketIndex+1].hasChildNodes(),
                            sockets[socketIndex-1].hasChildNodes()
                        )
                    }
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+1].hasChildNodes() ? sockets[socketIndex+1].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex-1].hasChildNodes() ? sockets[socketIndex-1].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-(changeRow - 1), -changeRow, -(changeRow + 1)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                case "270degree":
                    if (socketIndex % changeRow === 0) return false
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex-1].hasChildNodes() ? sockets[socketIndex-1].firstElementChild.classList.contains("no_stack") : true) ||
                        super.checkCollisions([-changeRow, -(changeRow + 1), -(changeRow * 2), -(changeRow * 3)], socketIndex)) {
                            return this.searchSideAttachment(socketIndex)
                    }
                    break;
                default:
                    console.log("block_05 qualcosa è andato storto")
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            switch (this.#orientation) {
                case "0degree":
                    newChild.style.marginLeft = "-200%"
                    newChild.style.marginTop = "-100%"
                    sockets[socketIndex - 1].appendChild(rightClone.cloneNode(false))
                    sockets[socketIndex - 2].appendChild(rightClone.cloneNode(false))
                    sockets[socketIndex - (changeRow + 1)].appendChild(downClone.cloneNode(false))
                    break;
                case "90degree":
                    newChild.style.marginLeft = "-50%"
                    newChild.style.marginTop = "-150%"
                    sockets[socketIndex - changeRow].appendChild(downClone.cloneNode(false))
                    sockets[socketIndex - (changeRow * 2)].appendChild(downClone.cloneNode(false))
                    sockets[socketIndex - (changeRow - 1)].appendChild(leftClone.cloneNode(false))
                    break;
                case "180degree":
                    newChild.style.marginLeft = "-100%"
                    newChild.style.marginTop = "-100%"
                    sockets[socketIndex - changeRow].appendChild(downClone.cloneNode(false))
                    sockets[socketIndex - (changeRow - 1)].appendChild(leftClone.cloneNode(false))
                    sockets[socketIndex - (changeRow + 1)].appendChild(rightClone.cloneNode(false))
                    break;
                case "270degree":
                    newChild.style.marginLeft = "-150%"
                    newChild.style.marginTop = "-150%"
                    sockets[socketIndex - changeRow].appendChild(downClone.cloneNode(false))
                    sockets[socketIndex - (changeRow * 2)].appendChild(downClone.cloneNode(false))
                    sockets[socketIndex - (changeRow + 1)].appendChild(rightClone.cloneNode(false))
                    break;
                default:
                    console.log("block_04")
            }
        }
    
    }

    class Block6 extends Block {

        #orientation
    
        constructor(orientation) {
            super(1,2)
            this.#orientation = orientation
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            switch (this.#orientation) {     
                case "90degree":
                case "270degree":
                    offsetX = parseFloat(clone.style.width)
                    offsetY = parseFloat(clone.style.height) / super.getHeight()
                    break;
                default:
                    offsetX = parseFloat(clone.style.width) - reticleSide / 2
                    offsetY = parseFloat(clone.style.height) - reticleSide / 2
                      
            }
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }

        searchSideAttachment(socketIndex) {
            if (this.#orientation === "90degree") {
                return super.searchAttachablePiece(socketIndex-2)
            } else if (this.#orientation === "270degree") {
                return super.searchAttachablePiece(socketIndex+1)
            } else {
                return super.searchAttachablePiece(socketIndex+1) || super.searchAttachablePiece (socketIndex-1)
            }
        }
    
        validAttachPosition(socketIndex) {
            switch (this.#orientation) {
                case "0degree":
                case "180degree":
                    if (socketIndex < lastRow && (!sockets[socketIndex+changeRow].hasChildNodes() ||
                        sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack"))) {
                            return this.searchSideAttachment(socketIndex)
                        }
                    break;
                case "90degree":
                case "270degree":
                    if (socketIndex % changeRow === 0) return false
                    if (socketIndex < lastRow &&
                        (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true &&
                        sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true)) {
                            return this.searchSideAttachment(socketIndex)
                        }
                    break;
                default:
                    console.log("block_06 qualcosa è andato storto")
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            switch (this.#orientation) {
                case "0degree":
                case "180degree":
                    newChild.style.marginTop = "-100%"
                    sockets[socketIndex-changeRow].appendChild(downClone)
                    sockets[socketIndex-changeRow].firstElementChild.classList.add("no_stack")
                    break;
                case "90degree":
                    newChild.style.marginTop = "-50%"
                    newChild.style.marginLeft = "-50%"
                    sockets[socketIndex].firstElementChild.classList.add("no_stack")
                    sockets[socketIndex-1].appendChild(rightClone)
                    break;
                case "270degree":
                    newChild.style.marginTop = "-50%"
                    newChild.style.marginLeft = "-50%"
                    sockets[socketIndex-1].appendChild(rightClone)
                    sockets[socketIndex-1].firstElementChild.classList.add("no_stack")
                    break;
                default:
                    console.log("block_01")
            }
        }
    }

    class Omino extends Block {

        #type
    
        constructor(type) {
            super(2,3)
            this.#type = type
        }
    
        setDraggedBlock(event) {
            clone.style.height = `${reticleSide * super.getHeight() * zoom}px`
            clone.style.width = `${reticleSide * super.getWidth() * zoom}px`
            offsetY = parseFloat(clone.style.height) - parseFloat(clone.style.height) / (super.getHeight() * 2)
            offsetX = parseFloat(clone.style.width) - reticleSide / 2
            clone.style.top = `${event.clientY - offsetY}px`;
            clone.style.left = `${event.clientX - offsetX}px`;
        }
    
        validAttachPosition(socketIndex) {
            if (super.checkCollisions([-1, -changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)], socketIndex)) {
                return false
            }
            if (socketIndex < lastRow &&
                (sockets[socketIndex+changeRow].hasChildNodes() ? sockets[socketIndex+changeRow].firstElementChild.classList.contains("no_stack") : true ||
                sockets[socketIndex+changeRow-1].hasChildNodes() ? sockets[socketIndex+changeRow-1].firstElementChild.classList.contains("no_stack") : true) ||
                sockets[socketIndex-1].hasChildNodes()) {
                    return false
            }
            return true;
        }
    
        orientBlock(newChild, socketIndex, leftClone, rightClone, downClone) {
            newChild.style.marginTop = "-200%"
                newChild.style.marginLeft = "-100%"
                sockets[socketIndex-1].appendChild(rightClone)
                const positionsToFill = [-changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)]
                positionsToFill.forEach((offset) => {
                    sockets[socketIndex + offset].appendChild(downClone.cloneNode(false))
                    if (offset == -(changeRow * 2) || offset == -((changeRow * 2) + 1)) {
                        sockets[socketIndex + offset].firstElementChild.classList.add("no_stack")
                    }
                })
        }
    
    }

    class BlockFactory {
        // static si può usare quando si chiama la classe stessa ma non un oggetto di tale classe.
        static createBlock(blockType, orientation = "0degree") {
            switch (blockType) {
                case "block_01":
                    return new Block1(orientation)
                case "block_02":
                    return new Block2(orientation)
                case "block_03":
                    return new Block3()
                case "block_04":
                    return new Block4()
                case "block_05":
                    return new Block5(orientation)
                case "block_06":
                    return new Block6(orientation)
                case "omino":
                    return new Omino("omino")
                case "cat":
                    return new Omino("cat")
                default:
                    throw new Error("Blocco sconosciuto")
            }
        }
    }

    // CODICE PER LE CLASSI DEI PEZZI E FACTORY METHOD - FINE

    // CODICE PER IL TRASCINAMENTO DEI BLOCCHI - INIZIO

    const sockets = document.querySelectorAll(".socket");
    loadProject(sockets)
    // da creare array di block, facendo attenzione che la classe scelta sia quella corretta
    const blocks = document.querySelectorAll(".block");

    // Da che indice comincia l'ultima riga e quanto bisogna salire o scendere per trovare i blocchi inferiori o superiori.
    const lastRow = 1160
    const changeRow = 40
    const boardBaseWidth = 2400
    const boardBaseHeight = 1800

    let clone = null;
    let manipulatedBlock = null;
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
    // Calcolano larghezza e altezza dei quadrati della griglia
    let reticleSide = parseFloat(window.getComputedStyle(sockets[0]).width)
    let zoom = 1
    let selectedColor = null
    let deleteActive = false
    let copyActive = false

    // Selezionamento blocco al click nella toolbar

    blocks.forEach((block) => {
        // event è il mouseEvent (evento di cui mousedown fa parte, cursore sull'argomento event per dettagli)
        block.addEventListener("click", (event) => {
            if (!deleteActive && !copyActive && !selectedColor) {
                if (clone) {
                    clone.remove()
                    clone = null
                }
                isDragging = true
                // Mi consente di selezionare il primo children evitando sicuramente di prendere del testo (anche il whitespace può essere firstChildren)
                // Devo tenere conto che non posso usare nuovamente il clone per piazzarlo come children, visto che lo devo cancellare!
                // Lo dovrò quindi copiare nuovamente.
                clone = block.firstElementChild.cloneNode(false);
                manipulatedBlock = BlockFactory.createBlock(clone.classList[0], clone.classList[1])
                console.log(manipulatedBlock)
                clone.classList.add("clone");
                document.body.appendChild(clone);
                clone.style.zIndex = "0"
                clone.style.position = "fixed"
                setDraggedBlock(event)
            }
        })
    })

    // Posizionamento del blocco in modo che il cursore sia in basso a destra rispetto ad esso

    function setDraggedBlock(event) {
        manipulatedBlock.setDraggedBlock(event)
    }

    // Faccio segure il mouse al blocco
    
    document.addEventListener("mousemove", (event) => {
        if (isDragging && clone) {
            clone.style.left = `${event.clientX - offsetX}px`;
            clone.style.top = `${event.clientY - offsetY}px`;
        }
    });

    // Funzione validità del posizionamento dei blocchi
    
    function validAttachPosition(socketIndex) {

        if (sockets[socketIndex].firstElementChild) return false
        return manipulatedBlock.validAttachPosition(socketIndex)

    }
    
    // Funzione per posizionare i padding dei blocchi, anche nel caso siano ruotati, appena prima di piazzare la base.
    // I blocchi devono sporgere per intero nelle direzioni sinistra - destra altrimenti verranno tagliati!

    function orientBlock(newChild, socketIndex) {

        // newChild è dello stesso identico tipo del blocco che voglio piazzare

        const socketPadder = document.createElement("div")
        socketPadder.classList.add("socketPadder")
        const leftClone = socketPadder.cloneNode(false)
        const rightClone = socketPadder.cloneNode(false)
        const downClone = socketPadder.cloneNode(false)
        rightClone.classList.add("right")
        leftClone.classList.add("left")
        downClone.classList.add("down")
        newChild.style.position = "static"
        let blockWidthPercent = manipulatedBlock.getWidth() * 100
        let blockHeightPercent = manipulatedBlock.getHeight() * 100
        newChild.style.width = `${blockWidthPercent}%`
        newChild.style.height = `${blockHeightPercent}%`

        manipulatedBlock.orientBlock(newChild, socketIndex, leftClone, rightClone, downClone)

    }

    // Funzione posizionamento dei blocchi, che chiama la precedente

    document.addEventListener("mouseup", (event) => {
        if (isDragging) {
            for (let i = 0; i < sockets.length; i++) {
                let socketRect = sockets[i].getBoundingClientRect()           
                if ((event.clientX < socketRect.right &&
                    event.clientX > socketRect.left &&
                    event.clientY < socketRect.bottom &&
                    event.clientY > socketRect.top) &&
                    (element.parentElement.parentElement.querySelector(":hover").classList.contains("clone")) &&
                    // dev'essere alla base o avere un pezzo sotto, e contemporaneamente non avere pezzi sopra.
                    (validAttachPosition(i))) {
                    // clone del clone
                    let newChild = clone.cloneNode(false)
                    // Rimuovo la classlist "clone" visto che devo posizionarne una copia nello slot destinatario
                    newChild.classList.remove("clone")
                    // Preparo il blocco al posizionamento
                    sockets[i].appendChild(newChild)
                    orientBlock(newChild, i)
                    // Memorizzo il nuovo stato della workarea
                    saveState(sockets)
                    break;
                }
            }
        }
    });

    // CODICE PER IL TRASCINAMENTO DEI BLOCCHI - FINE

    // CODICE PER LA RICERCA DELLA RADICE NEI BLOCCHI - INIZIO

    function findBlockRadix(socketIndex) {
        while (sockets[socketIndex].firstElementChild.classList.contains("socketPadder")) {
            if (sockets[socketIndex].firstElementChild.classList.contains("down")) {
                socketIndex += changeRow
            } else if (sockets[socketIndex].firstElementChild.classList.contains("left")) {
                socketIndex--
            } else if (sockets[socketIndex].firstElementChild.classList.contains("right")) {
                socketIndex++
            }
        }
        console.log("la radice del blocco selezionato è", socketIndex)
        return socketIndex
    }

    // CODICE PER LA RICERCA DELLA RADICE NEI BLOCCHI - FINE

    // CODICE PER IL CAMBIO COLORE NEI BLOCCHI - INIZIO

    function changeBlockColor(colors) {

        colors.forEach((color) => {
            color.addEventListener("click", () => {
                resetActions()
                document.querySelector("body").style.cursor = "url('public/color_cursor.png') 16 0, auto";
                selectedColor = color.classList[1]
            })
        })

        // Cambio colore blocchi nella toolbar
        document.querySelector(".lego-blocks").addEventListener("click", () => {
            if (selectedColor) {
                // Come selezionare l'elemento hoverato a partire da un genitore
                let selectedBlock = document.querySelector(".lego-blocks").querySelector(":hover")
                if (selectedBlock) {
                    let blockType = selectedBlock.firstElementChild.classList[0]
                    if (!((selectedBlock.firstElementChild.classList.contains("omino") ||
                        selectedBlock.firstElementChild.classList.contains("cat")) && selectedColor === "yellow")) {
                        selectedBlock.firstElementChild.setAttribute("src", `public/${blockType}_${selectedColor}.png`)
                    } else {
                        console.log("Abbiamo deciso di non implementare un omino e un cattomino con la maglia gialla")
                    }
                }
            }
        })

        document.querySelector(".workarea").addEventListener("click", () => {
            // Nemmeno devo controllare se sto cliccando una casella perché é impossibile non cliccarla finché hovero la workarea.
            // Però se questa è vuota, va controllato!
            let socket = document.querySelector(".workarea").querySelector(":hover")
            if (socket.firstElementChild && selectedColor) {
                let blockIndex = parseInt(socket.classList[1])
                let blockRadix = findBlockRadix(blockIndex)
                let blockType = socket.firstElementChild.classList[0]
                if (!((sockets[blockRadix].firstElementChild.classList.contains("omino") ||
                sockets[blockRadix].firstElementChild.classList.contains("cat")) && selectedColor === "yellow")) {
                    sockets[blockRadix].firstElementChild.setAttribute("src", `public/${blockType}_${selectedColor}.png`)
                    saveState(sockets)
                }
            }
        })

    }

    changeBlockColor(document.querySelectorAll(".color"))

    // CODICE PER IL CAMBIO COLORE NEI BLOCCHI - FINE

    // CODICE PER GESTIONE UNDO-REDO - INIZIO


    function manageWorkSteps(arrowLeft, arrowRight) {

        // Undo
        arrowLeft.addEventListener("click", () => {
            resetActions()
            let memento = caretaker.undo();
            if (memento) {
                originator.restore(memento)
                loadProjectState(sockets, originator.getState())
            };
        })

        // Redo
        arrowRight.addEventListener("click", () => {
            resetActions()
            let memento = caretaker.redo();
            if (memento) {
                originator.restore(memento);
                loadProjectState(sockets, originator.getState())
            } 
        })
    }

    manageWorkSteps(document.getElementsByClassName("fa-arrow-left")[0], document.getElementsByClassName("fa-arrow-right")[0])

    // CODICE GESTIONE UNDO-REDO - FINE

    // CODICE PER LA ROTAZIONE DEI BLOCCHI - INIZIO

    function rotateBlocks(element) {
        let rotation = 0
        let rotationBlock1 = [0, 90, 180, 270]

        element.addEventListener("click", () => {
            resetActions()
            // Tutti i blocchi lunghi che devono essere ruotati (quindi eccetto il tetris) possono usare questa logica.
            const nextRotationLongBlock = (rotation + 1) % 4
            blocks.forEach((block) => {
                const imgBlock = block.firstElementChild
                if (!imgBlock.classList.contains("block_03") && !imgBlock.classList.contains("block_04")
                    && !imgBlock.classList.contains("omino") && !imgBlock.classList.contains("cat")) {
                    imgBlock.classList.remove(`${rotationBlock1[rotation % 4]}degree`)
                    imgBlock.classList.add(`${rotationBlock1[nextRotationLongBlock]}degree`)
                    imgBlock.style.rotate = `${rotationBlock1[nextRotationLongBlock]}deg`
                    if (imgBlock.classList.contains("block_06") && imgBlock.classList[1] === "180degree") {
                        // Quando la classe è 180 gradi devo far si che si comporti come se fosse ruotato di 0 gradi.
                        imgBlock.style.rotate = "0deg"
                    }
                }
            })
            rotation++
        })
    }

    rotateBlocks(document.querySelector(".fa-sync-alt"))

    // CODICE PER LA ROTAZIONE DEI BLOCCHI - FINE

    // CODICE PER LA COPIA DEL BLOCCHI - INIZIO

    function copyBlock(element) {

        element.addEventListener("click", () => {
            resetActions()
            document.querySelector("body").style.cursor = "url('public/copy_cursor.png') 16 0, auto";
            copyActive = true
        })

        document.querySelector(".workarea").addEventListener("click", (event) => {
            // Non funziona se lo faccio cosi:
            // console.log(document.querySelector(".workarea:hover"))
            if (copyActive) {
                console.log(event)
                let index = parseInt(document.querySelector(".workarea").querySelector(":hover").classList[1])
                if (index) {
                    let blockRadix;
                    if (clone) {
                        clone.remove()
                        clone = null
                    }
                    blockRadix = findBlockRadix(index)
                    isDragging = true
                    clone = sockets[blockRadix].firstElementChild.cloneNode(false);
                    console.log(clone)
                    clone.classList.add("clone");
                    document.body.appendChild(clone);
                    clone.style.zIndex = "0"
                    clone.style.position = "fixed"
                    // Ora resetto tutti gli stili CSS che sono stati applicati al clone già inserito in posizione nella griglia
                    // per poterlo reimpostare nuovamente da capo.
                    clone.style.top = ""
                    clone.style.left = ""
                    clone.style.marginTop = ""
                    clone.style.marginLeft = ""
                    setDraggedBlock(event)
                    // Annullo un eventuale modalità copia attiva, visto che ho scelto di selezionare un blocco nuovo.
                    copyActive = false
                    document.querySelector("body").style.cursor = ""
                }
            }
        })
    }
    
    copyBlock(document.getElementById("copybutton"))
    
    // CODICE PER LA COPIA DEI BLOCCHI - FINE

    // CODICE PER LA CANCELLAZIONE DEI BLOCCHI - INIZIO

    function deleteBlock(element) {

        const workarea = document.querySelector(".workarea")
        selectedColor = null
        copyActive = false

        element.addEventListener("mouseup", () => {

            resetActions()

            document.querySelector("body").style.cursor = "url('public/delete_cursor.png') 16 0, auto";
            deleteActive = true

            // Ottiene il blocco su cui è sopra il cursore, in modo da non interagire con le parti trasparenti delle
            // immagini dei pezzi (per esempio il blocco 05 negli spazi in alto a sx e dx)

            let index

            workarea.addEventListener("mouseup", (event) => {
                for (let i = 0; i < sockets.length; i++) {
                    let socketRect = sockets[i].getBoundingClientRect()        
                    if (event.clientX < socketRect.right &&
                        event.clientX > socketRect.left &&
                        event.clientY < socketRect.bottom &&
                        event.clientY > socketRect.top) {
                            index = i
                            console.log(index)
                        }
                }
            })

            document.addEventListener("click", () => {

                function clearSockets(positionsToRemove, socketIndex) {
                    positionsToRemove.forEach((offset) => {
                        sockets[socketIndex + offset].removeChild(sockets[socketIndex + offset].firstElementChild)
                    })
                }

                if (deleteActive) {
                    // Funzione che serve per cancellare i pezzi per cui è permesso il posizionamento orizzontale.
                    // Il radix node serve a inserire subito il nodo che sto cercando di cancellare nella
                    // lista dei visitati.
                    function graphSearch(startNode, radixNodes, surroundingPieces) {
                        // Un set per tracciare i nodi già visitati
                        const visited = new Set();
                        // Aggiungo i nodi che voglio cancellare all'elenco di quelli già visitati
                        radixNodes.forEach((radixNode) => {
                            visited.add(radixNode)
                        })
                    
                        // Funzione ricorsiva per DFS
                        function dfs(node) {
                            // Ho trovato la base del progetto LEGO
                            if (node >= lastRow) {
                                return true;
                            }
                    
                            // Aggiungiamo il nodo corrente ai visitati
                            visited.add(node);

                            const neighbors = []

                            surroundingPieces.forEach((direction) => {
                                const neighbor = node + direction
                                if (sockets[neighbor] && sockets[neighbor].firstElementChild) {
                                    neighbors.push(neighbor)
                                }
                            })

                            console.log(neighbors)

                            for (const neighbor of neighbors) {
                                if (!visited.has(neighbor)) {
                                    if (dfs(neighbor)) {
                                        return true;
                                    }
                                }
                            }
                            // Non ho trovato nessuna strada che porti alla base del progetto LEGO
                            return false;
                        }
                        return dfs(startNode);
                    }
                    // Verifica se si sta cliccando un blocco, poi si controlla che non ha pezzi sopra, per poterlo rimuovere e che stia hoverando il piano di lavoro.
                    if (workarea.querySelector(":hover")) {
                            // Non devono esserci pezzi sopra. Per prima cosa trovo la radice del blocco per determinare dove controllare
                            if (sockets[index].hasChildNodes()) {
                                let socketIndex = findBlockRadix(index)
                                // La radice verrà per forza di cose eliminata, e la memorizzo quindi in questa variabile per riferimento
                                let radixPiece = sockets[socketIndex].firstElementChild
                                if (radixPiece.classList.contains("block_01")) {
                                    // Se il socketIndex è troppo basso per forza di cose non avrà blocchi sopra
                                    switch (radixPiece.classList[1]) {
                                        case "0degree":
                                        case "180degree":
                                            if (socketIndex < (changeRow * 2) ||
                                                !(sockets[socketIndex - (changeRow * 2)].firstElementChild)) {
                                                clearSockets([-changeRow], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "90degree":
                                        case "270degree":
                                            if (socketIndex < changeRow ||
                                                (!sockets[socketIndex - changeRow].firstElementChild && !sockets[socketIndex - (changeRow + 1)].firstElementChild) &&
                                                !(sockets[socketIndex - 2].firstElementChild && sockets[socketIndex + 1].firstElementChild)) {
                                                // Potenzialmente circondanti
                                                const surroundingPieces = [+1,-1,+changeRow,-changeRow]
                                                // Punti di partenza per la ricerca nel grafo
                                                const interlockPieces = [-2, +1]
                                                var flag = true
                                                interlockPieces.forEach((piece) => {
                                                    if (sockets[socketIndex + piece] ? sockets[socketIndex + piece].firstElementChild : false) {
                                                        if (!graphSearch(socketIndex + piece, [socketIndex, socketIndex-1], surroundingPieces)) {
                                                            flag = false
                                                        }
                                                    }
                                                })
                                                if (flag) {
                                                    clearSockets([-1], socketIndex)
                                                    radixPiece.remove()
                                                    saveState(sockets)
                                                }
                                            }
                                            break;
                                        default:
                                            console.log("block_01 default case")
                                    }
                                } else if (radixPiece.classList.contains("block_02")) {
                                    switch (radixPiece.classList[1]) {
                                        case "0degree":
                                        case "180degree":
                                            if (socketIndex < (changeRow * 3) ||
                                                (!sockets[socketIndex - (changeRow * 3)].firstElementChild && !sockets[socketIndex - ((changeRow * 3) + 1)].firstElementChild)
                                            ) {
                                                clearSockets([-1, -changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)], socketIndex)     
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "90degree":
                                        case "270degree":
                                            if (socketIndex < (changeRow * 2) ||
                                                (!sockets[socketIndex - (changeRow * 2)].firstElementChild &&
                                                !sockets[socketIndex -((changeRow * 2) + 1)].firstElementChild &&
                                                !sockets[socketIndex - ((changeRow * 2) + 2)].firstElementChild)
                                            ) {                                                       
                                                clearSockets([-1, -2, -changeRow, -(changeRow + 1), -(changeRow + 2)], socketIndex)     
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                    }
                                } else if (radixPiece.classList.contains("block_03")) {
                                    // Permetto l'eliminazione se sta aderendo a un solo pezzo.
                                    const surroundingPieces = [+1,-1,+changeRow,-changeRow]
                                    let surroundingCount = 0;
                                    surroundingPieces.forEach((piece) => {
                                        if (sockets[socketIndex + piece] && sockets[socketIndex + piece] ? sockets[socketIndex + piece].firstElementChild : false) {
                                            surroundingCount++
                                        }
                                    })
                                    // è un pezzo sopra a un altro
                                    if (surroundingCount === 1 && sockets[socketIndex + changeRow] || surroundingCount === 0) {
                                        radixPiece.remove()
                                        saveState(sockets)
                                    } else {
                                        var flag = true
                                        surroundingPieces.forEach((piece) => {
                                            if (sockets[socketIndex + piece] ? sockets[socketIndex + piece].firstElementChild : false) {
                                                if (!graphSearch(socketIndex + piece, [socketIndex], surroundingPieces)) {
                                                    flag = false
                                                }
                                            }
                                        })
                                        if (flag) {
                                            radixPiece.remove()
                                            saveState(sockets)
                                        }
                                    }
                                } else if (radixPiece.classList.contains("block_04")) {
                                    // Eliminazione incondizionata perché questo tipo di blocco non può avere niente sopra di esso
                                    clearSockets([-1, -changeRow, -(changeRow + 1)], socketIndex)
                                    radixPiece.remove()
                                    saveState(sockets)
                                } else if (radixPiece.classList.contains("block_05")) {
                                    // Attenzione che i calcoli per la cancellazione vengono fatti in base alla radice del blocco, che
                                    // non è in basso al centro, ma in basso a destra!
                                    switch (radixPiece.classList[1]) {
                                        case "0degree":
                                            console.log(workarea.querySelector(":hover"))
                                            console.log(socketIndex)
                                            console.log(socketIndex < (changeRow * 2))
                                            // Questo è corretto. Notare che l'indice è -((changeRow * 2) + 1) invece di -(changeRow * 2)
                                            if (socketIndex < (changeRow * 2) ||
                                                (!sockets[socketIndex -((changeRow * 2) + 1)].firstElementChild &&
                                                 !sockets[socketIndex -(changeRow * 1)].firstElementChild &&
                                                 !sockets[socketIndex -((changeRow * 1) + 2)].firstElementChild
                                                )) {
                                                clearSockets([-1, -2, -(changeRow + 1)], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "90degree":
                                            if (socketIndex < (changeRow * 3) ||
                                                (!sockets[socketIndex - (changeRow * 3)].firstElementChild &&
                                                 !sockets[socketIndex - ((changeRow * 2) - 1)].firstElementChild)) {
                                                clearSockets([-changeRow, -(changeRow * 2), - (changeRow - 1)], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "180degree":
                                            if (socketIndex < (changeRow * 2) ||
                                                (!sockets[socketIndex - (changeRow * 2)].firstElementChild &&
                                                !sockets[socketIndex -((changeRow * 2) - 1)].firstElementChild &&
                                                !sockets[socketIndex -((changeRow * 2) + 1)].firstElementChild)) {
                                                clearSockets([-changeRow, -(changeRow - 1), -(changeRow + 1)], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "270degree":
                                            if (socketIndex < (changeRow * 3) ||
                                                (!sockets[socketIndex - (changeRow * 3)].firstElementChild &&
                                                 !sockets[socketIndex - ((changeRow * 2) + 1)].firstElementChild)) {
                                                clearSockets([-changeRow, -(changeRow * 2), -(changeRow + 1)], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                    }
                                } else if (radixPiece.classList.contains("block_06")) {
                                    switch (radixPiece.classList[1]) {
                                        case "0degree":
                                        case "180degree":
                                            clearSockets([-changeRow], socketIndex)
                                            radixPiece.remove()
                                            saveState(sockets)
                                            break;
                                        case "90degree":
                                            if (socketIndex < (changeRow * 2) ||
                                                (!sockets[socketIndex - (changeRow + 1)].firstElementChild)) {
                                                clearSockets([-1], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                        case "270degree":
                                            if (socketIndex < (changeRow * 2) ||
                                                (!sockets[socketIndex - (changeRow)].firstElementChild)) {
                                                clearSockets([-1], socketIndex)
                                                radixPiece.remove()
                                                saveState(sockets)
                                            }
                                            break;
                                    }
                                } else if (radixPiece.classList.contains("omino") || radixPiece.classList.contains("cat")) {
                                    clearSockets([-1, -changeRow, -(changeRow + 1), -(changeRow * 2), -((changeRow * 2) + 1)], socketIndex)   
                                    radixPiece.remove()
                                    saveState(sockets)
                                }
                            }
                            
                        }
                    }
                })

        })
        
    }

    deleteBlock(document.querySelector(".fa-trash"))

    // CODICE PER LA CANCELLAZIONE DEI BLOCCHI - FINE

    // CODICE PER SALVARE ED EFFETTUARE L'UPDATE AL DATABASE - INIZIO

    function saveAndUpload(element) {
        
        element.addEventListener("click", () => {
            resetActions()
            let socketsContent = {}
            sockets.forEach((socket) =>{
                const name = socket.classList[1]
                socketsContent = {
                    ...socketsContent,
                    [name]: socket.firstElementChild ? socket.firstElementChild.outerHTML : null
                }
            })

            loadProjectState(sockets, socketsContent)

            console.log(originator.getState())
            console.log(socketsContent)
            console.log("upload al database")
        })

    }

    saveAndUpload(document.querySelector(".fa-save"))

    // CODICE PER SALVARE ED EFFETTUARE L'UPDATE AL DATABASE - FINE

    // Resetta le azioni quando si decide di iniziarne un altra.
    function resetActions() {
        // Rimuove il clone trascinato di un blocco
        if (clone) {
            clone.remove()
            clone = null
        }
        deleteActive = false
        copyActive = false
        selectedColor = null
        isDragging = false
        document.querySelector("body").style.cursor = ""
    }


    // Per annullare i "toggle" in corso
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") resetActions()
    });

    // CODICE PER IL RIDIMENSIONAMENTO E TRASCINAMENTO DELL'AREA DI LAVORO - INIZIO

    function dragAndResizeWorkArea(element) {

        function resetBackgroundUnderflow() {
            if (parseFloat(backgroundStyle.left) > 0) {
                element.style.left = "0px"
            } else if (parseFloat(backgroundStyle.right) > 0) {
                element.style.left = parseFloat(backgroundStyle.left) + parseFloat(backgroundStyle.right) + "px"
            }
            if (parseFloat(backgroundStyle.top) > 0) {
                element.style.top = "0px"
            } else if (parseFloat(backgroundStyle.bottom) > 0) {
                element.style.top = parseFloat(backgroundStyle.top) + parseFloat(backgroundStyle.bottom) + "px"
            }
        }

        // Definisco le dimensioni dello sfondo in base alla dimensione del viewport
        
        element.style.width = visualViewport.width > boardBaseWidth ? visualViewport.width + "px" : boardBaseWidth + "px"
        element.style.height = visualViewport.height > boardBaseHeight ? visualViewport.height + "px" : boardBaseHeight + "px"

        // devo ricordarmi di inizializzare gli elementi se non uso il computed style perché gli stili
        // da CSS non inizializzano la controparte HTML
        // Non devo riscalare l'elemento con lo style scaling, ma ridefinire proprio width e height.
        // es element.height * 0.95
        // Il valore viene dinamicamente aggiornato in quanto passo un riferimento, non c'è bisogno di aggiornare manualmente il valore una volta fatto getComputedStyle.

        const workarea = document.querySelector(".workarea")
        const backgroundStyle = window.getComputedStyle(element)
        const baseBackgroundWidth = parseFloat(backgroundStyle.width)
        const baseBackgroundHeight = parseFloat(backgroundStyle.height)
        const workareaStyle = window.getComputedStyle(document.querySelector(".workarea"))
        const baseHeight = parseFloat(workareaStyle.height)
        const baseWidth = parseFloat(workareaStyle.width)
        // Piano di lavoro centrato in basso
        element.style.top = (visualViewport.height - parseFloat(backgroundStyle.height) + parseFloat(workareaStyle.bottom)) + "px"
        element.style.left = (visualViewport.width - parseFloat(backgroundStyle.width)) / 2 + "px"

        // Aggiusto lo sfondo in base al resize dell'immagine

        window.addEventListener("resize", () => {
            let backgroundWidth = visualViewport.width > boardBaseWidth ? visualViewport.width : boardBaseWidth
            let backgroundHeight = visualViewport.height > boardBaseHeight ? visualViewport.height : boardBaseHeight
            element.style.width = backgroundWidth + "px"
            element.style.height = backgroundHeight + "px"
        })
    
        function scaleWorkArea(event) {
    
            function resize(previousHeight, previousWidth) {

                //Calcolo la percentuale di margine rispetto all'iterazione precedente per poi riproporla nella successiva
    
                let percentileX = - parseFloat(element.style.left) / (parseFloat(element.style.width) - parseFloat(visualViewport.width))
                let percentileY = - parseFloat(element.style.top) / (parseFloat(element.style.height) - parseFloat(visualViewport.height))
                
                // il background viene espanso anche quando riduco lo zoom
                if (zoom > 1) {
                    element.style.width = baseBackgroundWidth * zoom + "px"
                    element.style.height = baseBackgroundHeight * zoom + "px"
                }
    
                workarea.style.height = baseHeight * zoom + "px"
                workarea.style.width = baseWidth * zoom + "px"
    
                element.style.left = parseFloat(element.style.left) - (parseFloat(element.style.width) - previousWidth) * percentileX + "px"
                element.style.top = parseFloat(element.style.top) - (parseFloat(element.style.height) - previousHeight) * percentileY + "px"
    
                // Ora riscalo le dimensioni dei socket
                document.querySelectorAll(".socket").forEach((socket) => {
                    socket.style.width = `${60 * zoom}px`
                    socket.style.height = `${60 * zoom}px`
                })

                // Sistemo i bordi nel caso lo sfondo sia stato rimpicciolito troppo, spingendolo contro i bordi della wiewport

                resetBackgroundUnderflow()

            }


    
            let previousHeight = parseFloat(element.style.height)
            let previousWidth = parseFloat(element.style.width)
    
            // se l'evento è positivo sto scrollando in basso
            if (event.deltaY > 0) {
    
                if (zoom >= 0.5) {
                    zoom = zoom - 0.05
                }
    
                resize(previousHeight, previousWidth)
                
    
            } else {
    
                if (zoom <= 1.5) {
                    zoom = zoom + 0.05
                }
    
                resize(previousHeight, previousWidth)
            
            }
    
        }
    
        // le variabili dichiarate in questa funzione esterna rimangono accessibili per via della meccanica delle "closure"
        element.onwheel = scaleWorkArea

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(event) {
            event.preventDefault();
            // Posizione cursore all'inizio:
            pos3 = event.clientX;
            pos4 = event.clientY;
            window.onmouseup = closeDragElement;
            // Ogni volta che sposto il cursore:
            window.onmousemove = elementDrag;
        }
        
        function elementDrag(event) {

            event.preventDefault();
            // Precedente posizione del cursore
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            // Nuova posizione del cursore
            pos3 = event.clientX;
            pos4 = event.clientY;
            
            // imposto la nuova posizione evitando che si possa trascinare fuori dai confini.
            // Lo faccio senza setAttribute in quanto permette di aggiungere e controllare proprietà prima
            // non esistenti senza stravolgere l'approccio. Per cambiare gli stili bisogna fare element.setAttribute("style", "bottom: 0px")

            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.top = (element.offsetTop - pos2) + "px";

            resetBackgroundUnderflow()

        }

        function closeDragElement() {
            // Ferma il movimento quando viene rilasciato il mouse
            window.onmouseup = null;
            window.onmousemove = null;
        }

        // CODICE PER IL RIDIMENSIONAMENTO E TRASCINAMENTO DELL'AREA DI LAVORO - FINE

    }

    dragAndResizeWorkArea(document.querySelector(".workarea-background"));

}

manageLego(document.querySelector(".workarea"))

// CODICE PER LA GESTIONE DEI BLOCCHI - FINE