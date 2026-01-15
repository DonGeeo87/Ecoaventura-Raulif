import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const colors = ['#FFD700', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];

        class Particle {
            x: number;
            y: number;
            size: number;
            color: string;
            speedX: number;
            speedY: number;
            rotation: number;
            rotationSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = -10;
                this.size = Math.random() * 10 + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 4 - 2;
                this.speedY = Math.random() * 3 + 2;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        const createParticles = () => {
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (particles.length < 300) {
                createParticles();
            }

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].y > canvas.height) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        // Timeout to stop animation
        const timeoutId = setTimeout(() => {
            // Optional: gradual stop logic could go here
        }, 5000);

        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timeoutId);
        };
    }, []);

    return <canvas ref={canvasRef} className="confetti-canvas" />;
};

export default Confetti;
