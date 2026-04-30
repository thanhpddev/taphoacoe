document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".btn-acc");

  allButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentContent = this.nextElementSibling;
      const isOpen = this.classList.contains("open");

      // --- BƯỚC 1: ĐÓNG CÁC CÁI ĐANG MỞ ---
      allButtons.forEach((otherBtn) => {
        if (otherBtn.classList.contains("open")) {
          const otherContent = otherBtn.nextElementSibling;

          // Lấy chiều cao hiện tại (thay vì auto) để transition có điểm bắt đầu
          otherContent.style.height = otherContent.scrollHeight + "px";

          // Force Reflow: Ép trình duyệt ghi nhận chiều cao trước khi đóng
          otherContent.offsetHeight;

          otherContent.style.height = "0px";
          otherBtn.classList.remove("open");

          // Ẩn display sau khi animation kết thúc
          setTimeout(() => {
            if (otherContent.style.height === "0px") {
              otherContent.style.display = "none";
            }
          }, 400);
        }
      });

      // --- BƯỚC 2: MỞ CÁI ĐƯỢC CLICK (Nếu lúc đầu nó đang đóng) ---
      if (!isOpen) {
        currentContent.style.display = "block";
        const fullHeight = currentContent.scrollHeight + "px";

        // Đảm bảo bắt đầu từ 0
        currentContent.style.height = "0px";

        // Force Reflow
        currentContent.offsetHeight;

        this.classList.add("open");
        currentContent.style.height = fullHeight;

        // Sau khi mở xong, trả về auto để nội dung linh hoạt
        setTimeout(() => {
          if (this.classList.contains("open")) {
            currentContent.style.height = "auto";
          }
        }, 400);
      }
    });
  });
});

// Lazy load video khi scroll vào viewport
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Video vào viewport → play
          video.play().catch((err) => {
            console.log("Không thể play video:", err);
          });
        } else {
          // Video ra khỏi viewport → pause
          video.pause();
        }
      });
    },
    {
      threshold: 0.5, // 50% video phải hiện mới play
      rootMargin: "0px 0px -10% 0px", // cho phép play sớm một chút
    },
  );

  videos.forEach((video) => {
    observer.observe(video);

    // Thêm sự kiện click để người dùng có thể play/pause thủ công
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
});
