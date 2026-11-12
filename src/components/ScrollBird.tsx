import { useEffect, useState, useRef, useCallback } from "react";
import { BirdAnimation } from "./BirdAnimation";

interface BirdPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  bank: number;
  size: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function ScrollBird() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [renderPos, setRenderPos] = useState({ x: 0, y: 0, size: 54, rotation: 0 });
  const [wingSpeed, setWingSpeed] = useState(150); // Flap speed in ms per sprite step

  // Physics state (inertial velocity, position, angle)
  const physicsRef = useRef<BirdPhysics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    bank: 0,
    size: 54,
  });

  const targetPosRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const flightStartRef = useRef(performance.now());
  const hoverStartRef = useRef(performance.now());
  const isDockedRef = useRef(true);
  const lastScrollYRef = useRef(0);

  // Get navbar logo position
  const getNavbarPos = useCallback(() => {
    const navEl = document.getElementById("navbar-bird-wrapper");
    const navRect = navEl?.getBoundingClientRect();
    return {
      x: navRect ? navRect.left : 48,
      y: navRect ? navRect.top + navRect.height / 2 - 18 : 20,
    };
  }, []);

  // Safe empty rest position — open dark space clear of header (y > 130) and chat button (y < vh - 180)
  const getSafeEmptyPos = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: vw - 105, // Right gutter margin
      y: Math.max(140, Math.min(vh * 0.32, 240)), // Safe upper-middle sky
    };
  }, []);

  // Main aerodynamic physics simulation loop
  useEffect(() => {
    if (!isDesktop) return;

    const simulate = (now: number) => {
      const p = physicsRef.current;
      const target = targetPosRef.current;
      const isScrolling = isScrollingRef.current;
      const isDocked = isDockedRef.current;

      // 1. Vector to target
      const dx = target.x - p.x;
      const dy = target.y - p.y;
      const dist = Math.hypot(dx, dy);

      // 2. Flap-glide cadence cycle (Burst flap vs. Soaring glide)
      if (isScrolling) {
        const flightTime = (now - flightStartRef.current) / 1000;
        const cycle = flightTime % 3.0; // 3-second natural avian cycle
        if (cycle < 1.4 || p.vy < -0.3) {
          // Flapping phase (or climbing for altitude)
          setWingSpeed(70); // Gentle, majestic flap
        } else {
          // Gliding phase (soaring on air currents with wings outstretched)
          setWingSpeed(180); // Very slow, relaxed glide
        }
      } else {
        // Resting / hovering in empty space
        setWingSpeed(150);
      }

      // 3. Dynamic speed & steering forces (Reynolds' Arrival Steering)
      let maxSpeed = isScrolling ? 6.2 : 3.8;
      let maxForce = isScrolling ? 0.16 : 0.08; // Limits turning rate so it carves wide, realistic arcs

      let desiredSpeed = maxSpeed;
      if (dist < 180) {
        // Decelerate smoothly as we approach target (landing flare)
        desiredSpeed = maxSpeed * Math.max(0.15, dist / 180);
      }

      const desiredVx = (dx / (dist || 1)) * desiredSpeed;
      const desiredVy = (dy / (dist || 1)) * desiredSpeed;

      // Steering acceleration = desired velocity - current velocity
      let steerX = desiredVx - p.vx;
      let steerY = desiredVy - p.vy;
      const steerMag = Math.hypot(steerX, steerY);
      if (steerMag > maxForce) {
        steerX = (steerX / steerMag) * maxForce;
        steerY = (steerY / steerMag) * maxForce;
      }

      // 4. Aerodynamic deceleration flare (bleeds speed before perching)
      if (!isScrolling && dist < 120 && dist > 20) {
        steerY -= 0.04; // Slight upward flare
      }

      // 5. Apply forces with air drag
      p.vx = (p.vx + steerX) * 0.965;
      p.vy = (p.vy + steerY) * 0.965;

      p.x += p.vx;
      p.y += p.vy;

      // 6. Realistic orientation & banking roll
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 0.3) {
        // Pitch heading (looking along flight vector)
        const targetPitch = Math.atan2(p.vy, Math.abs(p.vx) || 0.1) * (180 / Math.PI);
        p.angle = lerp(p.angle, Math.max(-20, Math.min(22, targetPitch)), 0.07);

        // Banking roll into turns (proportional to lateral acceleration)
        const targetBank = Math.max(-18, Math.min(18, steerX * 8));
        p.bank = lerp(p.bank, targetBank, 0.08);
      } else {
        // Leveling off when resting
        p.angle = lerp(p.angle, 0, 0.06);
        p.bank = lerp(p.bank, 0, 0.06);
      }

      // 7. Organic hover drift when resting in empty space
      let renderX = p.x;
      let renderY = p.y;
      let totalRotation = p.angle + p.bank;

      if (!isScrolling && !isDocked && dist < 25) {
        const t = (now - hoverStartRef.current) / 1000;
        // Subtle figure-8 breathing float
        renderX += Math.sin(t * 0.9) * 2.5;
        renderY += Math.cos(t * 1.3) * 3;
        totalRotation += Math.sin(t * 0.7) * 2;
      }

      setRenderPos({
        x: renderX,
        y: renderY,
        size: p.size,
        rotation: totalRotation,
      });

      // 8. Docking cleanly into navbar when scrolled to top
      if (isDocked && dist < 3) {
        setVisible(false);
        const navEl = document.getElementById("navbar-bird-wrapper");
        if (navEl) navEl.style.opacity = "1";
      }

      rafRef.current = requestAnimationFrame(simulate);
    };

    rafRef.current = requestAnimationFrame(simulate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop]);

  // Handle scroll events with smooth waypoint progression
  useEffect(() => {
    if (!isDesktop) return;

    const onScroll = () => {
      const sy = window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ── Scrolled back to top: dock back into navbar logo ──
      if (sy < 40) {
        isDockedRef.current = true;
        isScrollingRef.current = false;
        targetPosRef.current = getNavbarPos();
        return;
      }

      // ── Actively scrolling: take off and swoop organically across the screen ──
      if (isDockedRef.current) {
        // Initial takeoff from navbar
        const start = getNavbarPos();
        physicsRef.current.x = start.x;
        physicsRef.current.y = start.y;
        physicsRef.current.vx = 2.5;
        physicsRef.current.vy = 1.0;
        flightStartRef.current = performance.now();
      }

      isDockedRef.current = false;
      setVisible(true);

      const navEl = document.getElementById("navbar-bird-wrapper");
      if (navEl) navEl.style.opacity = "0.08";

      if (!isScrollingRef.current) {
        flightStartRef.current = performance.now();
      }
      isScrollingRef.current = true;

      // Calculate organic waypoint across the screen:
      // Multi-frequency harmonic curves create wide, natural sweeps (never rigid zig-zags)
      const scrollProgress = sy * 0.0018;
      const arcX =
        (Math.sin(scrollProgress) * 0.35 + Math.sin(scrollProgress * 0.4) * 0.15 + 0.5) *
          (vw - 180) +
        50;
      // Stays safely below the 90px header and well clear of the bottom chat widget
      const arcY =
        (Math.cos(scrollProgress * 0.7) * 0.35 + 0.5) * (vh * 0.38) + 125;

      targetPosRef.current = {
        x: Math.max(50, Math.min(vw - 90, arcX)),
        y: Math.max(120, Math.min(vh * 0.52, arcY)),
      };

      lastScrollYRef.current = sy;

      // ── Detect when scrolling stops ──
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        // User stopped scrolling!
        isScrollingRef.current = false;
        hoverStartRef.current = performance.now();

        // Smoothly glide into the safe empty rest space
        targetPosRef.current = getSafeEmptyPos();
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, [isDesktop, getNavbarPos, getSafeEmptyPos]);

  // Desktop viewport check
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      const navEl = document.getElementById("navbar-bird-wrapper");
      if (navEl) navEl.style.opacity = "1";
    };
  }, []);

  if (!isDesktop || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none select-none z-30"
      style={{
        left: 0,
        top: 0,
        width: `${renderPos.size}px`,
        transform: `translate3d(${renderPos.x}px, ${renderPos.y}px, 0) rotate(${renderPos.rotation}deg)`,
        willChange: "transform",
        transformOrigin: "center center",
      }}
    >
      <BirdAnimation
        className="w-full h-auto drop-shadow-[0_8px_22px_rgba(0,0,0,0.6)]"
        speedMs={wingSpeed}
      />
    </div>
  );
}
