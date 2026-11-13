import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BirdAnimation } from "./BirdAnimation";

const TAKEOFF_DELAY_MS = 900;
const BIRD_ASPECT = 144 / 256;

interface Point {
  x: number;
  y: number;
}

interface BirdPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  bank: number;
  size: number;
}

type BirdPhase =
  | "docked"
  | "flying-hero"
  | "perched-hero"
  | "flying-featured"
  | "perched-featured"
  | "flying-footer"
  | "possessed-footer";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Perch target on the left edge next to the hero "experiences" word (page coordinates).
 */
function getHeroPerchPagePos(birdWidth: number): Point | null {
  const expEl = document.getElementById("hero-experiences-anchor");
  if (!expEl) return null;

  const rect = expEl.getBoundingClientRect();
  const birdHeight = birdWidth * BIRD_ASPECT;
  const scrollY = window.scrollY;

  return {
    x: Math.max(6, rect.left - birdWidth * 0.92),
    y: rect.top + scrollY + rect.height * 0.5 - birdHeight * 0.5,
  };
}

/**
 * Start & Perch points for the Featured Work section (Image 2, page coordinates).
 */
function getFeaturedWorkAnchors(birdWidth: number): { start: Point; perch: Point } | null {
  const zoneEl = document.getElementById("featured-work-bird-zone");
  if (!zoneEl) return null;

  const rect = zoneEl.getBoundingClientRect();
  const birdHeight = birdWidth * BIRD_ASPECT;
  const scrollY = window.scrollY;

  const startX = Math.max(8, rect.left - 10);
  const startY = rect.top + scrollY - 25;

  const viewAllEl = document.getElementById("featured-work-view-all");
  let perchX = Math.max(rect.left + 150, rect.right - birdWidth);
  let perchY = rect.bottom + scrollY - birdHeight - 15;

  if (viewAllEl) {
    const btnRect = viewAllEl.getBoundingClientRect();
    perchX = btnRect.right - birdWidth + 12;
    perchY = btnRect.top + scrollY - birdHeight - 6;
  }

  return {
    start: {
      x: startX,
      y: startY,
    },
    perch: {
      x: perchX,
      y: perchY,
    },
  };
}

/**
 * Footer logo target (page coordinates).
 */
function getFooterLogoAnchor(): { pos: Point; width: number } | null {
  const footerBird = document.getElementById("footer-bird-wrapper");
  if (!footerBird) return null;

  const rect = footerBird.getBoundingClientRect();
  const scrollY = window.scrollY;

  return {
    pos: {
      x: rect.left,
      y: rect.top + scrollY,
    },
    width: rect.width || 46,
  };
}

export function ScrollBird() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [phase, setPhase] = useState<BirdPhase>("docked");
  const [wingSpeed, setWingSpeed] = useState(45);
  const [renderState, setRenderState] = useState({
    x: 0,
    y: 0,
    width: 71,
    rotation: 0,
    facingLeft: false,
  });

  const physicsRef = useRef<BirdPhysics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    bank: 0,
    size: 71,
  });

  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef<BirdPhase>("docked");
  const facingLeftRef = useRef(false);
  const flightStartTimeRef = useRef(0);
  const hoverStartTimeRef = useRef(0);

  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());

  // Viewport-relative screen positions when perched
  const heroViewportPerchRef = useRef<Point>({ x: 10, y: 340 });
  const featuredViewportPerchRef = useRef<Point>({ x: 1000, y: 340 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      phaseRef.current = "docked";
      setPhase("docked");
      return;
    }

    const heroPerchWidth = 68;
    const featuredBirdWidth = 86;
    let takeoffTimer: number | null = null;

    // ── Start Hero Takeoff (Stage 1) ──
    const triggerHeroFlight = () => {
      if (phaseRef.current !== "docked") return;
      if (takeoffTimer != null) {
        window.clearTimeout(takeoffTimer);
        takeoffTimer = null;
      }

      const navEl = document.getElementById("navbar-bird-wrapper");
      if (!navEl) return;

      const navRect = navEl.getBoundingClientRect();
      const scrollY = window.scrollY;
      const startWidth = navRect.width || 71;

      const p = physicsRef.current;
      p.x = navRect.left;
      p.y = navRect.top;
      // Gentle forward/downward lift off logo
      p.vx = 2.4;
      p.vy = -1.2;
      p.size = startWidth;
      p.angle = -6;
      p.bank = 0;

      facingLeftRef.current = false;
      flightStartTimeRef.current = performance.now();
      phaseRef.current = "flying-hero";
      setPhase("flying-hero");

      const target = getHeroPerchPagePos(heroPerchWidth);
      if (target) {
        heroViewportPerchRef.current = {
          x: target.x,
          y: target.y - scrollY,
        };
      }
    };

    // ── Start Featured Work Flight (Stage 2) ──
    const startFeaturedFlight = (now: number) => {
      const p = physicsRef.current;
      flightStartTimeRef.current = now;
      phaseRef.current = "flying-featured";
      setPhase("flying-featured");

      // Burst acceleration to the right
      p.vx = 4.2;
      p.vy = -1.5;
      facingLeftRef.current = false;
    };

    // ── Start Footer Flight (Stage 3) ──
    const startFooterFlight = (now: number) => {
      const p = physicsRef.current;
      flightStartTimeRef.current = now;
      phaseRef.current = "flying-footer";
      setPhase("flying-footer");

      // Swoop leftward and downward toward footer logo
      p.vx = -4.5;
      p.vy = 2.0;
      facingLeftRef.current = true;
    };

    // ── Scroll Listener with Velocity Tracking ──
    const onScroll = () => {
      const now = performance.now();
      const sy = window.scrollY;
      const dt = Math.max(10, now - lastScrollTimeRef.current);
      const dy = Math.abs(sy - lastScrollYRef.current);
      const instantVelocity = (dy / dt) * 1000; // pixels per second

      // Smooth exponential filter for scroll velocity
      scrollVelocityRef.current = lerp(scrollVelocityRef.current, instantVelocity, 0.4);
      lastScrollYRef.current = sy;
      lastScrollTimeRef.current = now;

      const curPhase = phaseRef.current;

      if (curPhase === "docked") {
        if (takeoffTimer != null) {
          window.clearTimeout(takeoffTimer);
          takeoffTimer = null;
        }
        triggerHeroFlight();
        return;
      }

      if (curPhase === "perched-hero") {
        const zoneEl = document.getElementById("featured-work-bird-zone");
        if (!zoneEl) return;
        const rect = zoneEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.62 && rect.bottom >= 140) {
          startFeaturedFlight(now);
        }
      } else if (curPhase === "perched-featured") {
        const footerEl = document.getElementById("main-footer");
        if (footerEl) {
          const fRect = footerEl.getBoundingClientRect();
          if (fRect.top <= window.innerHeight * 0.88) {
            startFooterFlight(now);
            return;
          }
        }

        // Return to hero if scrolled back to top
        if (window.scrollY < 100) {
          phaseRef.current = "perched-hero";
          hoverStartTimeRef.current = now;
          facingLeftRef.current = false;
          setPhase("perched-hero");
          setWingSpeed(165);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Aerodynamic Simulation Loop ──
    const simulate = (now: number) => {
      const curScrollY = window.scrollY;
      const curPhase = phaseRef.current;
      const p = physicsRef.current;

      // ─────────────────────────────────────────────
      // STAGE 1: FLYING HERO
      // ─────────────────────────────────────────────
      if (curPhase === "flying-hero") {
        const target = heroViewportPerchRef.current;
        const targetPageY = target.y + curScrollY;
        const targetScreenY = target.y;

        // Current coordinate is screen-relative during hero flight
        const dx = target.x - p.x;
        const dy = targetScreenY - p.y;
        const dist = Math.hypot(dx, dy);

        p.size = lerp(p.size, heroPerchWidth, 0.05);

        // Reynolds' Steering Force
        const maxSpeed = 7.4;
        const maxForce = 0.28;
        let desiredSpeed = maxSpeed;
        if (dist < 180) {
          desiredSpeed = maxSpeed * Math.max(0.12, dist / 180);
        }

        const desiredVx = (dx / (dist || 1)) * desiredSpeed;
        const desiredVy = (dy / (dist || 1)) * desiredSpeed;

        let steerX = desiredVx - p.vx;
        let steerY = desiredVy - p.vy;

        // Flare upward during final approach
        if (dist < 120 && dist > 20) {
          steerY -= 0.06;
        }

        const steerMag = Math.hypot(steerX, steerY);
        if (steerMag > maxForce) {
          steerX = (steerX / steerMag) * maxForce;
          steerY = (steerY / steerMag) * maxForce;
        }

        p.vx = (p.vx + steerX) * 0.955;
        p.vy = (p.vy + steerY) * 0.955;
        p.x += p.vx;
        p.y += p.vy;

        // Pitch & Bank
        const speed = Math.hypot(p.vx, p.vy);
        const flightTime = (now - flightStartTimeRef.current) / 1000;

        if (speed > 0.4) {
          const targetPitch = Math.atan2(p.vy, Math.abs(p.vx) || 0.1) * (180 / Math.PI);
          p.angle = lerp(p.angle, Math.max(-20, Math.min(26, targetPitch)), 0.08);
          const targetBank = Math.max(-18, Math.min(18, steerX * 7.5));
          p.bank = lerp(p.bank, targetBank, 0.09);
        } else {
          p.angle = lerp(p.angle, 0, 0.08);
          p.bank = lerp(p.bank, 0, 0.08);
        }

        // Flap cadence: burst flap on lift, glide into landing
        if (dist > 140) {
          const cycle = flightTime % 2.4;
          setWingSpeed(cycle < 1.2 || p.vy < -0.2 ? 42 : 110);
        } else {
          setWingSpeed(150);
        }

        // Facing direction: right on lift, turn left on swoop, face right into perch
        const isLandingFlare = dist < 70;
        const facingLeft = !isLandingFlare && p.vx < -0.8;
        facingLeftRef.current = facingLeft;

        setRenderState({
          x: p.x,
          y: p.y,
          width: p.size,
          rotation: p.angle + p.bank,
          facingLeft,
        });

        if (dist < 10) {
          phaseRef.current = "perched-hero";
          hoverStartTimeRef.current = now;
          setPhase("perched-hero");
          setWingSpeed(165);
          facingLeftRef.current = false;
        }
      }

      // ─────────────────────────────────────────────
      // STAGE 1 (PERCHED): HERO
      // ─────────────────────────────────────────────
      else if (curPhase === "perched-hero") {
        const t = (now - hoverStartTimeRef.current) / 1000;
        const bobY = Math.sin(t * 1.8) * 2.2;
        const idleTilt = Math.sin(t * 1.1) * 1.5;

        p.x = heroViewportPerchRef.current.x;
        p.y = heroViewportPerchRef.current.y;
        p.vx = 0;
        p.vy = 0;

        setRenderState({
          x: p.x,
          y: p.y + bobY,
          width: heroPerchWidth,
          rotation: idleTilt,
          facingLeft: false,
        });
      }

      // ─────────────────────────────────────────────
      // STAGE 2: FLYING FEATURED WORK
      // ─────────────────────────────────────────────
      else if (curPhase === "flying-featured") {
        const anchors = getFeaturedWorkAnchors(featuredBirdWidth);
        const rawTargetX = anchors ? anchors.perch.x : window.innerWidth - 110;
        const rawTargetY = anchors ? anchors.perch.y - curScrollY : 320;

        // Viewport Safeguard: clamp target on screen so fast scrolling can NEVER push the target off-screen!
        const targetScreenX = Math.max(100, Math.min(window.innerWidth - 90, rawTargetX));
        const targetScreenY = Math.max(120, Math.min(window.innerHeight - 150, rawTargetY));

        const dx = targetScreenX - p.x;
        const dy = targetScreenY - p.y;
        const dist = Math.hypot(dx, dy);

        p.size = lerp(p.size, featuredBirdWidth, 0.05);

        // Dynamic Aerodynamic Throttle:
        // When user scrolls fast, the bird bursts forward to beat them to the perch!
        const scrollSpeed = scrollVelocityRef.current;
        const speedBoost = Math.min(18.0, scrollSpeed * 0.016);
        const maxSpeed = 8.6 + speedBoost;
        const maxForce = 0.32 + speedBoost * 0.045;

        // Decelerate as we arrive at the perch, but keep momentum if far away
        let desiredSpeed = maxSpeed;
        if (dist < 220) {
          desiredSpeed = maxSpeed * Math.max(0.12, dist / 220);
        }

        const desiredVx = (dx / (dist || 1)) * desiredSpeed;
        const desiredVy = (dy / (dist || 1)) * desiredSpeed;

        let steerX = desiredVx - p.vx;
        let steerY = desiredVy - p.vy;

        // Wave undulation: slight lift over the middle text
        const midProgress = Math.max(0, 1 - dist / 500);
        if (midProgress > 0.2 && midProgress < 0.7) {
          steerY -= 0.12;
        }

        const steerMag = Math.hypot(steerX, steerY);
        if (steerMag > maxForce) {
          steerX = (steerX / steerMag) * maxForce;
          steerY = (steerY / steerMag) * maxForce;
        }

        p.vx = (p.vx + steerX) * 0.96;
        p.vy = (p.vy + steerY) * 0.96;
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary safety: physically keep bird in visible viewport
        p.y = Math.max(90, Math.min(window.innerHeight - 90, p.y));

        // Orientation
        const speed = Math.hypot(p.vx, p.vy);
        const flightTime = (now - flightStartTimeRef.current) / 1000;

        if (speed > 0.4) {
          const targetPitch = Math.atan2(p.vy, Math.abs(p.vx) || 0.1) * (180 / Math.PI);
          p.angle = lerp(p.angle, Math.max(-20, Math.min(24, targetPitch)), 0.08);
          const targetBank = Math.max(-18, Math.min(18, steerX * 7.5));
          p.bank = lerp(p.bank, targetBank, 0.09);
        } else {
          p.angle = lerp(p.angle, 0, 0.08);
          p.bank = lerp(p.bank, 0, 0.08);
        }

        // Rapid flapping during sprint, relaxed glide when cruising
        if (dist > 160) {
          if (speedBoost > 3.0) {
            setWingSpeed(28); // fast burst wingbeat during sprint
          } else {
            const cycle = flightTime % 2.5;
            setWingSpeed(cycle < 1.3 ? 42 : 110);
          }
        } else {
          setWingSpeed(140);
        }

        // Gradually decay scroll velocity each simulation tick
        scrollVelocityRef.current *= 0.92;

        setRenderState({
          x: p.x,
          y: p.y,
          width: p.size,
          rotation: p.angle + p.bank,
          facingLeft: false,
        });

        if (dist < 14) {
          featuredViewportPerchRef.current = {
            x: targetScreenX,
            y: targetScreenY,
          };
          phaseRef.current = "perched-featured";
          hoverStartTimeRef.current = now;
          setPhase("perched-featured");
          setWingSpeed(165);
          facingLeftRef.current = true; // Turn to gaze back inward!
        }
      }

      // ─────────────────────────────────────────────
      // STAGE 2 (PERCHED): FEATURED WORK
      // ─────────────────────────────────────────────
      else if (curPhase === "perched-featured") {
        const t = (now - hoverStartTimeRef.current) / 1000;
        const bobY = Math.sin(t * 1.8) * 2.4;
        const idleTilt = Math.sin(t * 1.1) * 1.5;

        p.x = featuredViewportPerchRef.current.x;
        p.y = featuredViewportPerchRef.current.y;
        p.vx = 0;
        p.vy = 0;

        setRenderState({
          x: p.x,
          y: p.y + bobY,
          width: featuredBirdWidth,
          rotation: idleTilt,
          facingLeft: true, // Horizontally flipped to gaze inward
        });
      }

      // ─────────────────────────────────────────────
      // STAGE 3: FLYING FOOTER
      // ─────────────────────────────────────────────
      else if (curPhase === "flying-footer") {
        const footerAnchor = getFooterLogoAnchor();
        const rawTargetX = footerAnchor ? footerAnchor.pos.x : 48;
        const rawTargetY = footerAnchor ? footerAnchor.pos.y - curScrollY : window.innerHeight - 80;
        const targetWidth = footerAnchor ? footerAnchor.width : 46;

        // Viewport Safeguard: clamp footer target so it never pulls off-screen
        const targetScreenX = Math.max(30, Math.min(window.innerWidth - 60, rawTargetX));
        const targetScreenY = Math.max(120, Math.min(window.innerHeight - 60, rawTargetY));

        const dx = targetScreenX - p.x;
        const dy = targetScreenY - p.y;
        const dist = Math.hypot(dx, dy);

        p.size = lerp(p.size, targetWidth, 0.05);

        // Reynolds' Steering Force swooping into the footer logo
        const maxSpeed = 9.2;
        const maxForce = 0.35;
        let desiredSpeed = maxSpeed;
        if (dist < 200) {
          desiredSpeed = maxSpeed * Math.max(0.12, dist / 200);
        }

        const desiredVx = (dx / (dist || 1)) * desiredSpeed;
        const desiredVy = (dy / (dist || 1)) * desiredSpeed;

        let steerX = desiredVx - p.vx;
        let steerY = desiredVy - p.vy;

        const steerMag = Math.hypot(steerX, steerY);
        if (steerMag > maxForce) {
          steerX = (steerX / steerMag) * maxForce;
          steerY = (steerY / steerMag) * maxForce;
        }

        p.vx = (p.vx + steerX) * 0.96;
        p.vy = (p.vy + steerY) * 0.96;
        p.x += p.vx;
        p.y += p.vy;

        // Keep bird in visible viewport
        p.y = Math.max(80, Math.min(window.innerHeight - 60, p.y));

        // Orientation
        const speed = Math.hypot(p.vx, p.vy);
        const flightTime = (now - flightStartTimeRef.current) / 1000;

        if (speed > 0.4) {
          const targetPitch = Math.atan2(p.vy, Math.abs(p.vx) || 0.1) * (180 / Math.PI);
          p.angle = lerp(p.angle, Math.max(-20, Math.min(25, targetPitch)), 0.08);
          const targetBank = Math.max(-18, Math.min(18, steerX * 7.5));
          p.bank = lerp(p.bank, targetBank, 0.09);
        } else {
          p.angle = lerp(p.angle, 0, 0.08);
          p.bank = lerp(p.bank, 0, 0.08);
        }

        if (dist > 140) {
          const cycle = flightTime % 2.2;
          setWingSpeed(cycle < 1.1 ? 42 : 110);
        } else {
          setWingSpeed(140);
        }

        // Final landing approach:
        // When nearing the logo (dist < 120), turn to face RIGHT to match the brand logo direction
        const isLandingApproach = dist < 120;
        const facingLeft = !isLandingApproach;

        setRenderState({
          x: p.x,
          y: p.y,
          width: p.size,
          rotation: p.angle + p.bank,
          facingLeft,
        });

        // ── Clean Landing on Footer Logo ──
        // Sits right into the empty footer slot, executes its flip animation,
        // and hands off to the static footer logo so it scrolls naturally with the footer!
        if (dist < 8) {
          phaseRef.current = "possessed-footer";
          setPhase("possessed-footer");

          p.x = targetScreenX;
          p.y = targetScreenY;
          p.vx = 0;
          p.vy = 0;
          p.angle = 0;
          p.bank = 0;

          // Step 1: Touch down in footer slot
          setRenderState({
            x: targetScreenX,
            y: targetScreenY,
            width: targetWidth,
            rotation: 0,
            facingLeft: true,
          });

          // Step 2: Flip horizontally to face right, then hand off to the footer's real logo
          window.setTimeout(() => {
            setRenderState((prev) => ({
              ...prev,
              facingLeft: false, // flips horizontally into brand direction!
            }));

            // Reveal the actual footer logo in the page DOM (scrolls naturally with footer)
            const footerStatic = document.getElementById("footer-static-logo");
            if (footerStatic) footerStatic.style.opacity = "1";

            // Hide the fixed-position flying bird so it doesn't float when scrolling up
            window.setTimeout(() => {
              setPhase("possessed-footer");
            }, 50);
          }, 250);

          // Restore header logo with a soft fade!
          const navEl = document.getElementById("navbar-bird-wrapper");
          if (navEl) navEl.style.opacity = "1";
        }
      }

      rafRef.current = requestAnimationFrame(simulate);
    };

    takeoffTimer = window.setTimeout(triggerHeroFlight, TAKEOFF_DELAY_MS);
    rafRef.current = requestAnimationFrame(simulate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (takeoffTimer != null) window.clearTimeout(takeoffTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const navEl = document.getElementById("navbar-bird-wrapper");
      if (navEl) navEl.style.opacity = "1";
    };
  }, [isDesktop]);

  useLayoutEffect(() => {
    const navEl = document.getElementById("navbar-bird-wrapper");
    if (!navEl) return;
    // Header bird is visible when docked at top OR when possessed-footer has been reached
    navEl.style.opacity = !isDesktop || phase === "docked" || phase === "possessed-footer" ? "1" : "0";
  }, [isDesktop, phase]);

  if (!isDesktop || phase === "docked" || phase === "possessed-footer") return null;

  return (
    <div
      data-scroll-bird="true"
      className={`fixed pointer-events-none select-none ${
        phase === "flying-hero" || phase === "flying-footer" ? "z-[60]" : "z-30"
      }`}
      style={{
        left: 0,
        top: 0,
        width: `${renderState.width}px`,
        transform: `translate3d(${renderState.x}px, ${renderState.y}px, 0) rotate(${
          renderState.facingLeft ? -renderState.rotation : renderState.rotation
        }deg) scaleX(${renderState.facingLeft ? -1 : 1})`,
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
