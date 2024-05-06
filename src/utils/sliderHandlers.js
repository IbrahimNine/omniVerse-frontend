export const handleNext = (setSliderPosition, sliderPosition, index) => {
  const elements = document.querySelectorAll(
    ".slider-container, .FirstLayerWrapper"
  );
  const element = elements[index];
  const elementWidth = element.offsetWidth;
  const elements2 = document.querySelectorAll(".slider-contents, .Collection");
  const element2 = elements2[index];
  const element2Width = element2.offsetWidth;
  if (elementWidth < element2Width + sliderPosition)
    setSliderPosition(sliderPosition - 200);
};
export const handlePrevious = (setSliderPosition, sliderPosition) => {
  if (sliderPosition !== 0) setSliderPosition(sliderPosition + 200);
};

// export const handleNext = (setSliderPosition, sliderPosition) => {
//   const elements = document.querySelectorAll(
//     ".slider-container, .FirstLayerWrapper"
//   );
//   elements.forEach((element) => {
//     const elementWidth = element.offsetWidth;
//     const element2Width = document.querySelector(
//       ".slider-contents, .Collection"
//     ).offsetWidth;
//     if (elementWidth < element2Width + sliderPosition)
//       setSliderPosition(sliderPosition - 200);
//   });
// };

// export const handlePrevious = (setSliderPosition, sliderPosition) => {
//   const elements = document.querySelectorAll(
//     ".slider-container, .FirstLayerWrapper"
//   );
//   elements.forEach((element) => {
//     if (sliderPosition !== 0) setSliderPosition(sliderPosition + 200);
//   });
// };
