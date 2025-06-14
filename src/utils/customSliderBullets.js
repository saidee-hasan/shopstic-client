const customSliderBullets = (
    bulletSize=10,
    activeBulletColor="#abd006",
    inActiveBulletColor="#2222228e",
    bulletWidth=30,
    bulletBorderRadius=0,
    bulletGap=5
) => {
  return {
    "--swiper-pagination-bullet-size": `${bulletSize}px`,
    "--swiper-pagination-bullet-width": `${bulletWidth}px`,
    "--swiper-pagination-bullet-border-radius": `${bulletBorderRadius}%`,
    "--swiper-pagination-color": `${activeBulletColor}`,
    "--swiper-pagination-bullet-inactive-color": `${inActiveBulletColor}`,
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-horizontal-gap": `${bulletGap}px`,
  };
};

export default customSliderBullets;
