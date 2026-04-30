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

// Tự động play khi scroll vào viewport - Không controls
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".video video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.5, // 50% video hiện trên màn hình
      rootMargin: "0px 0px -80px 0px", // Play sớm hơn một chút
    },
  );

  videos.forEach((video) => {
    observer.observe(video);

    // Cho phép người dùng play/pause bằng cách chạm vào video
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    // Hỗ trợ tốt hơn trên mobile
    video.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault(); // Ngăn scroll khi chạm
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      },
      { passive: false },
    );
  });
});
