// Apple-style interactions for Möbius Strip Math Story

document.addEventListener('DOMContentLoaded', () => {
    // 检测设备类型
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // 简化移动设备上的动画和交互
    if (isMobile) {
        // 减少移动设备上的视差效果
        const parallaxElements = document.querySelectorAll('.story-content, .fun-fact');
        parallaxElements.forEach(elem => {
            elem.style.transform = 'none';
        });
    }

    // Modal functionality
    const modal = document.getElementById('instructions-modal');
    const showInstructionsBtn = document.getElementById('show-instructions');
    const closeBtn = document.querySelector('.close-button');
    
    // Show modal
    if (showInstructionsBtn && modal) {
        showInstructionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal 
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content on non-mobile devices
    // 在移动设备上通常不应该通过点击外部区域关闭模态框
    if (modal && !isMobile) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Add subtle parallax effect to content only on desktop
    if (!isMobile) {
        const storyContent = document.querySelector('.story-content');
        const funFact = document.querySelector('.fun-fact');
        
        if (storyContent) {
            // 使用节流函数优化滚动事件处理
            let lastScrollTime = 0;
            window.addEventListener('scroll', () => {
                const now = Date.now();
                if (now - lastScrollTime > 20) { // 限制每20ms最多执行一次
                    lastScrollTime = now;
                    
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < window.innerHeight) {
                        const translateY = scrollPosition * 0.02; // 减少移动量
                        storyContent.style.transform = `translateY(${translateY}px)`;
                        
                        if (funFact) {
                            funFact.style.transform = `translateY(${translateY * 1.1}px)`;
                        }
                    }
                }
            }, { passive: true }); // 添加passive标志提高滚动性能
        }
    }
    
    // 简化交互效果，针对设备进行优化
    const addHoverEffect = (selector) => {
        document.querySelectorAll(selector).forEach(element => {
            if (!isMobile) {
                // 桌面设备使用hover效果
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'scale(1.01)'; // 减小缩放比例
                    element.style.transition = 'transform 0.3s ease';
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'scale(1)';
                });
            } else {
                // 移动设备使用active效果
                element.addEventListener('touchstart', () => {
                    element.style.transform = 'scale(0.99)';
                    element.style.transition = 'transform 0.2s ease';
                });
                
                element.addEventListener('touchend', () => {
                    element.style.transform = 'scale(1)';
                });
            }
        });
    };
    
    // 应用交互效果
    addHoverEffect('.fun-fact');
    
    // 简化视频加载检测
    const tryLoadVideo = () => {
        const videoPath = 'videos/mobius_strip.mp4';
        fetch(videoPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // 视频存在，替换iframe
                    const videoContainer = document.querySelector('.video-container');
                    const iframe = document.getElementById('animation-frame');
                    
                    if (videoContainer && iframe) {
                        // 创建视频元素
                        const video = document.createElement('video');
                        video.controls = true;
                        video.playsInline = true; // 允许在iPhone上内联播放
                        video.width = '100%';
                        video.height = '100%';
                        video.style.borderRadius = '18px';
                        video.style.position = 'absolute';
                        video.style.top = '0';
                        video.style.left = '0';
                        
                        // 添加视频源
                        const source = document.createElement('source');
                        source.src = videoPath;
                        source.type = 'video/mp4';
                        
                        video.appendChild(source);
                        
                        // 替换iframe
                        videoContainer.innerHTML = '';
                        videoContainer.appendChild(video);
                    }
                }
            })
            .catch(() => {
                console.log('Video file not found or error loading, showing fallback animation');
            });
    };
    
    // 尝试加载视频
    tryLoadVideo();
}); 