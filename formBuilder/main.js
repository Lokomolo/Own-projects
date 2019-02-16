window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
var formContainer = document.getElementById('form-container');
var mainBtn = document.getElementById('main-btn');
var nextFormId = 1;
var db;
function genereteMyForm(sub, id, type, question, childs,
    parentId = '', answer = '', condition = '') {
        var parentGen = document.getElementById(parentId);
    if (sub === true) {
        var form = document.createElement('form');
        parentGen.appendChild(form);
        form.classList.add('form')
        form.id = parseInt(id, 10);
        nextFormId++;
    } else {
        var formWrapper = document.createElement('div');
        formContainer.appendChild(formWrapper);
        formWrapper.classList.add('form-wrapper');
        var form = document.createElement('form');
        formWrapper.appendChild(form);
        form.classList.add('form')
        form.id = parseInt(id, 10);
    }
    let fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);
    if (sub === true) {
        fieldset.classList.add('sub-input');
    } else {
        fieldset.classList.add('primal-input');
    }
    let ul = document.createElement('ul');
    fieldset.appendChild(ul);

    if (sub === true) {
        let primal = document.getElementById(parentId).getElementsByClassName('select-type')[0];
        primal.disabled = 'true';
        primal.style.color = 'black';
        let condiLi = document.createElement('li');
        ul.appendChild(condiLi);
        let condiP = document.createElement('p');
        condiLi.appendChild(condiP);
        condiP.innerHTML = 'Condition';
        let smallWrapper = document.createElement('div');
        condiLi.appendChild(smallWrapper);
        smallWrapper.classList.add('small-wrapper');
        let condiSelect = document.createElement('select');
            if (condition === 'Yes' || condition === 'No') {
/*                 condition = 'Yes'; */
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Yes';
                condiOption1.innerHTML = 'Yes'
                let condiOption2 = document.createElement('option');
                condiSelect.appendChild(condiOption2);
                condiOption2.value = 'No';
                condiOption2.innerHTML = 'No';
            } else if (condition === 'Equals'||condition === 'Greater than'||condition === 'Less than') {
/*                 condition = 'Equals'; */
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Equals';
                condiOption1.innerHTML = 'Equals'
                let condiOption2 = document.createElement('option');
                condiSelect.appendChild(condiOption2);
                condiOption2.value = 'Greater than';
                condiOption2.innerHTML = 'Greater than'
                let condiOption3 = document.createElement('option');
                condiSelect.appendChild(condiOption3);
                condiOption3.value = 'Less than';
                condiOption3.innerHTML = 'Less than'
            } else {
/*                 condition = 'Equals'; */
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Equals';
                condiOption1.innerHTML = 'Equals'
            }

            condiSelect.addEventListener('change', function () {
                let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
                updateDB(parentId, 'condition', condiSelect.value);
            })

        smallWrapper.appendChild(condiSelect);
        condiSelect.classList.add('condition-select');
        let answerGen = document.createElement('input');
        condiLi.appendChild(answerGen);
        answerGen.classList.add('answer-input');
        answerGen.type = 'text';
        answerGen.value = answer;
        answerGen.addEventListener('input', function(){
            let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
            updateDB(parentId, 'answer', answerGen.value);
        })
        console.log(document.getElementsByClassName('condition-select'));
        for(option of document.getElementsByClassName('condition-select')[0].getElementsByTagName('option')){
            if(option.value === condition){
                console.log(option.value);
                option.selected = 'selected';
            }
        }

    }

    let li1 = document.createElement('li');
    ul.appendChild(li1);
    let p1 = document.createElement('p');
    li1.appendChild(p1);
    p1.innerHTML = 'Question';
    let input = document.createElement('input');
    li1.appendChild(input);
    input.type = 'text';
    input.value = question;
    input.classList.add('question');

    let li2 = document.createElement('li');
    ul.appendChild(li2);
    let p2 = document.createElement('p');
    li2.appendChild(p2);
    p2.innerHTML = 'Type';
    let selectWrapper = document.createElement('div');
    selectWrapper.classList.add('wrapper');
    li2.appendChild(selectWrapper);
    let select = document.createElement('select');
    li2.appendChild(select);
    select.classList.add('select-type');
    let option1 = document.createElement('option');
    select.appendChild(option1);
    option1.value = 'Yes/No';
    option1.innerHTML = 'Yes / No';
    let option2 = document.createElement('option');
    select.appendChild(option2);
    option2.value = 'Number';
    option2.innerHTML = 'Number';
    let option3 = document.createElement('option');
    select.appendChild(option3);
    option3.value = 'Text';
    option3.innerHTML = 'Text';
    for(option of document.getElementsByClassName('select-type')[0].getElementsByTagName('option')){
        if(option.value === type){
            option.selected = 'selected';
        }
    }
    let li3 = document.createElement('li');
    ul.appendChild(li3);
    let inputBtn2 = document.createElement('input');
    li3.appendChild(inputBtn2);
    inputBtn2.value = 'Delete';
    inputBtn2.type = 'button';
    inputBtn2.addEventListener('click', function (e) {
        let parentFormId = e.path[4].id;
        e.path[4].remove();
        getDataDB(parentFormId, 'childs').then(function(r){
            for(elId of r){
                removeDBElement(elId);
                document.getElementById(elId).remove();
            }
        });
        getDataDB(parentFormId, 'parentId').then(function(r){
            console.log(r);
            getDataDB(r, 'childs').then(function(chi){
                var index = chi.indexOf(parseInt(parentFormId, 10));
                if (index > -1) {
                    chi.splice(index, 1);
                }
                updateDB(r, 'childs', chi);
                if(chi.length === 0) {
                    let primal = document.getElementById(r).getElementsByClassName('select-type')[0];
                    primal.disabled = false;
                }
            })

        })
        removeDBElement(parentFormId);
        
    })
    let inputBtn1 = document.createElement('input');
    li3.appendChild(inputBtn1);
    inputBtn1.value = 'Add Sub-Input';
    nextFormId++; // solve problem with adding first subForm after generete
    inputBtn1.addEventListener('click', function (e) {
        console.log(e);
        createMyForm(true, e)
        
    });
    inputBtn1.type = 'button';

    select.addEventListener('change', function () {
        let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
        updateDB(parentId, 'type', select.value);
    });

    input.addEventListener('input', function () {
        let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
        updateDB(parentId, 'question', input.value);
    })
}
function createMyForm(sub, e) {
    if (sub === true) {
        var form = document.createElement('form');
        e.path[5].appendChild(form);
        form.classList.add('form')
        form.id = nextFormId++;
    } else {
        var formWrapper = document.createElement('div');
        formContainer.appendChild(formWrapper);
        formWrapper.classList.add('form-wrapper');
        var form = document.createElement('form');
        formWrapper.appendChild(form);
        form.classList.add('form')
        form.id = nextFormId++;
    }
    let fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);
    if (sub === true) {
        fieldset.classList.add('sub-input');
    } else {
        fieldset.classList.add('primal-input');
    }
    let ul = document.createElement('ul');
    fieldset.appendChild(ul);

    if (sub === true) {
        let primal = document.getElementById(e.path[4].id).getElementsByClassName('select-type')[0];
        primal.disabled = 'true';
        primal.style.color = 'black';
        let condiLi = document.createElement('li');
        ul.appendChild(condiLi);
        let condiP = document.createElement('p');
        condiLi.appendChild(condiP);
        condiP.innerHTML = 'Condition';
        let smallWrapper = document.createElement('div');
        condiLi.appendChild(smallWrapper);
        smallWrapper.classList.add('small-wrapper');
        let condiSelect = document.createElement('select');
        let response = getDataDB(e.path[4].id, 'type');
        response.then(function (res) {
            var condition;
            if (res === 'Yes/No') {
                condition = 'Yes';
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Yes';
                condiOption1.innerHTML = 'Yes'
                let condiOption2 = document.createElement('option');
                condiSelect.appendChild(condiOption2);
                condiOption2.value = 'No';
                condiOption2.innerHTML = 'No';
            } else if (res === 'Number') {
                condition = 'Equals';
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Equals';
                condiOption1.innerHTML = 'Equals'
                let condiOption2 = document.createElement('option');
                condiSelect.appendChild(condiOption2);
                condiOption2.value = 'Greater than';
                condiOption2.innerHTML = 'Greater than'
                let condiOption3 = document.createElement('option');
                condiSelect.appendChild(condiOption3);
                condiOption3.value = 'Less than';
                condiOption3.innerHTML = 'Less than'
            } else {
                condition = 'Equals';
                let condiOption1 = document.createElement('option');
                condiSelect.appendChild(condiOption1);
                condiOption1.value = 'Equals';
                condiOption1.innerHTML = 'Equals'
            }
            //update indexedDB.childs
            getDataDB(e.path[4].id, 'childs').then(function(res) {
                res.push(nextFormId - 1);
                updateDB(e.path[4].id, 'childs', res);
            });
            addSubToDB(nextFormId - 1, e.path[4].id, condition);
            condiSelect.addEventListener('change', function () {
                let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
                updateDB(parentId, 'condition', condiSelect.value);
            })
        });
        smallWrapper.appendChild(condiSelect);
        condiSelect.classList.add('condition-select');
        let answer = document.createElement('input');
        condiLi.appendChild(answer);
        answer.classList.add('answer-input');
        answer.type = 'text';
        answer.addEventListener('input', function(){
            let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
            updateDB(parentId, 'answer', answer.value);
        })

    }

    let li1 = document.createElement('li');
    ul.appendChild(li1);
    let p1 = document.createElement('p');
    li1.appendChild(p1);
    p1.innerHTML = 'Question';
    let input = document.createElement('input');
    li1.appendChild(input);
    input.type = 'text';
    input.classList.add('question');

    let li2 = document.createElement('li');
    ul.appendChild(li2);
    let p2 = document.createElement('p');
    li2.appendChild(p2);
    p2.innerHTML = 'Type';
    let selectWrapper = document.createElement('div');
    selectWrapper.classList.add('wrapper');
    li2.appendChild(selectWrapper);
    let select = document.createElement('select');
    li2.appendChild(select);
    select.classList.add('select-type');
    let option1 = document.createElement('option');
    select.appendChild(option1);
    option1.value = 'Yes/No';
    option1.innerHTML = 'Yes / No';
    let option2 = document.createElement('option');
    select.appendChild(option2);
    option2.value = 'Number';
    option2.innerHTML = 'Number';
    let option3 = document.createElement('option');
    select.appendChild(option3);
    option3.value = 'Text';
    option3.innerHTML = 'Text';

    let li3 = document.createElement('li');
    ul.appendChild(li3);
    let inputBtn2 = document.createElement('input');
    li3.appendChild(inputBtn2);
    inputBtn2.value = 'Delete';
    inputBtn2.type = 'button';
    inputBtn2.addEventListener('click', function (e) {
        let parentFormId = e.path[4].id;
        e.path[4].remove();
        getDataDB(parentFormId, 'childs').then(function(r){
            for(elId of r){
                console.log(elId);
                removeDBElement(elId);
                document.getElementById(elId).remove();
            }
        });
        
        getDataDB(parentFormId, 'parentId').then(function(r){
            getDataDB(r, 'childs').then(function(chi){
                var index = chi.indexOf(parseInt(parentFormId, 10));
                if (index > -1) {
                    chi.splice(index, 1);
                }
                updateDB(r, 'childs', chi);
                if(chi.length === 0) {
                    let primal = document.getElementById(r).getElementsByClassName('select-type')[0];
                    primal.disabled = false;
                }
            })

        })
        removeDBElement(parentFormId);
        
    })
    let inputBtn1 = document.createElement('input');
    li3.appendChild(inputBtn1);
    inputBtn1.value = 'Add Sub-Input';
    inputBtn1.addEventListener('click', function (e) {
        createMyForm(true, e)
    });
    inputBtn1.type = 'button';
    if (sub === true) {
    } else {
        addPrimalToDB(nextFormId - 1);
    }
    select.addEventListener('change', function () {
        let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
        updateDB(parentId, 'type', select.value);
    });

    input.addEventListener('input', function () {
        let parentId = select.parentElement.parentElement.parentElement.parentElement.id;
        updateDB(parentId, 'question', input.value);
    })
}

function openDB() {
    console.log("openDb ...");
    var req = indexedDB.open('formBuilder', 1);
    req.onsuccess = function (e) {

        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (e) {
        console.error("openDb:", e.target.errorCode);
    };
    req.onupgradeneeded = function (e) {
        console.log("openDb.onupgradeneeded");
        var store = e.currentTarget.result.createObjectStore(
            'forms', {
                keyPath: 'formId'
            });
        try {
            store.createIndex('formId', 'formId', {
                unique: true
            });
        } catch (e) {
            if (e.name == 'DataCloneError')
                displayActionFailure("This engine doesn't know how to clone a Blob, " +
                    "use Firefox");
            throw e;
        }
        req.onsuccess = function (e) {
            console.log("Insertion in DB successful");

        };
        req.onerror = function () {
            console.error("addPublication error", this.error);

        };
        // solve problem with first start and after deleting indexedDB
        location.reload(); 
    };
}
function removeDBElement(id) {
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req = store.get(parseInt(id, 10));
    req.onsuccess = function (e) {
        req = store.delete(parseInt(id, 10));
        req.onsuccess = function (e) {
            console.log("delete successful");
        };
        req.onerror = function (e) {
            console.error("deletePublication:", e.target.errorCode);
        };
    };
    req.onerror = function (e) {
        console.error("deletePublication:", e.target.errorCode);
    };
}

function addPrimalToDB(id, type = 'Yes/No', question = '', childs = []) {
    var obj = {
        formId: id,
        type: type,
        question: question,
        childs: childs,
    }
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req;

    req = store.add(obj);

    req.onsuccess = function (e) {
        console.log("Insertion in DB successful");
    };
    req.onerror = function () {
        console.error("addPublication error", this.error);
    };
}
function addSubToDB(id, parentId, condition, childs = [] ,type = 'Yes/No', question = '', answer = '') {
    var obj = {
        formId: id,
        type: type,
        question: question,
        childs: childs,
        parentId: parentId,
        answer: answer,
        condition: condition,
    }
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req;

    req = store.add(obj);

    req.onsuccess = function (e) {
        console.log("Insertion in DB successful");
    };
    req.onerror = function () {
        console.error("addPublication error", this.error);
    };
}
function updateDB(id, type, value) {
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req = store.get(parseInt(id, 10));

    req.onsuccess = function (e) {
        var data = e.target.result;
        data[type] = value;
        var reqUpdate = store.put(data);
        reqUpdate.onsuccess = function (e) {
            console.log('Update succes');
        }
        reqUpdate.onerror = function () {
            console.error('Update fail');
        };
    };
    req.onerror = function () {
        console.error('Get fail');
    };
}

function getDataDB(id, toReturn) {
    return new Promise(function (resolve, reject) {
        var store = db.transaction('forms', 'readwrite').objectStore('forms');
        var req = store.get(parseInt(id, 10));
        req.onsuccess = function (event) {
            if(toReturn === 'all'){
                resolve(event.target.result);
            } else {
                resolve(event.target.result[toReturn]);
            }
        }
        req.onerror = function (event) {
            reject(event)
        }
    })
    var data = '';
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req = store.get(parseInt(id, 10));

    req.onsuccess = function (e) {
        data = e.target.result[toReturn];
    }
    req.onerror = function () {
        console.error('Get fail');
    };
    return data;

}
mainBtn.addEventListener('click', function (e) {
    createMyForm(false);
});
openDB();

window.onload = function(e) {
  
    var store = db.transaction('forms', 'readwrite').objectStore('forms');
    var req = store.getAll();

    req.onsuccess = function (e) {
        for(form of e.target.result){
            if(Object.keys(form).length === 4){
                genereteMyForm(false, form.formId, form.type, form.question, form.childs);
            } else {
                genereteMyForm(true, form.formId, form.type, form.question, form.childs,
                                form.parentId, form.answer, form.condition);
            }
        }
    };
    req.onerror = function () {
        console.error('Get fail');
    };
}