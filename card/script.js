const container = document.querySelector(".card-container");

const MAX_ROTATE = 15;
const POP_Z = 40;
const SCALE = 1.08;

// 1️⃣ 카드 이미지 목록
const images = Array.from({ length: 15 }, (_, i) =>
  `images/p${String(i + 1).padStart(3, "0")}.png`
);

// 2️⃣ 카드 생성
images.forEach(src => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;

  card.appendChild(img);
  container.appendChild(card);

  attachCardEvents(card);
});

// 3️⃣ 카드 이벤트 함수
function attachCardEvents(card) {

  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.2s ease-out";
    card.style.transform = `
      translateZ(${POP_Z}px)
      scale(${SCALE})
    `;
  });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateX = (-deltaY / centerY) * MAX_ROTATE;
    const rotateY = ( deltaX / centerX) * MAX_ROTATE;

    card.style.transition = "transform 0.05s linear";
    card.style.transform = `
      translateZ(${POP_Z}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${SCALE})
    `;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    card.style.setProperty("--x", `${percentX}%`);
    card.style.setProperty("--y", `${percentY}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.25s ease-in-out";
    card.style.transform = `
      translateZ(0px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
}
