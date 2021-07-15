
let gallaryFiles = [];

async function fetchData() {
  let jsonData = insertData().then((data) => {
    gallaryFiles = data.data;
    process(gallaryFiles);
  });
}

function process(params) {
  const galleryDisplay = document.querySelector('#galleryDisplay');
  const div = document.createElement('div');
  div.classList.add('row');
  params.forEach(obj => {

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('col-lg-4');

    const editbtn = document.createElement('button');
    editbtn.classList.add('btn');
    editbtn.classList.add('btn-primary')
    editbtn.innerHTML = 'Edit';
    editbtn.onclick = () => edit(obj);

    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    btn.innerHTML = 'Delete';
    btn.onclick = () => deleteItem(obj.id);

    const img = document.createElement('img');
    img.classList.add('w-100');
    img.classList.add('shadow-1-strong');
    img.classList.add('rounded');
    img.classList.add('md-4');
    img.style.marginBottom = "20px";
    img.src = obj.image;
    img.width = 200;
    img.height = 200;

    const span = document.createElement("span");
    span.innerHTML = "&nbsp;&nbsp";

    const divForSpace = document.createElement("div");

    innerDiv.appendChild(img);
    innerDiv.appendChild(editbtn);
    innerDiv.appendChild(span);
    innerDiv.appendChild(btn);
    div.appendChild(innerDiv);

  });

  for (const iterator of galleryDisplay.children) {
    iterator.remove();
  }
  galleryDisplay.appendChild(div);
}


function insertData() {
  const imageURL = new Request('js/data.json');
  return new Promise((resolve, reject) => {
    fetch(imageURL)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
  });
}
function edit(obj) {
  const modal = document.getElementById('addModal');
  modal.click();
  const idHidden = document.getElementById('idHidden');
  idHidden.value = obj.id;
  document.getElementById('name').value = obj.name;
  document.getElementById('description').value = obj.description;
  document.getElementById('path').value = obj.image;
}

function submit(params) {
  const obj = { id: Math.random() };

  let imageName = document.getElementById('name').value;
  let imagePath = document.getElementById('path').value;
  let imageDescription = document.getElementById('description').value;
  if (imageName == "") {
    document.getElementById("requiredName").innerHTML = "Required!!";
  }
  else if (imagePath == "") {
    document.getElementById("requiredPath").innerHTML = "Required!!";

  }
  else if (imageDescription == "") {

    document.getElementById("requiredDesc").innerHTML = "Required!!";
  }
  else {
    obj.name = document.getElementById('name').value;
    obj.description = document.getElementById('description').value;
    obj.image = document.getElementById('path').value;
    if (document.getElementById('idHidden').value) {
      obj.id = document.getElementById('idHidden').value;
      const index = gallaryFiles.findIndex(f => f.id == obj.id);
      gallaryFiles[index] = obj;
    } else {
      gallaryFiles.push(obj);
    }
    process(gallaryFiles);
    document.getElementById('idHidden').value = "";
  }
}


function deleteItem(id) {
  const index = gallaryFiles.findIndex((g) => g.id == id);
  if (index != -1) {
    gallaryFiles.splice(index, 1);
    process(gallaryFiles);
  }
}