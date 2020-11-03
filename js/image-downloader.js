'use strict';

const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const imagesContainer = document.querySelector(`.ad-form__upload`);
const avatarChooser = document.querySelector(`#avatar`);
const imageChooser = document.querySelector(`#images`);
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const ImageParams = {
  WIDTH: `70px`,
  HEIGHT: `70px`,
  BORDER_RADIUS: `5px`
};

const filtrationByCorrectType = (file) => {
  return FILE_TYPES.some((it) => {
    return file.name.toLowerCase().endsWith(it);
  });
};

const changeAvatar = (src) => {
  avatarPreview.src = src;
};

const removeEmptyImgWrap = () => {
  let emptyImgWrap = document.querySelector(`.ad-form__photo--empty`);
  if (emptyImgWrap) {
    emptyImgWrap.remove();
  }
};

const addImages = (src) => {
  let {WIDTH, HEIGHT, BORDER_RADIUS} = ImageParams;
  let newImageWrap = document.createElement(`div`);
  let image = document.createElement(`img`);
  newImageWrap.classList.add(`ad-form__photo`);
  newImageWrap.classList.add(`ad-form__photo--added`);
  image.src = src;
  image.style.width = WIDTH;
  image.style.height = HEIGHT;
  image.style.borderRadius = BORDER_RADIUS;
  newImageWrap.appendChild(image);
  imagesContainer.appendChild(newImageWrap);
  removeEmptyImgWrap();
};

const addEmptyImgWrap = () => {
  if (!document.querySelector(`.ad-form__photo--empty`)) {
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
  avatarPreview.src = DEFAULT_AVATAR;
  let addedImages = document.querySelectorAll(`.ad-form__photo--added`);
  if (addedImages) {
    addedImages.forEach((it) => {
      it.remove();
    });
  }
  addEmptyImgWrap();
};

const onAvatarChange = (evt) => loadFile(evt.target, changeAvatar);

const onPhotoChange = (evt) => loadFile(evt.target, addImages);

const activate = () => {
  avatarChooser.addEventListener(`change`, onAvatarChange);
  imageChooser.addEventListener(`change`, onPhotoChange);
};

const deactivate = () => {
  avatarChooser.removeEventListener(`change`, onAvatarChange);
  imageChooser.removeEventListener(`change`, onPhotoChange);
};

window.loadImage = {
  activate,
  deactivate,
  removeImages
};
