const item = document.querySelector('#item');
const container = document.querySelector('#contenedor');
const clearBtn = document.querySelector('#limpiar');
const addBtn = document.querySelector('#agregar');

const createListDOM = (value) => {
  const div = document.createElement('div');
  div.className = 'rounded-3 border p-3 item';
  div.innerHTML = value;
  container.appendChild(div);
};

const resetInput = () => {
  item.value = '';
};

const saveLocalList = () => {
  let list = JSON.parse(localStorage.getItem('list'));

  if (list !== null) {
    list.push(item.value);
  } else {
    list = [item.value];
  }

  localStorage.setItem('list', JSON.stringify(list));

  return list;
};

const clearData = () => {
  localStorage.removeItem('list');
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    item.remove();
  });
};

item.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    createListDOM(item.value);
    saveLocalList();
    resetInput();
  }
});

const loadList = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  if (list !== null) {
    list.forEach((item) => createListDOM(item));
  }
};

addBtn.addEventListener('click', () => {
  createListDOM(item.value);
  saveLocalList();
  resetInput();
});

clearBtn.addEventListener('click', () => {
  clearData();
});

document.addEventListener('DOMContentLoaded', () => {
  loadList();
});
