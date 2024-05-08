/*
* File: app.js
* Author: Ónodi András
* Copyright: 2024, Ónodi András
* Group: Szoft I-N-2
* Date: 2024-05-08
* Github: https://github.com/AndrasOnodi/
* Licenc: GNU GPL
*/

const doc = {
    compBody: document.querySelector("#compBody"),
    multiButton: document.querySelector('#multiButton'),
    idInput: document.querySelector('#id'),
    descInput: document.querySelector('#desc'),
    compInput: document.querySelector('#complainant'),
    produInput: document.querySelector('#products'),
    typeInput: document.querySelector('#type'),
    operatorModalLabel: document.querySelector('#operatorModalLabel')
}

const state = {
    host:  'http://localhost:8000',
    endpoint: 'complaints',
    id: 0,
    desc: 'üres',
    complainant: 'ismeretlen',
    products: 'valami',
    type: 'típus',
    mode: 'add'
}

doc.multiButton.addEventListener('click', () => {
    console.log('Mentés...')
    setComplaintState()
    addComplaint()
})

getComplaints()

function setComplaintState() {
    state.id = doc.idInput.value
    state.desc = doc.descInput.value
    state.complainant = doc.compInput.value
    state.products = doc.produInput.value
    state.type = doc.typeInput.value
    deleteOperatorContent()
}

function addComplaint() {
    doc.operatorModalLabel.textContent = 'Hozzáadás'
    let url = state.host + '/' + state.endpoint
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            desc: state.desc,
            complaints: state.complaints,
            products: state.products
        })
   }) 
}

function getComplaints() {
    let url = state.host + '/' + state.endpoint
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        renderComplaints(result)
    })
}

function renderComplaints(compList) {    
    compList.forEach(comp => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${comp.id}</td>
            <td>${comp.desc}</td>
            <td>${comp.complaints}</td>
            <td>${comp.products}</td>
            <td>${comp.type}</td>
            <td>
                <button class="btn btn-primary"
                data-id="${comp.id}"
                data-desc="${comp.desc}"
                data-complaints="${comp.complaints}"
                data-products="${comp.products}"
                data-type=${comp.type}
                onclick="updateComplaints(this)"
                data-bs-toggle="modal"
                data-bs-target="#operatorModal"
                >
                    Szerkesztés
                </button>
                <button class="btn btn-danger"
                onclick="deleteEmployee(${comp.id})"
                >
                    Törlés
                </button>
            </td>
        `
        doc.compBody.appendChild(tr)
        console.log(comp.complaints)
    });
}

function deleteComplaints(id) {
    const url = state.host + '/' + 
        state.endpoint +
        '/' + id
    console.log(url)
    fetch(url, {method: 'delete'})
}

function updateComplaints(source) {
    doc.operatorModalLabel.textContent = 'Szerkesztés'
    const url = state.host + '/' + 
        state.endpoint +
        '/' + id
        console.log(source.dataset.id)
        doc.idInput.value = source.dataset.id
        doc.descInput.value = source.dataset.desc
        doc.complaintsInput.value = source.dataset.complaints
        doc.productsInput.value = source.dataset.products
        doc.typeInput.value = source.dataset.type
}

function showAddModal() {
    doc.operatorModalLabel.textContent = "Hozzáadás"
    deleteOperatorContent()
}

function deleteOperatorContent() {
    doc.idInput.value = ''
    doc.descInput.value = ''
    doc.compInput.value = ''
    doc.produInput.value = ''
    doc.typeInput.value = ''
}