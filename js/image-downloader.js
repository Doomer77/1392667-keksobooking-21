'use strict';

const avatarPreview = window.util.monipulateElementDOM('.ad-form-header__preview img');
const imagesContainer = window.util.monipulateElementDOM('.ad-form__upload');
const avatarChooser = window.util.monipulateElementDOM('#avatar');
const imageChooser = window.util.monipulateElementDOM('#images');


const filtrationByCorrectType = (file) => {
  return window.data.FILE_TYPES.some((it) => {
    return file.name.toLowerCase().endsWith(it);
  });
};

const changeAvatar = (src) => {
  avatarPreview.src = src;
};

const removeEmptyImgWrap = () => {
  let emptyImgWrap = window.util.monipulateElementDOM(`.ad-form__photo--empty`);
  if (emptyImgWrap) {
    emptyImgWrap.remove();
  }
};

const addImages = (src) => {
  let newImageWrap = document.createElement(`div`);
  let image = document.createElement(`img`);
  newImageWrap.classList.add(`ad-form__photo`);
  newImageWrap.classList.add(`ad-form__photo--added`);
  image.src = src;
  image.style.width = window.data.IMAGE_PARAMS.WIDTH;
  image.style.height = window.data.IMAGE_PARAMS.HEIGHT;
  image.style.borderRadius = window.data.IMAGE_PARAMS.BORDER_RADIUS;
  newImageWrap.appendChild(image);
  imagesContainer.appendChild(newImageWrap);
  removeEmptyImgWrap();
};

const addEmptyImgWrap = () => {
  if (!window.util.monipulateElementDOM(`.ad-form__photo--empty`)) {
    let emptyImgWrap = document.createElement(`div`);
    emptyImgWrap.classList.add(`ad-form__photo`);
    emptyImgWrap.classList.add(`ad-form__photo--empty`);
    imagesContainer.appendChild(emptyImgWrap);
  }
};

const loadFile = (chooser, func) => {
  let files = Array.from(chooser.files).filter(filtrationByCorrectType);
  if (files) {
    files.forEach((item) => {
      let reader = new FileReader();
      reader.addEventListener(`load`, (evt) => {
        func(evt.target.result);
      });
      reader.readAsDataURL(item);
    });
  }
};

const removeImages = () => {
  avatarPreview.src = window.data.DEFAULT_AVATAR;
  let addedImages = document.querySelectorAll(`.ad-form__photo--added`);
  if (addedImages) {
    addedImages.forEach(function (it) {
      it.remove();
    });
  }
  addEmptyImgWrap();
};

const onAvatarChange = (evt) => {
  loadFile(evt.target, changeAvatar);
};

const onPhotoChange = (evt) => {
  loadFile(evt.target, addImages);
};

const activate = () => {
  avatarChooser.addEventListener(`change`, onAvatarChange);
  imageChooser.addEventListener(`change`, onPhotoChange);
};

const deactivate = () => {
  avatarChooser.removeEventListener(`change`, onAvatarChange);
  imageChooser.removeEventListener(`change`, onPhotoChange);
};

window.loadImage = {
  activate: activate,
  deactivate: deactivate,
  remove: removeImages
};
