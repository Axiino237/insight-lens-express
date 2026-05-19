import React, { useRef, useEffect, useState } from "react";

// 3D Origami Bird Geometry Definition
const VERTICES = [
  { x: 0, y: 0.6, z: 0 },       // 0: Head
  { x: 0.35, y: 0.7, z: 0 },     // 1: Beak
  { x: -0.7, y: -0.1, z: 0 },    // 2: Tail Tip
  { x: -0.15, y: 0.1, z: 0 },    // 3: Body Center
  { x: -0.3, y: 0.5, z: 0.7 },   // 4: Left Wing Tip
  { x: -0.3, y: 0.5, z: -0.7 },  // 5: Right Wing Tip
  { x: -0.15, y: -0.4, z: 0 },   // 6: Bottom Body
  { x: -0.1, y: 0.2, z: 0.3 },   // 7: Left Wing Mid
  { x: -0.1, y: 0.2, z: -0.3 },  // 8: Right Wing Mid
];

const EDGES = [
  [0, 1], // Head to Beak
  [0, 3], // Head to Body Center
  [3, 2], // Body Center to Tail
  [3, 7], // Body Center to Left Wing Mid
  [7, 4], // Left Wing Mid to Left Wing Tip
  [3, 8], // Body Center to Right Wing Mid
  [8, 5], // Right Wing Mid to Right Wing Tip
  [3, 6], // Body Center to Bottom Body
  [6, 2], // Bottom Body to Tail
  [0, 7], // Head to Left Wing Mid
  [0, 8], // Head to Right Wing Mid
  [6, 7], // Bottom Body to Left Wing Mid
  [6, 8], // Bottom Body to Right Wing Mid
  [2, 7], // Tail to Left Wing Mid
  [2, 8], // Tail to Right Wing Mid
  [4, 0], // Left Wing Tip back to Head (Origami fold)
  [5, 0], // Right Wing Tip back to Head (Origami fold)
  [4, 2], // Left Wing Tip to Tail (Origami fold)
  [5, 2], // Right Wing Tip to Tail (Origami fold)
];

export function ThreeDModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: -0.3, y: 0.6 });
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Mouse drag rotation controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;
      setRotation((prev) => ({
        x: prev.x + deltaY * 0.007,
        y: prev.y + deltaX * 0.007,
      }));
      previousMouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Support touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDragging.current = true;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && e.touches.length > 0) {
      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;
      setRotation((prev) => ({
        x: prev.x + deltaY * 0.007,
        y: prev.y + deltaX * 0.007,
      }));
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let autoAngleY = rotation.y;
    let autoAngleX = rotation.x;

    // Orbiting particles around the bird
    const particles: Array<{
      angle: number;
      speed: number;
      radius: number;
      height: number;
      size: number;
      color: string;
    }> = Array.from({ length: 40 }, () => {
      const colors = ["#ff8c2d", "#ff3d85", "#c53dff", "#00dfc0"];
      return {
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.015,
        radius: 120 + Math.random() * 80,
        height: -100 + Math.random() * 200,
        size: 1.5 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      
      // Clean canvas with transparent/glow base
      ctx.clearRect(0, 0, w, h);

      // Auto-rotation when not dragging
      if (!isDragging.current) {
        autoAngleY += hovered ? 0.003 : 0.006;
        autoAngleX = rotation.x + Math.sin(autoAngleY * 0.5) * 0.1;
      } else {
        autoAngleY = rotation.y;
        autoAngleX = rotation.x;
      }

      // Draw subtle ambient backglow
      const radialGlow = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, 220);
      radialGlow.addColorStop(0, "rgba(255, 61, 133, 0.06)");
      radialGlow.addColorStop(0.5, "rgba(197, 61, 255, 0.03)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 220, 0, Math.PI * 2);
      ctx.fill();

      // Project vertices to 2D screen
      const projected = VERTICES.map((v) => {
        // Rotate Y-axis (yaw)
        let x1 = v.x * Math.cos(autoAngleY) - v.z * Math.sin(autoAngleY);
        let z1 = v.x * Math.sin(autoAngleY) + v.z * Math.cos(autoAngleY);

        // Rotate X-axis (pitch)
        let y2 = v.y * Math.cos(autoAngleX) - z1 * Math.sin(autoAngleX);
        let z2 = v.y * Math.sin(autoAngleX) + z1 * Math.cos(autoAngleX);

        // Perspective Projection calculation
        const focalLength = 3.5;
        const scaleFactor = focalLength / (focalLength + z2);
        
        // Multiplier coordinates
        const multiplier = Math.min(w, h) * 0.45;
        const px = w / 2 + x1 * scaleFactor * multiplier;
        const py = h / 2 - y2 * scaleFactor * multiplier;

        return { x: px, y: py, z: z2 };
      });

      // Render 3D Edges/Lines
      EDGES.forEach(([p1Idx, p2Idx]) => {
        const p1 = projected[p1Idx];
        const p2 = projected[p2Idx];

        // Fade depth
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = Math.max(0.15, Math.min(0.85, 1 - (avgZ + 0.7) / 1.4));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Gradient line connecting the origami folds
        const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        lineGrad.addColorStop(0, `rgba(255, 140, 45, ${opacity})`);     // Warm Orange
        lineGrad.addColorStop(0.5, `rgba(255, 61, 133, ${opacity})`);   // Vibrant Magenta
        lineGrad.addColorStop(1, `rgba(0, 223, 192, ${opacity})`);      // Cyan Beak/Wing
        
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = hovered ? 2.2 : 1.6;
        ctx.stroke();
      });

      // Render Origami faces (semi-transparent filled panels)
      const faces = [
        [0, 1, 3], // Head to Beak panel
        [3, 7, 4], // Left Wing panel
        [3, 8, 5], // Right Wing panel
        [3, 6, 2], // Body panel
      ];

      faces.forEach((face) => {
        const p1 = projected[face[0]];
        const p2 = projected[face[1]];
        const p3 = projected[face[2]];

        const avgZ = (p1.z + p2.z + p3.z) / 3;
        const panelOpacity = Math.max(0.02, Math.min(0.12, 0.15 - (avgZ + 0.7) / 1.4));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const panelGrad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        panelGrad.addColorStop(0, `rgba(255, 61, 133, ${panelOpacity})`);
        panelGrad.addColorStop(1, `rgba(0, 223, 192, ${panelOpacity * 0.4})`);
        
        ctx.fillStyle = panelGrad;
        ctx.fill();
      });

      // Render 3D Vertex/Nodes (glow circles)
      projected.forEach((p, idx) => {
        const opacity = Math.max(0.3, Math.min(0.95, 1 - (p.z + 0.7) / 1.4));
        const size = idx === 1 ? 5 : 3.5; // Beak glows bigger

        // Glow aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = idx === 1 ? `rgba(0, 223, 192, ${opacity * 0.35})` : `rgba(255, 61, 133, ${opacity * 0.25})`;
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = idx === 1 ? `rgba(0, 223, 192, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Render orbiting space particles
      particles.forEach((part) => {
        part.angle += part.speed;
        
        // Transform particle coordinate using autoAngleY rotation
        const partX = Math.cos(part.angle) * part.radius;
        const partZ = Math.sin(part.angle) * part.radius;

        // Apply rotation transforms matching the bird
        const rX = partX * Math.cos(autoAngleY) - partZ * Math.sin(autoAngleY);
        const rZ = partX * Math.sin(autoAngleY) + partZ * Math.cos(autoAngleY);
        
        const focalLength = 3.5;
        // Map to perspective
        const scaleFactor = focalLength / (focalLength + (rZ / 300));
        
        const px = w / 2 + rX * scaleFactor;
        const py = h / 2 + part.height * scaleFactor;

        // Draw particle dot
        const particleOpacity = Math.max(0.1, Math.min(0.7, 0.8 - (rZ / 300)));
        ctx.beginPath();
        ctx.arc(px, py, part.size * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowColor = part.color;
        ctx.shadowBlur = 4;
        ctx.globalAlpha = particleOpacity;
        ctx.fill();
        
        // Reset canvas shadow properties for subsequent draws
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [rotation, hovered]);

  return (
    <div
      className="relative w-full h-[320px] md:h-[450px] cursor-grab active:cursor-grabbing select-none group flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Background soft glowing blur sphere behind canvas */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-magenta/15 to-transparent rounded-full blur-3xl opacity-60 scale-75 -z-10 group-hover:scale-95 transition duration-700 pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        aria-label="Interactive 3D origami bird model"
      />
      
      {/* Interactive Helper Prompt overlay */}
      <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur px-3.5 py-1.5 text-xs text-muted-foreground opacity-50 group-hover:opacity-90 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Drag to spin bird
        </span>
      </div>
    </div>
  );
}
